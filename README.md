# 🏦 AI Bank Statement Converter

Умный конвертер банковских выписок на базе искусственного интеллекта. Поддерживает глобальные банковские форматы, включая отсканированные документы.

## ✨ Особенности

- 🤖 **ИИ-обработка** - Быстрое извлечение данных без потери качества
- 🔍 **Точность** - Контекстно-зависимый парсинг с дополнительной валидацией
- 🔒 **Безопасность** - Защищенная загрузка, шифрование, автоматическое удаление данных через 24 часа
- 🌍 **Глобальная поддержка** - 150+ стран, неограниченные форматы, даже сканы
- ⚡ **Быстрота** - Молниеносная обработка файлов
- 📱 **Адаптивность** - Работает на всех устройствах

## 🛠 Технологический стек

- **Frontend**: React 19 + TypeScript
- **Роутинг**: React Router v7
- **Стилизация**: SCSS + Bootstrap + Tailwind CSS
- **Состояние**: TanStack Query (React Query)
- **Сборка**: Vite
- **Тестирование**: MSW (Mock Service Worker) - только для разработки
- **PDF**: React-PDF для просмотра документов

**Важно**: MSW полностью исключен из продакшн-сборки для оптимизации

## 🚀 Быстрый старт

### Установка

```bash
# Клонируйте репозиторий
git clone <repository-url>
cd transcribe-frontend-2

# Установите зависимости
npm install

# Инициализируйте мок сервер (для разработки)
npx msw init public/ --save
```

### Разработка

```bash
# Запустите сервер разработки
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`

### Настройка окружения

Создайте файл `.env` в корне проекта:

```env
# Включить мок сервер для разработки
VITE_ENABLE_MOCKS=true

# URL реального API (когда моки отключены)
VITE_API_BASE_URL=https://your-api-url.com
```

## 📁 Структура проекта

```
transcribe-frontend-2/
├── app/
│   ├── components/          # UI компоненты
│   │   ├── ui/             # Переиспользуемые UI элементы
│   │   │   ├── files/      # Компоненты для работы с файлами
│   │   │   ├── Button/     # Кнопки
│   │   │   ├── Card/       # Карточки
│   │   │   └── ...
│   │   └── utils/          # Утилитарные компоненты
│   ├── routes/             # Страницы приложения
│   │   ├── home.tsx        # Главная страница
│   │   └── pricing.tsx     # Страница тарифов
│   ├── mocks/              # Мок сервер (MSW)
│   ├── queries/            # TanStack Query запросы
│   ├── mutations/          # TanStack Query мутации
│   ├── context/            # React контексты
│   ├── types/              # TypeScript типы
│   └── utils/              # Утилиты
├── public/                 # Статические файлы
├── docs/                   # Документация
└── src/icons/              # SVG иконки
```

## 🔧 Основные команды

```bash
# Разработка
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен сервера
npm start

# Проверка типов
npm run typecheck
```

## 🧪 Мок сервер (только для разработки)

Проект использует MSW **исключительно для локальной разработки**. В продакшн-сборке MSW полностью отключен. Мок сервер симулирует следующие API:

- `GET /api/user/info` - Информация о пользователе
- `POST /api/upload` - Загрузка файла для обработки
- `GET /api/download/:requestId` - Скачивание обработанного файла

### Управление моками

```bash
# Включить моки
VITE_ENABLE_MOCKS=true

# Отключить моки
VITE_ENABLE_MOCKS=false
```
Подробнее в [документации мок сервера](docs/MOCK_SERVER.md).

**SSR-совместимость**: Все компоненты, работающие с моками, проверяют доступность браузерных API перед использованием.


## 🐳 Docker

```bash
# Сборка образа
docker build -t transcribe-frontend .

# Запуск контейнера
docker run -p 3000:3000 transcribe-frontend
```

## 📋 API Endpoints

### Информация о пользователе
```typescript
GET /api/user/info

Response: {
  pagesCount: number;
  planKey: string;
  apiKey: string;
}
```

### Загрузка файла
```typescript
POST /api/upload
Content-Type: multipart/form-data

Response: {
  requestId: string;
}
```

### Скачивание результата
```typescript
GET /api/download/:requestId

Response: File download (text/plain)
Content-Disposition: attachment; filename="transcription_*.txt"
```

## 🎨 Компоненты

### Основные UI компоненты

- **Dropzone** - Зона загрузки файлов с drag & drop
- **FileView** - Просмотр загруженных файлов
- **FilesLoader** - Индикатор загрузки файлов
- **PricingCard** - Карточки тарифных планов
- **FeatureCard** - Карточки преимуществ
- **FeedbackCard** - Карточки отзывов

### Утилитарные компоненты

- **Button** - Настраиваемые кнопки
- **Text** - Типографика
- **LoadingSpinner** - Индикатор загрузки
- **Logo** - Логотип приложения

## 🌐 Деплой

### Поддерживаемые платформы

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway
- Vercel
- Netlify

### Подготовка к деплою

```bash
# Сборка проекта
npm run build

# Структура сборки
build/
├── client/    # Статические файлы
└── server/    # Серверный код
```

## 📚 Документация

- [Настройка мок сервера](MOCK_SERVER_SETUP.md) - Быстрый старт
- [Полная документация мок сервера](docs/MOCK_SERVER.md)
- [React Router документация](https://reactrouter.com/)
- [TanStack Query документация](https://tanstack.com/query)

## 🤝 Разработка

### Добавление новых компонентов

1. Создайте папку в `app/components/ui/`
2. Добавьте `index.tsx` и `index.module.scss`
3. Экспортируйте компонент
4. Добавьте типы в `app/types/`

### Добавление новых API endpoints

1. Добавьте handler в `app/mocks/handlers.ts`
2. Создайте query/mutation в соответствующей папке
3. Добавьте типы для запроса/ответа

## 📄 Лицензия

Этот проект создан для демонстрации возможностей современного React стека.

---

Создано с ❤️ используя React Router v7 + TypeScript + TanStack Query