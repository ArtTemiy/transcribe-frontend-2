import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import type { UserInfo } from "@/types/UserInfo";

export const useUserInfoQuery = () => {
    return useQuery<UserInfo>({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = await axios.get("/api/user/info");
            return response.data as UserInfo;
        },
    });
}
