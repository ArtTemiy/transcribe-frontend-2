import axios from 'axios';
import type { AuthResponse } from '~/types/auth/authResponse';

// Создаем экземпляр axios с базовой конфигурацией
export const apiClient = axios.create({
    baseURL: '/api',
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
        if (error.response && error.response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const {refreshToken, accessToken} = (await apiClient.post('/auth/refresh')).data as AuthResponse;
                    subscribers.forEach(cb => cb(accessToken));
                    subscribers = [];
                    return apiClient(error.config);
                } catch (err) {
                    console.error('Refresh token error:', err);
                } finally {
                    isRefreshing = false;
                }
            } else {
                return new Promise((resolve, reject) => {
                    addSubscriber((token) => {
                        error.config.headers['Authorization'] = `Bearer ${token}`;
                        resolve(apiClient(error.config));
                    });
                });
            }
        }
        return Promise.reject(error);
    }
);