import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const Icons = {
    Calendar: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    Clock: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    Video: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
    ),
    BookOpen: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
    ),
    ExternalLink: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    ),
    ArrowRight: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    ),
};

export default function MyClasses() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                fetchEnrollments();
            } else {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            window.location.href = '/login';
        }
    };

    const fetchEnrollments = async () => {
        try {
            const res = await fetch('/api/enrollments');
            if (res.ok) {
                const data = await res.json();
                setEnrollments(data.enrollments || []);
            }
        } catch (error) {
            console.error('Failed to fetch enrollments:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const isUpcoming = (dateString) => {
        return new Date(dateString) > new Date();
    };

    const upcomingClasses = enrollments.filter(e => isUpcoming(e.class?.scheduledTime));
    const pastClasses = enrollments.filter(e => !isUpcoming(e.class?.scheduledTime));

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>My Classes - EduTrack Hub</title>
                <meta name="description" content="View your enrolled classes and upcoming sessions." />
                <link rel="icon" href="/logo.png" type="image/png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <style jsx global>{`
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
      `}</style>

            <div className="min-h-screen bg-slate-50">
                <Navigation />

                <main className="pt-24 pb-16">
                    <div className="max-w-6xl mx-auto px-5 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900">My Classes</h1>
                            <p className="text-slate-600 mt-1">
                                Welcome back, {user?.name?.split(' ')[0] || 'Student'}! Here are your enrolled classes.
                            </p>
                        </div>

                        {enrollments.length === 0 ? (
                            /* Empty State */
                            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                                <Icons.BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h2 className="text-xl font-bold text-slate-900 mb-2">No classes yet</h2>
                                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                                    You haven't enrolled in any classes yet. Browse our catalog and find the perfect class for you.
                                </p>
                                <Link
                                    href="/classes"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                >
                                    Browse Classes
                                    <Icons.ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Upcoming Classes */}
                                {upcomingClasses.length > 0 && (
                                    <section>
                                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                                            Upcoming Classes ({upcomingClasses.length})
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {upcomingClasses.map((enrollment) => (
                                                <div
                                                    key={enrollment.id}
                                                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                                                >
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
                                                                {enrollment.class?.subject}
                                                            </span>
                                                        </div>
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                            Confirmed
                                                        </span>
                                                    </div>

                                                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                                                        {enrollment.class?.title}
                                                    </h3>

                                                    <div className="space-y-2 text-sm text-slate-600 mb-4">
                                                        <div className="flex items-center gap-2">
                                                            <Icons.Calendar className="w-4 h-4 text-slate-400" />
                                                            {formatDate(enrollment.class?.scheduledTime)}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Icons.Clock className="w-4 h-4 text-slate-400" />
                                                            {formatTime(enrollment.class?.scheduledTime)} ({enrollment.class?.duration} min)
                                                        </div>
                                                    </div>

                                                    {enrollment.class?.meetUrl ? (
                                                        <a
                                                            href={enrollment.class.meetUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                                        >
                                                            <Icons.Video className="w-4 h-4" />
                                                            Join Class
                                                            <Icons.ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    ) : (
                                                        <div className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-600 text-center text-sm">
                                                            Meeting link will be available 1 hour before class
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Past Classes */}
                                {pastClasses.length > 0 && (
                                    <section>
                                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                                            Past Classes ({pastClasses.length})
                                        </h2>
                                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                                            {pastClasses.map((enrollment, i) => (
                                                <div
                                                    key={enrollment.id}
                                                    className={`p-4 flex items-center justify-between ${i !== pastClasses.length - 1 ? 'border-b border-slate-100' : ''
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                                                            <Icons.BookOpen className="w-5 h-5 text-slate-500" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-slate-900">{enrollment.class?.title}</h4>
                                                            <p className="text-sm text-slate-500">
                                                                {formatDate(enrollment.class?.scheduledTime)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        {enrollment.class?.recordingUrl && (
                                                            <a
                                                                href={enrollment.class.recordingUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
                                                            >
                                                                <Icons.Video className="w-4 h-4" />
                                                                Watch Recording
                                                            </a>
                                                        )}
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${enrollment.status === 'COMPLETED'
                                                                ? 'bg-green-100 text-green-700'
                                                                : enrollment.status === 'MISSED'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : 'bg-slate-100 text-slate-700'
                                                            }`}>
                                                            {enrollment.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}

                        {/* Browse More CTA */}
                        <div className="mt-12 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Want to learn more?</h2>
                            <p className="text-teal-100 mb-6">Explore more classes and continue your learning journey.</p>
                            <Link
                                href="/classes"
                                className="inline-flex items-center gap-2 bg-white text-teal-700 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                            >
                                Browse All Classes
                                <Icons.ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
