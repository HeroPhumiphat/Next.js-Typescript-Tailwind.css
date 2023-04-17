import axios from "axios";

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    image: string;
}

export const getUsers = async (): Promise<UserData[]> => {
    try {
        const res = await axios.get('https://dummyjson.com/users/?limit=100');
        return res.data.users
    } catch (err) {
        throw new Error('ไม่สามารถดึงข้อมูลได้');
    }
};
