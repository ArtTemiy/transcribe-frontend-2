import React from 'react';

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