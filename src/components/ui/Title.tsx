import React from 'react';

export default function Title({ text }: { text: string }) {
    return (
        <h3 className='font-bold my-3'>{text}</h3>
    );
}

