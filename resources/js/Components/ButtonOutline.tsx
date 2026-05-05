import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export default function ButtonOutline({ text, className = '', ...props }: Props) {
    return (
        <button
            {...props}
            className={`px-6 py-3 border-[1.5px] border-gray bg-secondary rounded transition-colors hover:bg-fade hover:text-white ${className}`}
        >
            <p className="text-gray font-normal text-[18px] tracking-[-0.01em] group-hover:text-white">{text}</p>
        </button>
    );
}
