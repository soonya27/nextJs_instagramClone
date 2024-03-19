import React, { FormEvent, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
    onPostComment: (comment: string) => void;
}

export default function CommentForm({ onPostComment }: Props) {
    const [comment, setComment] = useState('');
    const disabled = comment.trim() === '';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        //전송..fetch -> prop으로 전달받아서처리
        onPostComment(comment);
        setComment('');
    }
    return (
        <form className='flex items-center border-t border-neutral-300 px-3'
            onSubmit={handleSubmit}>
            <SmileIcon />
            <input
                className='w-full ml-2 border-none p-3 outline-none'
                type="text" name="" id="" placeholder='Add a Comment...'
                required
                value={comment} onChange={(e) => setComment(e.target.value)} />
            <button type='submit'
                disabled={disabled}
                className={`font-bold text-sky-500 ml-2 ${disabled && 'text-opacity-50 cursor-default'}`}
            >Post</button>
        </form>
    );
}

