import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Icons = {
    Lock: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    ),
    Eye: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    EyeOff: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    ),
    Check: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    AlertCircle: ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    ),
};

export default function ResetPassword() {
    const router = useRouter();
    const { token } = router.query;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (router.isReady && !token) {
            setError('Invalid reset link. Please request a new password reset.');
        }
    }, [router.isReady, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess(true);
            } else {
                setError(data.error || 'Failed to reset password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Reset Password - EduTrack Hub</title>
                <meta name="description" content="Create a new password for your EduTrack Hub account." />
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

                        {success ? (
                            /* Success State */
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <Icons.Check className="w-8 h-8 text-green-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                    Password Reset!
                                </h1>
                                <p className="text-slate-600 mb-6">
                                    Your password has been successfully reset. You can now log in with your new password.
                                </p>
                                <Link
                                    href="/login"
                                    className="inline-block w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all"
                                >
                                    Go to Login
                                </Link>
                            </div>
                        ) : error && !token ? (
                            /* Invalid Token State */
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                                    <Icons.AlertCircle className="w-8 h-8 text-red-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                    Invalid or Expired Link
                                </h1>
                                <p className="text-slate-600 mb-6">
                                    {error}
                                </p>
                                <Link
                                    href="/forgot-password"
                                    className="inline-block w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all"
                                >
                                    Request New Reset Link
                                </Link>
                            </div>
                        ) : (
                            /* Form State */
                            <>
                                <div className="text-center mb-8">
                                    <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                        Create new password
                                    </h1>
                                    <p className="text-slate-600">
                                        Enter your new password below.
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
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                placeholder="At least 8 characters"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                            >
                                                {showPassword ? <Icons.EyeOff className="w-5 h-5" /> : <Icons.Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                                placeholder="Confirm your password"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Resetting...' : 'Reset Password'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
