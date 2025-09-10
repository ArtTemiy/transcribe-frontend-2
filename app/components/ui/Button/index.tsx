import React, { useMemo } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    buttonLabel?: string;
    iconLeft?: boolean;
    iconRight?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'success'
    fullWidth?: boolean;

    href?: string;
}

const VARIANT_CLASSES = {
    primary: styles.primary,
    secondary: styles.secondary,
    success: styles.success
}

const leftArrow = "http://localhost:3845/assets/66c10af71339b2d6650b470b0669d0cff9293db7.svg";
const rightArrow = "http://localhost:3845/assets/485dbc7448ba91c3dcb9c2e771bb79741bcdedf7.svg";

export const Button: React.FC<ButtonProps> = ({
    children,
    leftIcon,
    rightIcon,
    variant = 'primary',
    fullWidth = false,
    disabled,
    type = "button",
    href,
    ...props
}) => {
    const styleClass = disabled ? styles.disabled : VARIANT_CLASSES[variant];

    const buttonClass = classNames(
        styleClass,
        {
            [styles.fullWidth]: fullWidth
        }
    );

    const Tag = useMemo(() => href ? (p: any) => <a href={href} {...p} /> : (p: any) => <button {...p} />, []);

    return (
        <Tag
            className={buttonClass}
            disabled={disabled}
            type={type}
            {...props}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </Tag>
    );
};

export default Button;