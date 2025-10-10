/**
 * Глобальная настройка PDF.js worker для корректной работы в Vite/React проектах.
 *
 * Этот модуль должен быть импортирован один раз перед использованием любых PDF функций.
 * Использует динамический импорт с ?url для автоматического создания ассета Vite.
 */

let isWorkerInitialized = false;

export async function initializePdfWorker() {
    if (isWorkerInitialized) {
        return await import('react-pdf');
    }
    try {
        // Импортируем react-pdf для доступа к pdfjs
        const reactPDF = await import('react-pdf');

        // Используем worker из той же версии pdfjs-dist, что и react-pdf
        const pdfWorker = (await import('react-pdf/node_modules/pdfjs-dist/build/pdf.worker?url'))
            .default;

        // Устанавливаем путь к worker'у глобально
        reactPDF.pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

        isWorkerInitialized = true;
        console.log('PDF.js worker initialized successfully');
        return reactPDF;
    } catch (error) {
        console.error('Failed to initialize PDF.js worker:', error);
        throw new Error('PDF worker initialization failed');
    }
}

/**
 * Получает инстанс pdfjs с уже настроенным worker'ом
 */
export async function getPdfjs() {
    const reactPDF = await initializePdfWorker();
    return reactPDF.pdfjs;
}
