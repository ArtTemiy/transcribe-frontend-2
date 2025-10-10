import { useCallback } from 'react';

import { getPdfjs } from './pdfWorkerSetup';

export const usePageCounter = () => {
    const countPages = useCallback(async (file: File) => {
        try {
            // Получаем pdfjs с уже настроенным worker'ом
            const pdfjs = await getPdfjs();
            
            // Загружаем PDF документ
            const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
            return doc.numPages;
        } catch (error) {
            console.error('Error counting PDF pages:', error);
            throw new Error('Failed to count PDF pages. Please make sure the file is a valid PDF.');
        }
    }, []);
    
    return { countPages };
};
