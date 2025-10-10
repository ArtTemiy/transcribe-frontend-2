import classNames from 'classnames';
import { type TextareaHTMLAttributes } from 'react';

import { Text } from '@/components/ui/Text';

import styles from './style.module.scss';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    minRows?: number;
    maxRows?: number;
};

const TextArea = ({ 
    label, 
    error, 
    className, 
    resize = 'vertical',
    minRows = 3,
    maxRows,
    style,
    ...props 
}: TextAreaProps) => {
    const textareaStyle = {
        ...style,
        resize,
        minHeight: minRows ? `${minRows * 1.5}em` : undefined,
        maxHeight: maxRows ? `${maxRows * 1.5}em` : undefined,
    };

    return (
        <div className={styles.fieldWrapper}>
            {label && <Text variant='small'>{label}</Text>}
            <div className={classNames(styles.textareaContainer, { [styles.error]: error })}>
                <textarea
                    className={classNames(styles.textarea, className)}
                    style={textareaStyle}
                    {...props}
                />
            </div>
            {error && (
                <Text variant='small' typColor='alarm'>
                    {error}
                </Text>
            )}
        </div>
    );
};

export default TextArea;