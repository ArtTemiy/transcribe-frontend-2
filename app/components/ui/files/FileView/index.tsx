import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./style.module.scss";
import Button from "../../Button";
import classNames from "classnames";
import { Text } from "../../Text";
import { v4 as uuidV4 } from 'uuid'
// Icons
import ErrorIcon from '@/../src/icons/files/error.svg';
import LoadedIcon from '@/../src/icons/files/loaded.svg';
import LockedIcon from '@/../src/icons/files/locked.svg';
import UploadedIcon from '@/../src/icons/files/uploaded.svg';
import CrossIcon from '@/../src/icons/cross.svg'
import DownloadIcon from '@/../src/icons/download.svg';

import ButtonBase from "../../ButtonBase/ButtonBase";
import ExcelBold from '@/../src/icons/files/excel_bold.svg';
import { useUploadFilesMutation } from "~/mutations/uploadFile";
import LoadingSpinner from "../../LoadingSpinner";
import { useFilesContext, type UserFile } from "~/context/FilesContext";
// import { Document } from "react-pdf";

type FileLoaderProps = {
    file: UserFile;
}

function formatSize(size: number) {
    if (size > 1024 * 1024) return (size / 1024 / 1024).toFixed(1) + " MB";
    if (size > 1024) return (size / 1024).toFixed(1) + " KB";
    return size + " B";
}

const FileView: React.FC<FileLoaderProps> = ({ file }) => {
    const [pagesCount, setPagesCount] = useState<number | undefined>(undefined);
    const [requestId, setRequestId] = useState<string | undefined>(undefined);
    const { updateFile, removeFile } = useFilesContext();

    const uploadMutation = useUploadFilesMutation(file.id);

    const getStateIcon = useCallback(() => {
        if (file.passwordState !== undefined && file.passwordState.correct === undefined) {
            return <LockedIcon />
        }
        switch (file.state) {
            case 'loading':
                return <LoadingSpinner />;
            case 'loaded':
            case 'uploading':
                return <LoadedIcon />;
            case 'uploaded':
                return <UploadedIcon />;
            case 'error':
                return <ErrorIcon />;
        }
    }, [file]);

    const sendFile = useCallback(() => {
        updateFile({
            ...file,
            state: 'uploading',
            error: undefined,
        })
        uploadMutation.mutate([file]);
    }, []);

    const downloadFile = useCallback(() => {
        open(`/api/download/${requestId}`, '_blank');
    }, [requestId]);

    // Симуляция загрузки файла
    useEffect(() => {
        // TODO: Any logic here? Maybe count pages?
        setTimeout(() => updateFile({
            ...file,
            state: 'loaded',
        }), 2000);
    }, [file.id, updateFile]);

    useEffect(() => {
        if (file.state === 'uploading') {
            if (uploadMutation.isSuccess) {
                const requestId = uploadMutation.data.requestId;
                setRequestId(requestId);
                updateFile({
                    ...file,
                    state: 'uploaded'
                })
            } else if (uploadMutation.isError) {
                updateFile({
                    ...file,
                    state: 'error',
                    error: uploadMutation.error.message,
                })
            }
        }
    }, [file, uploadMutation, setRequestId, updateFile]);

    return (
        <div className={classNames(styles.fileLoader)}>
            <div className={styles.state}>
                {getStateIcon()}
                <div className={styles.fileInfo}>
                    <Text variant='body-s'>
                        {file.file.name}
                    </Text>
                    <Text variant='caption' typColor='light'>
                        {formatSize(file.file.size)}{pagesCount && <>, {pagesCount} pages</>}
                    </Text>
                    {file.error && <Text variant='small' typColor='alarm'>{file.error}</Text>}
                </div>
            </div>
            <div className={styles.actions}>
                {(file.state === 'loading' || file.state === 'loaded' || file.state === 'error') && <Button
                    rightIcon={<ExcelBold />}
                    onClick={sendFile}
                    disabled={file.state === 'loading'}
                >
                    Convert to Excel
                </Button>}
                {(file.state === 'uploading') && <Button rightIcon={<LoadingSpinner color='white' />}>
                    Converting...
                </Button>}
                {(file.state === 'uploaded') && <Button rightIcon={<DownloadIcon />} onClick={downloadFile}>
                    Download CSV
                </Button>}
                <ButtonBase onClick={() => removeFile(file)}>
                    <CrossIcon />
                </ButtonBase>
            </div>

            {/* <Document file={file} onLoadSuccess={(data) => setPagesCount(data.numPages)} /> */}
        </div>
    );
};

export default FileView;