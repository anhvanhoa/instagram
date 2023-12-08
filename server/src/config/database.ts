import { connect, connection } from 'mongoose'
const connectDataBase = async () => {
    try {
        const urlMongo = process.env.URL_MONGODB || ''
        await connect(urlMongo)
        console.log('connect mongo success')
    } catch (error) {
        connection.close()
        console.log('connect mongo fail !')
        console.log(error)
    }
}

export default connectDataBase
