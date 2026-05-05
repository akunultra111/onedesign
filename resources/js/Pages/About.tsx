// resources/js/Pages/About.tsx (Kode Baru yang Disederhanakan)
import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function About() {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden relative selection:bg-white selection:text-black">
            <Head title="About - Onedesign" />
            <Navbar />

            {/* --- SIMPLER AMBIENT BACKGROUNDS --- */}
            {/* Cahaya statis yang lebih lembut tanpa animasi pulse */}
            <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10 mix-blend-screen"></div>

            <main className="max-w-[1200px] mx-auto pt-40 pb-32 px-6 relative z-10">
                
                {/* --- SIMPLIFIED HERO SECTION (Bagian yang ingin disederhanakan) --- */}
                <div className="flex flex-col items-center text-center mb-28 mt-10">
                    {/* Lencana yang lebih sederhana, teks datar tanpa efek blur */}
                    <div className="border border-white/10 bg-white/5 px-6 py-2 rounded-full mb-12 shadow-sm">
                        <span className="text-white font-bold tracking-[0.2em] uppercase text-[10px]">
                            MANIFESTO
                        </span>
                    </div>
                    
                    {/* Judul yang jauh lebih kecil, putih solid bersih */}
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight text-white flex flex-col drop-shadow-md">
                        Redefine The Standard.
                    </h1>
                    
                    {/* Teks manifesto yang lebih kecil, berat standar, huruf kecil untuk kebersihan */}
                    <p className="text-white text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed tracking-wide opacity-80">
                        Kami tidak hanya mengikuti tren. Kami menciptakan ekosistem di mana estetika tanpa kompromi bertemu dengan performa absolut.
                    </p>
                </div>

                {/* --- BENTO GRID: COMPANY STORY (Disederhanakan visualnya untuk konsistensi) --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
                    
                    {/* Kotak 1: Filosofi (Visual lebih bersih) */}
                    <div className="md:col-span-2 md:row-span-2 bg-white/5 border border-white/10 rounded-[40px] p-10 flex flex-col justify-between group hover:border-white/20 transition-all shadow-2xl overflow-hidden relative">
                        <div className="relative z-10">
                            <span className="text-white font-black text-[10px] uppercase tracking-[0.3em] border-b border-white/20 pb-2 mb-6 inline-block">FILOSOFI</span>
                            <h2 className="text-white text-4xl md:text-5xl font-black tracking-tighter leading-tight max-w-md">
                                Kesederhanaan Adalah Puncak Kemewahan.
                            </h2>
                        </div>

                        <div className="relative z-10 mt-10">
                            <p className="text-white font-bold text-sm uppercase tracking-[0.15em] leading-relaxed max-w-xs drop-shadow-md">
                                Menghilangkan elemen yang tidak perlu untuk memberikan ruang bagi konten untuk berbicara. Desain spatial kami berfokus pada kedalaman, cahaya, dan kontras.
                            </p>
                        </div>
                        
                        {/* Orb yang lebih halus dan redup */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-[50px] group-hover:scale-125 transition-transform duration-700"></div>
                    </div>

                    {/* Kotak 2: Angka & Fakta (Teks Putih Solid) */}
                    <div className="md:col-span-2 md:row-span-1 grid grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 flex flex-col justify-center relative overflow-hidden group hover:border-white/20 transition-all">
                            <h3 className="text-white font-black text-6xl tracking-tighter mb-2">1.2M</h3>
                            <p className="text-white font-bold text-xs uppercase tracking-[0.2em]">Baris Kode Dioptimasi</p>
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity text-4xl">⚡</div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 flex flex-col justify-center relative overflow-hidden group hover:border-white/20 transition-all">
                            <h3 className="text-white font-black text-6xl tracking-tighter mb-2">50K+</h3>
                            <p className="text-white font-bold text-xs uppercase tracking-[0.2em]">Desainer Terhubung</p>
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity text-4xl">🌍</div>
                        </div>
                    </div>

                    {/* Kotak 3: Teknologi (Teks Putih Solid) */}
                    <div className="md:col-span-2 md:row-span-1 bg-white/5 border border-white/10 rounded-[40px] p-10 relative overflow-hidden group hover:border-white/20 transition-all shadow-xl">
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">STACK TEKNOLOGI</span>
                            <div className="flex flex-wrap gap-3 mt-4">
                                {['LARAVEL 11', 'REACT', 'INERTIA', 'TAILWIND CSS', 'TYPESCRIPT'].map((tech) => (
                                    <div key={tech} className="px-5 py-3 border border-white/10 rounded-2xl bg-white/5 text-white font-black text-xs tracking-widest uppercase transition-colors">
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Kotak 4: Tim & Gambar Workspace (Membentang Penuh, Teks Putih Solid) */}
                    <div className="md:col-span-4 md:row-span-1 bg-transparent border border-white/10 rounded-[40px] p-12 relative overflow-hidden group hover:border-white/20 transition-all shadow-2xl flex items-center">
                        <img
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-1000 scale-100 group-hover:scale-105 mix-blend-luminosity"
                            alt="The Workspace"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                        
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-white font-black text-[10px] uppercase tracking-[0.3em] bg-white/10 px-6 py-2 rounded-full mb-6 inline-block">
                                MASA DEPAN DIBUAT DI SINI
                            </h2>
                            <h3 className="text-white text-5xl font-black tracking-tighter leading-tight drop-shadow-2xl">
                                Bergabung Dengan Pergerakan Ini.
                            </h3>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}