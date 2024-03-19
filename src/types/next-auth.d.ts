import { AuthUser } from '@/model/user';
import NextAuth, { DefaultSession } from 'next-auth';

declare module "next-auth" {
    //기존 Session의 type을 재정의  (DefaultSession) 에 추가로 username값을 추가
    interface Session {
        // user: {
        //     username: string
        // } & DefaultSession['user']; //nextAUth의  name과 username 이 옵셔널임

        //재정의
        user: AuthUser
    }
}