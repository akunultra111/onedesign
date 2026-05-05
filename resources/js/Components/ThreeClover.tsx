import React from 'react';

interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function ThreeClover({ icon, title, description }: Props) {
    return (
        <div className="flex flex-col gap-6">
            <div className="text-dark w-[48px] h-[48px] flex items-center justify-center">{icon}</div>
            <h6 className="text-dark text-[27px] tracking-[-0.015em] font-normal leading-[1.2]">{title}</h6>
            <p className="text-gray text-[18px] tracking-[-0.01em] font-normal leading-[1.5]">{description}</p>
        </div>
    );
}
