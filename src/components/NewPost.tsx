'use client';
import { AuthUser } from '@/model/user';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import PostUserAvatar from './PostUserAvatar';
import FilesIcon from './ui/icons/FilesIcon';
import Button from './ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GridSpinner from './ui/GridSpinner';

type Props = {
    user: AuthUser;
}
export default function NewPost({ user, user: { username, image } }: Props) {
    const [dragging, setDragging] = useState(false);
    const [file, setFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const textRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target?.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };
    const handleDrag = (e: React.DragEvent) => {
        if (e.type === 'dragenter') {
            setDragging(true);
        } else if (e.type === 'dragleave') {
            setDragging(false);
        }
    };
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const files = e.dataTransfer?.files;
        if (files && files[0]) {
            setFile(files[0]);
        }
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!file) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        //원래 textarea의 controll component로 만들기위해 state값으로 지정해야하는데, 그러면 text를 수정할떄마다 리렌더링됨으로 이미지가 깜박임
        //-> ref를 사용
        formData.append('text', textRef.current?.value ?? '');

        fetch('/api/posts/', { method: 'POST', body: formData })
            .then(res => {
                if (!res.ok) {
                    setError(`${res.status} ${res.statusText}`);
                    return;
                }
                router.push('/');
            }).catch(err => setError(err.toString()))
            .finally(() => setLoading(false));

    }
    return (
        <section className='w-full max-w-xl flex flex-col items-center mx-auto mt-6'>
            {loading && <div className='absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20'><GridSpinner /></div>}
            {error && <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold'>{error}</p>}
            <PostUserAvatar username={username} image={image ?? ''} />
            <form action=""
                onSubmit={handleSubmit}
                className='w-full flex flex-col mt-2'>
                <input className='hidden'
                    type="file" name='input' id='input-upload' accept='image/*'
                    onChange={handleChange}
                />
                <label
                    className={`w-full h-60 flex flex-col items-center justify-center ${!file && 'border-2 border-sky-500 border-dashed'}`}
                    htmlFor="input-upload"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}>

                    {dragging && <div className='absolute inset-0 z-10 bg-sky-500/20 pointer-events-none'></div>}
                    {!file && (
                        <div className='flex flex-col items-center pointer-events-none'>
                            <FilesIcon />
                            <p>Drag and Drop your image here or click</p>
                        </div>
                    )}
                    {file && (
                        <div className='relative w-full aspect-square'>
                            <Image
                                className='object-cover'
                                src={URL.createObjectURL(file)} alt='local file' fill sizes='650px' />
                        </div>
                    )}
                </label>
                <textarea
                    className='outline-none text-lg border border-neutral-300'
                    name="text" id="input-text" required
                    rows={10} placeholder={'Write a caption'}
                    ref={textRef}
                ></textarea>
                <Button text='Publish' onClick={() => { }} />
            </form>
        </section>
    );
}

