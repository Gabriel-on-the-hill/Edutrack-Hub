import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/layout/Navigation';
import Footer from '../../components/layout/Footer';
import { getAllPosts } from '../../lib/mdx';

export default function BlogIndex({ posts }) {
    return (
        <>
            <Head>
                <title>Study Tips & Resources | EduTrack Hub Blog</title>
                <meta name="description" content="Expert SAT/ACT prep advice, study strategies, and educational resources." />
            </Head>
            <Navbar />
            <div className="min-h-screen bg-slate-50 pt-32 pb-12">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Latest Insights</h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Strategies, guides, and updates from the EduTrack team to help you succeed.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {posts.map(post => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                                <article className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 group-hover:-translate-y-1 duration-300">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                                        <h2 className="text-2xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                                            {post.meta.title}
                                        </h2>
                                        <span className="text-sm font-medium text-slate-400 whitespace-nowrap">{post.meta.date}</span>
                                    </div>
                                    <p className="text-slate-600 mb-6 line-clamp-2 text-lg">{post.meta.description}</p>
                                    <div className="flex gap-2">
                                        {post.meta.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold tracking-wide bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-100">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getStaticProps() {
    const posts = getAllPosts();
    return { props: { posts } };
}
