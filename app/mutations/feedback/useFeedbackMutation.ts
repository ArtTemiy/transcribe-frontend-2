import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useAlert } from '../../context/AlertContext';
import { apiClient } from '../../utils/apiClient';

export type FeedbackData = {
    name: string;
    email: string;
    message: string;
    files: File[];
};

export const useFeedbackMutation = () => {
    const alert = useAlert();
    return useMutation({
        mutationKey: ['feedback'],
        mutationFn: (data: FeedbackData) => {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('message', data.message);
            data.files?.forEach(file => formData.append('files', file));

            return apiClient.post('/feedback', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onError: error => {
            console.error(error);
            if (isAxiosError(error)) {
                alert.showError(error.response?.data?.message || 'Unknown Error', { autoHide: 10 });
            } else {
                alert.showError('Something went wrong', { autoHide: 10 });
            }
        },
        onSuccess: () => {
            alert.showSuccess('Sent successfully', { autoHide: 10 });
        },
    });
};
