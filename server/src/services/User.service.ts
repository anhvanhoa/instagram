import { HttpStatus } from '~/http-status.enum'
import UserModel from '~/models/User.model'
import { httpResponse } from '~/utils/HandleRes'

export class UserService {
    async search(q: string, userName: string) {
        const searchRegex = new RegExp(q, 'i')
        const users = await UserModel.find(
            { userName: { $ne: userName, $regex: searchRegex } },
            { password: false },
        )
        return httpResponse(HttpStatus.OK, users)
    }
}
const userProvider = new UserService()
export default userProvider
