import classNames from 'classnames';
import React from 'react';

import LoadingIcon from '@/../src/icons/loading.svg';

import styles from './style.module.scss';

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
    color = 'default',
}) => {
    const spinnerClass = classNames(
        styles.spinner,
        styles[size],
        styles[direction],
        styles[color],
        className,
    );

    return (
        <div className={spinnerClass}>
            <LoadingIcon className={styles.icon} />
        </div>
    );
};

export default LoadingSpinner;
