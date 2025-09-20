import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { UserInfo } from '@/types/UserInfo';
import { apiClient } from '~/utils/apiClient';

type Response = {
    data?: UserInfo;
};
export const useUserInfoQuery = () => {
    return useQuery<Response>({
        queryKey: ['userInfo'],
        queryFn: async (): Promise<Response> => {
            try {
                return {
                    data: {
                        pages: 10,
                        planKey: 'personal',
                        apiKey: 'asdadsasd',
                    },
                };
                const response = await apiClient.get('/auth/user');
                return { data: response.data as UserInfo };
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
