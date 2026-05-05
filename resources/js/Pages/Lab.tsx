import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import LabSidebar from '@/Components/LabSidebar';
import Canvas from '@/Components/Canvas';

export interface UIElement {
    id: number;
    type: 'heading' | 'paragraph' | 'button' | 'glass-card';
    content: string;
    colSpan: number;
    rowSpan: number;
}

export default function Lab() {
    const [primaryColor, setPrimaryColor] = useState("#A855F7");
    const [textColor, setTextColor] = useState("#FFFFFF");
    const [fontFamily, setFontFamily] = useState("Poppins");
    const [borderRadius, setBorderRadius] = useState(24);
    const [viewMode, setViewMode] = useState("Desktop");
    const [canvasBg, setCanvasBg] = useState("dark");
    const [ambientGlow, setAmbientGlow] = useState(true);
    
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [exportTab, setExportTab] = useState("CSS");
    
    const [projectName, setProjectName] = useState("My Awesome Project");
    const [isSaving, setIsSaving] = useState(false);
    
    // STATE BARU: Untuk mengontrol pop-up (Toast) khusus
    const [showToast, setShowToast] = useState(false);

    const [elements, setElements] = useState<UIElement[]>([
        { id: 1, type: 'glass-card', content: 'ONEDESIGN V2.0\nEcosystem.', colSpan: 2, rowSpan: 2 },
        { id: 2, type: 'heading', content: 'Bento Grid\nBuilder.', colSpan: 2, rowSpan: 1 },
        { id: 3, type: 'paragraph', content: 'Hover elemen ini, lalu gunakan tombol panah untuk mengubah lebar dan tingginya di dalam grid.', colSpan: 2, rowSpan: 1 },
        { id: 4, type: 'button', content: 'Eksplorasi', colSpan: 4, rowSpan: 1 }
    ]);

    const applyTheme = (themeName: string) => {
        if (themeName === 'Cyberpunk') {
            setPrimaryColor('#00FF41'); setTextColor('#FFFFFF'); setFontFamily('Inter'); setBorderRadius(0); setCanvasBg('dark'); setAmbientGlow(true);
        } else if (themeName === 'Minimalist') {
            setPrimaryColor('#111827'); setTextColor('#111827'); setFontFamily('Inter'); setBorderRadius(8); setCanvasBg('light'); setAmbientGlow(false);
        } else if (themeName === 'Soft Glass') {
            setPrimaryColor('#A855F7'); setTextColor('#FFFFFF'); setFontFamily('Poppins'); setBorderRadius(32); setCanvasBg('dark'); setAmbientGlow(true);
        } else if (themeName === 'Brutalism') {
            setPrimaryColor('#FF3366'); setTextColor('#000000'); setFontFamily('Inter'); setBorderRadius(0); setCanvasBg('grid'); setAmbientGlow(false);
        }
    };

    const handleAddElement = (type: UIElement['type']) => {
        const newElement: UIElement = {
            id: Date.now(),
            type: type,
            content: type === 'heading' ? 'New Heading' : type === 'paragraph' ? 'Teks deskripsi.' : type === 'button' ? 'Click Me' : 'Glass Card',
            colSpan: type === 'glass-card' ? 2 : type === 'button' ? 1 : 4,
            rowSpan: type === 'glass-card' ? 2 : 1
        };
        setElements([...elements, newElement]);
    };

    const handleRemoveElement = (id: number) => setElements(elements.filter(el => el.id !== id));
    const handleUpdateElement = (id: number, newContent: string) => setElements(elements.map(el => el.id === id ? { ...el, content: newContent } : el));
    const handleReorderElements = (newElements: UIElement[]) => setElements(newElements);
    
    const handleResizeElement = (id: number, type: 'width' | 'height', direction: 1 | -1) => {
        setElements(elements.map(el => {
            if (el.id !== id) return el;
            let newColSpan = el.colSpan;
            let newRowSpan = el.rowSpan;
            if (type === 'width') newColSpan = Math.max(1, Math.min(4, el.colSpan + direction));
            else newRowSpan = Math.max(1, Math.min(4, el.rowSpan + direction));
            return { ...el, colSpan: newColSpan, rowSpan: newRowSpan };
        }));
    };

    const generateCSS = () => {
        const isDark = canvasBg === 'dark' || canvasBg === 'grid';
        const bgColor = canvasBg === 'dark' ? '#050505' : '#F8F9FA';
        const cardBg = isDark ? 'rgba(15, 15, 15, 0.8)' : '#FFFFFF';

        let css = `/* Onedesign 1:1 Export Studio */
:root {
  --primary: ${primaryColor};
  --text: ${textColor};
  --radius: ${borderRadius}px;
  --font: '${fontFamily}', sans-serif;
  --bg-main: ${bgColor};
}

body {
  margin: 0;
  background-color: var(--bg-main);
  font-family: var(--font);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

.bento-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
  ${canvasBg === 'grid' ? 'background-image: radial-gradient(#d1d5db 1px, transparent 1px); background-size: 20px 20px;' : ''}
}

${ambientGlow ? `.ambient-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background-color: var(--primary);
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}` : ''}

.bento-container {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  background: ${cardBg};
  backdrop-filter: blur(20px);
  border: 1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  border-radius: var(--radius);
  padding: 48px;
  box-shadow: 0 40px 100px -20px rgba(0,0,0,${isDark ? '0.5' : '0.1'});
}

@media (max-width: 768px) {
  .bento-container { grid-template-columns: 1fr; padding: 24px; }
  .bento-item { grid-column: span 1 !important; grid-row: span 1 !important; }
}

.bento-item { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; min-height: 140px; transition: all 0.3s ease; }\n`;

        elements.forEach((el, index) => {
            css += `.item-${index + 1} { grid-column: span ${el.colSpan}; grid-row: span ${el.rowSpan}; }\n`;
        });

        css += `\n/* Component Styles */
.heading { font-size: 3.5rem; font-weight: 900; letter-spacing: -0.05em; line-height: 1.1; margin: 0; }
.paragraph { font-size: 1.125rem; font-weight: 500; opacity: 0.8; line-height: 1.6; max-width: 600px; }
.button { background-color: var(--primary); color: white; padding: 16px 40px; border-radius: calc(var(--radius) / 2); border: none; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; box-shadow: 0 10px 30px -10px var(--primary); }
.glass-card { width: 100%; height: 100%; padding: 32px; border-radius: var(--radius); border: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}; background: ${isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}; backdrop-filter: blur(40px); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 800; }`;
        
        return css;
    };

    const generateReact = () => {
        let code = `import React from 'react';\nimport './BentoGrid.css';\n\nexport default function ExportedProject() {\n  return (\n    <div className="bento-wrapper">\n      {/* Ambient Glow */}\n      ${ambientGlow ? '<div className="ambient-glow" />' : ''}\n\n      <div className="bento-container">\n`;

        elements.forEach((el, index) => {
            code += `        <div className="bento-item item-${index + 1}">\n`;
            if (el.type === 'heading') code += `          <h1 className="heading">${el.content.replace(/\n/g, '<br/>')}</h1>\n`;
            else if (el.type === 'paragraph') code += `          <p className="paragraph">${el.content.replace(/\n/g, '<br/>')}</p>\n`;
            else if (el.type === 'button') code += `          <button className="button">${el.content.replace(/\n/g, '<br/>')}</button>\n`;
            else if (el.type === 'glass-card') code += `          <div className="glass-card">${el.content.replace(/\n/g, '<br/>')}</div>\n`;
            code += `        </div>\n`;
        });

        code += `      </div>\n    </div>\n  );\n}\n`;
        return code;
    };

    const handleExportClick = () => {
        setIsExportOpen(true);
    };

    // UPDATE: Menjalankan Toast alih-alih Alert saat berhasil
    const handleSaveToDashboard = () => {
        setIsSaving(true);
        router.post('/lab/save-project', {
            title: projectName,
            elements: elements as any,
            css_code: generateCSS(),
            react_code: generateReact()
        }, { 
            preserveScroll: true, 
            preserveState: true,
            onSuccess: () => {
                setIsSaving(false);
                setShowToast(true); // Memunculkan Toast
                
                // Menghilangkan Toast otomatis setelah 4 detik
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);
            }
        });
    };

    const handleSaveAsPDF = () => {
        setIsExportOpen(false);
        setTimeout(() => window.print(), 500);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col font-sans text-white overflow-hidden selection:bg-white selection:text-black relative print:bg-white">
            <Head title="Lab - Onedesign" />
            <div className="print:hidden"><Navbar /></div>

            <div className="fixed top-0 left-1/4 w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen print:hidden"></div>

            <div className="flex flex-1 pt-[72px] h-screen print:h-auto print:pt-0">
                <div className="print:hidden h-full">
                    <LabSidebar 
                        primaryColor={primaryColor} setPrimaryColor={setPrimaryColor}
                        textColor={textColor} setTextColor={setTextColor}
                        fontFamily={fontFamily} setFontFamily={setFontFamily}
                        borderRadius={borderRadius} setBorderRadius={setBorderRadius}
                        canvasBg={canvasBg} setCanvasBg={setCanvasBg}
                        ambientGlow={ambientGlow} setAmbientGlow={setAmbientGlow}
                        onOpenExport={handleExportClick}
                        onAddElement={handleAddElement}
                        applyTheme={applyTheme}
                    />
                </div>

                <Canvas 
                    primaryColor={primaryColor} textColor={textColor} 
                    fontFamily={fontFamily} borderRadius={borderRadius} 
                    viewMode={viewMode} setViewMode={setViewMode} 
                    canvasBg={canvasBg} ambientGlow={ambientGlow}
                    elements={elements} 
                    onRemoveElement={handleRemoveElement}
                    onUpdateElement={handleUpdateElement}
                    onResizeElement={handleResizeElement}
                    onReorderElements={handleReorderElements}
                />
            </div>

            {/* MODAL EXPORT STUDIO 1:1 */}
            {isExportOpen && (
                <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-[fadeIn_0.3s_ease-out] print:hidden">
                    <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-4xl rounded-[32px] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.2)] flex flex-col h-[700px]">
                        
                        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="font-black text-white tracking-[0.2em] uppercase text-sm flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg">⚙️</span>
                                1:1 Export Studio
                            </h3>
                            
                            <div className="flex gap-2">
                                {['CSS', 'React Component'].map((tab) => (
                                    <button 
                                        key={tab} onClick={() => setExportTab(tab)}
                                        className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${exportTab === tab ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4 items-center">
                                <button onClick={handleSaveAsPDF} className="px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white transition-all flex items-center gap-2">
                                    📄 Simpan PDF
                                </button>
                                <button onClick={() => setIsExportOpen(false)} className="text-gray-500 hover:text-white transition-colors text-3xl font-light leading-none">&times;</button>
                            </div>
                        </div>

                        {/* INPUT NAMA PROJECT & TOMBOL SIMPAN KE DASHBOARD */}
                        <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Nama Project:</span>
                                <input 
                                    type="text" 
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white text-sm font-bold focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none w-full md:w-72 transition-colors"
                                    placeholder="Masukkan nama desain Anda..."
                                />
                            </div>
                            <button 
                                onClick={handleSaveToDashboard}
                                disabled={isSaving}
                                className={`px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-lg ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
                            >
                                {isSaving ? 'Menyimpan...' : '💾 Simpan ke Dashboard'}
                            </button>
                        </div>

                        <div className="flex-1 bg-black p-8 overflow-y-auto font-mono text-sm border-y border-white/5">
                            <pre className="text-gray-300 leading-relaxed">
                                {exportTab === 'CSS' && generateCSS()}
                                {exportTab === 'React Component' && generateReact()}
                            </pre>
                        </div>

                        <div className="p-6 bg-[#0A0A0A]">
                            <button 
                                onClick={() => {
                                    const code = exportTab === 'CSS' ? generateCSS() : generateReact();
                                    navigator.clipboard.writeText(code);
                                    
                                    // Menggunakan pop-up khusus juga saat menyalin CSS
                                    setShowToast(true);
                                    setTimeout(() => setShowToast(false), 4000);
                                }}
                                className="w-full py-4 bg-white text-black rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-gray-200 transition-transform active:scale-95 shadow-2xl"
                            >
                                Copy Full {exportTab} Code
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CUSTOM TOAST NOTIFICATION (Menggantikan alert) */}
            {showToast && (
                <div className="fixed bottom-10 right-10 z-[100] bg-green-500/10 border border-green-500/20 backdrop-blur-2xl p-6 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center gap-5 animate-[fadeIn_0.3s_ease-out]">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black font-black text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                        ✓
                    </div>
                    <div>
                        <h4 className="text-green-400 font-black text-sm tracking-widest uppercase mb-1">Berhasil Disimpan</h4>
                        <p className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase">Tindakan Anda telah dicatat.</p>
                    </div>
                </div>
            )}
        </div>
    );
}