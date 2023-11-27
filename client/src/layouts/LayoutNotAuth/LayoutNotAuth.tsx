import { Outlet } from 'react-router-dom';
import Footer from '~/layouts/components/Footer';
import HeaderNotAuth from '../components/HeaderNotAuth';

const LayoutNotAuth = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderNotAuth />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default LayoutNotAuth;
