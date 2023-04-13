import React from 'react';
import { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { getProducts } from './api/fakeApiProduct';

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

let queryString: string | undefined;
queryString = ''

const ShowProducts: NextPage<productProps> = ({ products }) => {

    const [qSearch, setQSearch] = React.useState<string>('phone')
    
    React.useEffect(() => {
        if (qSearch?.length != 0) {
            queryString = `search?q=${qSearch}`
        }
    })

    return (
        <div>
            <Head>
                <title>users | HeroPhumiphat</title>
            </Head>
            <main className='w-full px-5 py-5'>
                <div className='w-full bg-green-300 h-20'>
                    <div className='flex'>
                        <p>title: </p>
                        <input type="text" />
                    </div>
                </div>
                {/* <div className='w-full text-center text-3xl underline underline-offset-4'>
                    <h1>Product</h1>
                </div> */}
                <div className='flex justify-center mt-7'>
                    <div className='grid grid-cols-1 min-[520px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-7 justify-items-center items-center'>
                    {
                        products.map((product) => (
                            <div key={product.id} className='w-[210px] h-auto'>
                                <div className='flex items-center justify-end pr-2 mb-0.5'>
                                    <FontAwesomeIcon icon={faStar} className='text-amber-400 mr-2 text-sm' />
                                    <p className=''>{product.rating.toFixed(2)}</p>
                                </div>
                                <div className='text-center border mx-1 w-[210px] h-[300px] rounded-md cursor-pointer' style={{boxShadow: '0 0 5px #aaa, 0 0 8px #e3e3e3', backgroundImage: `url(${product.thumbnail})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                                </div>
                                <div className='flex justify-between items-end px-1 mt-2'>
                                    <div>
                                        <p className='hover:cursor-pointe hover:underline'>{product.title.length > 12 ? `${product.title.substring(0, 12)}...` : product.title}</p>
                                        <div className='flex'>
                                            <p>${product.price}</p>
                                            <div className='relative ml-2 bg-red-400 rounded-full text-xs flex items-center justify-end px-1 pl-4'>
                                                <div className='absolute bg-white w-2 h-2 left-1 top-2 rounded-full'></div>
                                                <p>-{product.discountPercentage}%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p>(stock: {product.stock})</p>
                                    </div>
                                </div>
                            </div>
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