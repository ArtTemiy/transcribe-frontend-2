import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const downloadFileMutation = (id: string) => {
    return useMutation({
        mutationKey: ['downloadFile', id],
        mutationFn: async () => {
            return await axios.get(`/api/download/${id}`);
        }
    });
}
