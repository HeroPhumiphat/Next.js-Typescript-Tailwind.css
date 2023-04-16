import React from 'react';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

interface Props {
    product: Product;
}

const ProductDetial= ({product}: Props) => {

    const divRef = React.useRef<HTMLDivElement | null>(null)


    return (
        <div>
            <Head>
                <title>{product.title} | Herophumiphat</title>
            </Head>
            <main>
                <div className='py-4 pl-7'>
                    <Link href='/' className='hover:underline underline-offset-2'> \ Hero-Phumi</Link>
                    <Link href='/products' className='hover:underline underline-offset-2'> \ Products</Link>
                    <Link href={'/products/' + product.id} className='font-bold'> \ {product.title}</Link>
                </div>
                <div className='flex justify-center items-center pt-16' ref={divRef}>
                    <div className='flex flex-wrap space-x-7'>
                        <div className='w-[360px] h-[270px] rounded-sm' style={{backgroundImage:  `url(${product.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                        <div className='w-[360px] pl-4'>
                            <p className='text-2xl'>{product.title}</p>
                            <p>Brand: {product.brand}</p>
                            <p>Description: <br/> <span className='pl-5'>{product.description}</span> </p>
                            <p>Category: {product.category}</p>
                            <p>Rating: {product.rating}</p>
                            <p>Stock: {product.stock}</p>
                            <p className='bg-red-300 w-fit px-5 py-2 rounded-full text-center my-4 text-sm font-bold'>Discount: -{product.discountPercentage}%</p>
                            <p className='mt-7 text-lg'>Price: <span className={product.discountPercentage > 0 ? 'line-through text-neutral-400' : ''}>${product.price}</span><sup className={ product.discountPercentage > 0 ? 'pl-1.5 text-2xl font-bold text-black' : 'hidden'}>${(product.price - (product.discountPercentage/100)*product.price).toFixed(2)}</sup></p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-16 pb-12'>
                    <div className='flex flex-wrap space-x-2'>
                        {product.images.map((img, key) => (
                            <div key={+key} className='w-[150px] h-[100px] my-3' style={{backgroundImage: `url(${img})`, backgroundSize: 'cover', }}></div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProductDetial;

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get('https://dummyjson.com/products/?limit=100');
    const paths = res.data.products.map((product: Product) => {
        return { 
            params: { id: String(product.id)}
        }
    })
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const id = params?.id;
    const res = await axios.get(`https://dummyjson.com/products/${id}`)
    return {
        props: {product: res.data}
    }
}
