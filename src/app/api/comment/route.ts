import { NextRequest, NextResponse } from 'next/server';
import { addCommentPost } from '@/service/post';
import { withSessionUser } from '@/util/session';

export async function POST(req: NextRequest) {
    return withSessionUser(async (user) => {
        const { id, comment } = await req.json();

        if (!id || comment === undefined) {
            return new Response('Bad Request', { status: 400 })
        }

        return addCommentPost(id, user.id, comment)
            .then(res => NextResponse.json(res))
            .catch(error => new Response(JSON.stringify(error), { status: 500 }))

    })
}