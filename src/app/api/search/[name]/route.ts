import { NextRequest, NextResponse } from 'next/server';
import { getUserList } from '@/service/user';


type Context = {
    params: { name: string }
}

//slug name값 받아와야함
// export async function GET(request: NextRequest, context: Context) {
//-> request인자를 사용하지 않을때 _로 표시
export async function GET(_: NextRequest, context: Context) {
    return getUserList(context.params.name)
        .then(data => NextResponse.json(data));
}