import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useAlert } from '../../hooks/useAlert';
import type { Response } from '../../types/response';
import { apiClient } from '../../utils/apiClient';

export type FeedbackData = {
    name: string;
    email: string;
    message: string;
    files: File[];
};

export type FeedbackType = 'contact' | 'feedback';

type Payload = {
    data: FeedbackData;
    variant: FeedbackType;
};

export const useFeedbackMutation = () => {
    const alert = useAlert();
    return useMutation({
        mutationKey: ['feedback'],
        mutationFn: async (payload: Payload) => {
            const { data, variant } = payload;
            if (variant === 'feedback') {
                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('email', data.email);
                formData.append('message', data.message);
                data.files?.forEach(file => formData.append('files', file));

                return await apiClient.post('/feedback', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            if (variant === 'contact') {
                return await apiClient.post('/custom-price', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            }
        },
        onError: error => {
            console.error(error);
            if (isAxiosError(error)) {
                alert.showError((error.response?.data as Response).humanError || 'Unknown Error', {
                    autoHide: 10,
                });
            } else {
                alert.showError('Something went wrong', { autoHide: 10 });
            }
        },
        onSuccess: () => {
            alert.showSuccess('Sent successfully', { autoHide: 10 });
        },
    });
};
