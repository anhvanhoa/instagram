import React, { memo } from 'react';
import dataNavbar from '~/dataDefault/dataNavbar';
import NavbarLink from './NavbarLink';

const Navbar = () => {
    const renderNavbar: React.ReactNode = dataNavbar.map((element) => (
        <NavbarLink
            key={element.id}
            id={element.id}
            name={element.name}
            icon_solid={element.icon_solid}
            icon_thin={element.icon_thin}
            to={element.to}
        />
    ));

    return <ul className="flex flex-col list-none">{renderNavbar}</ul>;
};

export default memo(Navbar);
