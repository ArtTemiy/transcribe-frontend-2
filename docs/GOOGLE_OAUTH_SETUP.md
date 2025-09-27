# Быстрая настройка Google OAuth

## 🚀 Краткая инструкция

### 1. Настройка Google Cloud Console (5 минут)

1. Откройте [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте проект или выберите существующий
3. Перейдите в **APIs & Services** → **Library**
4. Найдите и включите **Google Identity API**
5. Перейдите в **APIs & Services** → **Credentials**
6. Нажмите **Create Credentials** → **OAuth client ID**
7. Выберите **Web application**
8. Добавьте разрешенные домены:
   - `http://localhost:5173` (для разработки)
   - Ваш продакшн домен (например, `https://yourdomain.com`)
9. Скопируйте **Client ID**

### 2. Настройка проекта (2 минуты)

1. Создайте файл `.env` в корне проекта:
```env
VITE_GOOGLE_CLIENT_ID=ваш-client-id.apps.googleusercontent.com
```

2. Перезапустите dev сервер:
```bash
npm run dev
```

### 3. Проверка работы (1 минута)

1. Откройте `http://localhost:5173`
2. Нажмите **Login** или **Get started**
3. Нажмите **"Log in with Google"** или **"Sign up with Google"**
4. Должно открыться окно Google OAuth

## ✅ Что уже реализовано

- ✅ Кнопки Google OAuth в формах логина и регистрации
- ✅ Интеграция с Google Identity Services
- ✅ Автоматическая загрузка Google SDK
- ✅ Получение и отправка id_token на сервер
- ✅ Обработка ошибок и показ статусов
- ✅ Отключение кнопок во время загрузки
- ✅ Закрытие модалов после успешной авторизации

## 🔧 Что нужно настроить на бэкенде

Backend должен поддерживать endpoint:

```typescript
POST /api/auth/google
Content-Type: application/json

Body: {
  id_token: string;        // JWT токен от Google
  use_cookies: boolean;    // true для сохранения в cookies
}

Response: {
  access_token: string;    // JWT токен вашего приложения
  message: string;         // Сообщение об успехе
  refresh_token: string;   // Refresh токен (опционально)
}
```

### Пример валидации id_token на бэкенде (Node.js):

```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  
  const payload = ticket.getPayload();
  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
}
```

## 🐛 Troubleshooting

### "Google Identity Services not loaded"
- Проверьте интернет-соединение
- Убедитесь, что домен не блокирует Google скрипты

### "Invalid client_id"
- Проверьте `VITE_GOOGLE_CLIENT_ID` в `.env`
- Убедитесь, что домен добавлен в Google Cloud Console
- Перезапустите dev сервер после изменения `.env`

### "Token validation failed"
- Проверьте, что бэкенд валидирует токен через Google API
- Убедитесь, что `client_id` на фронте и бэке совпадают

### Кнопка не работает
- Откройте DevTools → Console, проверьте ошибки
- Убедитесь, что `window.google` доступен
- Проверьте, что Client ID корректный

## 📱 Тестирование

### Локально
```bash
npm run dev
# Откройте http://localhost:5173
# Нажмите кнопку Google OAuth
```

### В продакшене
- Убедитесь, что используется HTTPS
- Добавьте продакшн домен в Google Cloud Console
- Обновите `VITE_GOOGLE_CLIENT_ID` для продакшена

## 📚 Дополнительная документация

- [Полная документация](./GOOGLE_OAUTH.md) - детальное описание с диаграммами
- [Google Identity Services](https://developers.google.com/identity/gsi/web) - официальная документация Google
- [Google Cloud Console](https://console.cloud.google.com/) - настройка OAuth

## 🔒 Безопасность

- ✅ id_token валидируется на сервере
- ✅ Используется HTTPS в продакшене
- ✅ Client ID проверяется при валидации
- ✅ Токены имеют ограниченный срок действия

---

**Готово!** Google OAuth должен работать после выполнения этих шагов.