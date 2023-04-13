import axios from "axios";

interface UserData {
    id: number;
    name: string;
    email: string;
}

export const getUsers = async (): Promise<UserData[]> => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        return res.data
    } catch (err) {
        throw new Error('ไม่สามารถดึงข้อมูลได้');
    }
};
