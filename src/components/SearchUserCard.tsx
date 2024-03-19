import { SearchUser } from '@/model/user';
import React from 'react';
import Avatar from './Avatar';
import Link from 'next/link';

type Props = {
    user: SearchUser;
}
export default function SearchUserCard({ user: { username, name, image, followers, following } }: Props) {
    return (
        //해당 링크로 보내는 방법.
        //1. next의 Link를 사용하거나   -> 미리 SSG로 만들어놓음 (prefecthing..)  => 굳이 prefecthing은 너무 무거울거같다 하면 2번사용
        //2. useRoute로 해당 링크 보내기 
        <Link href={`/user/${username}`} className='flex items-center border p-3 px-4 bg-white bg-opacity-50'>
            {image && <Avatar image={image} size='large' />}
            <div className='ml-2 [&>*]:leading-[1.2]'>
                <strong>{username}</strong>
                <p className='text-sm'>{name}</p>
                <p className='text-sm text-neutral-600'>
                    {`${followers} followers ${following} following`}
                </p>
            </div>
        </Link>
    );
}

