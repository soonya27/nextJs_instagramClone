import { AuthUser } from '@/model/user';
import React from 'react';
import Avatar from './Avatar';

type Props = {
    user: AuthUser
}
export default function SideBar({ user, user: { name, username, email, image } }: Props) {
    return (
        <>
            <div className='flex items-center'>
                {image && <Avatar image={image} />}
                <div className='ml-4'>
                    <p className='font-bold'>{username}</p>
                    <span className='text-lg text-neutral-500 leading-4'>{name}</span>
                </div>
            </div>
            <p className='text-sm text-neutral-500 mt-8'>
                About Help Press Api Jobs Privacy...
            </p>
        </>
    );
}

