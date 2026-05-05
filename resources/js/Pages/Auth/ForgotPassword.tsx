import React, { FormEventHandler } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans text-white selection:bg-purple-500 selection:text-white">
            <Head title="Lupa Password - Onedesign" />

            {/* Efek Ambient Glow di belakang Form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

            <div className="w-full max-w-md relative z-10 animate-[fadeIn_0.5s_ease-out]">
                
                {/* Header & Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block text-white font-black text-3xl tracking-widest mb-6 hover:scale-105 transition-transform">
                        ONEDESIGN<span className="text-purple-500">.</span>
                    </Link>
                    <h1 className="text-3xl font-black tracking-tighter uppercase drop-shadow-lg">Pulihkan Akun</h1>
                    <p className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase mt-3">
                        Lupa password? Jangan khawatir.
                    </p>
                </div>

                {/* Kartu Glassmorphism */}
                <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[32px] backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                    
                    <div className="mb-8 text-sm text-white/70 font-medium leading-relaxed text-center">
                        Masukkan alamat email Anda yang terdaftar, dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda agar bisa kembali mengakses Lab.
                    </div>

                    {/* Pesan Sukses (Jika email berhasil dikirim) */}
                    {status && (
                        <div className="mb-6 font-bold text-xs text-green-400 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center uppercase tracking-widest">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-white/80 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                                Alamat Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                                autoFocus
                            />
                            <InputError message={errors.email} className="mt-2 text-red-400 text-[10px] font-bold uppercase tracking-widest" />
                        </div>

                        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 pt-4 mt-8 border-t border-white/10">
                            <Link
                                href={route('login')}
                                className="text-white/50 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                            >
                                ← Kembali Login
                            </Link>
                            
                            <button
                                className={`w-full md:w-auto px-8 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] ${processing ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105'}`}
                                disabled={processing}
                            >
                                Kirim Tautan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}