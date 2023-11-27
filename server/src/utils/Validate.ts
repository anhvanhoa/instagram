class Validate {
    public validateEmail(email: string): boolean {
        return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-z]+$/.test(email);
    }
}

const validate = new Validate();
const validateEmail = validate.validateEmail;
export { validateEmail };
export default validate;
