import { useMutation } from '@tanstack/react-query';

import type { UserFile } from '@/context/FilesContext';
import { apiClient } from '@/utils/apiClient';

import type { Response } from '../../types/response';

export type Payload = {
    files: UserFile[];
    fileType: string;
};

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
    return useMutation({
        mutationKey: ['uploadFile', key],
        mutationFn: async (payload: Payload) => {
            const { files, fileType } = payload;
            const fileUploadTasks = files.map(async file => {
                const formData = new FormData();
                formData.append('file', file.file);
                if (file.passwordState?.password) {
                    formData.append('password', file.passwordState?.password);
                }

                const response = await apiClient.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const serverFileId = (response.data as Response<UploadingFileResponse>).data?.id;
                return serverFileId;
            });
            const fileServerIds = await Promise.all(fileUploadTasks);

            const response = await apiClient.post('/convert', {
                result_file_type: fileType || 'csv',
                file_ids: fileServerIds,
            });
            const { id: jobId } = (response.data as Response<ConvertFileResponse>).data || {
                id: '-',
            };

            let jobStatus: JobStatusResponse = { id: jobId, status: 'unknown' };
            const maxAttempts = 60; // Максимум 60 попыток (1 минута)
            let attempts = 0;

            while (['unknown', 'pending'].includes(jobStatus.status) && attempts < maxAttempts) {
                if (jobStatus.status !== 'unknown') {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                attempts++;
                
                try {
                    jobStatus = (
                        (await apiClient.get(`/jobs/${jobId}`)).data as Response<JobStatusResponse>
                    ).data || { status: 'failed', id: '-' };
                } catch (error) {
                    console.error('Error checking job status:', error);
                    throw new Error('Failed to check job status');
                }
            }
            
            if (attempts >= maxAttempts) {
                throw new Error('Job timeout: Processing took too long');
            }
            
            if (jobStatus.status !== 'completed') {
                throw new Error(`Job failed with status: ${jobStatus.status}`);
            }

            return jobId;
        },
    });
};
