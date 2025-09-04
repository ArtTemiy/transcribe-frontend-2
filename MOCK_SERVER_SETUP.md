# 🚀 Настройка Мок Сервера - Быстрый Старт

## Что было настроено

Для вашего проекта на **React Router v7 + TanStack Query + TypeScript** был настроен мок сервер на базе **MSW (Mock Service Worker)**.

## Структура файлов

```
📁 app/
├── 📁 mocks/
│   ├── handlers.ts     # Все мок API endpoints
│   ├── browser.ts      # Настройка для браузера
│   ├── node.ts         # Настройка для SSR
│   └── init.ts         # Инициализация мок сервера
├── 📁 queries/
│   ├── userInfo.tsx    # ✅ Обновлен для работы с API
│   ├── fileStatus.ts   # 🆕 Новый query для статуса файла
│   └── filesHistory.ts # 🆕 Новый query для истории файлов
├── 📁 mutations/
│   ├── uploadFile.ts   # ✅ Уже настроен
│   ├── downloadFile.ts # ✅ Уже настроен
│   └── deleteFile.ts   # 🆕 Новая мутация для удаления
└── 📁 components/
    └── 📁 dev/
        └── MockServerControls.tsx # 🆕 Dev панель управления
```

## Запуск

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Инициализируйте MSW:**
   ```bash
   npx msw init public/ --save
   ```

3. **Запустите приложение:**
   ```bash
   npm run dev
   ```

4. **Откройте браузер** - в правом нижнем углу появится панель управления мок сервером

## Доступные API endpoints

- `GET /api/user/info` - Информация о пользователе
- `POST /api/upload` - Загрузка файла
- `GET /api/status/:requestId` - Статус обработки файла
- `GET /api/download/:requestId` - Скачивание файла
- `GET /api/files/history` - История файлов
- `DELETE /api/files/:requestId` - Удаление файла

## Управление мок сервером

### Через переменные окружения (.env):
```env
VITE_ENABLE_MOCKS=true   # включить
VITE_ENABLE_MOCKS=false  # отключить
```

### Через dev панель:
- В development режиме в правом нижнем углу появится панель управления
- Можно включать/отключать моки одним кликом
- Показывает текущий статус и данные

### Через localStorage:
```javascript
localStorage.setItem('enableMocks', 'true');  // включить
localStorage.setItem('enableMocks', 'false'); // отключить
window.location.reload(); // перезагрузить
```

## Преимущества этого решения

✅ **Полная интеграция** с вашим стеком (React Router v7 + TanStack Query)  
✅ **Работает в SSR** - поддерживает серверный рендеринг  
✅ **Реалистичные данные** - симулирует реальное API  
✅ **Легкое переключение** - между моками и реальным API  
✅ **Dev-friendly** - панель управления для разработчиков  
✅ **TypeScript** - полная типизация всех API  

## Альтернативные подходы

### 1. JSON Server (простой REST API)
```bash
npm install -D json-server
```
- ✅ Быстрая настройка
- ❌ Не работает с SSR
- ❌ Ограниченная логика

### 2. Vite Proxy (проксирование на внешний сервер)
```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});
```
- ✅ Простая настройка
- ❌ Нужен отдельный сервер
- ❌ Не работает в production build

### 3. Express.js сервер
```bash
npm install -D express cors
```
- ✅ Полный контроль
- ❌ Дополнительная сложность
- ❌ Нужно запускать отдельно

## Рекомендации

**MSW - лучший выбор для вашего стека**, потому что:
- Работает на уровне Service Worker
- Поддерживает SSR из коробки
- Интегрируется с TanStack Query
- Не требует дополнительных серверов
- Легко переключаться между моками и реальным API

## Следующие шаги

1. Запустите проект и убедитесь, что мок сервер работает
2. Изучите файл `app/mocks/handlers.ts` - там все мок endpoints
3. Добавьте свои endpoints по мере необходимости
4. Используйте dev панель для отладки
5. Прочитайте полную документацию в `docs/MOCK_SERVER.md`

## Поддержка

Если возникнут вопросы:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что файл `public/mockServiceWorker.js` создан
3. Проверьте, что `VITE_ENABLE_MOCKS=true` в `.env`
4. Посмотрите полную документацию в `docs/MOCK_SERVER.md`