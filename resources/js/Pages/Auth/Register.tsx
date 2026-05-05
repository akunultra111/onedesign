import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden relative flex flex-col pb-20">
            <Head title="Register" />
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="fixed bottom-[10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

            <div className="flex-1 flex flex-col sm:justify-center items-center pt-20 sm:pt-10 px-6">
                
                {/* Header Auth */}
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-black tracking-tighter mb-2 text-white">JOIN THE STANDARD.</h1>
                    <p className="text-white font-bold text-xs uppercase tracking-[0.2em] opacity-70">Buat akun Onedesign baru</p>
                </div>

                {/* Glassmorphism Form Card */}
                <div className="w-full sm:max-w-md bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <form onSubmit={submit} className="relative z-10">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2">Nama Lengkap</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-white focus:ring-1 focus:ring-white transition-colors outline-none font-medium"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                            {errors.name && <p className="mt-2 text-xs text-red-400 font-bold">{errors.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="mt-5">
                            <label htmlFor="email" className="block text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-white focus:ring-1 focus:ring-white transition-colors outline-none font-medium"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="nama@email.com"
                                required
                            />
                            {errors.email && <p className="mt-2 text-xs text-red-400 font-bold">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="mt-5">
                            <label htmlFor="password" className="block text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-white focus:ring-1 focus:ring-white transition-colors outline-none font-medium"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="mt-2 text-xs text-red-400 font-bold">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="mt-5">
                            <label htmlFor="password_confirmation" className="block text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2">Konfirmasi Password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-white focus:ring-1 focus:ring-white transition-colors outline-none font-medium"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            {errors.password_confirmation && <p className="mt-2 text-xs text-red-400 font-bold">{errors.password_confirmation}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col items-center justify-end mt-10 gap-4">
                            <button 
                                className="w-full py-4 bg-white text-black font-black text-sm tracking-[0.2em] uppercase rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed" 
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Daftar Sekarang'}
                            </button>
                            
                            <p className="text-white text-[11px] font-bold uppercase tracking-widest mt-4">
                                Sudah punya akun?{' '}
                                <Link href={route('login')} className="text-purple-400 hover:text-purple-300 border-b border-purple-400 pb-0.5 transition-colors">
                                    Log in di sini
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}