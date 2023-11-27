import { connect } from 'mongoose';
const connectDataBase = async () => {
    try {
        const url: string = 'mongodb://127.0.0.1:27017/instagram';
        await connect(url);
        console.log('connect success');
    } catch (error) {
        console.log('connect fail !');
        console.log(error);
    }
};

export default connectDataBase;
