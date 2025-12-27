import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    Users: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    Video: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
    ),
    Check: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    ArrowLeft: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    ),
    ArrowRight: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    ),
    Globe: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    Star: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
};

const levelColors = {
    BEGINNER: 'bg-green-100 text-green-700 border-green-200',
    INTERMEDIATE: 'bg-amber-100 text-amber-700 border-amber-200',
    ADVANCED: 'bg-red-100 text-red-700 border-red-200',
};

const levelLabels = {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
};

export default function ClassDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchClassData();
        }
    }, [id]);

    const fetchClassData = async () => {
        try {
            const res = await fetch(`/api/classes/${id}`);
            if (!res.ok) {
                if (res.status === 404) {
                    setError('Class not found');
                } else {
                    setError('Failed to load class details');
                }
                return;
            }
            const data = await res.json();
            setClassData(data.class);
        } catch (err) {
            console.error('Failed to fetch class:', err);
            setError('Failed to load class details');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
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

    const formatPrice = (price, currency) => {
        if (price === 0) return 'Free';
        // Price is stored in smallest unit (kobo for NGN, cents for USD)
        const amount = price / 100;
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: currency || 'NGN',
        }).format(amount);
    };

    if (loading) {
        return (
            <>
                <Head>
                    <title>Loading... - EduTrack Hub</title>
                    <link rel="icon" href="/logo.png" type="image/png" />
                </Head>
                <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Head>
                    <title>Error - EduTrack Hub</title>
                    <link rel="icon" href="/logo.png" type="image/png" />
                </Head>
                <div className="min-h-screen bg-slate-50">
                    <Navigation />
                    <div className="pt-28 pb-20 px-5">
                        <div className="max-w-2xl mx-auto text-center">
                            <h1 className="text-4xl font-bold text-slate-900 mb-4">{error}</h1>
                            <p className="text-slate-600 mb-8">
                                The class you're looking for doesn't exist or has been removed.
                            </p>
                            <Link
                                href="/classes"
                                className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
                            >
                                <Icons.ArrowLeft className="w-5 h-5" />
                                Browse all classes
                            </Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{classData?.title || 'Class Details'} - EduTrack Hub</title>
                <meta name="description" content={classData?.description || 'Join this live tutoring class at EduTrack Hub.'} />
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

                {/* Breadcrumb */}
                <div className="pt-24 pb-4 bg-white border-b border-slate-100">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8">
                        <Link
                            href="/classes"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors"
                        >
                            <Icons.ArrowLeft className="w-4 h-4" />
                            Back to all classes
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Left Column - Class Info */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Header */}
                                <div>
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700 border border-teal-200">
                                            {classData.subject}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[classData.level]}`}>
                                            {levelLabels[classData.level]}
                                        </span>
                                        {classData.price === 0 && (
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
                                                Free Class
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                                        {classData.title}
                                    </h1>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {classData.description}
                                    </p>
                                </div>

                                {/* Topics */}
                                {classData.topics && classData.topics.length > 0 && (
                                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                        <h2 className="text-xl font-bold text-slate-900 mb-4">What You'll Learn</h2>
                                        <ul className="space-y-3">
                                            {classData.topics.map((topic, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Icons.Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-slate-700">{topic}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Class Features */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <h2 className="text-xl font-bold text-slate-900 mb-4">What's Included</h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { icon: Icons.Video, text: 'Live interactive session' },
                                            { icon: Icons.Users, text: `Small group (max ${classData.maxStudents} students)` },
                                            { icon: Icons.Video, text: 'Recording available after class' },
                                            { icon: Icons.Globe, text: 'Join from anywhere in the world' },
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-700">
                                                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                                                    <feature.icon className="w-5 h-5 text-teal-600" />
                                                </div>
                                                <span>{feature.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* About the Tutor */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                                    <h2 className="text-xl font-bold text-slate-900 mb-4">Your Tutor</h2>
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                            G
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">Gabriel</h3>
                                            <p className="text-slate-500 text-sm mb-2">Lead Tutor</p>
                                            <div className="flex items-center gap-1 text-amber-400 mb-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Icons.Star key={star} className="w-4 h-4" />
                                                ))}
                                                <span className="text-slate-600 text-sm ml-1">5.0</span>
                                            </div>
                                            <p className="text-slate-600 text-sm">
                                                Engineering background with years of specialized tutoring experience.
                                                Focused on building real understanding, not just memorization.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Enrollment Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-28 shadow-lg">
                                    {/* Price */}
                                    <div className="mb-6">
                                        <p className="text-3xl font-bold text-slate-900">
                                            {formatPrice(classData.price, classData.currency)}
                                        </p>
                                        {classData.price > 0 && (
                                            <p className="text-slate-500 text-sm">per session</p>
                                        )}
                                    </div>

                                    {/* Schedule */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                <Icons.Calendar className="w-5 h-5 text-slate-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">{formatDate(classData.scheduledTime)}</p>
                                                <p className="text-sm text-slate-500">Class date</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                <Icons.Clock className="w-5 h-5 text-slate-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">{formatTime(classData.scheduledTime)}</p>
                                                <p className="text-sm text-slate-500">{classData.duration} minutes</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                <Icons.Users className="w-5 h-5 text-slate-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">
                                                    {classData.spotsLeft} spots left
                                                </p>
                                                <p className="text-sm text-slate-500">
                                                    {classData.enrolledCount} of {classData.maxStudents} enrolled
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Enrollment Status */}
                                    {classData.isFull ? (
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                            <p className="text-red-700 font-semibold">This class is full</p>
                                            <p className="text-red-600 text-sm">Join the waitlist to be notified if a spot opens up.</p>
                                        </div>
                                    ) : classData.spotsLeft <= 3 && (
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                                            <p className="text-amber-700 font-semibold">Only {classData.spotsLeft} spots left!</p>
                                            <p className="text-amber-600 text-sm">Reserve your spot before it fills up.</p>
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <Link
                                        href={`/signup?class=${classData.id}`}
                                        className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 ${classData.isFull
                                                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02]'
                                            }`}
                                    >
                                        {classData.isFull ? 'Class Full' : 'Enroll Now'}
                                        {!classData.isFull && <Icons.ArrowRight className="w-5 h-5" />}
                                    </Link>

                                    {/* Trust indicators */}
                                    <div className="mt-6 pt-6 border-t border-slate-100">
                                        <ul className="space-y-2 text-sm text-slate-600">
                                            <li className="flex items-center gap-2">
                                                <Icons.Check className="w-4 h-4 text-teal-500" />
                                                Secure enrollment
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Icons.Check className="w-4 h-4 text-teal-500" />
                                                Class recording included
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <Icons.Check className="w-4 h-4 text-teal-500" />
                                                Cancel anytime before class
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Classes CTA */}
                <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
                    <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Looking for more classes?
                        </h2>
                        <p className="text-teal-100 text-lg mb-8">
                            Explore our full catalog of live tutoring sessions and find your perfect fit.
                        </p>
                        <Link
                            href="/classes"
                            className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Browse All Classes
                            <Icons.ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
