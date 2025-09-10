import { useMutation } from "@tanstack/react-query";
import { apiClient } from "~/utils/api";

export const downloadFileMutation = (id: string) => {
    return useMutation({
        mutationKey: ['downloadFile', id],
        mutationFn: async () => {
            return await apiClient.get(`/files/download/${id}`);
        }
    });
}
