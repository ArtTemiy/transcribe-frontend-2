import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useUserInfoQuery } from '@/queries/userInfo';

const MockServerControls = () => {
  const [mocksEnabled, setMocksEnabled] = useState(
    localStorage.getItem('enableMocks') === 'true'
  );

  const { data: userInfo, refetch: refetchUser } = useUserInfoQuery();

  const toggleMocks = () => {
    const newValue = !mocksEnabled;
    localStorage.setItem('enableMocks', newValue.toString());
    setMocksEnabled(newValue);
    
    // Показываем уведомление о необходимости перезагрузки
    if (confirm('Для применения изменений необходимо перезагрузить страницу. Перезагрузить сейчас?')) {
      window.location.reload();
    }
  };

  // Показываем только в development режиме
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      minWidth: '300px'
    }}>
      <h6 style={{ margin: '0 0 12px 0', color: '#495057' }}>
        🛠️ Dev Tools - Мок Сервер
      </h6>
      
      <div style={{ marginBottom: '12px' }}>
        <strong>Статус:</strong>{' '}
        <span style={{ 
          color: mocksEnabled ? '#28a745' : '#dc3545',
          fontWeight: 'bold'
        }}>
          {mocksEnabled ? '✅ Включен' : '❌ Отключен'}
        </span>
      </div>

      <div style={{ marginBottom: '12px', fontSize: '14px' }}>
        <div><strong>Пользователь:</strong> {userInfo?.planKey || 'Загрузка...'}</div>
        <div><strong>Страниц:</strong> {userInfo?.pagesCount || 'Загрузка...'}</div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button 
          size="sm" 
          variant={mocksEnabled ? 'danger' : 'success'}
          onClick={toggleMocks}
        >
          {mocksEnabled ? 'Отключить моки' : 'Включить моки'}
        </Button>
        
        <Button 
          size="sm" 
          variant="outline-primary"
          onClick={() => {
            refetchUser();
          }}
        >
          Обновить данные
        </Button>
      </div>

      <div style={{ marginTop: '8px', fontSize: '12px', color: '#6c757d' }}>
        Этот блок виден только в development режиме
      </div>
    </div>
  );
};

export default MockServerControls;