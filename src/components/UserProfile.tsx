import { ProfileUser } from '@/model/user';
import React from 'react';
import Avatar from './Avatar';
import FollowButton from './ui/icons/FollowButton';


type Props = {
    user: ProfileUser;
}
export default function UserProfile(
    { user,
        user: { image, name, username, posts, followers, following }
    }: Props) {
    const detail = [
        { title: 'posts', count: posts },
        { title: 'followers', count: followers },
        { title: 'following', count: following },
    ]
    return (

        <section className='w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300'>
            <Avatar image={image} highlight size="xlarge" />
            <div className='md:ml-10 basis-1/3'>
                <div className='flex flex-col items-center md:flex-row '>
                    <h2 className='text-2xl md:mr-8 my-2 md:mb-0'>{username}</h2>
                    <FollowButton user={user} />
                </div>
                <ul className='my-4 flex gap-4'>
                    {
                        detail.map(({ title, count }, idx) => (
                            <li key={idx}>
                                <span className='font-bold mr-1'>{count}</span>
                                {title}
                            </li>
                        ))
                    }
                </ul>
                <p className='text-xl font-bold text-center md:text-start'>{name}</p>
            </div>
        </section>
    );
}

