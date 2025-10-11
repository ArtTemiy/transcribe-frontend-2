import classNames from 'classnames';
import React, { type ComponentProps } from 'react';
import { Link } from 'react-router';

import styles from './index.module.scss';

interface BaseButtonProps {
    children?: React.ReactNode;
    buttonLabel?: string;
    iconLeft?: boolean;
    iconRight?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success';
    fullWidth?: boolean;
    disabled?: boolean;
}

interface ButtonAsButton extends BaseButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: never;
}

interface ButtonAsLink extends BaseButtonProps, Omit<ComponentProps<typeof Link>, 'to'> {
    href: string;
    disabled?: boolean;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const VARIANT_CLASSES = {
    primary: styles.primary,
    secondary: styles.secondary,
    success: styles.success,
};

export const Button: React.FC<ButtonProps> = ({
    children,
    leftIcon,
    rightIcon,
    variant = 'primary',
    fullWidth = false,
    disabled,
    href,
    className,
    ...props
}) => {
    const styleClass = disabled ? styles.disabled : VARIANT_CLASSES[variant];

    const buttonClass = classNames(styles.btn, className, styleClass, {
        [styles.fullWidth]: fullWidth,
    });

    if (href) {
        const linkProps = props as ButtonAsLink;
        return (
            <Link to={href} className={buttonClass} {...linkProps}>
                {leftIcon}
                {children}
                {rightIcon}
            </Link>
        );
    }

    const { type: buttonType = 'button', ...buttonProps } = props as ButtonAsButton;
    return (
        <button className={buttonClass} disabled={disabled} type={buttonType} {...buttonProps}>
            {leftIcon}
            {children}
            {rightIcon}
        </button>
    );
};

export default Button;
