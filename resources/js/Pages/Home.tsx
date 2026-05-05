import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ButtonFill from '../Components/ButtonFill';
import ThreeClover from '../Components/ThreeClover';
import { Share2, Crown, Zap } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white font-inter">
            <Head title="Home" />
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 py-8 relative z-10">
                {/* Row 1: Header */}
                <Header />

                {/* Row 2: Hero */}
                <main className="flex flex-col items-center text-center gap-12 mt-12 w-full max-w-5xl mx-auto">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-[36px] h-[36px] bg-dark rounded flex items-center justify-center text-white font-bold text-xs">OD</div>
                            <h6 className="text-dark text-[27px] font-normal leading-tight tracking-[-0.015em]">Onedesign</h6>
                        </div>
                        <h1 className="text-dark font-normal leading-tight tracking-[-0.015em] text-[50px] md:text-[80px] lg:text-[110px] mt-6">
                            Amplify your creativity with Onedesign standards
                        </h1>
                    </div>
                    
                    <Link href="/lab">
                        <ButtonFill text="Start Designing" className="mt-8 shadow-xl shadow-accent/20" />
                    </Link>
                </main>

                {/* Row 3: Benefits */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20">
                    <ThreeClover 
                        icon={<Share2 size={48} strokeWidth={1.5} />}
                        title="One Space, Infinite Flow"
                        description="Eliminate tool fatigue with a streamlined platform that puts every essential design and development tool right at your fingertips."
                    />
                    <ThreeClover 
                        icon={<Crown size={48} strokeWidth={1.5} />}
                        title="UX Excellence, Built-in"
                        description="Design with confidence knowing your work automatically adheres to Onedesign’s premium UI/UX standards for a seamless user experience."
                    />
                    <ThreeClover 
                        icon={<Zap size={48} strokeWidth={1.5} />}
                        title="From Pixels to Production"
                        description="Bridge the gap between vision and reality by instantly turning your designs into fully functional applications or live web links."
                    />
                </section>

                {/* Row 4: Footer */}
                <div className="mt-20 border-t border-gray/10 pt-12">
                    <Footer />
                </div>
            </div>
            {/* Background elements to make it premium */}
            <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse pointer-events-none"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-dark-accent/10 rounded-full blur-[120px] -z-10 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
        </div>
    );
}
