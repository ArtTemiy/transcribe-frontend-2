// Инициализация мок сервера для разработки
export async function initMocks() {
    if (typeof window === 'undefined') {
        // Серверная среда (SSR)
        const { server } = await import('./node');
        server.listen({
            onUnhandledRequest: 'bypass',
        });
        return server;
    } else {
        // Браузерная среда
        const { worker } = await import('./browser');
        await worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
                url: '/mockServiceWorker.js',
            },
        });
        return worker;
    }
}

// Функция для включения/выключения моков
export function enableMocking() {
    // Проверяем переменную окружения или localStorage
    const shouldMock =
        import.meta.env.VITE_ENABLE_MOCKS === 'true' ||
        (typeof window !== 'undefined' && localStorage.getItem('enableMocks') === 'true');

    return shouldMock;
}