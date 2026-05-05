import React, { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white">
            {/* Navbar Dark Glass */}
            <nav className="flex justify-between items-center px-10 py-5 sticky top-0 bg-[#121212]/50 backdrop-blur-xl border-b border-white/5 z-50">
                <div className="font-bold text-xl tracking-tighter">ONEDESIGN</div>
                <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <Link href="/blog" className="hover:text-white transition">Blog</Link>
                    <Link href="/community" className="hover:text-white transition">Community</Link>
                    <Link href="/about" className="hover:text-white transition">About</Link>
                    <Link href="/lab" className="bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition">Lab</Link>
                </div>
            </nav>

            {/* Isi Halaman */}
            <main>{children}</main>
        </div>
    );
}