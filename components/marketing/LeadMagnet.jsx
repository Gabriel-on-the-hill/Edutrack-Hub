import { useState } from 'react';
import { Icons } from '../ui/Icons';

export default function LeadMagnet() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, source: 'homepage-section' })
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
                setName('');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section className="py-20 bg-teal-900 overflow-hidden relative">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-20">
                <Icons.HeroBlob />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Get the "SAT Master Cheat Sheet" Free
                </h2>
                <p className="text-teal-100 mb-8 max-w-xl mx-auto text-lg">
                    Download the exact formula sheet Gabriel's students use to score 1500+.
                    Includes critical geometry formulas, grammar rules, and pacing strategies.
                </p>

                {status === 'success' ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-teal-500/30 animate-in fade-in zoom-in">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icons.Check className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Check your inbox!</h3>
                        <p className="text-teal-100">We just sent the PDF to your email.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-2 md:p-3 flex flex-col md:flex-row gap-3 max-w-2xl mx-auto shadow-2xl">
                        <input
                            type="text"
                            placeholder="First Name"
                            required
                            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            className="flex-[1.5] px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button
                            disabled={status === 'loading'}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Me The PDF'}
                        </button>
                    </form>
                )}

                {status === 'error' && (
                    <p className="text-red-300 mt-4 text-sm">Something went wrong. Please try again.</p>
                )}

                <p className="text-teal-400/60 text-xs mt-6">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </section>
    );
}
