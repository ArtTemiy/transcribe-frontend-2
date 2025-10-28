import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useAlert } from '../hooks';
import type { Response } from '../types/response';
import { apiClient } from '../utils/apiClient';

export type DocumentStatus = 'created' | 'uploaded' | 'processing' | 'completed' | 'error';

export type Document = {
    id: string;
    status: DocumentStatus;
    pages_used: 2;
    file_name: string;
    download_url: string;
};

export type DocumentsResponseData = Document[];

export const useDocumentsQuery = () => {
    const alert = useAlert();
    return useQuery({
        queryKey: ['jobs'],
        queryFn: async () => {
            try {
                const response = (await apiClient.get('/documents'))
                    .data as Response<DocumentsResponseData>;
                return response.data;
            } catch (error) {
                console.error(error);
                if (isAxiosError(error)) {
                    alert.showError(
                        (error.response?.data as Response)?.humanError || 'Unknown Error',
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
