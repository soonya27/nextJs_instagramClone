'use client';
import { Comment, SimplePost } from '@/model/post';
import React, { useState } from 'react';
import Image from 'next/image';

import ActionBar from './ActionBar';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import usePosts from '@/hooks/usePosts';

type Props = {
    post: SimplePost;
    priority?: boolean;
}

export default function PostListCard({
    post,
    post: { id, username, userImage, image, text, comments },
    priority = false
}: Props) {
    const [openModal, setOpenModal] = useState(false);
    const handleClick = () => setOpenModal(true);
    const onClose = () => {
        setOpenModal(false);
    }

    //하나는 usePosts의 postComment
    const { postComment } = usePosts();
    const handlePostComment = (comment: Comment) => {
        postComment(post, comment);
    }
    return (
        <article className='rounded-lg shadow-md border border-gray-200 bg-white'>
            <PostUserAvatar username={username} image={userImage} />
            <div className='mx-4'>
                <Image src={image} alt={`photo by ${username}`} width={600} height={600}
                    className='w-full object-cover aspect-square rounded-sm'
                    priority={priority}
                    onClick={handleClick}
                />
            </div>
            <ActionBar post={post} onComment={handlePostComment}>
                {text && (
                    <p>
                        <span className='font-bold mr-1'>{username}</span>
                        {text}
                    </p>
                )}
                {
                    comments > 1 && <button className='font-bold my-2 text-sky-500'
                        onClick={handleClick}>View All {comments} Comments</button>
                }
            </ActionBar>
            {/* <CommentForm onPostComment={handlePostComment} /> */}
            {
                openModal && (
                    <ModalPortal>
                        <PostModal onClose={onClose} >
                            <PostDetail post={post} />
                        </PostModal>
                    </ModalPortal>
                )
            }
        </article>
    );
}

