class Validate {
    public validateEmail(email: string): boolean {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/.test(email)
    }
    isNotEmptyObject(obj: object) {
        return !Object.keys(obj).length ? true : false
    }
}

const validate = new Validate()
const validateEmail = validate.validateEmail
const isNotEmptyObject = validate.isNotEmptyObject
export { validateEmail, isNotEmptyObject }
export default validate
