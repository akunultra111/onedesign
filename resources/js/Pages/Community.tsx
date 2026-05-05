import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

interface Comment {
    id: number;
    author: string;
    avatar: string;
    content: string;
    created_at: string;
}

interface Discussion {
    id: number;
    author: string;
    avatar: string;
    title: string;
    preview: string;
    tags: string[];
    replies: number;
    views: string;
    is_hot: boolean;
    created_at: string;
    comments: Comment[]; // Relasi data komentar
}

interface Props {
    discussions: Discussion[];
}

const CATEGORIES = ['Semua Topik', 'Inspirasi UI/UX', 'Bantuan Teknis', 'Tren 2026', 'Showcase Karya'];
const AVAILABLE_TAGS = ['UI/UX', 'CSS', 'PERFORMA', 'INSPIRASI', 'SPATIAL', 'DARK MODE', 'TREN 2026', 'LAYOUT', 'TUTORIAL'];

export default function Community({ discussions }: Props) {
    const { auth } = usePage().props as any;
    
    const [activeTab, setActiveTab] = useState('Terbaru');
    const [activeCategory, setActiveCategory] = useState('Semua Topik');
    
    // State Modal Buat Diskusi
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const createForm = useForm({ title: '', preview: '', tags: [] as string[] });

    // State Modal Lihat Diskusi & Komentar
    const [activeDiscussion, setActiveDiscussion] = useState<Discussion | null>(null);
    const commentForm = useForm({ content: '' });

    const filteredDiscussions = discussions.filter((post) => {
        if (activeCategory !== 'Semua Topik') {
            const searchKeyword = activeCategory.split(' ')[0].toUpperCase();
            const hasTagMatch = post.tags && post.tags.some(t => t.includes(searchKeyword));
            const hasTextMatch = post.title.toUpperCase().includes(searchKeyword) || post.preview.toUpperCase().includes(searchKeyword);
            if (!hasTagMatch && !hasTextMatch) return false;
        }
        if (activeTab === 'Populer (Hot)' && !post.is_hot) return false;
        if (activeTab === 'Belum Terjawab' && post.replies > 0) return false;
        return true;
    });

    const toggleTag = (tag: string) => {
        if (createForm.data.tags.includes(tag)) {
            createForm.setData('tags', createForm.data.tags.filter(t => t !== tag));
        } else {
            if (createForm.data.tags.length < 3) createForm.setData('tags', [...createForm.data.tags, tag]);
        }
    };

    const submitPost = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/community/store', {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                createForm.reset();
            }
        });
    };

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeDiscussion) return;
        
        commentForm.post(`/community/${activeDiscussion.id}/comment`, {
            preserveScroll: true,
            onSuccess: () => {
                commentForm.reset();
                // Update local state agar komentar langsung muncul tanpa harus close modal
                const updatedDiscussion = discussions.find(d => d.id === activeDiscussion.id);
                if (updatedDiscussion) setActiveDiscussion(updatedDiscussion);
            }
        });
    };

    // Fungsi Format Waktu (Sederhana)
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white pb-20">
            <Head title="Community - Onedesign" />
            <Navbar />

            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

            <main className="max-w-7xl mx-auto pt-32 px-6 relative z-10">
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase drop-shadow-2xl">
                            The Forum
                        </h1>
                        <p className="text-white/60 font-bold text-sm tracking-[0.2em] uppercase">
                            Diskusikan, kolaborasi, dan bentuk masa depan UI/UX.
                        </p>
                    </div>
                    <button 
                        onClick={() => {
                            if (!auth.user) { alert("Silakan Login terlebih dahulu."); return; }
                            setIsCreateModalOpen(true);
                        }}
                        className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-gray-200 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                        + Buat Diskusi Baru
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* SIDEBAR */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-2xl">
                            <h3 className="font-black text-white tracking-[0.2em] uppercase text-xs mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]"></span>
                                Filter Topik
                            </h3>
                            <ul className="space-y-2">
                                {CATEGORIES.map((item, idx) => (
                                    <li key={idx}>
                                        <button onClick={() => setActiveCategory(item)} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeCategory === item ? 'bg-white/10 text-white border border-white/20' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* MAIN AREA */}
                    <div className="lg:col-span-3">
                        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
                            {['Terbaru', 'Populer (Hot)', 'Belum Terjawab'].map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 px-2 -mb-[17px] font-black tracking-widest uppercase text-xs transition-all border-b-2 ${activeTab === tab ? 'text-white border-purple-500' : 'text-white/40 border-transparent hover:text-white/80'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {filteredDiscussions.length === 0 ? (
                                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-[24px]">
                                    <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Tidak ada diskusi ditemukan.</p>
                                </div>
                            ) : (
                                filteredDiscussions.map((post) => (
                                    <div 
                                        key={post.id} 
                                        onClick={() => setActiveDiscussion(post)}
                                        className="block group bg-white/5 border border-white/10 hover:border-white/30 backdrop-blur-xl rounded-[24px] p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 shadow-lg relative overflow-hidden cursor-pointer"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="flex items-start gap-4 md:gap-6 relative z-10">
                                            <div className="hidden md:flex w-12 h-12 rounded-full bg-white text-black items-center justify-center font-black text-sm shrink-0 shadow-xl">{post.avatar}</div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className="font-bold text-xs text-white/60 tracking-wider">{post.author}</span>
                                                    {post.is_hot && <span className="ml-auto bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">🔥 HOT</span>}
                                                </div>
                                                <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h2>
                                                <p className="text-white/60 text-sm font-medium leading-relaxed mb-6 line-clamp-2">{post.preview}</p>
                                                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                                    <div className="flex gap-2 mr-auto">
                                                        {post.tags && post.tags.map((tag, idx) => (
                                                            <span key={idx} className="bg-[#050505] border border-white/10 px-3 py-1 rounded-md text-[10px] font-bold text-white/70 uppercase tracking-widest">{tag}</span>
                                                        ))}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-white/50 text-xs font-bold tracking-widest">
                                                        <span className="text-white">💬</span> {post.replies} BALASAN
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL LIHAT DISKUSI & KOMENTAR */}
            {activeDiscussion && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6 animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-4xl rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.2)] flex flex-col max-h-[90vh]">
                        
                        {/* Header Post Utama */}
                        <div className="p-6 md:p-8 border-b border-white/5 relative shrink-0">
                            <button onClick={() => setActiveDiscussion(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors text-3xl font-light leading-none">&times;</button>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-black text-sm">{activeDiscussion.avatar}</div>
                                <div>
                                    <div className="font-black text-white text-sm">{activeDiscussion.author}</div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{timeAgo(activeDiscussion.created_at)}</div>
                                </div>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">{activeDiscussion.title}</h2>
                            <p className="text-white/80 text-sm md:text-base leading-relaxed">{activeDiscussion.preview}</p>
                        </div>

                        {/* Area Komentar (Scrollable) */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#050505]">
                            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-6">Komentar ({activeDiscussion.comments?.length || 0})</h4>
                            
                            <div className="space-y-6">
                                {(!activeDiscussion.comments || activeDiscussion.comments.length === 0) ? (
                                    <div className="text-center py-10 opacity-50">
                                        <div className="text-3xl mb-2">💭</div>
                                        <p className="text-xs font-bold uppercase tracking-widest">Belum ada komentar.</p>
                                    </div>
                                ) : (
                                    activeDiscussion.comments.map(comment => (
                                        <div key={comment.id} className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-black text-[10px] shrink-0 mt-1">{comment.avatar}</div>
                                            <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-5">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-xs text-white/80">{comment.author}</span>
                                                    <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">{timeAgo(comment.created_at)}</span>
                                                </div>
                                                <p className="text-sm text-white/70 leading-relaxed">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Form Input Komentar */}
                        <div className="p-4 md:p-6 border-t border-white/5 bg-[#0A0A0A] shrink-0">
                            {!auth.user ? (
                                <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Silakan login untuk membalas diskusi ini.</p>
                                </div>
                            ) : (
                                <form onSubmit={submitComment} className="flex gap-4 items-end">
                                    <div className="flex-1">
                                        <textarea 
                                            value={commentForm.data.content}
                                            onChange={e => commentForm.setData('content', e.target.value)}
                                            placeholder="Tulis balasan Anda..."
                                            className="w-full bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors resize-none h-[50px] min-h-[50px] max-h-[150px]"
                                            required
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={commentForm.processing || !commentForm.data.content.trim()}
                                        className={`px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all h-[50px] shrink-0 ${commentForm.processing || !commentForm.data.content.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                    >
                                        Kirim
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL BUAT DISKUSI (Sama seperti sebelumnya) */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-[fadeIn_0.2s_ease-out]">
                    <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-2xl rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.2)]">
                        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-black text-white tracking-[0.2em] uppercase text-sm">Buat Diskusi Baru</h3>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-500 hover:text-white transition-colors text-3xl font-light leading-none">&times;</button>
                        </div>
                        <form onSubmit={submitPost} className="p-6 md:p-8 space-y-6">
                            <div>
                                <label className="block text-white/80 font-black text-[10px] uppercase tracking-[0.2em] mb-3">Judul Diskusi</label>
                                <input type="text" value={createForm.data.title} onChange={e => createForm.setData('title', e.target.value)} placeholder="Apa yang ingin Anda diskusikan?" className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white text-sm font-bold focus:border-purple-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-white/80 font-black text-[10px] uppercase tracking-[0.2em] mb-3">Isi Pemikiran Anda</label>
                                <textarea value={createForm.data.preview} onChange={e => createForm.setData('preview', e.target.value)} placeholder="Jelaskan detailnya..." className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white text-sm focus:border-purple-500 outline-none min-h-[150px] resize-none" required />
                            </div>
                            <div>
                                <label className="block text-white/80 font-black text-[10px] uppercase tracking-[0.2em] mb-3">Pilih Tag (Maks 3)</label>
                                <div className="flex flex-wrap gap-2">
                                    {AVAILABLE_TAGS.map(tag => (
                                        <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${createForm.data.tags.includes(tag) ? 'bg-purple-600 border-purple-500 text-white' : 'bg-transparent border-white/20 text-white/50 hover:text-white'}`}>{tag}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-6 py-3 bg-transparent text-white/50 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-xl">Batal</button>
                                <button type="submit" disabled={createForm.processing || createForm.data.tags.length === 0} className={`px-8 py-3 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all ${createForm.processing || createForm.data.tags.length === 0 ? 'opacity-50' : 'hover:scale-105'}`}>Posting</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}