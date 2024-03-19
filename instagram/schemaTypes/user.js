// ---- type -----
// Array
// Block
// Boolean
// Date
// Datetime
// Document
// File
// Geopoint
// Image
// Number
// Object
// Reference
// Slug
// String
// Span
// Text
// URL



export default {
    title: 'User', //sanity ui에서 보는이름
    name: 'user',  //backend 데이터접근시 보는 이름
    type: 'document',
    fields: [
        {
            title: 'Username', //Id
            name: 'username',
            type: 'string'
        },
        {
            title: 'Name', //닉네임
            name: 'name',
            type: 'string'
        },
        {
            title: 'Email',
            name: 'email',
            type: 'string'
        },
        {
            title: 'Image',
            name: 'image',
            type: 'string'
        },
        {
            title: 'Following',
            name: 'following',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }]
                }
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: 'Followers',
            name: 'followers',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'user' }]
                }
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: 'Bookmarks',
            name: 'bookmarks',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'post' }]
                }
            ],
            validation: (Rule) => Rule.unique(),
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'username'
        }
    }
}