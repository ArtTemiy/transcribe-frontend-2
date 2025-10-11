import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';

import Button from '../Button';
import { Text } from '../Text';

import styles from './index.module.scss';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps {
    options: SelectOption[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    value,
    placeholder = 'Выберите опцию',
    onChange,
    disabled = false,
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
        options.find(option => option.value === value) || null,
    );
    const selectRef = useRef<HTMLDivElement>(null);

    // Закрытие селекта при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Обновление выбранной опции при изменении value
    useEffect(() => {
        const option = options.find(option => option.value === value) || null;
        setSelectedOption(option);
    }, [value, options]);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (option: SelectOption) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange?.(option.value);
    };

    const displayText = selectedOption ? selectedOption.label : placeholder;

    return (
        <div
            ref={selectRef}
            className={classNames(styles.select, className, {
                [styles.disabled]: disabled,
                [styles.open]: isOpen,
            })}
        >
            <Button
                fullWidth
                variant='secondary'
                className={styles.trigger}
                onClick={handleToggle}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggle();
                    }
                }}
            >
                {displayText}
                <div
                    className={classNames(styles.arrow, {
                        [styles.arrowUp]: isOpen,
                    })}
                >
                    <svg width='12' height='8' viewBox='0 0 12 8' fill='none'>
                        <path
                            d='M1 1.5L6 6.5L11 1.5'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
            </Button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={classNames(styles.option, {
                                [styles.selected]: selectedOption?.value === option.value,
                            })}
                            onClick={() => handleOptionClick(option)}
                            role='option'
                            aria-selected={selectedOption?.value === option.value}
                        >
                            <Text variant='body-s'>{option.label}</Text>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
