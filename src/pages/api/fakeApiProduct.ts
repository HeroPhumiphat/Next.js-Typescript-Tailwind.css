import axios from 'axios';

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

export const getProducts = async (): Promise<ProductData[]> => {
    try {
        const res = await axios.get('https://dummyjson.com/products/?limit=50')
        // console.log(res.data.products)
        return res.data.products
    } catch (err) {
        throw new Error('ไม่พบข้อมูล')
    }
}