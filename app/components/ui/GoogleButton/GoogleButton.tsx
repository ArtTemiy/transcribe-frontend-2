import classNames from 'classnames';

import GoogleIcon from '@/../src/icons/google.svg';

import { Button, type ButtonProps } from '../Button';
import { Text } from '../Text';

import styles from './googlebutton.module.scss';

const GoogleButton = ({ children, className, ...props }: ButtonProps) => {
    return (
        <Button
            variant='secondary'
            className={classNames(styles.googleButton, className)}
            {...props}
        >
            <GoogleIcon />
            <Text variant='body-s' className={styles.googleButtonText}>
                {children}
            </Text>
        </Button>
    );
};

export default GoogleButton;
