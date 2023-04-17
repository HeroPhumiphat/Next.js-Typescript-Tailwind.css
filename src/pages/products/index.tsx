import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getProducts } from '../api/fakeApiProduct';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface ProductData {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    catgegory: string;
    thumbnail: string;
    images: string[];
}

interface productProps {
    products: ProductData[];
}

type SearchType = string;
type SearchSetter = React.Dispatch<React.SetStateAction<SearchType>>;

const ShowProducts: NextPage<productProps> = ({ products }) => {
    
    let [filter, setFilter] = React.useState<ProductData[]>([])
    const [search, setSearch] = React.useState<string>('');

    const onChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    }

    return (
        <div>
            <Head>
                <title>users | HeroPhumiphat</title>
            </Head>
            <main className='w-full px-5 py-5'>
                <div className='w-full h-20 pt-4'>
                    <div className='flex justify-center items-center border py-2'>
                        <p className='font-bold'>Search: </p>
                        <input type="text" className='ml-3 rounded-full border py-2 px-4' onChange={onChangeInputSearch} />
                    </div>
                </div>
                <div className='flex justify-center mt-7'>
                    <div className='grid grid-cols-2 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-1 gap-y-5 md:gap-x-8 md:gap-y-7 justify-items-center items-center'>
                    {
                        products
                            .filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
                            .map((product) => (
                                <Link href={'/products/' + product.id} key={product.id}>
                                    <div className='h-auto py-2'>
                                        <div className='text-center border md:w-[210px] h-[180px] rounded-md cursor-pointer' style={{boxShadow: '0 0 5px #aaa, 0 0 8px #e3e3e3', backgroundImage: `url(${product.thumbnail})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                        </div>
                                        <div className='flex justify-between items-end px-1 mt-2'>
                                            <div>
                                                <p className='hover:cursor-pointe hover:underline'>{product.title.length > 8 ? `${product.title.substring(0, 8)}...` : product.title}</p>
                                                <div className='flex'>
                                                    <p>${product.price}</p>
                                                    <div className='relative ml-2 bg-red-400 rounded-full text-xs flex items-center justify-end px-1 pl-4'>
                                                        <div className='absolute bg-white w-2 h-2 left-1 top-2 rounded-full'></div>
                                                        <p>-{product.discountPercentage}%</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='flex items-center justify-end pr-0.5 mb-0.5'>
                                                    <FontAwesomeIcon icon={faStar} className='text-amber-400 mr-1 text-sm' />
                                                    <p className=''>{product.rating.toFixed(2)}</p>
                                                </div>
                                                <p className='text-sm text-end'>({product.stock})</p>
                                            </div>
                                        </div>
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

export default ShowProducts

export const getStaticProps: GetStaticProps<productProps> = async () => {
    try {
        const productsData = await getProducts();
        return { props: {products: productsData}}
    } catch (error) {
        return { props: {products: []}}
    }
}
