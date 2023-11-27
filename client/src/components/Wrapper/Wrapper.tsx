import React from 'react';
import classNames from 'classnames';

interface Props {
    children: React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
    return <div className={classNames('shadow-3xl rounded-2xl')}>{children}</div>;
};

export default Wrapper;
