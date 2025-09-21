import { createContext, useContext, useCallback, useState, type ReactNode } from 'react';
import { v4 } from 'uuid';

import type { UserFile, FilesContextType } from './types';

// Создаем контекст
const FilesContext = createContext<FilesContextType | undefined>(undefined);

// Провайдер контекста
export const FilesProvider = ({ children }: { children: ReactNode }) => {
    const [files, setFiles] = useState<UserFile[]>([]);

    const addFile = useCallback(
        (newFiles: File[]) => {
            const newUserFiles = newFiles.map(
                (file: File): UserFile => ({
                    file: file,
                    id: v4(),
                    state: 'loading',
                }),
            );
            setFiles(prevFiles => [...prevFiles, ...newUserFiles]);
        },
        [setFiles],
    );

    const removeFile = useCallback(
        (file: UserFile) => {
            setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
        },
        [setFiles],
    );

    const updateFile = useCallback(
        (updatedFile: UserFile) => {
            setFiles(prevFiles =>
                prevFiles.map(file => (file.id === updatedFile.id ? updatedFile : file)),
            );
        },
        [setFiles],
    );

    const value: FilesContextType = {
        files,
        addFile,
        removeFile,
        updateFile,
    };

    return <FilesContext.Provider value={value}>{children}</FilesContext.Provider>;
};

// Хук для использования контекста
export const useFilesContext = (): FilesContextType => {
    const context = useContext(FilesContext);
    if (context === undefined) {
        throw new Error('useFilesContext must be used within a FilesProvider');
    }
    return context;
};

// Экспортируем типы для удобства
export type { UserFile, FilesContextType, FilePasswordState } from './types';
