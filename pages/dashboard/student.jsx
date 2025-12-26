// pages/dashboard/student.jsx
// Student Dashboard with real progress tracking

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth, withAuth } from '../../hooks/useAuth';

function StudentDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [progress, setProgress] = useState(null);
  const [stats, setStats] = useState({
    totalEnrolled: 0,
    totalAttended: 0,
    totalCompleted: 0,
    attendanceRate: 0,
    totalHours: 0,
    currentStreak: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch enrollments
      const enrollRes = await fetch('/api/enrollments');
      if (enrollRes.ok) {
        const data = await enrollRes.json();
        setEnrollments(data.enrollments || []);
      }

      // Fetch upcoming classes
      const classesRes = await fetch('/api/classes?upcoming=true');
      if (classesRes.ok) {
        const data = await classesRes.json();
        setUpcomingClasses(data.classes || []);
      }

      // Fetch progress
      const progressRes = await fetch('/api/progress');
      if (progressRes.ok) {
        const data = await progressRes.json();
        setProgress(data.progress || []);
        setStats(data.stats || stats);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinClass = async (classItem) => {
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId: classItem.id, action: 'join' }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.meetUrl) {
          window.open(data.meetUrl, '_blank');
        }
        // Refresh data
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Failed to join class:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatPrice = (price, currency = 'NGN') => {
    if (price === 0) return 'Free';
    const amount = price / 100;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const isClassJoinable = (classItem) => {
    const now = new Date();
    const classTime = new Date(classItem.scheduledTime);
    const timeDiff = (classTime - now) / (1000 * 60); // minutes
    return timeDiff <= 15 && timeDiff >= -classItem.duration;
  };

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: 'bg-yellow-100 text-yellow-700',
      CONFIRMED: 'bg-blue-100 text-blue-700',
      ATTENDED: 'bg-green-100 text-green-700',
      COMPLETED: 'bg-purple-100 text-purple-700',
      MISSED: 'bg-red-100 text-red-700',
      CANCELLED: 'bg-gray-100 text-gray-700',
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <>
      <Head>
        <title>Student Dashboard - EduTrack Hub</title>
      </Head>

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md flex flex-col">
          <div className="p-6 border-b">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="EduTrack Hub" className="h-8" />
              <span className="font-bold text-lg text-gray-800">EduTrack Hub</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'classes'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              My Classes
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'progress'
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Progress
            </button>
            <Link
              href="/classes"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Browse Classes
            </Link>
          </nav>

          <div className="p-4 border-t">
            <div className="px-4 py-2 mb-2">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name?.split(' ')[0]}! 👋
                </h1>
                <p className="text-gray-600 mt-1">Track your learning progress and upcoming classes</p>
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Classes Enrolled</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalEnrolled}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Attendance Rate</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.attendanceRate}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Learning Hours</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🔥</span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Current Streak</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.currentStreak} classes</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Classes */}
                  <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Your Upcoming Classes</h2>
                    {enrollments.filter(e => e.status === 'CONFIRMED' || e.status === 'PENDING').length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You haven't enrolled in any upcoming classes yet.</p>
                        <Link href="/classes" className="btn btn-primary">
                          Browse Classes
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {enrollments
                          .filter(e => e.status === 'CONFIRMED' || e.status === 'PENDING')
                          .slice(0, 5)
                          .map((enrollment) => (
                            <div
                              key={enrollment.id}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{enrollment.class.title}</h3>
                                <p className="text-sm text-gray-600">
                                  {enrollment.class.subject} • {formatDate(enrollment.class.scheduledTime)}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(enrollment.status)}`}>
                                  {enrollment.status}
                                </span>
                                {isClassJoinable(enrollment.class) && enrollment.class.meetUrl && (
                                  <button
                                    onClick={() => handleJoinClass(enrollment.class)}
                                    className="btn btn-primary text-sm"
                                  >
                                    Join Now
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Classes Tab */}
              {activeTab === 'classes' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">All My Classes</h2>
                  {enrollments.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No classes yet.</p>
                      <Link href="/classes" className="btn btn-primary">
                        Browse Classes
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Class</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {enrollments.map((enrollment) => (
                            <tr key={enrollment.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-medium text-gray-900">{enrollment.class.title}</p>
                                  <p className="text-sm text-gray-500">{enrollment.class.subject}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {formatDate(enrollment.class.scheduledTime)}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(enrollment.status)}`}>
                                  {enrollment.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                {enrollment.rating ? (
                                  <span className="text-yellow-500">{'★'.repeat(enrollment.rating)}</span>
                                ) : (
                                  <span className="text-gray-400">—</span>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                {enrollment.class.recordingUrl && (
                                  <a
                                    href={enrollment.class.recordingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                  >
                                    Watch Recording
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  {/* Overall Progress */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-3xl font-bold text-blue-600">{stats.totalCompleted}</p>
                        <p className="text-sm text-blue-700">Classes Completed</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-3xl font-bold text-green-600">{stats.totalHours}h</p>
                        <p className="text-sm text-green-700">Total Learning Time</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-3xl font-bold text-purple-600">{stats.subjectsStudied}</p>
                        <p className="text-sm text-purple-700">Subjects Studied</p>
                      </div>
                    </div>
                  </div>

                  {/* Subject Progress */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Progress by Subject</h2>
                    {progress && progress.length > 0 ? (
                      <div className="space-y-4">
                        {progress.map((p) => (
                          <div key={p.id} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold text-gray-900">{p.subject}</h3>
                              <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded">
                                {p.currentLevel}
                              </span>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Enrolled</p>
                                <p className="font-semibold">{p.classesEnrolled}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Attended</p>
                                <p className="font-semibold">{p.classesAttended}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Completed</p>
                                <p className="font-semibold">{p.classesCompleted}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Time</p>
                                <p className="font-semibold">{Math.round(p.totalMinutes / 60 * 10) / 10}h</p>
                              </div>
                            </div>
                            {/* Progress bar */}
                            <div className="mt-3">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-primary-500 h-2 rounded-full transition-all"
                                  style={{
                                    width: `${p.classesEnrolled > 0 ? (p.classesCompleted / p.classesEnrolled) * 100 : 0}%`,
                                  }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {p.classesEnrolled > 0
                                  ? Math.round((p.classesCompleted / p.classesEnrolled) * 100)
                                  : 0}% completion rate
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No progress data yet. Start by attending some classes!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

// Protect this page - requires authentication
export default withAuth(StudentDashboard);
