import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import type { UserInfo } from "@/types/UserInfo";
import { apiClient } from "~/utils/api";

export const useUserInfoQuery = () => {
    return useQuery<UserInfo>({
        queryKey: ["userInfo"],
        queryFn: async (): Promise<UserInfo> => {
            // const response = await apiClient.get('/user/info');
            // return response.data as UserInfo;
            return {
                pagesCount: 25,
                planKey: 'personal',
                apiKey: 'aksjdaklsjdklajdklajsdaskldkjas',
            };
        },
    });
}
