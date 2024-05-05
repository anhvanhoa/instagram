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
    //
    // async loginFacebook(data: LoginFB) {
    //     const { email, displayName, phoneNumber, photoURL, uid } = data
    //     if ((!email && !phoneNumber) || !uid)
    //         throw httpResponse(HttpStatus.INTERNAL_SERVER_ERROR, {
    //             msg: 'Data not valid',
    //         })
    //     const isEmail = email && (await this.uniqueEmail(email))
    //     const isTell = phoneNumber && (await this.uniqueTell(phoneNumber))
    //     const password = await hash(uid, 10)
    //     if (!isEmail && !isTell) {
    //         const user = await UserModel.create({
    //             userName: `${slugify(displayName, {
    //                 replacement: '',
    //                 lower: true,
    //                 trim: true,
    //             })}${otp.randomCode(3)}`,
    //             email,
    //             numberPhone: phoneNumber,
    //             fullName: displayName,
    //             avatar: photoURL,
    //             fbId: uid,
    //             password,
    //             birthday: '1-1-1997',
    //         })
    //         const accessToken = Token.createToken({ userName: user.userName }, '120s')
    //         const refreshToken = Token.createToken({ userName: user.userName }, '1h')
    //         await TokenModel.findOneAndDelete({ username: user.userName })
    //         await TokenModel.create({ token: refreshToken, username: user.userName })
    //         // await redis.set(user.userName, refreshToken)
    //         const { password: pass, ...newUser } = user._doc
    //         const dataUser: ResUser = { ...newUser, accessToken, refreshToken }
    //         return httpResponse(HttpStatus.OK, dataUser)
    //     }
    //     const user = await UserModel.findOne({ fbId: uid })
    //     if (!user)
    //         throw httpResponse(HttpStatus.INTERNAL_SERVER_ERROR, { msg: 'Server error' })
    //     const accessToken = Token.createToken({ userName: user.userName }, '120s')
    //     const refreshToken = Token.createToken({ userName: user.userName }, '1h')
    //     // await redis.set(user.userName, refreshToken)
    //     await TokenModel.findOneAndDelete({ username: user.userName })
    //     await TokenModel.create({ token: refreshToken, username: user.userName })
    //     const { password: pass, ...newUser } = user._doc
    //     const dataUser: ResUser = { ...newUser, accessToken, refreshToken }
    //     return httpResponse(HttpStatus.OK, dataUser)
    // }
    //
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
            ).populate('posts')
        }
        if (numberPhone) {
            user = await UserModel.findOne<User>(
                { numberPhone },
                { createdAt: false, updatedAt: false },
            ).populate('posts')
        }
        if (userName) {
            user = await UserModel.findOne<User>(
                { userName },
                { createdAt: false, updatedAt: false },
            ).populate('posts')
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
        const dataUser: ResUser = { ...newUser, accessToken }
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
        try {
            await TokenModel.create({ token: refreshToken, idUser: user._id })
            return { accessToken, refreshToken }
        } catch (error: any) {
            if (isMongoServerError(error)) {
                if (error.code === 11000) return { accessToken, refreshToken }
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
