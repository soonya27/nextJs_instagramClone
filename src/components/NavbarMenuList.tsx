'use client';
import React from 'react';
import Link from 'next/link';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import { usePathname } from 'next/navigation';



const menuList = [
    { href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
    { href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
    { href: '/new', icon: <NewIcon />, clickedIcon: <NewFillIcon /> },
]

export default function NavbarMenuList() {
    const pathname = usePathname();
    return (
        <ul className='flex items-center gap-2 justify-between max-w-screen-xl mx-auto'>
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
        </ul>
    );
}

