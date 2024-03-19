import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/service/post';
import { withSessionUser } from '@/util/session';


type Context = {
    params: { id: string }
}

//slug id값 받아와야함
export async function GET(_: NextRequest, context: Context) {
    return withSessionUser(async () =>
        getPost(context.params.id)
            .then(data => NextResponse.json(data))
    )
}