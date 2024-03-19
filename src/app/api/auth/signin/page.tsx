import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/util/authOptions';
import { redirect } from 'next/navigation';
import SignIn from '@/components/SignIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Signin",
    description: "Signup Or Login to Instantgram",
};


type Props = {
    searchParams: { callbackUrl: string };
}
export default async function SignPage({ searchParams: { callbackUrl } }: Props) {
    const session = await getServerSession(authOptions);

    if (session) {
        // return { redirect: { destination: "/" } }
        redirect('/');
    }
    const providers = (await getProviders()) ?? {}
    return (
        <section className='flex justify-center items-center w-full min-h-screen'>
            <SignIn providers={providers} callbackUrl={callbackUrl ?? '/'} />
        </section>
    )
}
