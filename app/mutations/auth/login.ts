import { useMutation } from '@tanstack/react-query';

import type { AuthResponse } from '~/types/auth/authResponse';
import type { LoginData } from '~/types/auth/login';
import { apiClient } from '~/utils/apiClient';

export const useAuthLoginMutation = () => {
    return useMutation({
        mutationKey: ['auth', 'Login'],
        mutationFn: async (LoginData: LoginData): Promise<AuthResponse> => {
            return (await apiClient.post('auth/login', { ...LoginData, use_cookies: true }))
                .data as AuthResponse;
        },
    });
};
