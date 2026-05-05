import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

// Interface untuk menangkap status auth dari Laravel/Inertia
interface Props {
    auth: {
        user: any;
    };
}

export default function Landing({ auth }: Props) {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative selection:bg-white selection:text-black">
            <Head title="Onedesign Standard" />
            <Navbar />

            {/* Ambient Spatial Backgrounds */}
            <div className="fixed top-0 left-1/4 w-[50vw] h-[50vw] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="fixed bottom-0 right-1/4 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

            <main className="max-w-[1400px] mx-auto pt-40 pb-32 px-6 relative z-10">
                
                {/* --- HERO SECTION --- */}
                <div className="flex flex-col items-center text-center mb-24 mt-10">
                    <div className="border border-white/20 bg-transparent backdrop-blur-xl px-6 py-2 rounded-full mb-8 shadow-2xl">
                        <span className="text-white font-black tracking-[0.3em] uppercase text-xs">
                            ONEDESIGN V2.0
                        </span>
                    </div>
                    
                    <h1 className="text-7xl md:text-[160px] font-black tracking-tighter mb-6 leading-[0.85] text-white drop-shadow-2xl">
                        STANDARD.
                    </h1>
                    
                    <p className="text-white text-lg md:text-xl font-bold max-w-2xl mx-auto leading-relaxed mb-10 tracking-widest uppercase">
                        Ekosistem Desain Spatial 2026. Presisi, Kecepatan, dan Kemewahan Visual Tanpa Batas.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Tombol Hero Dinamis: Login vs Lab */}
                        {auth.user ? (
                            <Link href="/lab" className="px-10 py-5 bg-white text-black font-black text-sm tracking-[0.2em] uppercase rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                LANJUTKAN LAB
                            </Link>
                        ) : (
                            <Link href="/login" className="px-10 py-5 bg-white text-black font-black text-sm tracking-[0.2em] uppercase rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                MULAI SEKARANG
                            </Link>
                        )}
                        <Link href="/about" className="px-10 py-5 bg-transparent border border-white/30 text-white font-black text-sm tracking-[0.2em] uppercase rounded-full hover:bg-white/10 transition-colors backdrop-blur-md">
                            TENTANG KAMI
                        </Link>
                    </div>
                </div>

                {/* --- BENTO GRID SHOWCASE --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
                    
                    {/* [NEW] KOTAK LOGIN / PROFIL (AKSES CEPAT) */}
                    <div className="md:col-span-1 md:row-span-1 bg-transparent border border-white/10 rounded-[40px] p-8 backdrop-blur-3xl flex flex-col justify-between group hover:border-white/30 transition-all relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h2 className="text-white font-black text-[10px] uppercase tracking-[0.3em] relative z-10">AKSES CEPAT</h2>
                        
                        <div className="relative z-10">
                            {auth.user ? (
                                <>
                                    <div className="text-white text-2xl font-black tracking-tighter mb-1 uppercase">HELLO, {auth.user.name.split(' ')[0]}</div>
                                    <p className="text-white font-bold text-[10px] uppercase tracking-widest opacity-60">Selamat datang kembali</p>
                                </>
                            ) : (
                                <>
                                    <div className="text-white text-3xl font-black tracking-tighter mb-2 italic tracking-tighter">SIGN IN.</div>
                                    <Link href="/login" className="text-white font-black text-[10px] uppercase tracking-[0.3em] border-b border-white/50 pb-1 hover:border-white transition-colors">Masuk ke Akun</Link>
                                </>
                            )}
                        </div>

                        <div className="flex gap-2 relative z-10">
                            <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white text-xs font-black shadow-lg">
                                {auth.user ? auth.user.name.charAt(0) : '?'}
                            </div>
                            {auth.user && (
                                <Link href={route('logout')} method="post" as="button" className="text-white/40 hover:text-white transition-colors text-[9px] font-black uppercase tracking-widest self-center ml-2">Log out</Link>
                            )}
                        </div>
                    </div>

                    {/* KOTAK DESIGN LAB (Tetap Dipertahankan) */}
                    <div className="md:col-span-2 md:row-span-2 bg-transparent border border-white/10 rounded-[40px] p-10 backdrop-blur-3xl relative overflow-hidden group hover:border-white/30 transition-all shadow-2xl flex flex-col justify-between">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 text-white">
                            <span className="font-black text-[10px] uppercase tracking-[0.2em] border-b border-white/30 pb-2 mb-6 inline-block">Eksperimen</span>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight max-w-md">INTERACTIVE<br/>DESIGN LAB</h2>
                        </div>
                        <div className="relative z-10 flex justify-between items-end">
                            <p className="text-white font-bold max-w-xs text-sm uppercase tracking-widest leading-relaxed drop-shadow-md">
                                Simulasi warna dan bentuk secara real-time. Dapatkan CSS instan.
                            </p>
                            <Link href="/lab" className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-black font-black text-2xl">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* KOTAK SPATIAL UI (Tetap Dipertahankan) */}
                    <div className="md:col-span-1 md:row-span-1 bg-transparent border border-white/10 rounded-[40px] p-8 backdrop-blur-3xl relative overflow-hidden group hover:border-white/30 transition-all">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity" alt="Spatial UI" />
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <span className="text-white font-black text-[10px] uppercase tracking-[0.3em] bg-white/10 px-4 py-2 rounded-full border border-white/20 inline-block max-w-max">VISI 2026</span>
                            <h2 className="text-white text-3xl font-black tracking-tighter">SPATIAL UI</h2>
                        </div>
                    </div>

                    {/* SEKSI LAINNYA (Typography, Community, Blog) TETAP SAMA... */}
                    <div className="md:col-span-1 md:row-span-1 bg-transparent border border-white/10 rounded-[40px] p-8 backdrop-blur-3xl flex flex-col justify-between group hover:border-white/30 transition-all relative overflow-hidden">
                        <h2 className="text-white font-black text-[10px] uppercase tracking-[0.3em] relative z-10">KONTRAS TINGGI</h2>
                        <div className="text-white text-8xl font-black tracking-tighter relative z-10">Aa</div>
                        <p className="text-white font-bold text-xs uppercase tracking-[0.2em] relative z-10">Teks Putih Murni</p>
                    </div>

                    <div className="md:col-span-1 md:row-span-1 bg-transparent border border-white/10 rounded-[40px] p-8 backdrop-blur-3xl flex flex-col justify-between group hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden">
                        <Link href="/community" className="absolute inset-0 z-20"></Link>
                        <h2 className="text-white font-black text-[10px] uppercase tracking-[0.3em] relative z-10">JEJARING</h2>
                        <div className="flex gap-2 relative z-10">
                            <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-black text-lg">+</div>
                            <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-black text-lg">D</div>
                        </div>
                        <h2 className="text-white text-3xl font-black tracking-tighter relative z-10">KOMUNITAS</h2>
                    </div>

                    <div className="md:col-span-4 md:row-span-1 bg-transparent border border-white/10 rounded-[40px] p-10 backdrop-blur-3xl relative overflow-hidden group hover:border-white/30 transition-all flex items-center justify-between">
                        <Link href="/blog" className="absolute inset-0 z-20"></Link>
                        <div className="relative z-10">
                            <h2 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-4">JURNAL DESAIN TERBARU</h2>
                            <p className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-tight">BACA INSIGHT TERBARU <br/>DARI TIM ONEDESIGN.</p>
                        </div>
                        <div className="relative z-10 hidden md:block text-white font-black text-6xl opacity-50 hover:opacity-100 transition-all">↗</div>
                    </div>

                </div>
            </main>
        </div>
    );
}