import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Icons = {
    Mail: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    ),
    ArrowLeft: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    ),
    Check: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
};

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitted(true);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Forgot Password - EduTrack Hub</title>
                <meta name="description" content="Reset your EduTrack Hub password." />
                <link rel="icon" href="/logo.png" type="image/png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <style jsx global>{`
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
      `}</style>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Back Link */}
                    <Link href="/login" className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-600 mb-8 transition-colors">
                        <Icons.ArrowLeft className="w-4 h-4" />
                        Back to login
                    </Link>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <Link href="/" className="flex items-center gap-2">
                                <Image
                                    src="/logo.png"
                                    alt="EduTrack Hub"
                                    width={40}
                                    height={40}
                                    className="rounded-xl"
                                />
                                <span className="font-semibold text-xl text-slate-900">
                                    EduTrack<span className="text-teal-600">Hub</span>
                                </span>
                            </Link>
                        </div>

                        {submitted ? (
                            /* Success State */
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <Icons.Check className="w-8 h-8 text-green-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                    Check Your Email
                                </h1>
                                <p className="text-slate-600 mb-6">
                                    If an account exists for <strong>{email}</strong>, we've sent a password reset link. Check your inbox and spam folder.
                                </p>
                                <p className="text-sm text-slate-500 mb-6">
                                    The link will expire in 1 hour.
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-block w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all"
                                >
                                    Return to Login
                                </Link>
                            </div>
                        ) : (
                            /* Form State */
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                        Forgot your password?
                                    </h1>
                                    <p className="text-slate-600">
                                        Enter your email and we'll send you a reset link.
                                    </p>
                                </div>

                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Email address
                                        </label>
                                        <div className="relative">
                                            <Icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>

                    {/* Help */}
                    <p className="text-center mt-6 text-sm text-slate-500">
                        Need help?{' '}
                        <Link href="/contact" className="text-teal-600 hover:underline">
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
