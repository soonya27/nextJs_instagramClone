'use client';
import React from 'react';
import { PropagateLoader } from 'react-spinners';
import ScrollableCarousel from './ScrollableCarousel';
import Link from 'next/link';
import Avatar from './Avatar';
import useMe from '@/hooks/useMe';

export default function FollowingBar() {
    //1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자의 정보를 얻어옴
    //2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
    //3. 백엔드에서 사용자의 상세 정보를 sanity 에서 가져옴
    //4. 클라이언트 컴포넌트에서 ui정보 보여줌

    // const { data, isLoading: loading, error } = useSWR<HomeUser>('/api/me');
    const { user, loading, error, setBookmark } = useMe();
    const followingList = user?.following;
    return (
        <section className='p-4 mb-2'>
            {/* <div className='w-full text-center p-4'><PropagateLoader color="#36d7b7" /></div> */}
            {/* {loading && <div className='w-full text-center p-4'><PropagateLoader color="#36d7b7" /></div>}
            {
                data && (
                    <UserCarousel data={followingList} />

                )
            } */}


            {
                loading ?
                    (<div className='w-full text-center p-4 mb-2'><PropagateLoader color="red" size={8} /></div>)
                    : (
                        (!followingList || followingList.length == 0) && <p>{`You don't have follwings`}</p>
                    )
            }
            {
                (followingList && followingList.length > 0)
                && (
                    <ScrollableCarousel>
                        {
                            followingList.map(item => (
                                <Link href={`/user/${item.username}`} key={item.username}
                                    className='flex items-center flex-col'
                                >
                                    <Avatar image={item.image} highlight />
                                    <p>{item.username}</p>
                                </Link>
                            ))
                        }
                    </ScrollableCarousel>
                )
            }

        </section>
    );
}

