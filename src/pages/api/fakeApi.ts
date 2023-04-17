import axios from "axios";

interface UserData {
    id: number;
    name: string;
    email: string;
}

export const getUsers = async (): Promise<UserData[]> => {
    try {
        const res = await axios.get('https://dummyjson.com/users');
        return res.data.users
    } catch (err) {
        throw new Error('ไม่สามารถดึงข้อมูลได้');
    }
};
