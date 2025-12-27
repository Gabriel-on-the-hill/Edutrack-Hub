import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export default function Refund() {
    return (
        <>
            <Head>
                <title>Refund Policy - EduTrack Hub</title>
                <meta name="description" content="EduTrack Hub Refund Policy - Our guidelines for refunds and cancellations." />
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

                <main className="pt-28 pb-20">
                    <div className="max-w-3xl mx-auto px-5 lg:px-8">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Refund Policy</h1>
                        <p className="text-slate-500 mb-12">Last updated: December 2024</p>

                        <div className="prose prose-slate max-w-none space-y-8">
                            <section className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-teal-900 mb-2">Our Commitment</h2>
                                <p className="text-teal-800">
                                    We want you to be completely satisfied with your EduTrack Hub experience.
                                    If you're not happy, we'll make it right.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Free Trial Classes</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Your first class is free. No payment required, no refund needed.
                                    This allows you to experience our teaching style before committing.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Cancellation Before Class</h2>
                                <ul className="list-disc list-inside text-slate-600 space-y-2">
                                    <li><strong>24+ hours before:</strong> Full refund, no questions asked</li>
                                    <li><strong>12-24 hours before:</strong> 75% refund or credit for future class</li>
                                    <li><strong>Less than 12 hours:</strong> Credit for a future class (no cash refund)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Class Cancellation by EduTrack Hub</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    If we cancel a class for any reason, you will receive a full refund
                                    or can reschedule to another session at no additional cost.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Technical Issues</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    If you experience technical issues that prevent you from attending
                                    a significant portion of the class (more than 50%), you may request
                                    a credit for a future session. Please contact us within 24 hours of the class.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Satisfaction Guarantee</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    If you attend a paid class and feel it did not meet our quality standards,
                                    contact us within 48 hours. We'll review your feedback and may offer
                                    a full or partial refund at our discretion.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">6. How to Request a Refund</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    To request a refund:
                                </p>
                                <ol className="list-decimal list-inside text-slate-600 space-y-2">
                                    <li>Email us at <a href="mailto:support@edutrackhub.com" className="text-teal-600 hover:underline">support@edutrackhub.com</a></li>
                                    <li>Include your name, email, and class details</li>
                                    <li>Explain the reason for your refund request</li>
                                    <li>We'll respond within 24-48 hours</li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Refund Processing</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Approved refunds are processed within 5-7 business days via the original
                                    payment method. Bank processing times may add additional days.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Contact Us</h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Questions about our refund policy? Contact us at{' '}
                                    <a href="mailto:support@edutrackhub.com" className="text-teal-600 hover:underline">
                                        support@edutrackhub.com
                                    </a>
                                </p>
                            </section>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <Link href="/" className="text-teal-600 hover:text-teal-700 font-medium">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer minimal />
            </div>
        </>
    );
}
