import classNames from 'classnames';
import React from 'react';

import styles from './index.module.scss';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return <div className={classNames(className, styles.card)}>{children}</div>;
};

export default Card;
