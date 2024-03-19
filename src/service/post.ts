import { client, urlFor } from './sanity';
import { FullPost, SimplePost } from '@/model/post';

//    "likes" : likes[]->{username, "id":_id},
const simplePostProjection = `
    ...,
    "username" : author->username,
    "userImage" : author-> image,
    "likes" : likes[]->username,
    "image" : photo,
    "text" : comments[0].comment,
    "comments" : count(comments),
    "id" : _id,
    "createdAt" :_createdAt
`
// comments[]{comment, author->{username, image}},
const fullPostProjection = `
    ${simplePostProjection},
    comments[]{comment, "username" : author->username, "image" : author->image},
`


export async function getFollowingPostByUsername(username: string) {
    return client.fetch(
        `*[_type == "post" && author._ref in *[_type=="user" && username=="${username}"]._id 
        || author._ref in *[_type=="user" && username=="${username}"].following[]._ref ]
        | order(_createdAt desc)
            {${simplePostProjection}
            }
        `,
        undefined,
        { cache: 'no-store' }
    ).then(mapPosts)



    //     `*[_type == "post" && author->username == "${username}"
    //             || author._ref in *[_type == "user" && username == "${username}"].following[]._ref ]
    //             | order(_createdAt desc) {...}
    // `
}


export async function getPost(id: string) {
    return client.fetch(
        `*[_type == "post" && _id == "${id}"][0] {
            ${fullPostProjection}
        }
        `,
        undefined,
        { cache: 'no-store' }
    ).then((post: FullPost) => ({ ...post, image: urlFor(post.image) }));
}


export async function getPostOf(username: string) {
    return client.fetch(
        `*[_type == "post" && author->username == "${username}"]
        | order(_createdAt desc) {
            ${simplePostProjection}
        }`,
        undefined,
        { cache: 'no-store' }
    ).then(mapPosts)
}


export async function getLikedPostOf(username: string) {
    return client.fetch(
        `*[_type == "post" && "${username}" in likes[]->username ]
        | order(_createdAt desc) {
            ${simplePostProjection}
        }`,
        undefined,
        { cache: 'no-store' }
    ).then(mapPosts)
}

export async function getSavedPostOf(username: string) {
    return client.fetch(
        `*[_type == "post" && _id in *[_type == "user" && username == "${username}"][0].bookmarks[]->_id ]
        | order(_createdAt desc) {
            ${simplePostProjection}
        }`,
        undefined,
        { cache: 'no-store' }
    ).then(mapPosts)
}

function mapPosts(posts: SimplePost[]) {
    return posts.map((post: SimplePost) => ({
        ...post,
        image: urlFor(post.image),
        likes: post.likes ?? [],
    }))
}



export async function likePost(postId: string, userId: string) {
    return client.patch(postId)
        .setIfMissing({ likes: [] })
        .append('likes', [{ _ref: userId, _type: 'reference' }])
        .commit({ autoGenerateArrayKeys: true, })
}

export async function dislikePost(postId: string, userId: string) {
    return client.patch(postId)
        .unset([`likes[_ref=="${userId}"]`])
        .commit()
}


export async function addCommentPost(postId: string, userId: string, text: string) {
    return client.patch(postId)
        .setIfMissing({ comments: [] })
        .append('comments', [
            {
                author: { _ref: userId, _type: 'reference' },
                comment: text
            },
        ])
        .commit({ autoGenerateArrayKeys: true, })
}


export async function createPost(userId: string, text: string, file: Blob) {
    return client.assets
        .upload('image', file)
        .then((result) => {
            return client.create(
                {
                    _type: 'post',
                    author: { _ref: userId },
                    photo: { asset: { _ref: result._id } },
                    comments: [
                        {
                            comment: text,
                            author: { _ref: userId, _type: 'reference' },
                        },
                    ],
                    likes: [],
                },
                { autoGenerateArrayKeys: true }
            );
        });

}