import { addUser } from '@/service/user';
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
        }),
    ],
    callbacks: {
        async signIn({ user: { id, name, image, email } }) {
            // user의  type에 User | AdapterUser  => addUser에 정의한 type과 맞지않음.. (추가속성이있어서)
            // console.log(user)
            if (!email) {
                return false;
            }
            addUser({
                id: id,
                name: name || '',
                username: email?.split('@')[0] || '',
                image: image ?? undefined,
                email,
            })
            return true;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token and user id from a provider.
            const user = session?.user;
            if (user) {
                session.user = {
                    ...user,
                    username: user.email?.split('@')[0] || '',
                    id: token.id as string,
                }
            }
            return session
        },
        //json 토큰이 만들어지거나 업데이트될때 callback이 호출됨
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/signin',
    }
}
