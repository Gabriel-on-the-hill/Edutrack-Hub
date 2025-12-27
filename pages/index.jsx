'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// ═══════════════════════════════════════════════════════════════════════════════
// EDUTRACK HUB - Homepage
// A reference-quality EdTech landing page
// ═══════════════════════════════════════════════════════════════════════════════

import { Icons } from '@/components/ui/Icons';
import LeadMagnet from '@/components/marketing/LeadMagnet';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

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

// Navigation logic removed (using global Navigation component)

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
              Mastery Hub: New Cohorts for All Levels
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Master the skills that{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-teal-600">shape your future.</span>
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
              From elementary foundations to professional mastery. Join a hub built to help you **crush your goals**, fix foundational gaps, and unleash your potential.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/classes"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
              >
                Find Your Class
                <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 text-slate-700 hover:text-teal-600 px-6 py-4 font-semibold transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-teal-50 transition-colors">
                  <Icons.Play className="w-4 h-4 ml-0.5" />
                </span>
                See Gabriel in Action
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
                <span>Students from 12+ countries</span>
              </div>
              <div className="flex items-center gap-1">
                <Icons.Star className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-700">4.9/5</span>
                <span>Average Rating</span>
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
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Icons.Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white/80 text-sm font-medium">Preview a Live Session</p>
                  </div>
                </div>
                {/* Live indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE RECORDING
                </div>
              </div>

              {/* Class Info */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">IGCSE Mathematics</h3>
                    <p className="text-sm text-slate-500">Quadratic Equations Mastery</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Icons.Users className="w-4 h-4" />
                    Small Group (Max 8)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icons.Check className="w-4 h-4 text-green-500" />
                    Interactive Whiteboard
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
                  <p className="text-xs text-slate-500">Grade Improvement</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Icons.Star className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">"Finally, I understand math!"</p>
                  <p className="text-xs text-slate-500">— Student Review</p>
                </div>
              </div>
            </div>
          </div>
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
      text: "feel like you're learning but can't apply the concepts practically",
      emoji: "😰"
    },
    {
      text: "hit a plateau in your professional or academic growth",
      emoji: "😶"
    },
    {
      text: "wish there was a clear roadmap from foundation to mastery",
      emoji: "🤐"
    },
    {
      text: "believe you've reached your limit (spoiler: you're just getting started)",
      emoji: "😔"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Sound familiar?
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
                It's not about the "A".
                <br />
                <span className="text-teal-100">It's about the growth that gets you there.</span>
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
      title: "Find Your Class",
      description: "Browse our schedule for IGCSE, SAT, or A-Level sessions. Filter by subject and finding a time that fits.",
      icon: Icons.Calendar,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "02",
      title: "Join the Live Session",
      description: "Log in and connect via Google Meet. It's interactive—ask questions, solve problems, and get instant feedback.",
      icon: Icons.Users,
      color: "from-teal-500 to-teal-600"
    },
    {
      number: "03",
      title: "Master the Topic",
      description: "Get the recording and notes immediately after class. Review until it clicks. See your grades transform.",
      icon: Icons.TrendingUp,
      color: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-600 font-semibold mb-3">Simple Process</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            From confused to confident
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
                <span className="absolute -top-4 -left-2 text-6xl font-bold text-slate-100 group-hover:text-teal-50 transition-colors select-none">
                  {step.number}
                </span>

                <div className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

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

// Learning Hubs Section
const LearningHubs = () => {
  const [ref, isInView] = useInView();

  const hubs = [
    {
      title: "Foundation Hub",
      subtitle: "Elementary & Middle",
      description: "Building the core logic and study habits that make future complex topics effortless.",
      icon: Icons.HeroBlob, // Placeholder or specific icon
      color: "bg-blue-50 text-blue-700",
      link: "/hubs/foundation"
    },
    {
      title: "Success Hub",
      subtitle: "High School & SAT",
      description: "Strategic prep for IGCSE, SAT, and A-Levels. Turn exam anxiety into exam mastery.",
      icon: Icons.Star,
      color: "bg-teal-50 text-teal-700",
      link: "/hubs/success"
    },
    {
      title: "Elite Hub",
      subtitle: "Professional Mastery",
      description: "Advanced up-skilling and mentorship for professionals looking to dominate their field.",
      icon: Icons.TrendingUp,
      color: "bg-purple-50 text-purple-700",
      link: "/hubs/elite"
    },
    {
      title: "Partner Hub",
      subtitle: "Parents & Educators",
      description: "Resources and coordination tools to support the students in your care.",
      icon: Icons.Users,
      color: "bg-amber-50 text-amber-700",
      link: "/hubs/partner"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-600 font-semibold mb-3">Choose Your Path</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            A Hub built to help you crush your goals
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, i) => (
            <Link key={i} href={hub.link}>
              <div
                className={`group h-full p-8 rounded-3xl border border-slate-100 transition-all duration-500 hover:shadow-xl hover:border-transparent cursor-pointer ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-2xl ${hub.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {/* Icon component or dynamic svg */}
                  <span className="text-2xl font-bold">{hub.title[0]}</span>
                </div>
                <p className="text-sm font-bold tracking-wider uppercase opacity-60 mb-2">{hub.subtitle}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{hub.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {hub.description}
                </p>
                <span className="text-teal-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Enter Hub →
                </span>
              </div>
            </Link>
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
    { name: "IGCSE", description: "Cambridge International", subjects: ["Mathematics (0580)", "Physics (0625)", "Chemistry", "Add Maths"] },
    { name: "SAT Prep", description: "Score 1500+ Guaranteed", subjects: ["Math (No Calc)", "Math (Calc)", "Reading Strategy", "Writing & Language"] },
    { name: "A-Levels", description: "Advanced Mastery", subjects: ["Pure Math 1-3", "Mechanics", "Probability & Stats", "Physics"] },
    { name: "IB Diploma", description: "Standard & Higher Level", subjects: ["Math AA/AI", "Physics HL", "Chemistry HL"] },
    { name: "AP", description: "College Credit", subjects: ["Calculus AB/BC", "Physics C", "Statistics"] },
  ];

  return (
    <section id="programs" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-400 font-semibold mb-3">Programs</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Expertise in every major curriculum
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
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="/classes"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Explore All Classes
            <Icons.ArrowRight className="w-5 h-5" />
          </a>
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
      quote: "Gabriel explains things in a way my school teachers never did. I jumped from a C to an A in Physics in just 3 months.",
      name: "Chiamaka O.",
      location: "Lagos",
      detail: "IGCSE Physics",
      image: "CO"
    },
    {
      quote: "The SAT Math strategies were a game changer. I stopped running out of time and my score went up by 150 points.",
      name: "Tariq A.",
      location: "Dubai",
      detail: "SAT Math",
      image: "TA"
    },
    {
      quote: "Small group classes are the best. It's affordable but feels like 1-on-1 tutoring because Gabriel answers every question.",
      name: "Sarah J.",
      location: "London",
      detail: "A-Level Maths",
      image: "SJ"
    }
  ];

  return (
    <section id="results" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div ref={ref} className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-teal-600 font-semibold mb-3">Proven Results</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Real Students. Real Grades.
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
      </div>
    </section>
  );
};

// Final CTA
const FinalCTA = () => {
  return (
    <section className="py-24 bg-teal-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <Icons.HeroBlob />
      </div>
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your grades?</h2>
        <p className="text-teal-100 text-xl mb-10 max-w-2xl mx-auto">
          Join the next cohort of high-achievers. Spaces are limited for live sessions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/classes" className="bg-white text-teal-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 hover:scale-105 transition-all shadow-lg">
            Find Your Class
          </a>
        </div>
      </div>
    </section>
  )
}

// Latest from the Blog
const LatestPosts = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-teal-600 font-semibold mb-3">Academic Excellence</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Latest Study Insights</h2>
          </div>
          <Link href="/blog" className="text-teal-600 font-bold hover:underline flex items-center gap-2">
            View all articles <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="h-full bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:bg-white hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col">
                <div className="flex gap-2 mb-4">
                  {post.meta.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors mb-3 line-clamp-2">
                  {post.meta.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3">
                  {post.meta.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                  <span className="text-xs font-medium text-slate-400">{post.meta.date}</span>
                  <span className="text-sm font-bold text-teal-600">Read More →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>EduTrack Hub | Expert Math & Science Tutoring</title>
        <meta name="description" content="Master IGCSE, SAT, and A-Level Math & Science with Gabriel. Small group tutoring that delivers results." />
        <link rel="icon" href="/logo.png" type="image/png" />
      </Head>

      <style jsx global>{`
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float 6s ease-in-out 3s infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      <div className="bg-slate-50 min-h-screen">
        <Navigation transparent />
        <Hero />
        <ForStudentsWho />
        <HowItWorks />
        <LearningHubs />
        <LeadMagnet />
        <Programs />
        <Testimonials />
        <LatestPosts posts={posts} />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts: posts.map(p => ({
        slug: p.slug,
        meta: p.meta
      }))
    }
  }
}
