import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import Button from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import Link from "@/components/ui/Link";

import Logo from "@/../src/icons/logo.svg";
import CrossIcon from "@/../src/icons/cross.svg";
import GoogleIcon from "@/../src/icons/google.svg";
import ButtonBase from "@/components/ui/ButtonBase";
import TextInput from "@/components/ui/input/TextInput/TextInput";
import type { LoginData } from "~/types/auth/login";
import { useAuthLoginMutation } from "~/mutations/auth/login";
import type { AuthResponse } from "~/types/auth/authResponse";

type LoginFormProps = {
    onClose?: () => void;
    onSubmit: (data: AuthResponse) => void;
    onGoogleLogin?: () => void;
    onRegisterClick?: () => void;
}

type LoginFormData = LoginData;

const LoginForm: React.FC<LoginFormProps> = ({
    onClose,
    onSubmit,
    onGoogleLogin,
    onRegisterClick,
}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
        },
    });
    const LoginMutation = useAuthLoginMutation();

    const password = watch("password");

    const onFormSubmit = (data: LoginFormData) => {
        LoginMutation.mutate(data);
    };

    useEffect(() => {
        if (LoginMutation.isSuccess) {
            onSubmit(LoginMutation.data);
        }
        if (LoginMutation.isError) {
            console.error(LoginMutation.error);
        }
    }, [LoginMutation]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logoSection}>
                    <Logo />
                    <Text variant='header' className={styles.logoText}>AI Bank Statement Converter</Text>
                </div>
                <ButtonBase className={styles.closeButton} onClick={onClose}>
                    <CrossIcon />
                </ButtonBase>
            </div>

            <div className={styles.content}>
                <div className={styles.formSection}>
                    <Text variant="body-l" className={styles.title}>
                        Log in into account to convert your Bank Statements for Free
                    </Text>

                    <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
                        <div className={styles.inputs}>

                            <TextInput
                                label="Username"
                                error={errors.username?.message}
                                placeholder="Username"
                                type='text'
                                {...register("username", {
                                    required: "Username is required",
                                })}
                            />

                            <TextInput
                                label='Password'
                                error={errors.password?.message}
                                placeholder='Password'
                                type='password'
                                {...register("password", {
                                    required: 'Password is required',
                                })}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            Login
                        </Button>
                    </form>
                </div>

                <div className={styles.separator}>
                    <div className={styles.separatorLine} />
                    <Text variant="caption" className={styles.separatorText}>Or</Text>
                    <div className={styles.separatorLine} />
                </div>

                <Button
                    variant='secondary'
                    onClick={onGoogleLogin}
                    disabled={isSubmitting}
                    className={styles.googleButton}
                >
                    <GoogleIcon />
                    <Text variant="body-s" className={styles.googleButtonText}>Log in with Google</Text>
                </Button>

                <div className={styles.signInPrompt}>
                    <Text variant="small" className={styles.signInText}>Don't have an account? </Text>
                    <Link
                        className={styles.signInLink}
                        onClick={onRegisterClick}
                        variant='small'
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;