import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const urlPath = useRouter().pathname;
    // console.log(urlPath)

    return (
        <nav className='w-full flex justify-between items-center px-4 border border-b' style={{boxShadow: '0 0 5px #c8c8c8'}}>
            <div className=''>
                <div className=' relative text-2xl uppercase py-3'>
                    <Link href="/" className='flex'>
                    <div className='w-fit -rotate-90 mr-2'>
                        <FontAwesomeIcon icon={faPlay} className='text-neutral-300' />
                    </div>
                    <span>hero-phumi</span>
                    </Link>
                </div>
            </div>
            <div>
                <ul className='text-sm tracking-wide uppercase flex space-x-3'>
                    <li>
                        <Link href='/' className={urlPath === '/' ? 'font-bold' : ''}>Home</Link>
                    </li>
                    <li>
                        <Link href='/show-user' className={urlPath === '/show-user' ? 'font-bold' : ''}>Users</Link>
                    </li>
                    <li>
                        <Link href='/products' className={urlPath === '/products' || urlPath === '/products/[id]' ? 'font-bold' : ''}>products</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}