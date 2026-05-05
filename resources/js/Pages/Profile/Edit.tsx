import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

interface Props {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: Props) {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-purple-500 selection:text-white pb-20">
            <Head title="Pengaturan Profil - Onedesign" />
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed top-0 left-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen -translate-x-1/2"></div>

            <main className="max-w-4xl mx-auto pt-32 px-6 relative z-10">
                <header className="mb-12">
                    <h1 className="text-5xl font-black tracking-tighter mb-4 text-white uppercase drop-shadow-2xl">
                        Profil & Keamanan
                    </h1>
                    <p className="text-white/60 font-bold text-sm tracking-[0.2em] uppercase">
                        Kelola identitas dan preferensi akun Spatial Anda.
                    </p>
                </header>

                <div className="space-y-8">
                    {/* Panel 1: Update Profil */}
                    <div className="p-8 sm:p-12 bg-white/5 border border-white/10 shadow-2xl sm:rounded-[32px] backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="relative z-10 dark-theme-forms">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* Panel 2: Update Password */}
                    <div className="p-8 sm:p-12 bg-white/5 border border-white/10 shadow-2xl sm:rounded-[32px] backdrop-blur-xl relative overflow-hidden">
                         <div className="relative z-10 dark-theme-forms">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Panel 3: Hapus Akun (Zona Berbahaya) */}
                    <div className="p-8 sm:p-12 bg-red-900/10 border border-red-500/20 shadow-2xl sm:rounded-[32px] backdrop-blur-xl relative overflow-hidden">
                        <div className="relative z-10 dark-theme-forms">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </main>

            {/* CSS INJECTIONS UNTUK MEMAKSA FORM BREEZE MENJADI DARK MODE */}
            <style dangerouslySetInnerHTML={{__html: `
                .dark-theme-forms h2 { color: #ffffff !important; font-weight: 900 !important; text-transform: uppercase; letter-spacing: 0.1em; font-size: 1.5rem !important;}
                .dark-theme-forms p { color: rgba(255,255,255,0.6) !important; font-weight: 500 !important; }
                .dark-theme-forms label { color: rgba(255,255,255,0.8) !important; font-weight: 800 !important; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.75rem !important; }
                .dark-theme-forms input[type="text"], .dark-theme-forms input[type="email"], .dark-theme-forms input[type="password"] { 
                    background-color: rgba(0,0,0,0.5) !important; 
                    border: 1px solid rgba(255,255,255,0.2) !important; 
                    color: white !important; 
                    border-radius: 12px !important;
                    padding: 12px 16px !important;
                }
                .dark-theme-forms input:focus { border-color: #a855f7 !important; box-shadow: 0 0 0 2px rgba(168,85,247,0.2) !important; }
                .dark-theme-forms button.inline-flex { 
                    background-color: #ffffff !important; 
                    color: #000000 !important; 
                    border-radius: 12px !important; 
                    font-weight: 900 !important; 
                    text-transform: uppercase !important; 
                    letter-spacing: 0.1em !important; 
                }
                .dark-theme-forms button.inline-flex:hover { background-color: #e5e7eb !important; transform: scale(1.02); }
            `}} />
        </div>
    );
}