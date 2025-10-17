import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useAlert } from '../hooks';
import type { Response } from '../types/response';
import { apiClient } from '../utils/apiClient';

export type JobStatus = 'created' | 'uploaded' | 'processing' | 'completed' | 'error';

export type JobData = {
    id: string;
    status: JobStatus;
    pages_used: number;
    created_at: string;
};

export type JobsResponseData = JobData[];

export const useJobsQuery = () => {
    const alert = useAlert();
    return useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            try {
                const response = (await apiClient.get('/jobs')).data as Response<JobsResponseData>;
                return response.data;
            } catch (error) {
                console.error(error);
                if (isAxiosError(error)) {
                    alert.showError(
                        (error.response?.data as Response).humanError || 'Unknown Error',
                        {
                            autoHide: 10,
                        },
                    );
                } else {
                    alert.showError('Something went wrong', { autoHide: 10 });
                }
                throw error;
            }
        },
    });
};
