import React, { useRef } from 'react';
import { UIElement } from '../Pages/Lab';

interface CanvasProps {
    primaryColor: string; textColor: string; fontFamily: string; 
    borderRadius: number; viewMode: string; canvasBg: string; ambientGlow: boolean;
    setViewMode: (mode: string) => void;
    elements: UIElement[];
    onRemoveElement: (id: number) => void;
    onUpdateElement: (id: number, content: string) => void;
    onResizeElement: (id: number, type: 'width' | 'height', direction: 1 | -1) => void; // PROPS BARU
    onReorderElements: (newElements: UIElement[]) => void;
}

export default function Canvas({ 
    primaryColor, textColor, fontFamily, borderRadius, viewMode, setViewMode, canvasBg, ambientGlow,
    elements, onRemoveElement, onUpdateElement, onResizeElement, onReorderElements
}: CanvasProps) {
    
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const handleDragStart = (e: React.DragEvent, position: number) => { dragItem.current = position; };

    const handleDragEnter = (e: React.DragEvent, position: number) => {
        dragOverItem.current = position;
        const newElements = [...elements];
        const dragItemContent = newElements[dragItem.current!];
        
        newElements.splice(dragItem.current!, 1);
        newElements.splice(dragOverItem.current!, 0, dragItemContent);
        
        dragItem.current = dragOverItem.current;
        onReorderElements(newElements);
    };

    const handleDragEnd = () => { dragItem.current = null; dragOverItem.current = null; };

    const getWidth = () => {
        if (viewMode === "Mobile") return "375px";
        if (viewMode === "Tablet") return "768px";
        return "100%"; 
    };

    // Dinamika Grid berdasarkan perangkat
    const getGridCols = () => {
        if (viewMode === "Mobile") return 1;
        if (viewMode === "Tablet") return 2;
        return 4; // Desktop 4 kolom
    };

    const isDark = canvasBg === "dark";

    return (
        <main className={`flex-1 flex flex-col items-center justify-center p-10 relative transition-colors duration-500 overflow-y-auto ${isDark ? 'bg-[#050505]' : canvasBg === 'grid' ? 'bg-[#F8F9FA] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px]' : 'bg-[#F8F9FA]'}`}>
            
            <div 
                className={`transition-all duration-700 ease-in-out border p-8 md:p-12 min-h-[600px] relative overflow-hidden ${isDark ? 'bg-[#0f0f0f]/80 backdrop-blur-2xl border-white/5 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}
                style={{ width: getWidth(), borderRadius: `${borderRadius}px`, fontFamily: `${fontFamily}, sans-serif` }}
            >
                {ambientGlow && (
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-700 z-0"
                        style={{ backgroundColor: primaryColor }}
                    ></div>
                )}

                {/* AREA KERJA SEKARANG ADALAH CSS GRID */}
                <div 
                    className="relative z-10 w-full h-full grid gap-6 grid-auto-rows-min"
                    style={{ gridTemplateColumns: `repeat(${getGridCols()}, minmax(0, 1fr))` }}
                >
                    {elements.length === 0 && (
                        <div className="col-span-full opacity-30 font-bold uppercase tracking-widest text-sm text-center py-20" style={{ color: textColor }}>
                            Kanvas Kosong.
                        </div>
                    )}

                    {elements.map((el, index) => {
                        // Memastikan ukuran elemen tidak melebihi grid layar (Mobile paksa 1)
                        const actualColSpan = viewMode === 'Mobile' ? 1 : Math.min(el.colSpan, getGridCols());
                        
                        return (
                            <div 
                                key={el.id} draggable 
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnter={(e) => handleDragEnter(e, index)}
                                onDragEnd={handleDragEnd} onDragOver={(e) => e.preventDefault()}
                                className={`relative group flex hover:cursor-grab active:cursor-grabbing border border-transparent rounded-2xl transition-all ${isDark ? 'hover:border-white/10 hover:bg-white/5' : 'hover:border-black/10 hover:bg-black/5'}`}
                                style={{ 
                                    gridColumn: `span ${actualColSpan} / span ${actualColSpan}`,
                                    gridRow: `span ${el.rowSpan} / span ${el.rowSpan}`,
                                    minHeight: '120px'
                                }}
                            >
                                {/* KONTROL GRID MUNCUL SAAT HOVER */}
                                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg z-50 transition-opacity border border-white/20">
                                    <button onClick={() => onResizeElement(el.id, 'width', -1)} className="w-6 h-6 text-white hover:bg-white/20 rounded flex items-center justify-center text-xs">◀</button>
                                    <button onClick={() => onResizeElement(el.id, 'width', 1)} className="w-6 h-6 text-white hover:bg-white/20 rounded flex items-center justify-center text-xs">▶</button>
                                    <div className="w-px h-4 bg-white/20 mx-1"></div>
                                    <button onClick={() => onResizeElement(el.id, 'height', -1)} className="w-6 h-6 text-white hover:bg-white/20 rounded flex items-center justify-center text-xs">▲</button>
                                    <button onClick={() => onResizeElement(el.id, 'height', 1)} className="w-6 h-6 text-white hover:bg-white/20 rounded flex items-center justify-center text-xs">▼</button>
                                    <div className="w-px h-4 bg-white/20 mx-1"></div>
                                    <button onClick={() => onRemoveElement(el.id)} className="w-6 h-6 text-red-400 hover:bg-red-500 hover:text-white rounded flex items-center justify-center text-xs">✕</button>
                                </div>

                                {/* Drag Handle Ikon */}
                                <div className={`absolute left-2 top-2 opacity-0 group-hover:opacity-40 flex gap-[2px] items-center text-[8px] tracking-tighter z-40 ${isDark ? 'text-white' : 'text-black'}`}>
                                    <span>●<br/>●<br/>●</span><span>●<br/>●<br/>●</span>
                                </div>

                                {/* Elemen Konten */}
                                <div className="w-full h-full flex flex-col justify-center items-center p-6">
                                    {el.type === 'heading' && (
                                        <h2 contentEditable suppressContentEditableWarning onBlur={(e) => onUpdateElement(el.id, e.target.innerText)}
                                            className="font-black text-4xl md:text-5xl tracking-tighter leading-tight outline-none w-full text-center whitespace-pre-wrap"
                                            style={{ color: textColor }}
                                        >{el.content}</h2>
                                    )}

                                    {el.type === 'paragraph' && (
                                        <p contentEditable suppressContentEditableWarning onBlur={(e) => onUpdateElement(el.id, e.target.innerText)}
                                            className="font-medium text-base opacity-80 outline-none w-full text-center whitespace-pre-wrap"
                                            style={{ color: textColor }}
                                        >{el.content}</p>
                                    )}

                                    {el.type === 'button' && (
                                        <button contentEditable suppressContentEditableWarning onBlur={(e) => onUpdateElement(el.id, e.target.innerText)}
                                            className="px-8 py-3 font-black text-white shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105 outline-none whitespace-pre-wrap"
                                            style={{ backgroundColor: primaryColor, borderRadius: `${borderRadius / 2}px` }}
                                        >{el.content}</button>
                                    )}

                                    {el.type === 'glass-card' && (
                                        <div className={`w-full h-full flex items-center justify-center p-6 border backdrop-blur-3xl shadow-2xl outline-none transition-all ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                                            style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', borderRadius: `${borderRadius}px`, color: textColor }}
                                        >
                                            <div contentEditable suppressContentEditableWarning className="font-bold text-xl tracking-tight text-center whitespace-pre-wrap">{el.content}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={`absolute bottom-10 flex backdrop-blur-md rounded-full shadow-lg border p-1.5 gap-1 z-50 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/90 border-gray-100'}`}>
                {["Desktop", "Tablet", "Mobile"].map((mode) => (
                    <button key={mode} onClick={() => setViewMode(mode)}
                        className={`px-8 py-2 rounded-full text-[10px] font-black transition-all ${viewMode === mode ? (isDark ? "bg-white text-black shadow-md" : "bg-black text-white shadow-md") : (isDark ? "text-white/50 hover:text-white" : "text-black/50 hover:text-black")}`}
                    >
                        {mode.toUpperCase()}
                    </button>
                ))}
            </div>
        </main>
    );
}