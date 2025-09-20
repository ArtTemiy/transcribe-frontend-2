import axios from 'axios';
import type { AuthResponse } from '~/types/auth/authResponse';

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
    baseURL: '/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
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
    async (error) => {
        // console.log('🔍 [DEBUG] API Interceptor triggered:', {
        //     status: error.response?.status,
        //     url: error.config?.url,
        //     hasRefreshToken: document.cookie.includes('refreshToken') || 'unknown',
        //     isRefreshing
        // });

        if (error.response && error.response.status === 401) {
            // console.log('🔍 [DEBUG] 401 error detected, attempting token refresh...');

            if (!isRefreshing) {
                isRefreshing = true;
                // console.log('🔍 [DEBUG] Starting token refresh process...');

                try {
                    // console.log('🔍 [DEBUG] Making refresh token request to /auth/refresh-token');
                    const response = await axios.post('/api/v1/auth/refresh-token');
                    const { refresh_token: refreshToken, access_token: accessToken } = response.data as AuthResponse;

                    // console.log('🔍 [DEBUG] Token refresh successful:', {
                    //     hasAccessToken: !!accessToken,
                    //     hasRefreshToken: !!refreshToken,
                    //     subscribersCount: subscribers.length
                    // });

                    // Устанавливаем новый токен в заголовки для исходного запроса
                    if (error.config && error.config.headers) {
                        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                    }

                    subscribers.forEach(cb => cb(accessToken));
                    subscribers = [];

                    // console.log('🔍 [DEBUG] Retrying original request with new token');
                    return apiClient(error.config);
                } catch (err) {
                    // console.error('🚨 [DEBUG] Refresh token failed:', {
                    //     error: err,
                    //     isAxiosError: err instanceof Error,
                    //     status: (err as any)?.response?.status,
                    //     message: (err as any)?.message
                    // });

                    // Очищаем состояние и перенаправляем на страницу входа
                    // console.log('🔍 [DEBUG] Clearing auth state');
                    subscribers.forEach(cb => cb(''));
                    subscribers = [];

                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                    // console.log('🔍 [DEBUG] Token refresh process completed');
                }
            } else {
                // console.log('🔍 [DEBUG] Token refresh already in progress, queuing request...');
                return new Promise((resolve, reject) => {
                    addSubscriber((token) => {
                        // console.log('🔍 [DEBUG] Processing queued request with token:', !!token);
                        if (token) {
                            error.config.headers['Authorization'] = `Bearer ${token}`;
                            resolve(apiClient(error.config));
                        } else {
                            // console.log('🔍 [DEBUG] No token received, rejecting queued request');
                            reject(new Error('Authentication failed'));
                        }
                    });
                });
            }
        }

        // console.log('🔍 [DEBUG] Non-401 error, passing through:', error.response?.status);
        return Promise.reject(error);
    }
);