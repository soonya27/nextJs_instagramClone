import React, { useState } from 'react';
import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import { Comment, SimplePost } from '@/model/post';
import { useSession } from 'next-auth/react';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import usePosts from '@/hooks/usePosts';
import useMe from '@/hooks/useMe';
import { comment } from 'postcss';
import CommentForm from './CommentForm';

// type PickedSimplePost = Pick<SimplePost, 'likes' | 'username' | 'text' | 'createdAt'>;
// type OptionalExceptFor<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>

// type Props = OptionalExceptFor<PickedSimplePost, 'text'>  //text만 optional

type Props = {
    post: SimplePost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
}
export default function ActionBar({ post, children, onComment }: Props) {
    const { id, likes, createdAt } = post;
    //session user 가 있으면 -> likes.id 와 비교 있으면 ui checked

    //username -> bookmark조회
    const { user, setBookmark } = useMe();
    const { setLike } = usePosts();

    // const [bookmarked, setBookmarked] = useState(loginedUser ? logindedUserDetail?.bookmarks.includes(id) : false);
    const bookmarked = user ? user.bookmarks.includes(id) : false;
    const liked = user ? likes.includes(user.username) : false;

    const handleBookmark = (bookmark: boolean) => {
        user && setBookmark(post.id, bookmark)
        // fetch('/api/bookmark', {
        //     method: 'PUT',
        //     body: JSON.stringify({ id, bookmark })
        // }).then(() => mutate('/api/me'));
    }
    const handleLike = (like: boolean) => {
        //api요청후.. setLiked변경
        // fetch('/api/likes', {
        //     method: 'PUT',
        //     body: JSON.stringify({ id, like })
        // }).then(() => setLiked(like));  ==> hooks로 만듬

        //데이터요청후 데이터 자체를 업데이트해서 다시 불러오기떄문에
        //(여기선 업데이트만 하고 다시 불러오지않지만)
        //ui적인 업데이트가 필요없음(원래 liked, setLiked에 대한 useState값으로 변경했으나 state값이 필요없어짐)
        user && setLike(post, user.username, like)
    }


    const handlePostComment = (comment: string) => {
        user && onComment({
            username: user.username,
            image: user.image,
            comment,
        });
    }

    return (
        <>
            <div className='flex justify-between my-2 px-4'>
                {/* <button ><HeartIcon className={`${isClickedHeart}`} /></button> */}
                <ToggleButton onToggle={handleLike} toggled={liked}
                    offIcon={<HeartIcon />}
                    onIcon={<HeartFillIcon />} />

                <ToggleButton onToggle={handleBookmark} toggled={bookmarked}
                    offIcon={<BookmarkIcon />}
                    onIcon={<BookmarkFillIcon />} />
            </div>
            <div className='px-4 py-1'>
                <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
                {children}
                <p className='text-sx text-neutral-500 uppercase my-2'>{parseDate(createdAt)}</p>
            </div>
            <CommentForm onPostComment={handlePostComment} />
        </>
    );
}

