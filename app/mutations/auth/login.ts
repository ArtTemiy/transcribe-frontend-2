import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import type { AuthResponse } from '@/types/auth/authResponse';
import type { LoginData } from '@/types/auth/login';

export const useAuthLoginMutation = () => {
    return useMutation({
        mutationKey: ['auth', 'Login'],
        mutationFn: async (LoginData: LoginData): Promise<AuthResponse> => {
            return (await axios.post('api/v1/auth/login', { ...LoginData, use_cookies: true }))
                .data as AuthResponse;
        },
    });
};
