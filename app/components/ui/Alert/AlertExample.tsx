import React from 'react';
import { Alert } from './Alert';
import { AlertContainer } from './AlertContainer';
import { useAlert } from './useAlert';
import { Button } from '../Button';
import styles from './AlertExample.module.scss';

export const AlertExample: React.FC = () => {
    const { alerts, showError, showWarning, showSuccess, showInfo, hideAlert } = useAlert({});

    const handleShowError = () => {
        showError('Maximum of 20 files allowed', {
            autoHide: 5000,
            position: 'top',
        });
    };

    const handleShowWarning = () => {
        showWarning('This is a warning message', {
            autoHide: 4000,
            position: 'top',
        });
    };

    const handleShowSuccess = () => {
        showSuccess('File uploaded successfully!', {
            autoHide: 3000,
            position: 'top',
        });
    };

    const handleShowInfo = () => {
        showInfo('Processing your request...', {
            autoHide: 4000,
            position: 'top',
        });
    };

    const handleShowStaticAlert = () => {
        showError('This alert stays until manually closed', {
            position: 'relative',
            dismissible: true,
        });
    };

    return (
        <div className={styles.container}>
            <h2>Alert Component Examples</h2>

            <div className={styles.buttonGroup}>
                <Button onClick={handleShowError} variant='primary'>
                    Show Error Alert
                </Button>
                <Button onClick={handleShowWarning} variant='secondary'>
                    Show Warning Alert
                </Button>
                <Button onClick={handleShowSuccess} variant='success'>
                    Show Success Alert
                </Button>
                <Button onClick={handleShowInfo} variant='primary'>
                    Show Info Alert
                </Button>
                <Button onClick={handleShowStaticAlert} variant='secondary'>
                    Show Static Alert
                </Button>
            </div>

            {/* Статический пример алерта */}
            <div className={styles.staticExample}>
                <h3>Static Alert Example</h3>
                <Alert
                    variant='error'
                    message='Maximum of 20 files allowed'
                    position='relative'
                    dismissible={true}
                    onClose={() => console.log('Static alert closed')}
                />
            </div>

            {/* Контейнер для динамических алертов */}
            <AlertContainer alerts={alerts} onClose={hideAlert} />
        </div>
    );
};

export default AlertExample;
