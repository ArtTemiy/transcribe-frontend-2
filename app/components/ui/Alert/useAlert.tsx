import { useState, useCallback } from 'react';

export interface AlertConfig {
    id?: string;
    variant?: 'error' | 'warning' | 'success' | 'info';
    message: string;
    dismissible?: boolean;
    autoHide?: number;
    position?: 'top' | 'bottom' | 'relative';
    icon?: React.ReactNode;
}

export interface AlertItem extends Required<Omit<AlertConfig, 'icon'>> {
    icon?: React.ReactNode;
    show: boolean;
}

export const useAlert = (p0: {}) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    const generateId = useCallback(() => {
        return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    const showAlert = useCallback(
        (config: AlertConfig) => {
            const id = config.id || generateId();
            const newAlert: AlertItem = {
                id,
                variant: config.variant || 'error',
                message: config.message,
                dismissible: config.dismissible !== false,
                autoHide: config.autoHide,
                position: config.position || 'top',
                icon: config.icon,
                show: true,
            };

            setAlerts(prev => [...prev, newAlert]);

            // Если задано автоскрытие, удаляем алерт через указанное время
            if (newAlert.autoHide) {
                setTimeout(() => {
                    hideAlert(id);
                }, newAlert.autoHide);
            }

            return id;
        },
        [generateId],
    );

    const hideAlert = useCallback((id: string) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, []);

    const hideAllAlerts = useCallback(() => {
        setAlerts([]);
    }, []);

    // Удобные методы для разных типов алертов
    const showError = useCallback(
        (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => {
            return showAlert({ ...options, message, variant: 'error' });
        },
        [showAlert],
    );

    const showWarning = useCallback(
        (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => {
            return showAlert({ ...options, message, variant: 'warning' });
        },
        [showAlert],
    );

    const showSuccess = useCallback(
        (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => {
            return showAlert({ ...options, message, variant: 'success' });
        },
        [showAlert],
    );

    const showInfo = useCallback(
        (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => {
            return showAlert({ ...options, message, variant: 'info' });
        },
        [showAlert],
    );

    return {
        alerts,
        showAlert,
        hideAlert,
        hideAllAlerts,
        showError,
        showWarning,
        showSuccess,
        showInfo,
    };
};

export default useAlert;
