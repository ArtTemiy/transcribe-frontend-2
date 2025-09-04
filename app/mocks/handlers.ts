import { delay, http, HttpResponse } from 'msw';
import type { UserInfo } from '@/types/UserInfo';
import type { UploadingFileResponse } from '@/mutations/uploadFile';

// Мок данные
const mockUserInfo: UserInfo = {
    pagesCount: 25,
    planKey: 'personal',
    apiKey: 'mock-api-key-12345'
};

// Симуляция базы данных файлов
const mockFiles = new Map<string, { id: string; name: string}>();

export const handlers = [
    // Получение информации о пользователе
    http.get('/api/user/info', () => {
        return HttpResponse.json(mockUserInfo);
    }),

    // Загрузка файла
    http.post('/api/upload', async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return HttpResponse.json(
                { error: 'Файл не найден' },
                { status: 400 }
            );
        }

        // Симуляция валидации файла
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            return HttpResponse.json(
                { error: 'Неподдерживаемый тип файла' },
                { status: 400 }
            );
        }

        const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Сохраняем файл в "базу данных"
        mockFiles.set(requestId, {
            id: requestId,
            name: file.name,
        });

        // Симуляция обработки файла (через 3 секунды файл будет готов)
        await delay(1000);

        const response: UploadingFileResponse = { requestId };
        return HttpResponse.json(response);
    }),

    // Скачивание обработанного файла
    http.get<{requestId: string}>('/api/download/:requestId', ({ params }) => {
        const { requestId } = params;
        const fileData = mockFiles.get(requestId as string);

        if (!fileData) {
            return HttpResponse.json(
                { error: 'Файл не найден' },
                { status: 404 }
            );
        }

        // Симуляция возврата обработанного файла
        const mockTranscription = `Это мок транскрипция для файла: ${fileData.name}
    
Время обработки: ${new Date().toLocaleString()}
Статус: Успешно обработан

Содержимое файла было успешно транскрибировано.
Это демонстрационный текст для разработки.`;

        return HttpResponse.text(mockTranscription, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Content-Disposition': `attachment; filename="transcription_${requestId}.txt"`,
                'Content-Length': mockTranscription.length.toString(),
            }
        });
    }),
];
