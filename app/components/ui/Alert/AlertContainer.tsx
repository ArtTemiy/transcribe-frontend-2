import React from 'react';
import { Alert } from './Alert';
// import { AlertItem } from './types';
import styles from './AlertContainer.module.scss';
import type { AlertItem } from './types';
import classNames from 'classnames';

export interface AlertContainerProps {
    alerts: AlertItem[];
    onClose: (id: string) => void;
    maxAlerts?: number;
}

export const AlertContainer: React.FC<AlertContainerProps> = ({
    alerts,
    onClose,
    maxAlerts = 5,
}) => {
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

export default AlertContainer;
