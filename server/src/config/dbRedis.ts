import { Redis } from 'ioredis'
let redis: Redis
const dbRedis = () => {
    const redisConnect = new Redis({
        password: process.env.PASS_REDIS,
        host: process.env.HOST_REDIS,
        port: Number(process.env.PORT_REDIS),
    })
    redisConnect.on('error', (error) => {
        console.log('Connect redis fail!')
        redisConnect.quit()
    })
    redis = redisConnect.on('connect', () => console.log('Connect redis success!'))
}
export { redis }
export default dbRedis
