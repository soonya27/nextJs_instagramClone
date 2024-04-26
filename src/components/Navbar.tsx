'use client'
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import { useSession, signIn, signOut } from "next-auth/react"
import Avatar from './Avatar';
import LogoutIcon from './ui/icons/LogoutIcon';
import UserIcon from './ui/icons/UserIcon';



const menuList = [
    { href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
    { href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
    { href: '/new', icon: <NewIcon />, clickedIcon: <NewFillIcon /> },
]

export default function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <header className='sticky top-0 bg-white border-b max-w-screen-xl mx-auto px-3 py-2 z-10 flex justify-between items-center'>
            <Link href='/' className='font-bold text-lg'>
                Instantgram
            </Link>
            <nav>
                <ul className='flex items-center gap-2'>

                    {
                        menuList.map(({ href, clickedIcon, icon }, idx) => (
                            <li key={idx}>
                                <Link href={href}>
                                    {
                                        pathname === href
                                            ? clickedIcon
                                            : icon
                                    }
                                </Link>
                            </li>
                        ))
                    }
                    {user ? (
                        <li><Link href={`/user/${user.username}`}>
                            <Avatar image={user.image} size='small' highlight />
                        </Link></li>
                    ) : (
                        <Link href='' onClick={() => signIn()} >
                            <UserIcon />
                        </Link>
                    )}
                    {
                        session && (<li>
                            <Link href='' onClick={() => signOut()} >
                                <LogoutIcon />
                            </Link>
                        </li>)
                    }


                </ul>
            </nav>
        </header>
    );
}

