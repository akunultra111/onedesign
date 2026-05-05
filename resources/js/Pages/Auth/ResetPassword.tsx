import React, { FormEventHandler, useEffect } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function ResetPassword({ token, email }: { token: string, email: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans text-white selection:bg-purple-500 selection:text-white">
            <Head title="Reset Password - Onedesign" />

            {/* Efek Ambient Glow di belakang Form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

            <div className="w-full max-w-md relative z-10 animate-[fadeIn_0.5s_ease-out]">
                
                {/* Header & Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block text-white font-black text-3xl tracking-widest mb-6 hover:scale-105 transition-transform">
                        ONEDESIGN<span className="text-purple-500">.</span>
                    </Link>
                    <h1 className="text-3xl font-black tracking-tighter uppercase drop-shadow-lg">Password Baru</h1>
                    <p className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase mt-3">
                        Amankan kembali akun Anda.
                    </p>
                </div>

                {/* Kartu Glassmorphism */}
                <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[32px] backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                    
                    <form onSubmit={submit} className="space-y-6">
                        {/* Input Email (Readonly/Prefilled) */}
                        <div>
                            <label htmlFor="email" className="block text-white/80 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                                Email Tertaut
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white/70 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none cursor-not-allowed"
                                onChange={(e) => setData('email', e.target.value)}
                                readOnly
                            />
                            <InputError message={errors.email} className="mt-2 text-red-400 text-[10px] font-bold uppercase tracking-widest" />
                        </div>

                        {/* Input Password Baru */}
                        <div>
                            <label htmlFor="password" className="block text-white/80 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                                Password Baru
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                autoFocus
                            />
                            <InputError message={errors.password} className="mt-2 text-red-400 text-[10px] font-bold uppercase tracking-widest" />
                        </div>

                        {/* Input Konfirmasi Password */}
                        <div>
                            <label htmlFor="password_confirmation" className="block text-white/80 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
                                Konfirmasi Password Baru
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full bg-black/50 border border-white/20 rounded-xl px-5 py-4 text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2 text-red-400 text-[10px] font-bold uppercase tracking-widest" />
                        </div>

                        <div className="pt-4 mt-8 border-t border-white/10">
                            <button
                                className={`w-full py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] ${processing ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105'}`}
                                disabled={processing}
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}