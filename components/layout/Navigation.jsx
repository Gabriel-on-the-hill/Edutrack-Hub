import { useState, useEffect } from 'react';
import Link from 'next/link';

// Icons
const Icons = {
  Menu: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
};

export default function Navigation({ transparent = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showBackground = !transparent || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBackground
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 transition-shadow">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-semibold text-xl tracking-tight text-slate-900">
              EduTrack<span className="text-teal-600">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#how-it-works" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              How It Works
            </Link>
            <Link href="/#programs" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Programs
            </Link>
            <Link href="/classes" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Classes
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
            >
              Start Free
              <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <Icons.X className="w-6 h-6" />
            ) : (
              <Icons.Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
            <Link href="/#how-it-works" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              How It Works
            </Link>
            <Link href="/#programs" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              Programs
            </Link>
            <Link href="/classes" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              Classes
            </Link>
            <Link href="/contact" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              Contact
            </Link>
            <hr className="border-slate-100" />
            <Link href="/login" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-full font-semibold mt-4"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
