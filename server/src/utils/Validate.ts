class Validate {
    public validateEmail(email: string): boolean {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/.test(email)
    }
    isNotEmptyObject(obj: object) {
        return !Object.keys(obj).length ? true : false
    }
}

const validate = new Validate()
export const { validateEmail, isNotEmptyObject } = validate
export default validate
