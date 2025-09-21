import React from 'react';

import styles from './index.module.scss';

type InputFieldProps = {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'select';
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    error?: string;
    counter?: { current: number; max: number };
    iconRight?: React.ReactNode;
    disabled?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    type = 'text',
    value,
    onChange,
    error,
    counter,
    iconRight,
    disabled,
}) => {
    return (
        <div className={styles.fieldWrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.inputContainer}>
                {type === 'select' ? (
                    <select
                        className={styles.input}
                        value={value}
                        onChange={onChange as any}
                        disabled={disabled}
                    >
                        <option value='' disabled>
                            {placeholder}
                        </option>
                        {/* Здесь можно добавить опции */}
                    </select>
                ) : (
                    <input
                        className={styles.input}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                )}
                {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {counter && (
                <div className={styles.counter}>
                    {counter.current}/{counter.max}
                </div>
            )}
        </div>
    );
};

export default InputField;
