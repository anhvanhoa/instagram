import React from 'react';
import './reset.scss';
import './variable.scss';
interface Props {
    children: React.ReactNode;
}
function StyleGlobal({ children }: Props) {
    return <>{children}</>;
}

export default StyleGlobal;
