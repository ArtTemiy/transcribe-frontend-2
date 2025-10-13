import React from 'react';
import { Alert } from './Alert';
import styles from './AlertContainer.module.scss';
import type { AlertItem } from './types';
import classNames from 'classnames';
import { useAlertState } from '../../../hooks/useAlert';

export interface AlertContainerProps {
    alerts: AlertItem[];
    onClose: (id: string) => void;
    maxAlerts?: number;
}

// Внутренний компонент, который использует состояние алертов
const AlertContainerInner: React.FC<{ onClose: (id: string) => void; maxAlerts: number }> = ({
    onClose,
    maxAlerts,
}) => {
    const { alerts } = useAlertState();
    
    // Показываем только последние maxAlerts алертов
    const visibleAlerts = alerts.slice(-maxAlerts);

    if (visibleAlerts.length === 0) {
        return null;
    }

    return (
        <div className={classNames(styles.container, 'col-12 col-md-6 mx-auto mt-md-3')}>
            {visibleAlerts.map((alert, index) => (
                <div
                    key={alert.id}
                    className={styles.alertWrapper}
                    style={{
                        zIndex: 1050 + index, // Каждый следующий алерт выше предыдущего
                    }}
                >
                    <Alert
                        variant={alert.variant}
                        message={alert.message}
                        dismissible={alert.dismissible}
                        autoHide={alert.autoHide}
                        onClose={() => onClose(alert.id)}
                        show={alert.show}
                        position={alert.position}
                        icon={alert.icon}
                    />
                </div>
            ))}
        </div>
    );
};

export const AlertContainer: React.FC<AlertContainerProps> = ({
    alerts,
    onClose,
    maxAlerts = 5,
}) => {
    // Если передаются alerts через props (старый способ), используем их
    if (alerts && alerts.length > 0) {
        const visibleAlerts = alerts.slice(-maxAlerts);
        return (
            <div className={classNames(styles.container, 'col-12 col-md-6 mx-auto mt-md-3')}>
                {visibleAlerts.map((alert, index) => (
                    <div
                        key={alert.id}
                        className={styles.alertWrapper}
                        style={{
                            zIndex: 1050 + index,
                        }}
                    >
                        <Alert
                            variant={alert.variant}
                            message={alert.message}
                            dismissible={alert.dismissible}
                            autoHide={alert.autoHide}
                            onClose={() => onClose(alert.id)}
                            show={alert.show}
                            position={alert.position}
                            icon={alert.icon}
                        />
                    </div>
                ))}
            </div>
        );
    }

    // Новый способ - используем контекст
    return <AlertContainerInner onClose={onClose} maxAlerts={maxAlerts} />;
};

export default AlertContainer;
