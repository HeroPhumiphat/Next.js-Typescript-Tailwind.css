import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getUsers } from './api/fakeApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface UserData {
    id: number;
    name: string;
    username?: string;
}

interface UserProps {
    users: UserData[];
}

const ShowUser: NextPage<UserProps> = ({ users }) => {
    return (
        <div>
            <Head>
                <title>users | HeroPhumiphat</title>
            </Head>
            <main className='w-full px-12 pt-16 overflow-hidden pb-5'>
                <div className='w-full text-center text-3xl underline underline-offset-4'>
                    <h1>Users(fake)</h1>
                </div>
                <div className='flex justify-center mt-12'>
                    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3x:grid-cols-6 gap-3 justify-items-center items-center mb-5'>
                        {
                            users.map((user) => (
                                <Link href={'/users/#'} key={user.id}>
                                    <div className='text-center border mx-1 py-4 w-[270px] rounded-sm hover:cursor-pointer hover:scale-110 z-10 hover:z-20 bg-white transition delay-150 duration-300 ease-in-out' style={{boxShadow: '0 0 12px #ccc '}}>
                                        <div className='flex items-center justify-center'>
                                            <div className='bg-black px-4 py-3 w-fit h-fit rounded-full my-2'>
                                                <FontAwesomeIcon icon={faUser} className='text-white text-2xl' />
                                            </div>
                                        </div>
                                        <p className='text-neutral-400'>{user.username}</p>
                                        <p>{user.name}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps<UserProps> = async () => {
    try {
        const usersData = await getUsers();
        return { props: {users: usersData }};
    } catch (error) {
        return { props: { users: [] } };
    }
};

export default ShowUser;