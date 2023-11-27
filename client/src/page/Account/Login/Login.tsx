import FormLogin from '~/components/FormLogin';
import WrapperForm from '~/components/WrapperForm';

interface Props {
    setIsAccount?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Login = ({ setIsAccount }: Props) => {
    return (
        <WrapperForm setIsAccount={setIsAccount} isAccount={true}>
            <FormLogin />
        </WrapperForm>
    );
};

export default Login;
