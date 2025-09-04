import React from "react";
import classNames from "classnames";
import styles from "./style.module.scss";

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
    direction?: 'clockwise' | 'counterclockwise';
    color?: 'default' | 'white';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    className,
    direction = 'clockwise',
    color = 'default'
}) => {
    const spinnerClass = classNames(
        styles.spinner,
        styles[size],
        styles[direction],
        styles[color],
        className
    );

    return (
        <div className={spinnerClass}>
            <img
                src="/src/icons/loading.svg"
                alt="Loading..."
                className={styles.icon}
            />
        </div>
    );
};

export default LoadingSpinner;