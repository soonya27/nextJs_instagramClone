import React from 'react';
import NavbarMenuList from './NavbarMenuList';

export default function FooterNavBar() {
    return (
        <div className='fixed w-full bottom-0 left-0 bg-white border py-4 px-3 sm:block md:hidden'>
            <NavbarMenuList />
        </div>
    );
}

