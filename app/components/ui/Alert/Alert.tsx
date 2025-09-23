import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './Alert.module.scss';

// Icons
import CrossIcon from '@/../src/icons/cross.svg';
import ButtonBase from '../ButtonBase';
import { Row } from 'react-bootstrap';
import { getColorClassName, Text } from '../Text';

export interface AlertProps {
    /** Тип алерта */
    variant?: 'error' | 'warning' | 'success' | 'info';
    /** Текст сообщения */
    message: string;
    /** Показывать ли кнопку закрытия */
    dismissible?: boolean;
    /** Автоматически скрывать через указанное время (в миллисекундах) */
    autoHide?: number;
    /** Callback при закрытии алерта */
    onClose?: () => void;
    /** Показывать ли алерт */
    show?: boolean;
    /** Дополнительные CSS классы */
    className?: string;
    /** Иконка (опционально) */
    icon?: React.ReactNode;
    /** Позиция алерта */
    position?: 'top' | 'bottom' | 'relative';
}

const VARIANT_ICONS = {
    error: (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M12 2L1 21H23L12 2ZM12 18H12.01V18.01H12V18ZM11 16V10H13V16H11Z'
                fill='currentColor'
            />
        </svg>
    ),
    warning: (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M12 2L1 21H23L12 2ZM12 18H12.01V18.01H12V18ZM11 16V10H13V16H11Z'
                fill='currentColor'
            />
        </svg>
    ),
    success: (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z'
                fill='currentColor'
            />
        </svg>
    ),
    info: (
        <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z'
                fill='currentColor'
            />
        </svg>
    ),
};

const CLOSE_ICON = (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M15 5L5 15M5 5L15 15'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

export const Alert: React.FC<AlertProps> = ({
    variant = 'error',
    message,
    dismissible = true,
    autoHide,
    onClose,
    show = true,
    className,
    icon,
    position = 'top',
}) => {
    const [isVisible, setIsVisible] = useState(show);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsVisible(show);
        if (show) {
            setIsAnimating(true);
        }
    }, [show]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 300); // Время анимации исчезновения
    };

    if (!isVisible) {
        return null;
    }

    const alertClasses = classNames(
        styles.alert,
        styles[variant],
        styles[position],
        {
            [styles.animating]: isAnimating,
            [styles.dismissible]: dismissible,
        },
        // Bootstrap классы для дополнительной стилизации
        'alert',
        `alert-${variant === 'error' ? 'danger' : variant}`,
        {
            'alert-dismissible': dismissible,
        },
        className,
    );

    const displayIcon = icon || VARIANT_ICONS[variant];

    return (
        <div className={classNames(alertClasses)} role='alert'>
            {displayIcon && <div className={styles.icon}>{displayIcon}</div>}
            <Text typColor='white' className={styles.message}>
                {message}
            </Text>
            {dismissible && (
                <ButtonBase
                    type='button'
                    className={classNames(styles.closeButton)}
                    aria-label='Close'
                    onClick={handleClose}
                >
                    <CrossIcon />
                </ButtonBase>
            )}
        </div>
    );
};

export default Alert;
