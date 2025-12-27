import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Icons } from '@/components/ui/Icons';

const curriculumColors = {
  IGCSE: 'bg-blue-100 text-blue-700 border-blue-200',
  'A-Level': 'bg-purple-100 text-purple-700 border-purple-200',
  SAT: 'bg-amber-100 text-amber-700 border-amber-200',
  IB: 'bg-green-100 text-green-700 border-green-200',
  AP: 'bg-rose-100 text-rose-700 border-rose-200',
};

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/classes');
      const data = await res.json();
      setClasses(data.classes || []);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClasses = classes.filter((cls) => {
    const matchesFilter = filter === 'all' || cls.curriculum === filter;
    const matchesSearch = cls.title.toLowerCase().includes(search.toLowerCase()) ||
      cls.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const curricula = ['all', ...new Set(classes.map(c => c.curriculum))];

  return (
    <>
      <Head>
        <title>Browse Classes - EduTrack Hub</title>
        <meta name="description" content="Browse our live tutoring classes for IGCSE, A-Levels, SAT, IB, and AP. Small groups, expert tutors, real results." />
        <link rel="icon" href="/logo.png" type="image/png" />
      </Head>

      <div className="min-h-screen bg-slate-50">
        <Navigation />

        {/* Hero */}
        <section className="pt-28 pb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Find Your Perfect Class
              </h1>
              <p className="text-xl text-slate-300">
                Small group sessions with expert tutors. Join students from around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by subject or topic..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Curriculum Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                <Icons.Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
                {curricula.map((curriculum) => (
                  <button
                    key={curriculum}
                    onClick={() => setFilter(curriculum)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === curriculum
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                  >
                    {curriculum === 'all' ? 'All Programs' : curriculum}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Classes Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredClasses.length === 0 ? (
              <div className="text-center py-20">
                <Icons.BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">No classes found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => { setFilter('all'); setSearch(''); }}
                  className="text-teal-600 font-medium hover:text-teal-700"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <p className="text-slate-500 mb-6">{filteredClasses.length} classes available</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-transparent transition-all duration-300 group"
                    >
                      {/* Card Header */}
                      <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${curriculumColors[cls.curriculum] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                            {cls.curriculum}
                          </span>
                          {cls.spotsLeft <= 3 && cls.spotsLeft > 0 && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                              {cls.spotsLeft} spots left
                            </span>
                          )}
                        </div>

                        <Link href={`/class/${cls.id}`} className="block">
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                            {cls.title}
                          </h3>
                        </Link>
                        <p className="text-slate-500 text-sm">{cls.subject}</p>
                      </div>

                      {/* Card Details */}
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Icons.Calendar className="w-4 h-4 text-slate-400" />
                            <span>{cls.dayOfWeek}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Icons.Clock className="w-4 h-4 text-slate-400" />
                            <span>{cls.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Icons.Users className="w-4 h-4 text-slate-400" />
                            <span>{cls.enrolled}/{cls.maxStudents} enrolled</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Icons.Video className="w-4 h-4 text-slate-400" />
                            <span>Recording included</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-6 pt-4 space-y-3">
                        <Link
                          href={`/class/${cls.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 border-2 border-teal-500 text-teal-600 py-2.5 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300"
                        >
                          View Details
                        </Link>
                        <Link
                          href={`/signup?class=${cls.id}`}
                          className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all duration-300"
                        >
                          Enroll Now
                          <Icons.ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
          <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Don't see the class you need?
            </h2>
            <p className="text-teal-100 text-lg mb-8">
              Contact us and we'll help you find the perfect fit or create a new session.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-teal-700 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get in Touch
              <Icons.ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
