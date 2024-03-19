import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
    return fetch('/api/bookmark', {
        method: 'PUT',
        body: JSON.stringify({ id: postId, bookmark })
    }).then((res) => res.json());
}
async function updateFollow(targetId: string, follow: boolean) {
    return fetch('/api/follow', {
        method: 'PUT',
        body: JSON.stringify({ id: targetId, follow })
    }).then((res) => res.json());
}



export default function useMe() {
    const { data: user, isLoading: loading, error, mutate } = useSWR<HomeUser>('/api/me');

    //reRendering 되는 걸 방지  (성능개선)  => useCallback
    const setBookmark = useCallback((postId: string, bookmark: boolean) => {
        if (!user) return;
        //optimisticData  - 즉각적으로 ui에 업데이트할 데이터
        const bookmarks = user.bookmarks;
        const newUser = {
            ...user,
            bookmarks: bookmark
                ? [...bookmarks, postId]
                : bookmarks.filter(item => item !== postId),
        }

        return mutate(updateBookmark(postId, bookmark), {
            optimisticData: newUser,  //업데이트될 데이터를 미리 만들어놓음. 이걸로 업데이트함 
            populateCache: false,
            revalidate: false,  //이미 어떤 결과값인지 알아서 새 데이터를 다시 가져올필요없음
            rollbackOnError: true, //하지만 에러가나면 데이터 다시 가져옴(like취소)

        })
    }, [user, mutate]);

    //following 변경
    const toggleFollow = useCallback((targetId: string, follow: boolean) => {
        return mutate(updateFollow(targetId, follow), {
            populateCache: false,
        })
    }, [mutate])

    return { user, loading, error, setBookmark, toggleFollow }
}