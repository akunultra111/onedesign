import React from 'react';
import { Link } from '@inertiajs/react';

interface Props {
    hideLab?: boolean;
}

export default function Header({ hideLab = false }: Props) {
    const handleRefresh = (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.reload();
    };

    return (
        <header className="w-full flex justify-between items-center py-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleRefresh}>
                <div className="w-[36px] h-[36px] bg-dark rounded flex items-center justify-center text-white font-bold text-xs">OD</div>
                <h6 className="text-dark text-[27px] font-normal leading-[1.2] tracking-[-0.015em]">Onedesign</h6>
            </div>
            <nav className="flex items-center gap-6">
                {!hideLab && (
                    <Link href="/lab" className="text-gray text-[18px] tracking-[-0.01em] hover:text-dark transition-colors">Lab</Link>
                )}
                <Link href="#" className="text-gray text-[18px] tracking-[-0.01em] hover:text-dark transition-colors">About</Link>
            </nav>
        </header>
    );
}
