import React from 'react';
import { Head, Link, router } from '@inertiajs/react'; // Pastikan router di-import
import Navbar from '@/Components/Navbar';

interface Project {
    id: number;
    title: string;
    created_at: string;
    css_code: string;
}

export default function Dashboard({ auth, projects }: { auth: any, projects: Project[] }) {
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    // Fungsi untuk menghapus project
    const handleDeleteProject = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus project ini dari riwayat? Tindakan ini tidak dapat dibatalkan.')) {
            router.delete(`/lab/project/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Optional: Bisa tambahkan toast/alert berhasil dihapus di sini
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500 selection:text-white pb-20">
            <Head title="Dashboard - Onedesign" />
            <Navbar />

            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

            <main className="max-w-6xl mx-auto pt-32 px-6 relative z-10">
                <header className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase drop-shadow-2xl">
                        {auth.user.name.split(' ')[0]}.
                    </h1>
                    <div className="flex items-center gap-4">
                        <Link href="/profile" className="px-6 py-2.5 bg-white/5 border border-white/20 hover:bg-white/10 rounded-full text-white text-[10px] font-black tracking-widest uppercase transition-all">
                            Pengaturan Akun
                        </Link>
                        <Link href="/lab" className="px-6 py-2.5 bg-white text-black hover:bg-gray-200 rounded-full text-[10px] font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Buka Lab
                        </Link>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl">
                        <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">Profil Tersinkronisasi</h3>
                        <div className="font-bold text-xl">{auth.user.name}</div>
                        <div className="text-white/60 text-sm">{auth.user.email}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-3xl opacity-20">🎨</div>
                        <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">Total Desain</h3>
                        <div className="font-black text-6xl tracking-tighter">{projects.length}</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-3xl opacity-20">✨</div>
                        <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4">Status Lisensi</h3>
                        <div className="font-black text-5xl tracking-tighter text-purple-400">Aktif</div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl p-8 md:p-12 min-h-[400px]">
                    <h2 className="text-xs font-black text-white/70 uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">
                        Riwayat Ekspor Lab
                    </h2>

                    {projects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[200px] opacity-60">
                            <p className="font-black text-sm uppercase tracking-widest mb-4">Belum Ada Aktivitas Lab.</p>
                            <Link href="/lab" className="text-purple-400 hover:text-purple-300 text-xs font-bold uppercase tracking-widest border-b border-purple-400 pb-1">
                                Mulai Eksperimen Pertama
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div key={project.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-[#0A0A0A] border border-white/5 hover:border-white/20 rounded-2xl transition-colors group">
                                    <div>
                                        <h3 className="font-black text-lg text-white mb-1 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                                        <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{formatDate(project.created_at)}</p>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        {/* TOMBOL HAPUS BARU */}
                                        <button 
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                                        >
                                            Hapus
                                        </button>
                                        
                                        <button 
                                            onClick={() => {
                                                navigator.clipboard.writeText(project.css_code);
                                                alert('CSS berhasil disalin dari riwayat!');
                                            }}
                                            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors"
                                        >
                                            Copy CSS
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}