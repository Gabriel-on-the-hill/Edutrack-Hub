import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth, withAuth } from '../../hooks/useAuth';

function AdminClasses() {
  const { user, logout } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    level: 'BEGINNER',
    scheduledTime: '',
    duration: 60,
    maxStudents: 10,
    price: 0,
    meetUrl: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await fetch('/api/classes');
      if (res.ok) {
        const data = await res.json();
        setClasses(data.classes || []);
      }
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      level: 'BEGINNER',
      scheduledTime: '',
      duration: 60,
      maxStudents: 10,
      price: 0,
      meetUrl: '',
    });
    setEditingClass(null);
    setFormError('');
  };

  const handleCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setFormData({
      title: cls.title,
      description: cls.description || '',
      subject: cls.subject,
      level: cls.level,
      scheduledTime: new Date(cls.scheduledTime).toISOString().slice(0, 16),
      duration: cls.duration,
      maxStudents: cls.maxStudents,
      price: cls.price / 100, // Convert from kobo for display
      meetUrl: cls.meetUrl || '',
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        price: Math.round(formData.price * 100), // Convert to kobo
        scheduledTime: new Date(formData.scheduledTime).toISOString(),
      };

      const url = editingClass ? `/api/classes/${editingClass.id}` : '/api/classes';
      const method = editingClass ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save class');
      }

      setShowForm(false);
      resetForm();
      fetchClasses();
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cls) => {
    if (!confirm(`Are you sure you want to delete "${cls.title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/classes/${cls.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchClasses();
      }
    } catch (error) {
      console.error('Delete failed:', error);
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

  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `$${(price / 100).toLocaleString()}`;
  };

  return (
    <>
      <Head>
        <title>Manage Classes - EduTrack Hub</title>
      </Head>

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md flex flex-col">
          <div className="p-6 border-b">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="EduTrack Hub" className="h-8" />
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/admin/classes"
              className="flex items-center gap-3 px-4 py-3 bg-primary-50 text-primary-600 rounded-lg font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Classes
            </Link>
          </nav>

          <div className="p-4 border-t">
            <div className="px-4 py-2 mb-2">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
            >
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
              <p className="text-gray-600 mt-1">Create and manage your tutoring classes</p>
            </div>
            <button
              onClick={handleCreate}
              className="btn btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Class
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
          ) : classes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No classes yet</h3>
              <p className="text-gray-600 mb-6">Create your first class to get started</p>
              <button onClick={handleCreate} className="btn btn-primary">
                Create Class
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Class</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Schedule</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Enrolled</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {classes.map((cls) => (
                    <tr key={cls.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{cls.title}</p>
                          <p className="text-sm text-gray-500">{cls.subject} • {cls.level}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{formatDate(cls.scheduledTime)}</p>
                        <p className="text-sm text-gray-500">{cls.duration} min</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{formatPrice(cls.price)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900">{cls.enrolledCount || 0}</span>
                        <span className="text-gray-500"> / {cls.maxStudents}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          cls.status === 'SCHEDULED' ? 'bg-blue-100 text-blue-700' :
                          cls.status === 'LIVE' ? 'bg-green-100 text-green-700' :
                          cls.status === 'COMPLETED' ? 'bg-gray-100 text-gray-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {cls.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEdit(cls)}
                          className="text-primary-600 hover:text-primary-700 font-medium mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cls)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingClass ? 'Edit Class' : 'Create New Class'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg">{formError}</div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., IGCSE Math - Algebra Basics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="What will students learn?"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., IGCSE Math"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level *</label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
                  <input
                    type="datetime-local"
                    name="scheduledTime"
                    value={formData.scheduledTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes) *</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    min={15}
                    max={240}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Students *</label>
                  <input
                    type="number"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    required
                    min={1}
                    max={100}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min={0}
                    step={100}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0 for free class"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Meet URL (optional)</label>
                <input
                  type="url"
                  name="meetUrl"
                  value={formData.meetUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingClass ? 'Update Class' : 'Create Class'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default withAuth(AdminClasses, { requireAdmin: true });
