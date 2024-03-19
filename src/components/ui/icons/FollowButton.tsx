'use client';

import { ProfileUser } from '@/model/user';
import React, { useState, useTransition } from 'react';
import Button from '../Button';
import useMe from '@/hooks/useMe';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

type Props = {
    user: ProfileUser;
}

//userpage는 SSG페이지로, 빌드될때 user정보를 가져와서 보여줌
//followButton-> 클릭시 user정보 (follwing, follower변경되야함)
//이처럼 정적인 페이지의 데이터를 업뎃을 시키기 위해서-> nextjs 의 router.refresh()이용가능


export default function FollowButton({ user, user: { username } }: Props) {
    // const { data: loggedInUser } = useSWR<HomeUser>('/api/me');
    const { user: loggedInUser, toggleFollow } = useMe();

    //refresh()
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isUpdating = isPending || isFetching;

    const showButton = loggedInUser && loggedInUser.username !== username;
    const following = loggedInUser && loggedInUser.following.find(item => item.username === username)
    const text = following ? 'Unfollow' : 'Follow';

    const handleFollow = async () => {
        setIsFetching(true);
        await toggleFollow(user.id, !following);
        setIsFetching(false);
        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <>
            {
                showButton && (
                    <div className='relative'>
                        {isUpdating && (
                            <div className='absolute inset-0 flex justify-center items-center z-20'>
                                <PulseLoader size={6} />
                            </div>
                        )}
                        <Button
                            disabled={isUpdating}
                            text={text} onClick={handleFollow} red={text === 'Unfollow'} />
                    </div>
                )
            }
        </>

    );
}

