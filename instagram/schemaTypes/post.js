export default {
    title: 'Post',
    name: 'post',
    type: 'document',
    fields: [
        {
            title: 'Author',
            name: 'author',
            type: 'reference',
            to: [{ type: 'user' }]
        },
        {
            title: 'Photo',
            name: 'photo',
            type: 'image',
        },
        {
            title: 'Likes',
            name: 'likes',
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
            title: 'Comments',
            name: 'comments',
            //reference 로 따로 저장하지 않고 comments는 post에서만 사용되기에
            //여기에서 자체 스키마 정의
            type: 'array',
            of: [
                {
                    title: 'Comment',
                    name: 'comment',
                    type: 'document',
                    fields: [
                        {
                            title: 'Author',
                            name: 'author',
                            type: 'reference',
                            to: [{ type: 'user' }]
                        },
                        {
                            title: 'Comment',
                            name: 'comment',
                            type: 'string'
                        }
                    ]
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'comments.0.comment',
            media: 'photo',
            authorName: 'author.name',
            authorUsername: 'author.username',
            authorEmail: 'author.email',
        },
        prepare(selection) {
            const { title, authorName, authorEmail, media } = selection;
            return {
                title,
                subtitle: `by ${authorName}(${authorEmail})`,
                media
            }
        }
    }
}