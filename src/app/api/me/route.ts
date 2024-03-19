import { getUserByUsername } from '@/service/user';
import { NextResponse } from 'next/server';
import { withSessionUser } from '@/util/session';

//next auth 에서는 jwt토큰을 자동으로 body?안에 넣어서 보내줌
export async function GET() {
    return withSessionUser(async (user) =>
        getUserByUsername(user?.username || '')
            .then(data => NextResponse.json(data))
    )
}