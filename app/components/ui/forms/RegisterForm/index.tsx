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
import { useAuthRegisterMutation } from '~/mutations/auth/register';
import type { AuthResponse } from '~/types/auth/authResponse';
import type { RegisterData } from '~/types/auth/register';

import styles from './index.module.scss';
import { useAlert } from '../../Alert';
import { isAxiosError } from 'axios';
import { AUTH } from '../../../../consts/auth';
import GoogleButton from '../../GoogleButton/GoogleButton';

type RegisterFormProps = {
    onClose?: () => void;
    onSubmit: (data: AuthResponse) => void;
    onSignInClick?: () => void;
};

type RegisterFormData = RegisterData;

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose, onSubmit, onSignInClick }) => {
    const alert = useAlert();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        mode: 'onChange',
        defaultValues: {
            username: '',
            email: '',
            password1: '',
            password2: '',
        },
    });
    const registerMutation = useAuthRegisterMutation();

    const password1 = watch('password1');

    const onFormSubmit = (data: RegisterFormData) => {
        registerMutation.mutate(data);
    };

    // Обработка успешного логина
    useEffect(() => {
        if (registerMutation.isSuccess && registerMutation.data) {
            onSubmit(registerMutation.data);
        }
    }, [registerMutation.isSuccess, registerMutation.data, onSubmit]);

    // Обработка ошибки логина
    useEffect(() => {
        if (registerMutation.isError && registerMutation.error) {
            console.error(registerMutation.error);
            let errorMessage = 'Unknown Error';
            if (isAxiosError(registerMutation.error)) {
                errorMessage = registerMutation.error.response?.data?.message || 'Unknown Error';
            }
            alert.showError(errorMessage, { autoHide: 5 });
        }
    }, [registerMutation.isError, registerMutation.error, alert.showError]);

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
                        Create an account to convert your Bank Statements for Free
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
                                    minLength: {
                                        value: 3,
                                        message: 'Username must be at least 3 characters long',
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]+$/,
                                        message:
                                            'Username can only contain letters, numbers and underscores',
                                    },
                                })}
                            />

                            <TextInput
                                label='Email address'
                                error={errors.email?.message}
                                placeholder='your@gmail.com'
                                type='email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Emails is incorrect',
                                    },
                                })}
                            />

                            <TextInput
                                label='Password'
                                error={errors.password1?.message}
                                placeholder='Password'
                                type='password'
                                {...register('password1', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters long',
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message:
                                            'Password must contain at least one lowercase letter, one uppercase letter and one number',
                                    },
                                })}
                            />

                            <TextInput
                                label='Repeat password'
                                error={errors.password2?.message}
                                placeholder='Repeat password'
                                type='password'
                                {...register('password2', {
                                    required: 'Password check is required',
                                    validate: value =>
                                        value === password1 || 'Passwords do not match',
                                })}
                            />
                        </div>

                        <Button type='submit' variant='primary' fullWidth>
                            Get started
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

                <GoogleButton href={AUTH.redirectUrl}>Sign up with Google</GoogleButton>

                <div className={styles.signInPrompt}>
                    <Text variant='small' className={styles.signInText}>
                        Already have an account?{' '}
                    </Text>
                    <Link className={styles.signInLink} onClick={onSignInClick} variant='small'>
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
