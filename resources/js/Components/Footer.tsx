import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full flex flex-col items-center py-16 gap-12">
            <div className="w-full flex justify-start">
                <h6 className="text-dark text-[27px] tracking-[-0.015em] font-normal leading-[1.2]">Amplify your creativity.</h6>
            </div>
            <h1 className="text-dark text-[80px] md:text-[206px] tracking-[-0.015em] font-normal leading-[1.2] text-center break-words w-full overflow-hidden">Onedesign</h1>
            <p className="text-gray text-[12px] font-normal leading-[1.5]">Copyright 2026 Onedesign. All rights reserved.</p>
        </footer>
    );
}
