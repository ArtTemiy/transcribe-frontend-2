import { useMutation } from "@tanstack/react-query";
import type { UserFile } from "~/context/FilesContext";
import { apiClient } from "~/utils/api";

export type UploadingFileResponse = {
    requestId: string;
};

export const useUploadFilesMutation = (key: string) => {
    return useMutation<UploadingFileResponse, any, UserFile[]>({
        mutationKey: ['uploadFile', key],
        mutationFn: async (files: UserFile[]) => {
            const formData = new FormData();
            files.forEach(file => formData.append("file", file.file));
            const response = await apiClient.post('/files/upload', formData, {timeout: 2000});
            return response.data as UploadingFileResponse;
        }
    });
}
