import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden relative flex flex-col">
            <Head title="Log in" />
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

            <div className="flex-1 flex flex-col sm:justify-center items-center pt-20 sm:pt-0 px-6">
                
                {/* Header Auth */}
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-black tracking-tighter mb-2 text-white">WELCOME BACK.</h1>
                    <p className="text-white font-bold text-xs uppercase tracking-[0.2em] opacity-70">Log in ke Onedesign Standard</p>
                </div>

                {status && <div className="mb-4 font-medium text-sm text-green-400">{status}</div>}

                {/* Glassmorphism Form Card */}
                <div className="w-full sm:max-w-md bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group hover:border-white/20 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <form onSubmit={submit} className="relative z-10">
                        {/* Email Input */}
                        <div>
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
                            />
                            {errors.email && <p className="mt-2 text-xs text-red-400 font-bold">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="mt-6">
                            <label htmlFor="password" className="block text-white font-black text-[10px] uppercase tracking-[0.2em] mb-2">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-white focus:ring-1 focus:ring-white transition-colors outline-none font-medium"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-2 text-xs text-red-400 font-bold">{errors.password}</p>}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="block mt-6 flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-white/20 bg-black/50 text-purple-600 shadow-sm focus:ring-purple-600 focus:ring-offset-black"
                                />
                                <span className="ms-3 text-[11px] font-bold text-white uppercase tracking-widest">Remember me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-[11px] font-bold text-white uppercase tracking-widest hover:text-purple-400 transition-colors border-b border-transparent hover:border-purple-400 pb-0.5"
                                >
                                    Lupa Password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex flex-col items-center justify-end mt-10 gap-4">
                            <button 
                                className="w-full py-4 bg-white text-black font-black text-sm tracking-[0.2em] uppercase rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed" 
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Log in'}
                            </button>
                            
                            <p className="text-white text-[11px] font-bold uppercase tracking-widest mt-4">
                                Belum punya akun?{' '}
                                <Link href={route('register')} className="text-purple-400 hover:text-purple-300 border-b border-purple-400 pb-0.5 transition-colors">
                                    Daftar di sini
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}