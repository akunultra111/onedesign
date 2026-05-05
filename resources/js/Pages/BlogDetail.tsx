import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

interface Article {
    id: number;
    title: string;
    category: string;
    image_url: string;
    content: string;
    read_time: string;
    created_at: string;
}

interface Props {
    article: Article;
}

export default function BlogDetail({ article }: Props) {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white">
            <Head title={`${article.title} - Onedesign`} />
            <Navbar />

            {/* Ambient Background yang Nge-blend */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

            <main className="pt-32 pb-32 relative z-10">
                {/* Hero Section Artikel */}
                <header className="max-w-5xl mx-auto px-6 mb-16 text-center">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white font-bold text-xs uppercase tracking-[0.2em] mb-12 transition-colors">
                        <span>←</span> KEMBALI KE JURNAL
                    </Link>
                    
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <span className="bg-white/10 px-4 py-1.5 rounded-full text-white text-[10px] font-black tracking-[0.3em] uppercase border border-white/20">
                            {article.category}
                        </span>
                        <span className="text-white/50 font-bold text-[10px] tracking-widest uppercase">
                            {article.read_time}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] max-w-4xl mx-auto text-white drop-shadow-2xl">
                        {article.title}
                    </h1>

                    <p className="text-white/50 font-bold text-[10px] tracking-[0.3em] uppercase">
                        DITERBITKAN PADA {formatDate(article.created_at)}
                    </p>
                </header>

                {/* Cover Image */}
                <div className="max-w-7xl mx-auto px-6 mb-20">
                    <div className="w-full h-[400px] md:h-[600px] rounded-[40px] overflow-hidden border border-white/10 relative shadow-2xl">
                        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
                        <img 
                            src={article.image_url} 
                            alt={article.title} 
                            className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-[2s]"
                        />
                    </div>
                </div>

                {/* Konten Artikel */}
                <article className="max-w-3xl mx-auto px-6">
                    <div className="prose prose-invert prose-lg prose-p:leading-relaxed prose-p:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white max-w-none font-medium">
                        <p className="text-2xl leading-normal text-white font-bold mb-10">
                            {article.content}
                        </p>
                        
                        <p>
                            Dalam era digital yang terus berkembang, antarmuka pengguna (UI) tidak lagi hanya tentang menyusun tombol dan teks di layar datar. Kita telah memasuki era <strong>Spatial Design</strong>, di mana kedalaman, bayangan, dan transparansi berpadu untuk menciptakan ilusi ruang tiga dimensi di atas kanvas dua dimensi.
                        </p>
                        
                        <h2 className="text-white">Mendefinisikan Ulang Batasan Kanvas</h2>
                        <p>
                            Pendekatan tradisional sering kali membatasi kreativitas kita dalam kotak-kotak kaku. Namun, dengan prinsip desain Bento Grid yang kita terapkan, informasi tidak hanya disajikan, tetapi <em>dipamerkan</em>. Penggunaan efek <em>Glassmorphism</em> yang presisi memberikan hierarki visual yang jelas tanpa membuat tampilan terasa penuh sesak.
                        </p>

                        <blockquote className="border-l-4 border-purple-500 pl-6 my-8 italic text-white/80">
                            "Desain yang baik tidak hanya terlihat indah, tetapi juga terasa intuitif secara spasial."
                        </blockquote>

                        <p>
                            Kontras tinggi adalah kunci. Memastikan semua elemen berpadu harmonis tanpa mengorbankan keterbacaan memberikan kesan premium yang sulit ditandingi oleh desain mode terang konvensional.
                        </p>
                    </div>

                    <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                                O
                            </div>
                            <div>
                                <h4 className="font-black tracking-tight text-lg text-white">Onedesign Team</h4>
                                <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Editorial</p>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-white/5 border border-white/20 rounded-full font-black text-[10px] text-white uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                            Bagikan Artikel
                        </button>
                    </div>
                </article>
            </main>
        </div>
    );
}