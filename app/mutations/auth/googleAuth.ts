import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import type { AuthResponse } from '~/types/auth/authResponse';

export type GoogleAuthData = {
    token: string;
};

export const useGoogleAuthMutation = () => {
    return useMutation({
        mutationKey: ['auth', 'google'],
        mutationFn: async (googleData: GoogleAuthData): Promise<AuthResponse> => {
            return (
                await axios.post('/api/v1/auth/google-callback', {
                    ...googleData,
                    use_cookies: true,
                })
            ).data as AuthResponse;
        },
    });
};
