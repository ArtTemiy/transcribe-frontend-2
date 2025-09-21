import classNames from 'classnames';
import { useState, type InputHTMLAttributes } from 'react';

import EyeHidden from '@/../src/icons/eye_hidden.svg';
import ButtonBase from '@/components/ui/ButtonBase';
import { Text } from '@/components/ui/Text';

import styles from './style.module.scss';

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

const TextInput = ({ label, error, type, className, ...props }: TextInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className={styles.fieldWrapper}>
            {label && <Text variant='small'>{label}</Text>}
            <div className={classNames(styles.inputContainer, { [styles.error]: error })}>
                <input
                    className={classNames(styles.input, className)}
                    type={type === 'password' && showPassword ? 'text' : type}
                    {...props}
                />
                {type === 'password' && (
                    <ButtonBase
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.passwordToggle}
                    >
                        <EyeHidden />
                    </ButtonBase>
                )}
            </div>
            {error && (
                <Text variant='small' typColor='alarm'>
                    {error}
                </Text>
            )}
        </div>
    );
};

export default TextInput;
