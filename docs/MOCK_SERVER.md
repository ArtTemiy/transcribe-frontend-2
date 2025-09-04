# Мок Сервер для Локальной Разработки

Этот проект использует [MSW (Mock Service Worker)](https://mswjs.io/) для создания мок сервера, который перехватывает HTTP запросы и возвращает мок данные.

## Быстрый старт

1. **Установка зависимостей:**
   ```bash
   npm install
   ```

2. **Включение мок сервера:**
   Создайте файл `.env` в корне проекта:
   ```env
   VITE_ENABLE_MOCKS=true
   ```

3. **Запуск приложения:**
   ```bash
   npm run dev
   ```

## Управление мок сервером

### Включение/отключение моков

**Через переменные окружения:**
```env
# .env файл
VITE_ENABLE_MOCKS=true  # включить моки
VITE_ENABLE_MOCKS=false # отключить моки
```

**Через localStorage (в браузере):**
```javascript
// Включить моки
localStorage.setItem('enableMocks', 'true');

// Отключить моки
localStorage.setItem('enableMocks', 'false');

// Перезагрузить страницу для применения изменений
window.location.reload();
```

## API Endpoints

Мок сервер поддерживает следующие endpoints:

### Пользователь
- `GET /api/user/info` - Получение информации о пользователе

### Файлы
- `POST /api/upload` - Загрузка файла для обработки
- `GET /api/status/:requestId` - Проверка статуса обработки файла
- `GET /api/download/:requestId` - Скачивание обработанного файла
- `GET /api/files/history` - Получение истории файлов пользователя
- `DELETE /api/files/:requestId` - Удаление файла

## Структура мок сервера

```
app/mocks/
├── handlers.ts     # Определение всех мок handlers
├── browser.ts      # Настройка для браузера
├── node.ts         # Настройка для Node.js (SSR)
└── init.ts         # Инициализация мок сервера
```

## Добавление новых мок endpoints

1. **Откройте файл `app/mocks/handlers.ts`**

2. **Добавьте новый handler:**
   ```typescript
   // Пример нового endpoint
   http.get('/api/new-endpoint', () => {
     return HttpResponse.json({
       message: 'Новый мок endpoint'
     });
   })
   ```

3. **Добавьте handler в массив `handlers`**

## Симуляция различных сценариев

### Ошибки сервера
```typescript
http.get('/api/error-example', () => {
  return HttpResponse.json(
    { error: 'Внутренняя ошибка сервера' },
    { status: 500 }
  );
});
```

### Задержки
```typescript
http.get('/api/slow-endpoint', async () => {
  // Задержка 2 секунды
  await new Promise(resolve => setTimeout(resolve, 2000));
  return HttpResponse.json({ data: 'Медленный ответ' });
});
```

### Условная логика
```typescript
http.post('/api/conditional', async ({ request }) => {
  const body = await request.json();
  
  if (body.shouldFail) {
    return HttpResponse.json(
      { error: 'Условная ошибка' },
      { status: 400 }
    );
  }
  
  return HttpResponse.json({ success: true });
});
```

## Отладка

### Логирование запросов
MSW автоматически логирует перехваченные запросы в консоль браузера.

### Проверка статуса мок сервера
```javascript
// В консоли браузера
console.log('MSW активен:', !!window.msw);
```

## Переключение на реальный API

1. **Отключите моки:**
   ```env
   VITE_ENABLE_MOCKS=false
   ```

2. **Настройте базовый URL API:**
   ```env
   VITE_API_BASE_URL=https://your-real-api.com
   ```

3. **Перезапустите приложение**

## Лучшие практики

1. **Используйте реалистичные данные** в мок ответах
2. **Симулируйте различные состояния** (загрузка, ошибки, успех)
3. **Добавляйте задержки** для имитации реальных условий сети
4. **Тестируйте edge cases** через мок сценарии
5. **Документируйте** новые мок endpoints

## Troubleshooting

### Мок сервер не запускается
- Проверьте, что файл `public/mockServiceWorker.js` существует
- Убедитесь, что `VITE_ENABLE_MOCKS=true` в `.env`
- Проверьте консоль браузера на ошибки

### Запросы не перехватываются
- Убедитесь, что URL запроса совпадает с мок handler
- Проверьте, что мок сервер инициализирован до выполнения запросов
- Посмотрите логи в консоли браузера

### Service Worker проблемы
- Очистите кэш браузера
- Перезагрузите страницу с Ctrl+F5
- Проверьте вкладку Application -> Service Workers в DevTools