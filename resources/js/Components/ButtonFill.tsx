import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export default function ButtonFill({ text, className = '', ...props }: Props) {
    return (
        <button
            {...props}
            className={`px-6 py-3 border-[1.5px] border-accent bg-accent rounded transition-colors hover:border-dark-accent ${className}`}
        >
            <p className="text-white font-normal text-[18px] tracking-[-0.01em]">{text}</p>
        </button>
    );
}
