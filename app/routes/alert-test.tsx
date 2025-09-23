import React, { useState } from 'react';
import { Alert } from '../components/ui/Alert/Alert';
import { Button } from '../components/ui/Button';
import { useAlert } from '../context/AlertContext';

export default function AlertTestPage() {
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState('Maximum of 20 files allowed');
    const [alertVariant, setAlertVariant] = useState<'error' | 'warning' | 'success' | 'info'>(
        'error',
    );

    const alert = useAlert();

    const handleShowAlert = (
        variant: 'error' | 'warning' | 'success' | 'info',
        message: string,
    ) => {
        setAlertVariant(variant);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Alert Component Test</h1>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <Button
                    onClick={() => handleShowAlert('error', 'Maximum of 20 files allowed')}
                    variant='primary'
                >
                    Show Error Alert
                </Button>
                <Button
                    onClick={() => handleShowAlert('warning', 'This is a warning message')}
                    variant='secondary'
                >
                    Show Warning Alert
                </Button>
                <Button
                    onClick={() => handleShowAlert('success', 'File uploaded successfully!')}
                    variant='success'
                >
                    Show Success Alert
                </Button>
                <Button
                    onClick={() => handleShowAlert('info', 'Processing your request...')}
                    variant='primary'
                >
                    Show Info Alert
                </Button>
            </div>

            {/* Динамический алерт */}
            {showAlert && (
                <div style={{ marginBottom: '30px' }}>
                    <h3>Dynamic Alert</h3>
                    <Alert
                        variant={alertVariant}
                        message={alertMessage}
                        position='relative'
                        dismissible={true}
                        onClose={handleCloseAlert}
                        show={showAlert}
                    />
                </div>
            )}

            {/* Алерт с автоскрытием */}
            <div style={{ marginBottom: '30px' }}>
                <h3>Auto-hide Alert (5 seconds)</h3>
                <Button
                    onClick={() => {
                        setShowAlert(false);
                        setTimeout(() => {
                            setAlertVariant('info');
                            setAlertMessage('This alert will disappear in 5 seconds');
                            setShowAlert(true);
                        }, 100);
                    }}
                    variant='primary'
                >
                    Show Auto-hide Alert
                </Button>
                {showAlert && alertMessage.includes('disappear') && (
                    <div style={{ marginTop: '10px' }}>
                        <Alert
                            variant='info'
                            message='This alert will disappear in 5 seconds'
                            position='relative'
                            dismissible={true}
                            autoHide={5000}
                            onClose={handleCloseAlert}
                            show={true}
                        />
                    </div>
                )}
            </div>

            {/* Фиксированный алерт */}
            <div style={{ marginBottom: '30px' }}>
                <h3>Fixed Position Alert (Top)</h3>
                <Button onClick={() => alert.showError('This is a fixed alert')} variant='primary'>
                    Show Fixed Alert
                </Button>
            </div>
        </div>
    );
}
