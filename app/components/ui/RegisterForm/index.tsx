import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./index.module.scss";
import Button from "../Button";
import { Text } from "../Text";

import Logo from "@/../src/icons/logo.svg";
import Cross from "@/../src/icons/cross.svg";
import GoogleIcon from "@/../src/icons/google.svg";

// Иконки из Figma
const imgUnion = "http://localhost:3845/assets/7e14d6d065b4988c2c142d8618bb94bef6f54ce4.svg";

type RegisterFormProps = {
    onClose?: () => void;
    onSubmit?: (data: RegisterFormData) => void;
    onGoogleSignUp?: () => void;
    onSignInClick?: () => void;
}

export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Компонент иконки глаза для скрытия/показа пароля
const EyeSlashIcon: React.FC = () => (
    <div className={styles.eyeIcon}>
        <img src={imgUnion} alt="Hide password" />
    </div>
);

const RegisterForm: React.FC<RegisterFormProps> = ({
    onClose,
    onSubmit,
    onGoogleSignUp,
    onSignInClick,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        mode: "onChange",
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    const onFormSubmit = async (data: RegisterFormData) => {
        try {
            await onSubmit?.(data);
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logoSection}>
                    <Logo />
                    <Text variant="caption" className={styles.logoText}>AI Bank Statement Converter</Text>
                </div>
                <button className={styles.closeButton} onClick={onClose} type="button">
                    <Cross />
                </button>
            </div>

            <div className={styles.body}>
                <div className={styles.content}>
                    <div className={styles.formSection}>
                        <Text variant="body-l" className={styles.title}>
                          Create an account to convert your Bank Statements for Free
                        </Text>

                        <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
                            <div className={styles.inputs}>
                                {/* Username Field */}
                                <div className={styles.fieldWrapper}>
                                    <Text variant="small" className={styles.label}>Username</Text>
                                    <div className={styles.inputContainer}>
                                        <input
                                            className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
                                            type="text"
                                            placeholder="Username"
                                            {...register("username", {
                                                required: "Имя пользователя обязательно",
                                                minLength: {
                                                    value: 3,
                                                    message: "Имя пользователя должно содержать минимум 3 символа",
                                                },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_]+$/,
                                                    message: "Имя пользователя может содержать только буквы, цифры и подчеркивания",
                                                },
                                            })}
                                        />
                                    </div>
                                    {errors.username && (
                                      <Text variant="small" typColor="alarm" className={styles.error}>{errors.username.message}</Text>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className={styles.fieldWrapper}>
                                    <Text variant="small" className={styles.label}>Email address</Text>
                                    <div className={styles.inputContainer}>
                                        <input
                                            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                                            type="email"
                                            placeholder="your@gmail.com"
                                            {...register("email", {
                                                required: "Email обязателен",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Некорректный email адрес",
                                                },
                                            })}
                                        />
                                    </div>
                                    {errors.email && (
                                      <Text variant="small" typColor="alarm" className={styles.error}>{errors.email.message}</Text>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className={styles.fieldWrapper}>
                                    <Text variant="small" className={styles.label}>Create password</Text>
                                    <div className={styles.inputContainer}>
                                        <input
                                            className={`${styles.input} ${styles.inputWithIcon} ${errors.password ? styles.inputError : ""}`}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            {...register("password", {
                                                required: "Пароль обязателен",
                                                minLength: {
                                                    value: 6,
                                                    message: "Пароль должен содержать минимум 6 символов",
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                                    message: "Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру",
                                                },
                                            })}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className={styles.passwordToggle}
                                        >
                                            <EyeSlashIcon />
                                        </button>
                                    </div>
                                    {errors.password && (
                                      <Text variant="small" typColor="alarm" className={styles.error}>{errors.password.message}</Text>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div className={styles.fieldWrapper}>
                                    <Text variant="small" className={styles.label}>Repeat password</Text>
                                    <div className={styles.inputContainer}>
                                        <input
                                            className={`${styles.input} ${styles.inputWithIcon} ${errors.confirmPassword ? styles.inputError : ""}`}
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Repeat password"
                                            {...register("confirmPassword", {
                                                required: "Подтверждение пароля обязательно",
                                                validate: (value) =>
                                                    value === password || "Пароли не совпадают",
                                            })}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className={styles.passwordToggle}
                                        >
                                            <EyeSlashIcon />
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                      <Text variant="small" typColor="alarm" className={styles.error}>{errors.confirmPassword.message}</Text>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                fullWidth
                                buttonLabel={isSubmitting ? "Регистрация..." : "Get started"}
                                disabled={isSubmitting}
                            />
                        </form>
                    </div>

                    <div className={styles.separator}>
                        <div className={styles.separatorLine} />
                        <Text variant="caption" className={styles.separatorText}>Or</Text>
                        <div className={styles.separatorLine} />
                    </div>

                    <button
                        className={styles.googleButton}
                        onClick={onGoogleSignUp}
                        type="button"
                        disabled={isSubmitting}
                    >
                        <GoogleIcon />
                        <Text variant="body-s" className={styles.googleButtonText}>Sign up with Google</Text>
                    </button>

                    <div className={styles.signInPrompt}>
                        <Text variant="small" className={styles.signInText}>Already have an account? </Text>
                        <button
                            className={styles.signInLink}
                            onClick={onSignInClick}
                            type="button"
                        >
                            <Text variant="small" className={styles.signInLinkText}>Sign in</Text>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;