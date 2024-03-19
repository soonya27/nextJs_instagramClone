export type AuthUser = {
    id: string;
    name: string;
    email: string;
    username: string;
    image?: string;
}


//User에서 특정 몇개 뽑아쓰기
export type SimpleUser = Pick<AuthUser, 'username' | 'image'>

export type HomeUser = AuthUser & {
    following: SimpleUser[];
    followers: SimpleUser[];
    bookmarks: string[];
}

export type SearchUser = AuthUser & {
    following: number;
    followers: number;
}

export type ProfileUser = SearchUser & {
    posts: number;
}