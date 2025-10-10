import { getPdfjs } from './pdfWorkerSetup';

type FileInfo = {
    hasPassword: boolean;
    passwordValid?: boolean;
    pages: number;
};

export const procesFile = async (file: File, password?: string): Promise<FileInfo> => {
    try {
        // Получаем pdfjs с уже настроенным worker'ом
        const pdfjs = await getPdfjs();

        // Загружаем PDF документ
        const doc = await pdfjs.getDocument({ data: await file.arrayBuffer(), password }).promise;

        // Если документ загрузился успешно, значит пароль не требуется или был правильным
        return {
            hasPassword: password !== undefined, // Если пароль был передан, значит файл защищен
            passwordValid: password !== undefined ? true : undefined, // Пароль валиден, если был передан
            pages: doc.numPages,
        };
    } catch (error: any) {
        // Проверяем, является ли ошибка связанной с паролем
        if (error.name === 'PasswordException' || error.message?.includes('password')) {
            if (password) {
                // Пароль был предоставлен, но неверный
                return {
                    hasPassword: true,
                    passwordValid: false,
                    pages: 0,
                };
            } else {
                // Файл защищен паролем, но пароль не предоставлен
                return {
                    hasPassword: true,
                    passwordValid: undefined,
                    pages: 0,
                };
            }
        }

        // Другие ошибки
        throw new Error('Failed to process PDF file. Please make sure the file is a valid PDF.');
    }
};
