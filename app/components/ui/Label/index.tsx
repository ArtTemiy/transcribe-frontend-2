import React from 'react';

import styles from './index.module.scss';

type LabelProps = {
    children: React.ReactNode;
    error?: boolean;
    className?: string;
};

const Label: React.FC<LabelProps> = ({ children, error, className }) => (
    <span className={`${styles.label} ${error ? styles.error : ''} ${className || ''}`}>
        {children}
    </span>
);

export default Label;
