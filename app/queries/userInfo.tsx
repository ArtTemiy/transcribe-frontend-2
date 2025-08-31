import { useQuery } from "@tanstack/react-query"
import type { UserInfo } from "@/types/UserInfo";

export const useUserInfoQuery = () => {
    return useQuery<UserInfo>({
        queryKey: ["userInfo"],
        queryFn: async () => {
            return {
                pagesCount: 10,
                planKey: "free",
                apiKey: "1234567890",
            }
        },
    });
}