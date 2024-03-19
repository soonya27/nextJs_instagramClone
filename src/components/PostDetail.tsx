import { SimplePost } from '@/model/post';
import Image from 'next/image';
import React from 'react';
import Avatar from './Avatar';
import ActionBar from './ActionBar';
import PostUserAvatar from './PostUserAvatar';
import useFullPost from '@/hooks/usePost';

type Props = {
    post: SimplePost;
}
export default function PostDetail({
    post,
    post: { id, username, userImage, image, text, createdAt, likes },
}: Props) {
    // const { data, isLoading, error } = useSWR<FullPost>(`/api/posts/${id}`);
    const { post: data, loading, error, postComment } = useFullPost(id);
    const comments = data?.comments;


    // userFullPost 의 postComment
    // const { user } = useMe();
    // const handlePostComment = (comment: string) => {
    //     user && postComment({
    //         username: user.username,
    //         image: user.image,
    //         comment,
    //     });
    // }
    return (
        <article className='flex flex-col md:flex-row w-full h-full'>
            <div className='relative basis-2/4 md:basis-3/5'>
                <Image src={image} alt={`photo by ${username}`} fill sizes='650px'
                    className='object-cover'
                    priority
                />
            </div>
            <div className='flex flex-col w-full basis-2/4 md:basis-2/5 min-h-0 h-full'>
                <PostUserAvatar username={username} image={userImage} />
                <div className='h-full overflow-y-auto border-t border-gray-200 p-4 m-1'>
                    {
                        comments && (
                            <ul className=''>
                                {
                                    comments.map(({ image, username: commentUsername, comment }, idx) => (
                                        <li key={`comment-${idx}`}
                                            className='flex items-center mb-1'
                                        >
                                            <Avatar image={image} size='small' highlight={commentUsername == username} />
                                            <div className='ml-2'>
                                                <span className='font-bold mr-1'>{commentUsername}</span>
                                                <span>{comment}</span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
                <ActionBar post={post} onComment={postComment} />
                {/* <CommentForm onPostComment={handlePostComment} /> */}
            </div>
        </article>
    );
}

