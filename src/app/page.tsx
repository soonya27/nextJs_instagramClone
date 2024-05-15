import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import SideBar from '@/components/SideBar';
import UserProfile from '@/components/UserProfile';
import Title from '@/components/ui/Title';
import { getUserForProfile } from '@/service/user';
import { authOptions } from '@/util/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  // const users = getUsers(); //SSG 페이지기 때문에 getUsers 가 바로 가능/.

  //server 에서 session가져와서
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const profileUser = await getUserForProfile(user?.username || '');

  if (!user) {
    redirect('/api/auth/signin');
  }
  return (
    <section className='flex min-h-screen flex-col md:flex-row gap-4 pb-[4rem]'>
      <div className='basis-1/4'>
        {/* <SideBar user={user} /> */}
        <UserProfile user={profileUser} />
      </div>
      <div className='w-full basis-3/4 min-w-0 bg-slate-50'>
        <Title text='Followers' />
        <FollowingBar />
        <Title text='Feeds' />
        <PostList />
      </div>
    </section>
  );
}
