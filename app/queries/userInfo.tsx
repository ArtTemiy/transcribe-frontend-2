import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { UserInfo } from '@/types/UserInfo';
import { apiClient } from '@/utils/apiClient';

type Response = {
    data?: UserInfo;
    error?: string;
    humanError?: string;
};
export const useUserInfoQuery = () => {
    return useQuery<Response>({
        queryKey: ['userInfo'],
        queryFn: async (): Promise<Response> => {
            try {
                const response = (await apiClient.get('/auth/user')).data as Response;
                return response;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status ?? 0;

                    if (status >= 500) {
                        throw error;
                    }
                    return {};
                }
                throw error;
            }
        },
    });
};
