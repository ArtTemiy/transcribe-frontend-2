import classNames from 'classnames';
import { Button, type ButtonProps } from '../Button';
import styles from './googlebutton.module.scss';

import GoogleIcon from '@/../src/icons/google.svg';
import { Text } from '../Text';

const GoogleButton = ({ children, className, ...props }: ButtonProps) => {
    return (
        <Button
            variant='secondary'
            className={classNames(className, styles.googleButton)}
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
