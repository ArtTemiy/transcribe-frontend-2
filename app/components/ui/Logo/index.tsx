import React from 'react';

import styles from './index.module.scss';

const imgFrame32 = 'http://localhost:3845/assets/c211cf0c247db222eba7c795caf51875f10c0530.svg';
const imgFrame33 = 'http://localhost:3845/assets/aa42609b8844cf98a0b834b4eb614efccaf2078a.svg';
const imgFrame34 = 'http://localhost:3845/assets/40e4d806527ef6381005a343fa02ff994a5905b4.svg';

export interface LogoProps {
    name?: 'colomn' | 'row';
    theme?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ name = 'colomn', theme = 'default' }) => {
    if (name === 'row' && theme === 'default') {
        return (
            <span className={styles.logo}>
                <img src={imgFrame32} alt='logo' width={43} height={43} draggable={false} />
            </span>
        );
    }
    if (name === 'colomn' && theme === 'white') {
        return (
            <span className={styles.logo}>
                <img src={imgFrame33} alt='logo' width={43} height={43} draggable={false} />
            </span>
        );
    }
    // default: colomn + default
    return (
        <span className={styles.logo}>
            <img src={imgFrame34} alt='logo' width={43} height={43} draggable={false} />
        </span>
    );
};

export default Logo;
