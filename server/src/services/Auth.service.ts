import { UserModel } from '~/models'
import TokenModel from '~/models/Token.model'
import { hash, compare, genSalt } from 'bcrypt'
import isEmail from 'validator/lib/isEmail'
import isTell from 'validator/lib/isMobilePhone'
import Token from '~/utils/Token'
import { Info, Register, ResInfo, ResponseRegister } from '~/types/register'
import { ResUser, User } from '~/types/user'
import { isMongoServerError, BadRequestError, ServerRequestError } from '~/utils/Errors'
import { LoginType } from '~/types/login'
import userProvider from './User.service'
import postsProvider from './Post.service'
export class AuthService {
    //
    async uniqueEmail(email: string): Promise<boolean> {
        if (!isEmail(email))
            throw new BadRequestError({
                message: 'Email not is valid',
            })
        return Boolean(await UserModel.findOne({ email }, { email: 1 }))
    }
    //
    async uniqueTell(numberPhone: string): Promise<boolean> {
        if (!isTell(numberPhone, 'vi-VN'))
            throw new BadRequestError({
                message: 'Number phone not is valid',
            })
        return Boolean(await UserModel.findOne({ numberPhone }, { numberPhone: 1 }))
    }
    //
    async uniqueUsername(userName: string): Promise<boolean> {
        if (!/^[^\s!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]+$/.test(userName))
            throw new BadRequestError({
                message: 'Username not is valid',
            })
        return Boolean(await UserModel.findOne({ userName }, { userName: 1 }))
    }
    //
    async infoUnique(data: Info): Promise<ResInfo> {
        if (data.email) {
            const unique = await this.uniqueEmail(data.email)
            return {
                type: 'email',
                unique,
            }
        }
        if (data.numberPhone) {
            const unique = await this.uniqueTell(data.numberPhone)
            return {
                type: 'tell',
                unique,
            }
        }
        if (data.userName) {
            const unique = await this.uniqueUsername(data.userName)
            return {
                type: 'userName',
                unique,
            }
        }
        throw new BadRequestError({
            message: 'Data not is valid',
        })
    }
    //
    async register(data: Register): Promise<ResponseRegister> {
        if (data.email && (await this.uniqueEmail(data.email)))
            throw new BadRequestError({
                message: 'Email not valid !',
            })
        if (data.numberPhone && (await this.uniqueTell(data.numberPhone)))
            throw new BadRequestError({
                message: 'Tell not valid !',
            })
        const salt = await genSalt(10)
        data.password = await hash(data.password, salt)
        const user = await UserModel.create(data)
        return {
            userName: user.userName,
        }
    }
    async login(data: LoginType) {
        const { email, password, numberPhone, userName } = data
        if (!email && !numberPhone && !userName)
            throw new BadRequestError({
                message: 'Login information is incorrect',
            })
        const isEmail = email && (await this.uniqueEmail(email))
        const isTell = numberPhone && (await this.uniqueTell(numberPhone))
        const isUsername = userName && (await this.uniqueUsername(userName))
        if (!isEmail && !isTell && !isUsername)
            throw new BadRequestError({
                message: 'Login information is incorrect',
            })
        let user: null | User = null
        if (email) {
            user = await UserModel.findOne<User>(
                { email },
                { createdAt: false, updatedAt: false },
            )
        }
        if (numberPhone) {
            user = await UserModel.findOne<User>(
                { numberPhone },
                { createdAt: false, updatedAt: false },
            )
        }
        if (userName) {
            user = await UserModel.findOne<User>(
                { userName },
                { createdAt: false, updatedAt: false },
            )
        }
        if (!user)
            throw new BadRequestError({
                message: 'Login information is incorrect',
            })
        const isPass = await compare(password, user.password)
        if (!isPass)
            throw new BadRequestError({
                message: 'Login information is incorrect',
            })
        const payload = { userName: user.userName }
        const accessToken = Token.createToken(payload, '120s')
        const refreshToken = Token.createToken(payload, '7d')
        await TokenModel.create({ token: refreshToken, idUser: user._id })
        const { password: pass, ...newUser } = user._doc
        const { totalFollowers } = await userProvider.countFollowers(user._id)
        const { totalFollowing } = await userProvider.countFollowing(user._id)
        const totalPost = await postsProvider.countPost(user._id)
        const dataUser: ResUser = {
            ...newUser,
            totalPost,
            accessToken,
            totalFollowing,
            totalFollowers,
        }
        return {
            refreshToken,
            user: dataUser,
        }
    }
    //
    async logout(token: string) {
        return await TokenModel.deleteOne({ token })
    }
    //
    delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    async refreshJwt(user: Omit<User, 'password'>) {
        const accessToken = Token.createToken({ userName: user.userName }, '120s')
        const refreshToken = Token.createToken({ userName: user.userName }, '7d')
        const { totalFollowers } = await userProvider.countFollowers(user._id)
        const { totalFollowing } = await userProvider.countFollowing(user._id)
        const totalPost = await postsProvider.countPost(user._id)
        try {
            await TokenModel.create({ token: refreshToken, idUser: user._id })
            return {
                accessToken,
                refreshToken,
                counts: {
                    totalFollowers,
                    totalFollowing,
                    totalPost,
                },
            }
        } catch (error: any) {
            if (isMongoServerError(error)) {
                if (error.code === 11000)
                    return {
                        accessToken,
                        refreshToken,
                        counts: {
                            totalFollowers,
                            totalFollowing,
                            totalPost,
                        },
                    }
            }
            throw new ServerRequestError({
                message: 'Server error',
                errors: error,
            })
        }
    }
}
const authProvider = new AuthService()
export default authProvider
