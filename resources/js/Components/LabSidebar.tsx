import React from 'react';
import { HexColorPicker } from "react-colorful";
import { UIElement } from '../Pages/Lab';

interface SidebarProps {
    primaryColor: string; setPrimaryColor: (color: string) => void;
    textColor: string; setTextColor: (color: string) => void;
    fontFamily: string; setFontFamily: (font: string) => void;
    borderRadius: number; setBorderRadius: (radius: number) => void;
    canvasBg: string; setCanvasBg: (bg: string) => void;
    ambientGlow: boolean; setAmbientGlow: (glow: boolean) => void;
    onOpenExport: () => void;
    onAddElement: (type: UIElement['type']) => void;
    applyTheme: (themeName: string) => void;
}

export default function LabSidebar({ 
    primaryColor, setPrimaryColor, textColor, setTextColor, 
    fontFamily, setFontFamily, borderRadius, setBorderRadius, 
    canvasBg, setCanvasBg, ambientGlow, setAmbientGlow,
    onOpenExport, onAddElement, applyTheme
}: SidebarProps) {
    return (
        <aside className="w-[320px] bg-white/5 backdrop-blur-3xl border-r border-white/10 p-6 flex flex-col gap-8 shadow-2xl h-full overflow-y-auto relative z-20 text-white">
            
            {/* BUILDER BLOCKS */}
            <div className="space-y-4 bg-white/5 -mx-6 -mt-6 p-6 border-b border-white/10">
                <div className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-white">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]"></span>
                    Insert Elements
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => onAddElement('heading')} className="py-3 bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/10 rounded-xl text-xs font-bold transition-all backdrop-blur-md">T Heading</button>
                    <button onClick={() => onAddElement('paragraph')} className="py-3 bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/10 rounded-xl text-xs font-bold transition-all backdrop-blur-md">≡ Text</button>
                    <button onClick={() => onAddElement('button')} className="py-3 bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/10 rounded-xl text-xs font-bold transition-all backdrop-blur-md">◻ Button</button>
                    <button onClick={() => onAddElement('glass-card')} className="py-3 bg-transparent border border-white/20 text-white hover:border-white hover:bg-white/10 rounded-xl text-xs font-bold transition-all backdrop-blur-md">◩ Glass Card</button>
                </div>
            </div>

            {/* MAGIC THEMES */}
            <div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-4 flex justify-between items-center">
                    <span>✨ Magic Themes</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => applyTheme('Soft Glass')} className="py-2.5 bg-[#A855F7]/20 border border-[#A855F7]/50 text-[#A855F7] hover:bg-[#A855F7] hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Soft Glass</button>
                    <button onClick={() => applyTheme('Cyberpunk')} className="py-2.5 bg-[#00FF41]/10 border border-[#00FF41]/30 text-[#00FF41] hover:bg-[#00FF41] hover:text-black rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Cyberpunk</button>
                    <button onClick={() => applyTheme('Minimalist')} className="py-2.5 bg-white/10 border border-white/30 text-white hover:bg-white hover:text-black rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Minimalist</button>
                    <button onClick={() => applyTheme('Brutalism')} className="py-2.5 bg-[#FF3366]/20 border border-[#FF3366]/50 text-[#FF3366] hover:bg-[#FF3366] hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Brutalism</button>
                </div>
            </div>

            {/* Colors Section */}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <div className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-3">Primary</div>
                    <HexColorPicker color={primaryColor} onChange={setPrimaryColor} className="!w-full !h-20" />
                </div>
                <div>
                    <div className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-3">Text</div>
                    <HexColorPicker color={textColor} onChange={setTextColor} className="!w-full !h-20" />
                </div>
            </div>

            {/* Radius & Ambient Glow */}
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-4">
                        <span>Corner Radius</span> <span className="font-mono text-white">{borderRadius}px</span>
                    </div>
                    <input type="range" min="0" max="80" value={borderRadius} onChange={(e) => setBorderRadius(parseInt(e.target.value))} className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                </div>
                
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">Ambient Glow</span>
                    <button 
                        onClick={() => setAmbientGlow(!ambientGlow)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${ambientGlow ? 'bg-purple-500' : 'bg-white/20'}`}
                    >
                        <div className={`w-3 h-3 rounded-full bg-white absolute top-1 transition-transform ${ambientGlow ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </button>
                </div>
            </div>

            {/* Typography & BG */}
            <div className="grid grid-cols-2 gap-4">
                <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="w-full bg-[#0a0a0a] p-3 rounded-xl border border-white/20 text-white text-xs font-bold outline-none appearance-none cursor-pointer hover:border-white/40 transition-colors">
                    <option value="Poppins">Poppins</option>
                    <option value="Inter">Inter</option>
                </select>
                <select value={canvasBg} onChange={(e) => setCanvasBg(e.target.value)} className="w-full bg-[#0a0a0a] p-3 rounded-xl border border-white/20 text-white text-xs font-bold outline-none appearance-none cursor-pointer hover:border-white/40 transition-colors">
                    <option value="dark">Dark BG</option>
                    <option value="light">Light BG</option>
                    <option value="grid">Grid BG</option>
                </select>
            </div>

            {/* Export Button */}
            <div className="mt-auto pt-6 border-t border-white/10">
                <button onClick={onOpenExport} className="w-full py-4 bg-white text-black rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    🚀 EXPORT ASSETS
                </button>
            </div>
        </aside>
    );
}