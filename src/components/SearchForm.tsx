'use client';
import React from 'react';

type Props = {
    searchText: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchForm({ searchText, onChange }: Props) {
    return (
        <div className='mb-4'>
            <input type="text" name="" id="" placeholder='Search For a username or name'
                className='w-full p-3 outline-none border'
                onChange={onChange}
                value={searchText}
            />
        </div>
    );
}

