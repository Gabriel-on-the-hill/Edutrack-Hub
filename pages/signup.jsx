import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Icons = {
  User: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Mail: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
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
  ArrowRight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/dashboard/student');
      } else {
        setError(data.error || 'Failed to create account');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    'Try your first class completely free',
    'Access to class recordings anytime',
    'Small groups (max 8 students)',
    'Direct WhatsApp support',
    'No commitment required',
  ];

  return (
    <>
      <Head>
        <title>Sign Up Free - EduTrack Hub</title>
        <meta name="description" content="Create your free EduTrack Hub account and try your first class free. No credit card required." />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 p-12 flex-col justify-between relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">
              EduTrack<span className="text-teal-200">Hub</span>
            </span>
          </Link>

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              Start your journey to<br />
              <span className="text-amber-300">better grades</span>
            </h1>
            <p className="text-teal-100 text-lg mb-8">
              Join students from 12+ countries who've transformed their academic performance with live, interactive tutoring.
            </p>
            
            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0">
                    <Icons.Check className="w-4 h-4 text-amber-900" />
                  </div>
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badge */}
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {['CO', 'JK', 'SM', 'AO'].map((initials, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm font-medium ring-2 ring-teal-600">
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-medium">Join 500+ students</p>
              <p className="text-teal-200 text-sm">who've improved their grades</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-semibold text-xl text-slate-900">
                EduTrack<span className="text-teal-600">Hub</span>
              </span>
            </Link>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
              <p className="text-slate-600">
                Already have an account?{' '}
                <Link href="/login" className="text-teal-600 hover:text-teal-700 font-semibold">
                  Sign in
                </Link>
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
                  Full name
                </label>
                <div className="relative">
                  <Icons.User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
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
                  Confirm password
                </label>
                <div className="relative">
                  <Icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Creating account...' : 'Create free account'}
                {!loading && <Icons.ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-teal-600 hover:underline">Terms</a> and{' '}
              <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
