import React from 'react';
import { useAlert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';

export default function GlobalAlertTestPage() {
    const alert = useAlert();

    const handleShowError = () => {
        alert.showError('Maximum of 20 files allowed', {
            autoHide: 5000,
            position: 'top',
        });
    };

    const handleShowWarning = () => {
        alert.showWarning('This is a warning message', {
            autoHide: 4000,
            position: 'top',
        });
    };

    const handleShowSuccess = () => {
        alert.showSuccess('File uploaded successfully!', {
            autoHide: 3000,
            position: 'top',
        });
    };

    const handleShowInfo = () => {
        alert.showInfo('Processing your request...', {
            autoHide: 4000,
            position: 'top',
        });
    };

    const handleShowMultipleAlerts = () => {
        alert.showError('First error alert');
        setTimeout(() => alert.showWarning('Second warning alert'), 500);
        setTimeout(() => alert.showSuccess('Third success alert'), 1000);
        setTimeout(() => alert.showInfo('Fourth info alert'), 1500);
    };

    const handleShowBottomAlert = () => {
        alert.showInfo('This alert appears at the bottom', {
            position: 'bottom',
            autoHide: 5000,
        });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Global Alert System Test</h1>
            <p>
                Эта страница демонстрирует глобальную систему алертов. 
                Алерты будут появляться в фиксированной позиции и управляются через React Context.
            </p>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <Button onClick={handleShowError} variant="primary">
                    Show Error Alert
                </Button>
                <Button onClick={handleShowWarning} variant="secondary">
                    Show Warning Alert
                </Button>
                <Button onClick={handleShowSuccess} variant="success">
                    Show Success Alert
                </Button>
                <Button onClick={handleShowInfo} variant="primary">
                    Show Info Alert
                </Button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <Button onClick={handleShowMultipleAlerts} variant="primary">
                    Show Multiple Alerts
                </Button>
                <Button onClick={handleShowBottomAlert} variant="secondary">
                    Show Bottom Alert
                </Button>
                <Button onClick={() => alert.hideAllAlerts()} variant="secondary">
                    Hide All Alerts
                </Button>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3>Преимущества глобальной системы:</h3>
                <ul>
                    <li>✅ Можно вызывать из любого компонента без дополнительной настройки</li>
                    <li>✅ Автоматическое управление позиционированием и z-index</li>
                    <li>✅ Ограничение количества одновременных алертов</li>
                    <li>✅ Единый стиль и поведение по всему приложению</li>
                    <li>✅ Поддержка автоскрытия и ручного закрытия</li>
                </ul>
            </div>

            <div style={{ marginBottom: '30px' }}>
                <h3>Использование:</h3>
                <pre style={{ 
                    backgroundColor: '#f5f5f5', 
                    padding: '15px', 
                    borderRadius: '5px',
                    overflow: 'auto'
                }}>
{`import { useAlert } from '../components/ui/Alert';

function MyComponent() {
    const alert = useAlert();
    
    const handleError = () => {
        alert.showError('Something went wrong!', {
            autoHide: 5000,
            position: 'top'
        });
    };
    
    return <button onClick={handleError}>Show Error</button>;
}`}
                </pre>
            </div>

            <div style={{ height: '200px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}>
                <h4>Scroll Area</h4>
                <p>Прокрутите страницу, чтобы убедиться, что фиксированные алерты остаются на месте.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
    );
}