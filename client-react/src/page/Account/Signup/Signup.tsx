import { useState } from 'react';
import Otp from '~/components/Otp';
import WrapperForm from '~/components/WrapperForm';
import FormSignup from '~/components/FormSignup/FormSignup';
import Birthday from '~/components/Birthday';
import { Signup as TypeSignup } from '~/types/auth';

type Steps = 0 | 1 | 2;
interface Props {
    setIsAccount?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Signup = ({ setIsAccount }: Props) => {
    const [nextStep, setNextStep] = useState<Steps>(0);
    const [dataSignup, setDataSignup] = useState<TypeSignup>({
        birthday: '',
        emailOrPhone: '',
        fullName: '',
        password: '',
        userName: '',
        codeVerify: '',
    });
    return (
        <div>
            <WrapperForm isLogo={!nextStep} isAccount={false} setIsAccount={setIsAccount}>
                {nextStep === 0 && (
                    <FormSignup dataSignup={dataSignup} setDataSignup={setDataSignup} nextStep={() => setNextStep(1)} />
                )}
                {nextStep === 1 && (
                    <Birthday
                        dataSignup={dataSignup}
                        setDataSignup={setDataSignup}
                        nextStep={() => setNextStep(2)}
                        prevStep={() => setNextStep(0)}
                    />
                )}
                {nextStep === 2 && (
                    <Otp dataSignup={dataSignup} setDataSignup={setDataSignup} prevStep={() => setNextStep(0)} />
                )}
            </WrapperForm>
        </div>
    );
};

export default Signup;
