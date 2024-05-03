import envConfig from './env'

enum Template {
    REGISTER = 'ZHFFDDPAX8M9Q2K6XVH3ZSX088BQ',
}
const configMail: { authorizationToken: string } = {
    authorizationToken: envConfig.KEY_SEND_MAIL,
}
export { configMail, Template }
