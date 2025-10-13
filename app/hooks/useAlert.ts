import { useContext } from 'react';

import { AlertMethodsContext, AlertStateContext } from '../context/AlertContext';

// Хук для использования методов алертов (не вызывает перерендер при изменении состояния)
export const useAlert = () => {
    const context = useContext(AlertMethodsContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

// Хук для использования состояния алертов (только для компонентов, которые отображают алерты)
export const useAlertState = () => {
    const context = useContext(AlertStateContext);
    if (context === undefined) {
        throw new Error('useAlertState must be used within an AlertProvider');
    }
    return context;
};