import React from 'react';
import Footer from '~/layouts/components/Footer';
import Sidebar from '~/layouts/components/Sidebar';
import { Outlet } from 'react-router-dom';

const LayoutFooter: React.FC = () => {
    return (
        <div className="grid grid-cols-[245px,_1fr]">
            <Sidebar />
            <div>
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default LayoutFooter;
