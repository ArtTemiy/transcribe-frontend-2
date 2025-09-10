import { useMutation } from "@tanstack/react-query"
import { apiClient } from "~/utils/api";

export const useAuthLogoutMutation = () => {
    return useMutation({
        mutationKey: ['auth', 'Logout'],
        mutationFn: async () => {
            return (await apiClient.post('auth/logout', {})).data;
        }
    })
}
