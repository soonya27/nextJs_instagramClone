import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
    return fetch('/api/likes', {
        method: 'PUT',
        body: JSON.stringify({ id, like })
    }).then((res) => res.json());
}

async function addComment(postId: string, comment: string) {
    return fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ id: postId, comment })
    }).then((res) => res.json());
}


export default function usePosts() {
    const { postsKey } = useCacheKeys();
    const { data: posts, isLoading: loading, error, mutate } = useSWR<SimplePost[]>(postsKey);

    const setLike = useCallback((post: SimplePost, username: string, like: boolean) => {
        //optimisticData  - 즉각적으로 ui에 업데이트할 데이터
        const newPost = {
            ...post,
            likes: like
                ? [...post.likes, username]
                : post.likes.filter(item => item !== username),
        }
        const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

        return mutate(updateLike(post.id, like), {
            optimisticData: newPosts,  //업데이트될 데이터를 미리 만들어놓음. 이걸로 업데이트함 
            populateCache: false,
            revalidate: false,  //이미 어떤 결과값인지 알아서 새 데이터를 다시 가져올필요없음
            rollbackOnError: true, //하지만 에러가나면 데이터 다시 가져옴(like취소)

        });
    }, [posts, mutate]);

    const postComment = useCallback((post: SimplePost, comment: Comment) => {
        const newPost = {
            ...post,
            comments: post.comments + 1,
        }
        const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

        return mutate(addComment(post.id, comment.comment), {
            optimisticData: newPosts,  //업데이트될 데이터를 미리 만들어놓음. 이걸로 업데이트함 
            populateCache: false,
            revalidate: false,  //이미 어떤 결과값인지 알아서 새 데이터를 다시 가져올필요없음
            rollbackOnError: true, //하지만 에러가나면 데이터 다시 가져옴(like취소)

        });
    }, [posts, mutate]);


    return { posts, loading, error, setLike, postComment }
}