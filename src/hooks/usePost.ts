import { Comment, FullPost } from '@/model/post';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';


async function addComment(postId: string, comment: string) {
    return fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ id: postId, comment })
    }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
    const { data: post, isLoading: loading, error, mutate } = useSWR<FullPost>(`/api/posts/${postId}`);


    //개인 muate와 달리 globalMutate  -> 서로다른키 연결가능 (/api/posts/{id} $$ /api/posts)
    const { mutate: globalMutate } = useSWRConfig();

    //reRendering 되는 걸 방지  (성능개선)  => useCallback
    const postComment = useCallback((comment: Comment) => {
        if (!post) return;
        const newPost = {
            ...post,
            comments: [...post.comments, comment]
        }
        return mutate(addComment(post.id, comment.comment), {
            optimisticData: newPost,  //업데이트될 데이터를 미리 만들어놓음. 이걸로 업데이트함 
            populateCache: false,
            revalidate: false,  //이미 어떤 결과값인지 알아서 새 데이터를 다시 가져올필요없음
            rollbackOnError: true, //하지만 에러가나면 데이터 다시 가져옴(like취소)

        }).then(() => globalMutate('/api/posts'));
    }, [post, mutate, globalMutate]);


    return { post, loading, error, postComment }
}