export type Comment = {
    comment: string;
    username: string;
    image?: string | undefined;
}

//omit -> 하나 빼기 (exclude)
export type SimplePost = Omit<FullPost, "comments"> & {
    comments: number;
}

export type FullPost = {
    id: string;
    username: string;
    userImage: string;
    image: string;
    text: string;
    createdAt: string;
    likes: string[];
    //id로 비교하는게 더 좋겠지만..(중복제거를위해)
    // likes: { username: string, id: string }[];  
    comments: Comment[];
}