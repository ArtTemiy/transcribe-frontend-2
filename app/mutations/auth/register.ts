import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import type { AuthResponse } from "~/types/auth/authResponse";
import type { RegisterData } from "~/types/auth/register"
import { apiClient } from "~/utils/api";

export const useAuthRegisterMutation = () => {
    return useMutation({
        mutationKey: ['auth', 'register'],
        mutationFn: async (registerData: RegisterData): Promise<AuthResponse> => {
            return (await apiClient.post('auth/register', registerData)).data as AuthResponse;
        }
    })
}
