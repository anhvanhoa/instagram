enum Template {
    REGISTER = 'ZHFFDDPAX8M9Q2K6XVH3ZSX088BQ',
}
const keyEmail = 'pk_prod_4DKXCKJXM7477VPHGKYGVJ3GBGZ3'
const configMail: { authorizationToken: string } = {
    authorizationToken: process.env.KEY_SEND_MAIL || keyEmail,
}
export { configMail, Template }
