import React from 'react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;
    weight: number;
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    }
}

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
}

interface Props { 
    user: User;
    todo: Todo[];
}

const UserDetail = ({user, todo}: Props) => {
    console.log(todo)
    return (
        <div>
            <Head>
                <title>{user.maidenName} | Herophumiphat</title>
            </Head>
            <main>
                <div className='py-4 pl-7'>
                    <Link href='/' className='hover:underline underline-offset-2'> \ Hero-Phumi</Link>
                    <Link href='/users' className='hover:underline underline-offset-2'> \ Users</Link>
                    <Link href={'/users/' + user.id} className='font-bold'> \ {user.maidenName}</Link>
                </div>
                <div className='px-4'>
                        <div className='relative bg-blue-200 p-5 rounded-md text-sm flex w-[340px]'>
                            <div>
                                <p className='text-2xl underline underline-offset-4 mb-4'>{user.maidenName}</p>
                                <p><span className='font-bold'>Full Name: </span>{user.firstName} {user.lastName}</p>
                                <p><span className='font-bold'>Username: </span>{user.username}</p>
                                <p><span className='font-bold'>Email: </span>{user.email}</p>
                                <p><span className='font-bold'>BirthDate: </span>{user.birthDate}</p>
                                <p><span className='font-bold'>Phone: </span>{user.phone}</p>
                                <p><span className='font-bold'>height: </span>{user.height} <span className='font-bold'>cm. weight: </span>{user.weight}<span className='font-bold'> kg.</span></p>
                                <p><span className='font-bold'>Blood-Group: </span>{user.bloodGroup}</p>
                                <p><span className='font-bold'>Eye-Color: </span>{user.eyeColor}</p>
                                <p><span className='font-bold'>Hair: </span>{user.hair.color}, {user.hair.type}</p>
                            </div>
                            <div className='absolute right-0 top-0'>
                                <div className='w-32 h-32' style={{backgroundImage: `url(${user.image})`, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                            </div>
                    </div>

                    <div className='mt-12 m-4'>
                        <h1 className='underline underline-offset-4 text-2xl mb-3'>Todos (<span className='text-base'>Complete: </span><span className='text-base text-green-500 line-through'>text</span>)</h1>
                        {
                            todo.map(doc => (
                                <div key={doc.id}>
                                    {
                                        doc.todo.length === 0
                                            ? <p>Item not found.</p>
                                            : <p className={doc.completed === true ? 'line-through text-sm text-green-500 list-item' : 'text-sm list-item text-red-400'}>{doc.todo}</p>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    )
}

export default UserDetail;

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get('https://dummyjson.com/users/?limit=50');
    const paths = res.data.users.map((user: User) => {
        return {
            params: { id: String(user.id)}
        }
    })
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const id = params?.id;
    const res1 = await axios.get(`https://dummyjson.com/users/${id}`);
    const res2 = await axios.get(`https://dummyjson.com/todos/user/${id}`);
    return {
        props: {user: res1.data, todo: res2.data.todos}
    }
}