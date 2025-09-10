import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import type { AuthResponse } from "~/types/auth/authResponse";
import type { LoginData } from "~/types/auth/login"
import { apiClient } from "~/utils/api";

export const useAuthLoginMutation = () => {
    return useMutation({
        mutationKey: ['auth', 'Login'],
        mutationFn: async (LoginData: LoginData): Promise<AuthResponse> => {
            return (await apiClient.post('auth/login', LoginData)).data as AuthResponse;
        }
    })
}
