import UserPost from '@/components/UserPost';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';
import { getFollowingPostByUsername } from '@/service/post';

type Props = {
    params: { username: string }
}

//getUserForProfile 이 서버상에서 2번 호출됨
//cache()를 이용하여 캐시에 저장함
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
    // const user = await getUserForProfile(username);
    const user = await getUser(username);
    if (!user) {
        notFound();
    }
    return (
        <section className='w-full'>
            <UserProfile user={user} />
            <UserPost user={user} />
        </section>
    );
}


//dinamic router의 metadata
export async function generateMetadata({ params: { username } }: Props): Promise<Metadata> {
    const user = await getUser(username);
    return {
        title: `${user?.name} (@${user?.username}) - Instantgram Photos`,
        description: `${user?.name}'s all Instantgram posts`
    }
}
