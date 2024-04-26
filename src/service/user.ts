import { sendEmail } from './mail';
import { client } from './sanity'
import { AuthUser, SearchUser } from '@/model/user';

export async function addUser({ id, email, name, username, image }: AuthUser) {
    const user = await getUserList(name);

    const result = client.createIfNotExists({
        _id: id,
        _type: 'user',
        username,
        name,
        email,
        image,
        following: [],
        followers: [],
        bookmarks: [],
    }).then((res) => {
        // console.log('new user was added');

        //가입? 완료 메일 보내기
        if (user.length === 0) {
            sendEmail(email);
        }
    })
    return result
}

// following[]-> {username, image}  => 레퍼런스..를  가져올때 표시하는거 following[]안에 user 의 ref만 담김
// post에서 comment[] 를 다르게 가져올때는
// comments[]{comment //comment는 그냔 객체key값, author->{username}//author는 reference }

export async function getUserByUsername(username: string) {
    return client.fetch(
        `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id" : _id,
            following[]-> {username, image},
            followers[]-> {username, image},
            "bookmarks" : bookmarks[]->_id
        }`
    );
}

export async function getUserList(name?: string) {
    // let serachProjection = ``
    // if (!name) {
    //     serachProjection = `*[_type == "user"]`
    // }
    // serachProjection = `*[_type == "user" ${name && ` && (username == "${name}" ||  name == "${name}")` } ]`
    return client.fetch(
        `*[_type == "user" ${name ? `&& (username  match "${name}*" ||  name  match "${name}*")` : ''} ]{
            ...,
            "id" : _id,
            "following" : count(following),
            "followers" : count(followers),
        }`,
        undefined,
        { cache: 'no-store' }
    ).then(users => users.map((user: SearchUser) => ({
        ...user, following: user.following ?? 0,
        followers: user.followers ?? 0
    })))

}


export async function getUserForProfile(username: string) {
    //post에 대한 api를 한번더 불러와서 합치는 것보다.. 한번에 쿼리로 가져오는게 가장 좋음 (입출력을 줄임)
    return client.fetch(
        `*[_type == "user" && username == "${username}"][0]{
            ...,
            "id" : _id,
            "following" : count(following),
            "followers" : count(followers),
            "posts" : count(*[_type == "post" && author->username == "${username}"])
        }`,
        undefined,
        { cache: 'no-store' }
    ).then(user => {
        if (!user) return undefined;
        return {
            ...user,
            following: user.following ?? 0,
            followers: user.followers ?? 0,
            posts: user.posts ?? 0,
        }
    })
}


export async function addBookmark(userId: string, postId: string) {
    return client.patch(userId)
        .setIfMissing({ bookmarks: [] })
        .append('bookmarks', [{ _ref: postId, _type: 'reference' }])
        .commit({ autoGenerateArrayKeys: true, })
}
export async function removeBookmark(userId: string, postId: string) {
    return client.patch(userId)
        .unset([`bookmarks[_ref=="${postId}"]`])
        .commit()
}
//user의 following에서 추가하고, targetUser의 followers에서 추가
export async function followUser(userId: string, targetUserId: string) {
    return client
        .transaction()
        .patch(userId, (user) =>
            user
                .setIfMissing({ following: [] })
                .append('following', [{ _ref: targetUserId, _type: 'reference' }]))
        .patch(targetUserId, (user) =>
            user
                .setIfMissing({ followers: [] })
                .append('followers', [{ _ref: userId, _type: 'reference' }]))
        .commit({ autoGenerateArrayKeys: true, })
}
//user의 following에서 지우고, 해당 user의 followers에서 삭제
export async function unFollwUser(userId: string, targetUserId: string) {
    return client
        .transaction()
        .patch(userId, user =>
            user.unset([`following[_ref=="${targetUserId}"]`]))
        .patch(targetUserId, user =>
            user.unset([`followers[_ref=="${userId}"]`]))
        .commit()

}
