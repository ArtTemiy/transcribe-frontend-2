import { useMutation } from '@tanstack/react-query';

import { apiClient } from '~/utils/apiClient';

export const useAuthLogoutMutation = () => {
    return useMutation({
        mutationKey: ['auth', 'Logout'],
        mutationFn: async () => {
            return (await apiClient.post('auth/logout', {})).data;
        },
    });
};
