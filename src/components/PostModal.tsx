import React from 'react';
import CloseIcon from './ui/icons/CloseIcon';

type Props = {
    children: React.ReactNode;
    onClose: () => void;
}
export default function PostModal({ onClose, children }: Props) {
    return (
        <section onClick={(e) => {
            //section(bg 영역 클릭시)
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}
            className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-[10000]'
        >
            {/* PostModal container */}
            <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 md:h-3/5 max-w-7xl mx-auto bg-white z-[10001]'>
                <button onClick={onClose}
                    className='absolute -top-9 right-0 text-white'
                ><CloseIcon /></button>
                {children}
            </div>
        </section>
    );
}

