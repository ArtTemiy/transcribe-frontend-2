import React from 'react';

import styles from './index.module.scss';

type MenuItem = {
    label: string;
    active?: boolean;
    onClick?: () => void;
};

type MenuProps = {
    items: MenuItem[];
    buttonLabel?: string;
    onButtonClick?: () => void;
};

const Menu: React.FC<MenuProps> = ({ items, buttonLabel, onButtonClick }) => (
    <nav className={styles.menu}>
        <ul className={styles.menuList}>
            {items.map(item => (
                <li
                    key={item.label}
                    className={`${styles.menuItem} ${item.active ? styles.active : ''}`}
                    onClick={item.onClick}
                >
                    {item.label}
                </li>
            ))}
        </ul>
        {buttonLabel && (
            <button className={styles.menuButton} onClick={onButtonClick}>
                {buttonLabel}
            </button>
        )}
    </nav>
);

export default Menu;
