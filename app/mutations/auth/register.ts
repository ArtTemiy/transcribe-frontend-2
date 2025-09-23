import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import type { AuthResponse } from '~/types/auth/authResponse';
import type { RegisterData } from '~/types/auth/register';

export const useAuthRegisterMutation = () => {
    return useMutation({
        mutationKey: ['auth', 'register'],
        mutationFn: async (registerData: RegisterData): Promise<AuthResponse> => {
            return (
                await axios.post('api/v1/auth/register', { ...registerData, use_cookies: true })
            ).data as AuthResponse;
        },
    });
};
