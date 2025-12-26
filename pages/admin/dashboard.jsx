// pages/admin/dashboard.jsx
// Admin Dashboard with real stats and audit trail

import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth, withAuth } from '../../hooks/useAuth';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalClasses: 0,
    totalEnrollments: 0,
    upcomingClasses: 0,
    completedClasses: 0,
    totalRevenue: 0,
  });
  const [recentClasses, setRecentClasses] = useState([]);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch classes
      const classesRes = await fetch('/api/classes');
      if (classesRes.ok) {
        const data = await classesRes.json();
        const classes = data.classes || [];
        const now = new Date();
        const upcoming = classes.filter((c) => new Date(c.scheduledTime) > now);
        const completed = classes.filter((c) => c.status === 'COMPLETED');
        
        setRecentClasses(classes.slice(0, 5));
        
        // Calculate total enrolled
        const totalEnrollments = classes.reduce((sum, c) => sum + (c.enrolledCount || 0), 0);
        
        setStats((prev) => ({
          ...prev,
          totalClasses: classes.length,
          upcomingClasses: upcoming.length,
          completedClasses: completed.length,
          totalEnrollments,
        }));
      }

      // Fetch enrollments for recent activity
      const enrollRes = await fetch('/api/admin/enrollments');
      if (enrollRes.ok) {
        const data = await enrollRes.json();
        setRecentEnrollments(data.enrollments || []);
      }

      // Fetch user stats
      const usersRes = await fetch('/api/admin/stats');
      if (usersRes.ok) {
        const data = await usersRes.json();
        setStats((prev) => ({
          ...prev,
          totalStudents: data.totalStudents || 0,
          totalRevenue: data.totalRevenue || 0,
        }));
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatPrice = (price, currency = 'NGN') => {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  const formatCurrency = (amount, currency = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount / 100);
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - EduTrack Hub</title>
      </Head>

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md flex flex-col">
          <div className="p-6 border-b">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="EduTrack Hub" className="h-8" />
              <span className="font-bold text-lg text-gray-800">EduTrack Hub</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-600 rounded-lg font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/admin/classes"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Classes
            </Link>
            <Link
              href="/classes"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Site
            </Link>
          </nav>

          <div className="p-4 border-t">
            <div className="px-4 py-2 mb-2">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-700 rounded">
                ADMIN
              </span>
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your tutoring platform</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : (
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
                      <p className="text-sm text-gray-600">Total Classes</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalClasses}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Upcoming</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.upcomingClasses}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Enrollments</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.completedClasses}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions + Recent Classes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Link
                      href="/admin/classes"
                      className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <span className="text-2xl">📅</span>
                      <div>
                        <span className="font-semibold text-blue-700 block">Schedule New Class</span>
                        <span className="text-sm text-blue-600">Create a tutoring session</span>
                      </div>
                    </Link>
                    <Link
                      href="/classes"
                      className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <span className="text-2xl">👁️</span>
                      <div>
                        <span className="font-semibold text-green-700 block">View Public Site</span>
                        <span className="text-sm text-green-600">See what students see</span>
                      </div>
                    </Link>
                    <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                      <span className="text-2xl">💳</span>
                      <div className="mt-2">
                        <span className="font-semibold text-gray-500 block">Payments (Coming Soon)</span>
                        <span className="text-sm text-gray-400">Stripe integration in Phase 2</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Classes */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Recent Classes</h2>
                    <Link href="/admin/classes" className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
                      View All →
                    </Link>
                  </div>

                  {recentClasses.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No classes created yet</p>
                      <Link href="/admin/classes" className="btn btn-primary">
                        Create Your First Class
                      </Link>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Class</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Enrolled</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {recentClasses.map((cls) => (
                            <tr key={cls.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div>
                                  <p className="font-medium text-gray-900">{cls.title}</p>
                                  <p className="text-sm text-gray-500">{cls.subject}</p>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {formatDate(cls.scheduledTime)}
                              </td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {formatPrice(cls.price, cls.currency)}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {cls.enrolledCount || 0} / {cls.maxStudents}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                  cls.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' :
                                  cls.status === 'LIVE' ? 'bg-green-100 text-green-700' :
                                  cls.status === 'COMPLETED' ? 'bg-gray-100 text-gray-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {cls.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Platform Status */}
              <div className="mt-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-sm p-6 text-white">
                <h2 className="text-lg font-bold mb-2">Platform Status: Phase 1 Complete ✅</h2>
                <p className="text-white/90 mb-4">
                  Core features operational: Authentication, Class Management, Enrollments, Progress Tracking, Attendance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Real-time Data</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Progress Tracking</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Attendance System</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Audit Trail</span>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

// Protect this page - requires ADMIN role
export default withAuth(AdminDashboard, { requireAdmin: true });
