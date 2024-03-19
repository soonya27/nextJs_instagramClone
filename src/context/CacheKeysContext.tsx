import { createContext, useContext } from 'react';
type CacheKeysValue = {
    postsKey: string;
}

export const CacheKeysContext = createContext<CacheKeysValue>({
    //기본값!! ->postsKey가 다른곳만  provider로 묶으며 value값을 넣어줌
    postsKey: '/api/posts',
});

export const useCacheKeys = () => useContext(CacheKeysContext);