import { useContext } from 'react';

import { FilesContext } from '../context/FilesContext';
import type { FilesContextType } from '../context/FilesContext/types';

// Хук для использования контекста файлов
export const useFilesContext = (): FilesContextType => {
    const context = useContext(FilesContext);
    if (context === undefined) {
        throw new Error('useFilesContext must be used within a FilesProvider');
    }
    return context;
};