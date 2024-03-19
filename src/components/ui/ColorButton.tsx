import React from 'react';

type Props = {
    text: string;
    onClick: () => void;
    size?: 'small' | 'big';
}
export default function ColorButton({ text, onClick, size = 'small' }: Props) {
    return (
        <div className={`rounded-md bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-30 p-[0.15rem]`}>
            <button className='bg-white p-[0.3rem] text-base rounded-sm hover:opacity-90 transition-opacity'
                onClick={onClick}>
                {text}
            </button>
        </div>
    );
}

