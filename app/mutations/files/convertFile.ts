import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { UserFile } from '~/context/FilesContext';
import { apiClient } from '~/utils/apiClient';

export type UploadingFileResponse = {
    id: string;
};

export type ConvertFileResponse = {
    id: string;
};

export type JobStatusResponse = {
    id: string;
    status: string;
};

export const useConvertFilesMutation = (key: string) => {
    return useMutation<string, AxiosError, UserFile[]>({
        mutationKey: ['uploadFile', key],
        mutationFn: async (files: UserFile[]) => {
            const fileUploadTasks = files.map(async file => {
                const formData = new FormData();
                formData.append('file', file.file);

                const response = await apiClient.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    timeout: 2000,
                });

                const { id: serverFileId } = response.data as UploadingFileResponse;
                return serverFileId;
            });
            const fileServerIds = await Promise.all(fileUploadTasks);

            const response = await apiClient.post('/convert', {
                result_file_type: 'csv',
                file_ids: fileServerIds,
            });
            const { id: jobId } = response.data as ConvertFileResponse;

            let jobStatus: JobStatusResponse = { id: jobId, status: 'unknown' };

            while (['unknown', 'pending'].includes(jobStatus.status)) {
                if (jobStatus.status !== 'unknown') {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                jobStatus = (await apiClient.get(`/jobs/${jobId}`)).data as JobStatusResponse;
            }
            if (jobStatus.status !== 'completed') {
                throw new Error(`Job failed: ${jobStatus}`);
            }

            return jobId;
        },
    });
};
