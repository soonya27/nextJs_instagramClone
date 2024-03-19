'use client';
import { ProfileUser } from '@/model/user';
import React, { useState } from 'react';
import PostIcon from './ui/icons/PostIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import HeartIcon from './ui/icons/HeartIcon';
import PostGrid from './PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';


type Props = {
    user: ProfileUser;
}

// export type PostTab = 'posts' | 'saved' | 'liked';
// const tabList: PostTab[] = ['posts', 'saved', 'liked'];

const tabs = [
    { type: 'posts', icon: <PostIcon /> },
    { type: 'saved', icon: <BookmarkIcon className='w-3 h-3' /> },
    { type: 'liked', icon: <HeartIcon className='w-3 h-3' /> },
]


export default function UserPost({ user: { username } }: Props) {
    // api/users/${username}/posts
    // api/users/${username}/liked
    // api/users/${username}/saved  (bookmarks)
    const [query, setQuery] = useState(tabs[0].type);

    return (
        <section>
            <ul className='flex justify-center uppercase '>
                {tabs.map(({ type, icon }) => (
                    <li key={type} onClick={() => setQuery(type)}
                        className={`mx-12 p-4 cursor-pointer ${type === query && 'font-bold border-black'}`}>
                        <button className='scale-150 md:scale-100'>{icon}</button>
                        <span className='hidden md:inline'>{type}</span>
                    </li>
                ))}
            </ul>
            <CacheKeysContext.Provider
                value={{ postsKey: `/api/users/${username}/${query}` }}>
                <PostGrid />
            </CacheKeysContext.Provider>
        </section>
    );
}

