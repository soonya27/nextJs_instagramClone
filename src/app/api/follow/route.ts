import { NextRequest, NextResponse } from 'next/server';
import { followUser, unFollwUser } from '@/service/user';
import { withSessionUser } from '@/util/session';

export async function PUT(req: NextRequest) {
    return withSessionUser(async (user) => {
        const { id: targetId, follow: isFollow } = await req.json();

        if (!targetId || isFollow === undefined) {
            return new Response('Bad Request', { status: 400 })
        }

        const request = isFollow ? followUser : unFollwUser;

        return request(user.id, targetId)
            .then(res => NextResponse.json(res))
            .catch(error => new Response(JSON.stringify(error), { status: 500 }))
    })
}