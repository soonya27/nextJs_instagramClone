import { NextResponse } from 'next/server';
import { getUserList } from '@/service/user';


//전체유저를 보여주거나..
//인기있는 유저순으로 몇개만 보여주는것도...


//user search page는 현재 static한 페이지..
//서버사이드긴 하지만 SSG로 만들어져서 페이지가 검색할때 컴포넌트가 변경은 되지만 데이터를 최초 한번만 호출함
//새 유저가 추가되어도 검색에 반영..X

//이유는 NEXT JS에서 제공하는 fetch 를 이용하지않고 정적인 함수를 호출하면  기본적으로 SSG가됨..!!!

export const dynamic = 'force-dynamic';
export async function GET() {
    return getUserList()
        .then(data => NextResponse.json(data));
}