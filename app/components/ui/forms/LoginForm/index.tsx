import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import CrossIcon from '@/../src/icons/cross.svg';
import GoogleIcon from '@/../src/icons/google.svg';
import Logo from '@/../src/icons/logo.svg';
import Button from '@/components/ui/Button';
import ButtonBase from '@/components/ui/ButtonBase';
import TextInput from '@/components/ui/input/TextInput/TextInput';
import Link from '@/components/ui/Link';
import { Text } from '@/components/ui/Text';
import { useAuthLoginMutation } from '~/mutations/auth/login';
import { useGoogleAuth } from '~/hooks/useGoogleAuth';
import type { AuthResponse } from '~/types/auth/authResponse';
import type { LoginData } from '~/types/auth/login';

import styles from './index.module.scss';
import { useAlert } from '../../Alert';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { AUTH } from '../../../../consts/auth';

type LoginFormProps = {
    onClose?: () => void;
    onSubmit: (data: AuthResponse) => void;
    // onGoogleLogin?: () => void;
    onRegisterClick?: () => void;
    googleClientId?: string;
};

type LoginFormData = LoginData;

const LoginForm: React.FC<LoginFormProps> = ({
    onClose,
    onSubmit,
    // onGoogleLogin,
    onRegisterClick,
    googleClientId,
}) => {
    const alert = useAlert();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        mode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const loginMutation = useAuthLoginMutation();

    // const { signInWithGoogle, isLoading: isGoogleLoading } = useGoogleAuth({
    //     onSuccess: onSubmit,
    //     clientId: googleClientId,
    // });

    const onFormSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        // if (onGoogleLogin) {
        //     onGoogleLogin();
        // } else {
        //     signInWithGoogle();
        // }
        // navigate(AUTH.redirectUrl);
        // window.location.
    };

    // Обработка успешного логина
    useEffect(() => {
        if (loginMutation.isSuccess && loginMutation.data) {
            onSubmit(loginMutation.data);
        }
    }, [loginMutation.isSuccess, loginMutation.data, onSubmit]);

    // Обработка ошибки логина
    useEffect(() => {
        if (loginMutation.isError && loginMutation.error) {
            console.error(loginMutation.error);
            let errorMessage = 'Unknown Error';
            if (isAxiosError(loginMutation.error)) {
                errorMessage = loginMutation.error.response?.data?.message || 'Unknown Error';
            }
            alert.showError(errorMessage, { autoHide: 2 });
        }
    }, [loginMutation.isError, loginMutation.error, alert.showError]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logoSection}>
                    <Logo />
                    <Text variant='header' className={styles.logoText}>
                        AI Bank Statement Converter
                    </Text>
                </div>
                <ButtonBase className={styles.closeButton} onClick={onClose}>
                    <CrossIcon />
                </ButtonBase>
            </div>

            <div className={styles.content}>
                <div className={styles.formSection}>
                    <Text variant='body-l' className={styles.title}>
                        Log in into account to convert your Bank Statements for Free
                    </Text>

                    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
                        <div className={styles.inputs}>
                            <TextInput
                                label='Username'
                                error={errors.username?.message}
                                placeholder='Username'
                                type='text'
                                {...register('username', {
                                    required: 'Username is required',
                                })}
                            />

                            <TextInput
                                label='Password'
                                error={errors.password?.message}
                                placeholder='Password'
                                type='password'
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                            />
                        </div>

                        <Button type='submit' variant='primary' fullWidth>
                            Login
                        </Button>
                    </form>
                </div>

                <div className={styles.separator}>
                    <div className={styles.separatorLine} />
                    <Text variant='caption' className={styles.separatorText}>
                        Or
                    </Text>
                    <div className={styles.separatorLine} />
                </div>

                <Button variant='secondary' href={AUTH.redirectUrl} className={styles.googleButton}>
                    <GoogleIcon />
                    <Text variant='body-s' className={styles.googleButtonText}>
                        Log in with Google
                    </Text>
                </Button>

                <div className={styles.signInPrompt}>
                    <Text variant='small' className={styles.signInText}>
                        Don&apos;t have an account?{' '}
                    </Text>
                    <Link className={styles.signInLink} onClick={onRegisterClick} variant='small'>
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
