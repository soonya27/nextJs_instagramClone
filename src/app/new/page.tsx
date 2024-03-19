import NewPost from '@/components/NewPost';
import { authOptions } from '@/util/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a New Post",
};

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  return (
    <NewPost user={session.user} />
  );
}
