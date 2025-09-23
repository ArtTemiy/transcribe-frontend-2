// Экспортируем все компоненты и типы
export { Alert, type AlertProps } from './Alert';
export { AlertContainer, type AlertContainerProps } from './AlertContainer';
export { AlertExample } from './AlertExample';
export { type AlertConfig, type AlertItem } from './types';

// Экспортируем глобальную систему алертов
export { AlertProvider, useAlert } from '../../../context/AlertContext';