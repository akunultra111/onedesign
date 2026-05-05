import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navbar() {
    // Mengambil data user dari Inertia (Mengecek apakah sudah login)
    const { auth } = usePage().props as any;

    return (
        <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                
                {/* Logo */}
                <Link href="/" className="text-white font-black text-xl tracking-widest flex items-center gap-1">
                    ONEDESIGN<span className="w-2 h-2 rounded-full bg-purple-500 mb-2"></span>
                </Link>

                {/* Main Menu Tengah */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Home</Link>
                    <Link href="/blog" className="text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Blog</Link>
                    <Link href="/community" className="text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">Community</Link>
                </div>

                {/* Menu Kanan (Auth / Profile) */}
                <div className="flex items-center gap-6">
                    {auth.user ? (
                        /* Jika User SUDAH Login */
                        <>
                            <Link href="/dashboard" className="hidden md:block text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                                Dashboard
                            </Link>
                            <Link href="/profile" className="hidden md:block text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                                <span>👤</span> {auth.user.name}
                            </Link>
                            <Link href="/lab" className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                Open Lab
                            </Link>
                        </>
                    ) : (
                        /* Jika User BELUM Login */
                        <>
                            <Link href="/login" className="hidden md:block text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                                Log in
                            </Link>
                            <Link href="/register" className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
                
            </div>
        </nav>
    );
}