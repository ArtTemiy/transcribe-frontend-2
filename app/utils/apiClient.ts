import axios from 'axios';

import type { AuthResponse } from '@/types/auth/authResponse';

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
    baseURL: '/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Интерцептор для обновления access токена
type SubscriberCallback = (token: string) => void;
let isRefreshing = false;
let subscribers: SubscriberCallback[] = [];

function addSubscriber(callback: SubscriberCallback) {
    subscribers.push(callback);
}
apiClient.interceptors.response.use(
    resp => resp,
    async error => {
        if (error.response && error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const response = await axios.post('/api/v1/auth/refresh-token');
                    const { access_token: accessToken } = response.data as AuthResponse;

                    // Устанавливаем новый токен в заголовки для исходного запроса
                    if (error.config && error.config.headers) {
                        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                    }

                    subscribers.forEach(cb => cb(accessToken));
                    subscribers = [];

                    return apiClient(error.config);
                } catch (err) {
                    // Очищаем состояние и перенаправляем на страницу входа
                    subscribers.forEach(cb => cb(''));
                    subscribers = [];

                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            } else {
                return new Promise((resolve, reject) => {
                    addSubscriber(token => {
                        if (token) {
                            error.config.headers['Authorization'] = `Bearer ${token}`;
                            resolve(apiClient(error.config));
                        } else {
                            reject(new Error('Authentication failed'));
                        }
                    });
                });
            }
        }

        return Promise.reject(error);
    },
);
