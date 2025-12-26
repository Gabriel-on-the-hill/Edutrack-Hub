'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// ═══════════════════════════════════════════════════════════════════════════════
// EDUTRACK HUB - Homepage
// A reference-quality EdTech landing page
// ═══════════════════════════════════════════════════════════════════════════════

// Custom SVG Icons
const Icons = {
  // Decorative gradient blob for hero
  HeroBlob: () => (
    <svg viewBox="0 0 800 800" className="absolute -z-10 opacity-30">
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="50%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <path
        fill="url(#blobGradient)"
        d="M421.5,283.5Q367,317,383.5,388Q400,459,329,474.5Q258,490,209,445Q160,400,160,350Q160,300,183,237.5Q206,175,283,175Q360,175,413.5,212.5Q467,250,421.5,283.5Z"
        transform="translate(100 100)"
      />
    </svg>
  ),

  // Play button for video/interaction
  Play: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
    </svg>
  ),

  // Arrow right for CTAs
  ArrowRight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),

  // Check mark for benefits
  Check: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),

  // Star for ratings
  Star: ({ className, filled = true }) => (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),

  // Quote mark for testimonials
  Quote: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  ),

  // Users/Group icon
  Users: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),

  // Video/Recording icon
  Video: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),

  // Calendar/Schedule icon
  Calendar: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),

  // Globe for international
  Globe: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),

  // Lightbulb for understanding
  Lightbulb: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),

  // Trending up for results
  TrendingUp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),

  // Message/Chat for support
  MessageCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),

  // Menu for mobile
  Menu: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),

  // X for close
  X: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),

  // Academic cap
  GraduationCap: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),

  // Heart for passion
  Heart: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),

  // Instagram
  Instagram: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),

  // Twitter/X
  Twitter: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),

  // LinkedIn
  LinkedIn: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),

  // WhatsApp
  WhatsApp: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 transition-shadow">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className={`font-semibold text-xl tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              EduTrack<span className="text-teal-600">Hub</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              How It Works
            </a>
            <a href="#programs" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Programs
            </a>
            <a href="#results" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Results
            </a>
            <a href="#about" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              About
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#start"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
            >
              Start Free Trial
              <Icons.ArrowRight className="w-4 h-4" />
            </a>
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
            <a href="#how-it-works" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              How It Works
            </a>
            <a href="#programs" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              Programs
            </a>
            <a href="#results" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              Results
            </a>
            <a href="#about" className="block text-slate-700 hover:text-teal-600 font-medium py-2">
              About
            </a>
            <a
              href="#start"
              className="block text-center bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-full font-semibold mt-4"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const [ref, isInView] = useInView();

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] -translate-y-1/4 translate-x-1/4">
          <Icons.HeroBlob />
        </div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] translate-y-1/4 -translate-x-1/4 opacity-50">
          <Icons.HeroBlob />
        </div>
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Live classes starting this week
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Finally understand the subjects that used to{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-teal-600">terrify you</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path
                    d="M0 9 Q 50 0, 100 9 T 200 9"
                    fill="none"
                    stroke="#14B8A6"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-40"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
              Small group tutoring that actually makes sense. Real teachers, real breakthroughs, 
              real results—whether you're in Lagos, London, or Los Angeles.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#start"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
              >
                Try a Free Class
                <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 text-slate-700 hover:text-teal-600 px-6 py-4 font-semibold transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                  <Icons.Play className="w-4 h-4 ml-0.5" />
                </span>
                See How It Works
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['🇳🇬', '🇬🇧', '🇦🇪', '🇺🇸', '🇨🇦'].map((flag, i) => (
                    <span key={i} className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-sm ring-2 ring-white">
                      {flag}
                    </span>
                  ))}
                </div>
                <span>Students in 12+ countries</span>
              </div>
              <div className="flex items-center gap-1">
                <Icons.Star className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-700">4.9</span>
                <span>from 200+ reviews</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Main Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-900/10 p-6 lg:p-8">
              {/* Video Preview Mockup */}
              <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden">
                {/* Decorative elements simulating a class */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shadow-lg">
                      <Icons.Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white/80 text-sm font-medium">Watch a sample class</p>
                  </div>
                </div>
                {/* Participant indicators */}
                <div className="absolute bottom-4 left-4 flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 ring-2 ring-slate-800 flex items-center justify-center text-white text-xs font-medium"
                    >
                      {['AO', 'JK', 'SM', 'EB'][i - 1]}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-teal-500 ring-2 ring-slate-800 flex items-center justify-center text-white text-xs font-medium">
                    +4
                  </div>
                </div>
                {/* Live indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE CLASS
                </div>
              </div>

              {/* Class Info */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">IGCSE Mathematics</h3>
                    <p className="text-sm text-slate-500">Quadratic Equations Mastery</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-teal-600">Next class</p>
                    <p className="text-sm text-slate-500">Tomorrow, 4PM WAT</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Icons.Users className="w-4 h-4" />
                    6/8 spots
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icons.Video className="w-4 h-4" />
                    Recording included
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Icons.TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">94%</p>
                  <p className="text-xs text-slate-500">Grade improvement</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Icons.Star className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">"Best tutor ever!"</p>
                  <p className="text-xs text-slate-500">— Oluwaseun A.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-slate-400 rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

// "For Students Who..." Section - Empathy-driven
const ForStudentsWho = () => {
  const [ref, isInView] = useInView();

  const struggles = [
    {
      text: "watch tutorials but still can't solve problems on your own",
      emoji: "😰"
    },
    {
      text: "understand it in class but blank out during exams",
      emoji: "😶"
    },
    {
      text: "feel too embarrassed to ask questions",
      emoji: "🤐"
    },
    {
      text: "have been told you're 'just not a math person'",
      emoji: "😔"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            This is for you if you...
          </h2>
          
          <div className="mt-12 space-y-4">
            {struggles.map((item, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl px-6 py-5 shadow-sm border border-slate-100 text-left flex items-center gap-4 transition-all duration-500 hover:shadow-md hover:border-teal-100 hover:-translate-y-0.5`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-lg text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
            <div className="relative z-10">
              <p className="text-2xl sm:text-3xl font-semibold leading-snug">
                You're not bad at these subjects.
                <br />
                <span className="text-teal-100">You just haven't had them explained <em>your</em> way yet.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works
const HowItWorks = () => {
  const [ref, isInView] = useInView();

  const steps = [
    {
      number: "01",
      title: "Book Your Free Trial",
      description: "Pick your subject and a time that works for you. No payment needed, no commitment required.",
      icon: Icons.Calendar,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02",
      title: "Join a Small Group",
      description: "Connect via Google Meet with 3-7 other students. Small enough to ask questions, big enough to learn together.",
      icon: Icons.Users,
      color: "from-teal-500 to-teal-600"
    },
    {
      number: "03",
      title: "Experience Real Learning",
      description: "Watch concepts finally click. Get the recording to review anytime. Feel the difference real teaching makes.",
      icon: Icons.Lightbulb,
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-600 font-semibold mb-3">Simple Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            From confused to confident<br />in three steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-slate-200 to-transparent -translate-x-8 z-0" />
              )}

              <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-transparent transition-all duration-300 group">
                {/* Number */}
                <span className="absolute -top-4 -left-2 text-6xl font-bold text-slate-100 group-hover:text-teal-50 transition-colors select-none">
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Programs Section
const Programs = () => {
  const [ref, isInView] = useInView();

  const programs = [
    { name: "IGCSE", description: "Cambridge International", subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Economics"] },
    { name: "A-Levels", description: "Advanced Level", subjects: ["Mathematics", "Further Maths", "Physics", "Chemistry", "Economics"] },
    { name: "SAT", description: "College Admission", subjects: ["Math Section", "Reading & Writing", "Full Prep Program"] },
    { name: "IB", description: "International Baccalaureate", subjects: ["Mathematics AA/AI", "Physics", "Chemistry", "Economics"] },
    { name: "AP", description: "Advanced Placement", subjects: ["Calculus AB/BC", "Physics", "Chemistry", "Statistics"] },
  ];

  return (
    <section id="programs" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-400 font-semibold mb-3">Programs</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            World-class curricula,<br />personalized approach
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {programs.map((program, i) => (
            <div
              key={i}
              className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-teal-500/30 transition-all duration-300 cursor-pointer ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="text-2xl font-bold text-white mb-1">{program.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{program.description}</p>
              <ul className="space-y-2">
                {program.subjects.slice(0, 3).map((subject, j) => (
                  <li key={j} className="text-sm text-slate-300 flex items-center gap-2">
                    <Icons.Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                    {subject}
                  </li>
                ))}
                {program.subjects.length > 3 && (
                  <li className="text-sm text-teal-400">+{program.subjects.length - 3} more</li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Highlight Features */}
        <div className={`mt-16 grid sm:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: Icons.Users, text: "Max 8 students per class" },
            { icon: Icons.Video, text: "Every session recorded" },
            { icon: Icons.Globe, text: "Any timezone, anywhere" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center justify-center gap-3 text-slate-300">
              <feature.icon className="w-5 h-5 text-teal-400" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials/Transformation Stories
const Testimonials = () => {
  const [ref, isInView] = useInView();

  const stories = [
    {
      quote: "I went from dreading every math class to actually looking forward to them. My predicted grade jumped from a 4 to an 8 in four months.",
      name: "Chiamaka O.",
      location: "Lagos, Nigeria",
      detail: "IGCSE Mathematics",
      image: "CO"
    },
    {
      quote: "The small group size made all the difference. I could finally ask questions without feeling stupid. My SAT score improved by 180 points.",
      name: "James K.",
      location: "Dubai, UAE",
      detail: "SAT Math",
      image: "JK"
    },
    {
      quote: "For the first time, physics actually makes sense. I wish I'd found EduTrack Hub years ago. My teacher even noticed the improvement.",
      name: "Sophia M.",
      location: "London, UK",
      detail: "A-Level Physics",
      image: "SM"
    }
  ];

  return (
    <section id="results" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-600 font-semibold mb-3">Transformation Stories</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Real students, real breakthroughs
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className={`bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-transparent transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <Icons.Quote className="w-10 h-10 text-teal-100 mb-4" />
              <p className="text-slate-700 leading-relaxed text-lg mb-6">"{story.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white font-semibold">
                  {story.image}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{story.name}</p>
                  <p className="text-sm text-slate-500">{story.location}</p>
                  <p className="text-xs text-teal-600 font-medium mt-0.5">{story.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { number: "94%", label: "Average grade improvement" },
            { number: "12+", label: "Countries represented" },
            { number: "4.9", label: "Average rating" },
            { number: "200+", label: "Success stories" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl lg:text-5xl font-bold text-teal-600">{stat.number}</p>
              <p className="text-slate-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Meet Your Tutor
const MeetTutor = () => {
  const [ref, isInView] = useInView();

  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Image/Visual Side */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl aspect-[4/5] overflow-hidden">
              {/* Placeholder for tutor image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/90">
                  <div className="w-32 h-32 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                    <Icons.GraduationCap className="w-16 h-16" />
                  </div>
                  <p className="text-lg font-medium">Your Tutor</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <p className="text-white text-sm font-medium">5+ years teaching</p>
              </div>
            </div>

            {/* Floating credential cards */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Icons.GraduationCap className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">B.Eng Mechanical Engineering</p>
                  <p className="text-xs text-slate-500">Curriculum Design Specialist</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <p className="text-teal-600 font-semibold">Meet Your Tutor</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              A teacher who actually remembers what it's like to struggle
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I've been where your child is now—staring at a problem, feeling completely lost, 
                wondering if everyone else just "gets it" naturally. Spoiler: they don't.
              </p>
              <p>
                With a background in engineering and years of specialized tutoring experience, 
                I've developed methods that work because they start with understanding <em>how</em> 
                each student thinks, not just what they need to know.
              </p>
              <p>
                This isn't about shortcuts or tricks. It's about building real understanding 
                that lasts beyond exam day. Every concept connects to something real. Every 
                question is welcome. Every student matters.
              </p>
            </div>

            {/* Teaching Philosophy */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {[
                { icon: Icons.Heart, text: "Patient & encouraging" },
                { icon: Icons.Lightbulb, text: "Concept-first approach" },
                { icon: Icons.MessageCircle, text: "Always available for questions" },
                { icon: Icons.TrendingUp, text: "Results-driven" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// What Makes This Different
const WhatMakesUsDifferent = () => {
  const [ref, isInView] = useInView();

  const differences = [
    {
      title: "Small groups, big attention",
      description: "Max 8 students means you're never invisible. Every question gets answered, every student gets seen.",
      icon: Icons.Users
    },
    {
      title: "Every class recorded",
      description: "Missed something? Review it. Didn't fully get it? Watch it again. Your classes live forever.",
      icon: Icons.Video
    },
    {
      title: "Real understanding, not memorization",
      description: "We teach concepts, not just procedures. When you understand the 'why,' you can solve anything.",
      icon: Icons.Lightbulb
    },
    {
      title: "Global community, local feel",
      description: "Learn alongside students from Lagos, London, Dubai, and beyond—all feeling like neighbors.",
      icon: Icons.Globe
    }
  ];

  return (
    <section className="py-24 bg-teal-50/50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-600 font-semibold mb-3">The EduTrack Difference</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Not another tutoring platform
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {differences.map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-transparent transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/25">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTA = () => {
  const [ref, isInView] = useInView();

  return (
    <section id="start" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(20, 184, 166, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(249, 115, 22, 0.2) 0%, transparent 40%)`
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-5 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Your first class is free.
            <br />
            <span className="text-teal-400">Your future is priceless.</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            No payment required. No commitment needed. Just one class to see why 
            students across 12 countries trust EduTrack Hub for their academic breakthroughs.
          </p>

          <a
            href="https://forms.google.com/your-form-link"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-5 rounded-full font-semibold text-xl shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
          >
            Book Your Free Trial Now
            <Icons.ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="mt-8 text-slate-400 text-sm flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-teal-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-teal-400" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Icons.Check className="w-4 h-4 text-teal-400" />
              Response within 24 hours
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-semibold text-xl text-white tracking-tight">
                EduTrack<span className="text-teal-400">Hub</span>
              </span>
            </a>
            <p className="text-slate-400 leading-relaxed max-w-md mb-6">
              Live online tutoring that transforms struggling students into confident learners. 
              Small groups, real understanding, global community.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors">
                <Icons.Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors">
                <Icons.Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors">
                <Icons.LinkedIn className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-teal-600 flex items-center justify-center transition-colors">
                <Icons.WhatsApp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4">Programs</h4>
            <ul className="space-y-3">
              {['IGCSE Tutoring', 'A-Levels Prep', 'SAT Preparation', 'IB Support', 'AP Classes'].map((item) => (
                <li key={item}>
                  <a href="#programs" className="hover:text-teal-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'Success Stories', href: '#results' },
                { name: 'About', href: '#about' },
                { name: 'Contact', href: 'mailto:hello@edutrackub.com' },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-teal-400 transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} EduTrack Hub. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function HomePage() {
  return (
    <>
      <Head>
        <title>EduTrack Hub | Live Online Tutoring That Actually Works</title>
        <meta name="description" content="Small group tutoring for IGCSE, A-Levels, SAT, IB, and AP. Real teachers, real breakthroughs. Students in 12+ countries. Try your first class free." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(8px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        /* Custom selection color */
        ::selection {
          background-color: rgba(20, 184, 166, 0.2);
        }
      `}</style>

      <main className="bg-white min-h-screen antialiased">
        <Navigation />
        <Hero />
        <ForStudentsWho />
        <HowItWorks />
        <Programs />
        <Testimonials />
        <MeetTutor />
        <WhatMakesUsDifferent />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
