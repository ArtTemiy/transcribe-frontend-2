import React, { createContext, useState, useCallback, useMemo, useRef } from 'react';

import { AlertContainer } from '../../components/ui/Alert/AlertContainer';

// Определяем типы напрямую, чтобы избежать проблем с импортом
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

// Разделяем контексты: один для методов (стабильный), другой для состояния
interface AlertMethodsContextType {
    showAlert: (config: AlertConfig) => string;
    hideAlert: (id: string) => void;
    hideAllAlerts: () => void;
    showError: (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => string;
    showWarning: (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => string;
    showSuccess: (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => string;
    showInfo: (message: string, options?: Omit<AlertConfig, 'message' | 'variant'>) => string;
}

interface AlertStateContextType {
    alerts: AlertItem[];
}

const AlertMethodsContext = createContext<AlertMethodsContextType | undefined>(undefined);
const AlertStateContext = createContext<AlertStateContextType | undefined>(undefined);

interface AlertProviderProps {
    children: React.ReactNode;
    maxAlerts?: number;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children, maxAlerts = 5 }) => {
    const [alerts, setAlerts] = useState<AlertItem[]>([]);

    // Используем useRef для стабильных методов
    const setAlertsRef = useRef(setAlerts);
    setAlertsRef.current = setAlerts;

    const generateId = useCallback(() => {
        return `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }, []);

    const hideAlert = useCallback((id: string) => {
        setAlertsRef.current(prev => prev.filter(alert => alert.id !== id));
    }, []);

    const hideAllAlerts = useCallback(() => {
        setAlertsRef.current([]);
    }, []);

    const showAlert = useCallback(
        (config: AlertConfig) => {
            const id = config.id || generateId();
            const newAlert: AlertItem = {
                id,
                variant: config.variant || 'error',
                message: config.message,
                dismissible: config.dismissible !== false,
                autoHide: config.autoHide || 0,
                position: config.position || 'top',
                icon: config.icon,
                show: true,
            };

            setAlertsRef.current(prev => {
                const updated = [...prev, newAlert];
                // Ограничиваем количество алертов
                return updated.slice(-maxAlerts);
            });

            // Если задано автоскрытие, удаляем алерт через указанное время
            if (newAlert.autoHide) {
                setTimeout(() => {
                    hideAlert(id);
                }, newAlert.autoHide * 1000);
            }

            return id;
        },
        [generateId, maxAlerts, hideAlert],
    );

    // Удобные методы для разных типов алертов - стабильные
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

    // Стабильные методы - не зависят от состояния alerts
    const methodsValue = useMemo(
        () => ({
            showAlert,
            hideAlert,
            hideAllAlerts,
            showError,
            showWarning,
            showSuccess,
            showInfo,
        }),
        [showAlert, hideAlert, hideAllAlerts, showError, showWarning, showSuccess, showInfo],
    );

    // Состояние - изменяется только при изменении alerts
    const stateValue = useMemo(
        () => ({
            alerts,
        }),
        [alerts],
    );

    return (
        <AlertMethodsContext.Provider value={methodsValue}>
            <AlertStateContext.Provider value={stateValue}>
                {children}
                <AlertContainer alerts={[]} onClose={hideAlert} maxAlerts={maxAlerts} />
            </AlertStateContext.Provider>
        </AlertMethodsContext.Provider>
    );
};

// Экспортируем контексты для использования в хуках
export { AlertMethodsContext, AlertStateContext };

export default AlertProvider;
