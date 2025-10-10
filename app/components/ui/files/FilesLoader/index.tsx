import { isAxiosError } from 'axios';
import React, { useState, useEffect, useCallback } from 'react';

import DownloadIcon from '@/../src/icons/download.svg';
import ExcelBold from '@/../src/icons/files/excel_bold.svg';
import Button from '@/components/ui/Button';
import { useFilesContext } from '@/context/FilesContext';
import { useConvertFilesMutation } from '@/mutations/files/convertFile';

// Icons

import { useAlert } from '../../Alert';
import LoadingSpinner from '../../LoadingSpinner';

// import { Document } from "react-pdf";

export type FilesLoaderState = 'preparing' | 'prepared' | 'uploading' | 'uploaded';

type FilesLoaderProps = object;

const FilesLoader: React.FC<FilesLoaderProps> = (_: FilesLoaderProps) => {
    // const [requestId, setRequestId] = useState<string | undefined>(undefined);
    const { files } = useFilesContext();
    const alert = useAlert();

    const [state, setState] = useState<FilesLoaderState>('preparing');
    const uploadMutation = useConvertFilesMutation('all');

    const sendFiles = useCallback(() => {
        setState('uploading');
        uploadMutation.mutate(files);
    }, [files, setState, uploadMutation]);

    const downloadFile = useCallback(() => {
        open(`/api/v1/download/${uploadMutation.data}`, '_blank');
    }, [uploadMutation]);

    // Обновление стейта на обновлении файлов
    useEffect(() => {
        if (files.filter(file => ['error', 'loading'].includes(file.state)).length > 0) {
            setState('preparing');
            return;
        }
        if (
            files.filter(
                file => file.passwordState !== undefined && file.passwordState.correct !== true,
            ).length > 0
        ) {
            setState('preparing');
            return;
        }

        setState(state => (state === 'uploaded' ? state : 'prepared'));
    }, [setState, files]);

    // Обновление стейта на обновлении мутации
    useEffect(() => {
        if (state !== 'uploading') {
            return;
        }
        if (uploadMutation.isSuccess) {
            setState(state => (state === 'uploading' ? 'uploaded' : state));
        } else if (uploadMutation.isError) {
            const error = uploadMutation.error;
            alert.showError(
                isAxiosError(error)
                    ? (error.response?.data as { message?: string })?.message || 'Unknown Error'
                    : 'Unknown Error',
            );
            setState('prepared');
        }
    }, [alert, state, uploadMutation]);

    return (
        <div>
            {(state === 'preparing' || state === 'prepared') && (
                <Button
                    rightIcon={<ExcelBold />}
                    onClick={sendFiles}
                    disabled={state === 'preparing'}
                >
                    Convert to Excel
                </Button>
            )}
            {state === 'uploading' && (
                <Button rightIcon={<LoadingSpinner color='white' />}>Converting...</Button>
            )}
            {state === 'uploaded' && (
                <Button rightIcon={<DownloadIcon />} onClick={downloadFile}>
                    Download CSV
                </Button>
            )}
        </div>
    );
};

export default FilesLoader;
