import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

interface Article {
    id: number;
    title: string;
    category: string;
    image_url: string;
    bento_class: string;
    slug: string; // Tambahan properti slug
    created_at: string;
}

interface Props {
    articles: Article[];
}

export default function Blog({ articles }: Props) {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">
            <Head title="Blog - Onedesign" />
            <Navbar />

            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>

            <main className="max-w-7xl mx-auto pt-32 pb-20 px-6 relative z-10">
                <div className="mb-20 text-center">
                    <h1 className="text-7xl font-black tracking-tighter mb-6 text-white uppercase drop-shadow-2xl">
                        Design Journal
                    </h1>
                    <p className="text-white font-bold text-sm tracking-[0.2em] uppercase opacity-80">
                        Eksplorasi Tren, Tutorial, dan Inovasi UI/UX 2026.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
                    {articles.map((article) => (
                        <Link 
                            href={`/blog/${article.slug}`} 
                            key={article.id} 
                            className={`group relative rounded-[32px] overflow-hidden border border-white/20 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:scale-[1.02] hover:border-white/40 cursor-pointer block ${article.bento_class}`}
                        >
                            <img 
                                src={article.image_url} 
                                alt={article.title} 
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent mix-blend-multiply"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col justify-end h-full z-10">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-[10px] font-black tracking-[0.3em] uppercase border border-white/20 shadow-xl">
                                        {article.category}
                                    </span>
                                    <span className="text-white font-bold text-[10px] tracking-widest uppercase opacity-80">
                                        {formatDate(article.created_at)}
                                    </span>
                                </div>
                                <h3 className="text-white text-3xl font-black leading-tight tracking-tighter drop-shadow-2xl group-hover:text-purple-400 transition-colors">
                                    {article.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}