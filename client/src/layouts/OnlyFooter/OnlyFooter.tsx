import { Outlet } from 'react-router-dom';
import Footer from '~/layouts/components/Footer';

const OnlyFooter = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default OnlyFooter;
