import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { AlertContainer } from '../../components/ui/Alert/AlertContainer';

// Определяем типы напрямую, чтобы избежать проблем с импортом
interface AlertConfig {
    id?: string;
    variant?: 'error' | 'warning' | 'success' | 'info';
    message: string;
    dismissible?: boolean;
    autoHide?: number;
    position?: 'top' | 'bottom' | 'relative';
    icon?: React.ReactNode;
}

interface AlertItem extends Required<Omit<AlertConfig, 'icon'>> {
    icon?: React.ReactNode;
    show: boolean;
}

interface AlertContextType {
    alerts: AlertItem[];
    showAlert: (config: AlertConfig) => string;
    hideAlert: (id: string) => void;
    hideAllAlerts: () => void;
    showError: (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => string;
    showWarning: (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => string;
    showSuccess: (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => string;
    showInfo: (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => string;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
    children: React.ReactNode;
    maxAlerts?: number;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children, maxAlerts = 5 }) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    const generateId = useCallback(() => {
        return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    const hideAlert = useCallback(
        (id: string) => {
            setAlerts(prev => prev.filter(alert => alert.id !== id));
        },
        [setAlerts],
    );

    const hideAllAlerts = useCallback(() => {
        setAlerts([]);
    }, [setAlerts]);

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

            setAlerts(prev => {
                const updated = [...prev, newAlert];
                // Ограничиваем количество алертов
                return updated.slice(-maxAlerts);
            });

            // Если задано автоскрытие, удаляем алерт через указанное время
            console.log('create', id, newAlert);

            if (newAlert.autoHide) {
                setTimeout(() => {
                    hideAlert(id);
                }, newAlert.autoHide * 1000);
            }

            return id;
        },
        [generateId, maxAlerts, hideAlert, setAlerts],
    );

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

    const contextValue: AlertContextType = useMemo(
        () => ({
            alerts,
            showAlert,
            hideAlert,
            hideAllAlerts,
            showError,
            showWarning,
            showSuccess,
            showInfo,
        }),
        [
            alerts,
            showAlert,
            hideAlert,
            hideAllAlerts,
            showError,
            showWarning,
            showSuccess,
            showInfo,
        ],
    );

    return (
        <AlertContext.Provider value={contextValue}>
            {children}
            <AlertContainer alerts={alerts} onClose={hideAlert} maxAlerts={maxAlerts} />
        </AlertContext.Provider>
    );
};

// Хук для использования контекста алертов
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export default AlertProvider;
