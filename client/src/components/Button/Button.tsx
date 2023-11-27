import { ReactNode, MouseEvent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import Styles from './Button.module.scss';

const cln = classNames.bind(Styles);

interface Props {
    children: ReactNode;
    to?: string;
    href?: string;
    primary?: boolean;
    text?: boolean;
    disable?: boolean;
    onClick?: (event: MouseEvent) => void;
    className?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Button = ({
    children,
    text,
    disable,
    primary,
    onClick,
    to,
    href,
    className,
    leftIcon,
    rightIcon,
    ...passProps
}: Props) => {
    let Comp: string | typeof Link | typeof NavLink = 'button';
    const props: any = {
        onClick,
        ...passProps,
    };

    if (href) {
        props.href = href;
        Comp = 'a';
    } else if (to) {
        Comp = Link;
        props.to = to;
    }

    const classes = cln('wrapper', { primary, text, disable, [className!]: className });
    return (
        <Comp className={classes} {...props}>
            <span>{leftIcon}</span>
            <span>{children}</span>
            <span>{rightIcon}</span>
        </Comp>
    );
};

export default Button;
