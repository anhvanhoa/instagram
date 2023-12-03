import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '~/layouts/components/Sidebar';

const LayoutMain: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default LayoutMain;
