import { useCallback, useEffect } from 'react';
import { useGoogleAuthMutation } from '~/mutations/auth/googleAuth';
import { useAlert } from '~/components/ui/Alert';
import { isAxiosError } from 'axios';
import type { AuthResponse } from '~/types/auth/authResponse';

declare global {
    interface Window {
        google?: {
            accounts: {
                id: {
                    initialize: (config: GoogleInitConfig) => void;
                    prompt: () => void;
                    renderButton: (element: HTMLElement, config: GoogleButtonConfig) => void;
                };
            };
        };
    }
}

interface GoogleInitConfig {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
}

interface GoogleButtonConfig {
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'large' | 'medium' | 'small';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    shape?: 'rectangular' | 'pill' | 'circle' | 'square';
    logo_alignment?: 'left' | 'center';
    width?: string;
    locale?: string;
}

interface GoogleCredentialResponse {
    credential: string;
    select_by?: string;
}

interface UseGoogleAuthProps {
    onSuccess: (data: AuthResponse) => void;
    clientId?: string;
}

export const useGoogleAuth = ({ onSuccess, clientId }: UseGoogleAuthProps) => {
    const alert = useAlert();
    const googleAuthMutation = useGoogleAuthMutation();

    const handleGoogleResponse = useCallback(
        (response: GoogleCredentialResponse) => {
            if (response.credential) {
                googleAuthMutation.mutate({ token: response.credential });
            }
        },
        [googleAuthMutation],
    );

    const initializeGoogleAuth = useCallback(() => {
        if (!clientId) {
            console.error('Google Client ID not provided');
            return;
        }

        if (window.google?.accounts?.id) {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
            });
        }
    }, [clientId, handleGoogleResponse]);

    const loadGoogleScript = useCallback(() => {
        if (window.google?.accounts?.id) {
            initializeGoogleAuth();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleAuth;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [initializeGoogleAuth]);

    const signInWithGoogle = useCallback(() => {
        if (window.google?.accounts?.id) {
            window.google.accounts.id.prompt();
        } else {
            console.error('Google Identity Services not loaded');
        }
    }, []);

    const renderGoogleButton = useCallback((element: HTMLElement, config?: GoogleButtonConfig) => {
        if (window.google?.accounts?.id && element) {
            window.google.accounts.id.renderButton(element, {
                theme: 'outline',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left',
                width: '100%',
                ...config,
            });
        }
    }, []);

    // Обработка успешной авторизации
    useEffect(() => {
        if (googleAuthMutation.isSuccess && googleAuthMutation.data) {
            onSuccess(googleAuthMutation.data);
        }
    }, [googleAuthMutation.isSuccess, googleAuthMutation.data, onSuccess]);

    // Обработка ошибки авторизации
    useEffect(() => {
        if (googleAuthMutation.isError && googleAuthMutation.error) {
            console.error('Google auth error:', googleAuthMutation.error);
            let errorMessage = 'Google authorization failed';
            if (isAxiosError(googleAuthMutation.error)) {
                errorMessage =
                    googleAuthMutation.error.response?.data?.message ||
                    'Google authorization failed';
            }
            alert.showError(errorMessage, { autoHide: 3 });
        }
    }, [googleAuthMutation.isError, googleAuthMutation.error, alert]);

    // Загрузка Google Script при монтировании
    useEffect(() => {
        const cleanup = loadGoogleScript();
        return cleanup;
    }, [loadGoogleScript]);

    return {
        signInWithGoogle,
        renderGoogleButton,
        isLoading: googleAuthMutation.isPending,
        error: googleAuthMutation.error,
    };
};
