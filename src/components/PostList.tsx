'use client';
import React from 'react';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';
import usePosts from '@/hooks/usePosts';

export default function PostList() {
    const { posts, loading, error } = usePosts();

    return (
        <section>
            {loading && (
                <div className='text-center mt-32'>
                    {/* nextjs가 정적으로 페이지를 만들어두는데, spinner를 만든거와 spinner의 style이 달라서 오류가 발생함
                    무시해도 되긴하나.. 해결하는방법은
                    -> 하나 감싸서 따로  component를 만든뒤,  다이나믹하게 import하게함.. */}
                    <GridSpinner />
                </div>
            )}
            {
                posts && (
                    <ul className='flex flex-col gap-2'>
                        {posts.map((post, index) => (
                            <li key={post.id}>
                                <PostListCard post={post} priority={(index < 2)} />
                            </li>
                        ))}
                    </ul>
                )
            }
        </section>
    );
}

