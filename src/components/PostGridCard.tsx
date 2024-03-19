import { SimplePost } from '@/model/post';
import Image from 'next/image';
import React, { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import { signIn, useSession } from 'next-auth/react';

type Props = {
    post: SimplePost;
    priority?: boolean;
}

export default function PostGridCard({ post, priority = false }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const { image, username } = post;
    const { data: session } = useSession();
    const handleOpenPost = () => {
        if (!session?.user) {
            // redirect('/api/auth/signin');  //-> serverComponent에서만 사용가능
            //useRouter 또는 signIn()
            return signIn();
        }
        setOpenModal(true);
    };
    const onClose = () => {
        setOpenModal(false);
    }
    return (
        <div className='relative w-full aspect-square'>
            <Image src={image} alt={`photo by ${username}`} fill sizes='650px' priority={priority}
                onClick={handleOpenPost}
                className='object-cover'
            />
            {
                openModal && (
                    <ModalPortal>
                        <PostModal onClose={onClose} >
                            <PostDetail post={post} />
                        </PostModal>
                    </ModalPortal>
                )
            }
        </div>
    );
}

