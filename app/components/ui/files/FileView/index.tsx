import classNames from 'classnames';
import React, { useEffect, useCallback, useMemo } from 'react';

// Icons
import CrossIcon from '@/../src/icons/cross.svg';
import DownloadIcon from '@/../src/icons/download.svg';
import ErrorIcon from '@/../src/icons/files/error.svg';
import ExcelBold from '@/../src/icons/files/excel_bold.svg';
import LoadedIcon from '@/../src/icons/files/loaded.svg';
import LockedIcon from '@/../src/icons/files/locked.svg';
import UploadedIcon from '@/../src/icons/files/uploaded.svg';
import { useFilesContext, type UserFile } from '~/context/FilesContext';
import { useConvertFilesMutation } from '~/mutations/files/convertFile';

import Button from '../../Button';
import ButtonBase from '../../ButtonBase';
import LoadingSpinner from '../../LoadingSpinner';
import { Text } from '../../Text';

import styles from './style.module.scss';
import { useAlert } from '../../Alert';

type FileLoaderProps = {
    file: UserFile;
};

function formatSize(size: number) {
    if (size > 1024 * 1024) return (size / 1024 / 1024).toFixed(1) + ' MB';
    if (size > 1024) return (size / 1024).toFixed(1) + ' KB';
    return size + ' B';
}

const FileView: React.FC<FileLoaderProps> = ({ file }) => {
    // const [pagesCount, setPagesCount] = useState<number | undefined>(undefined);
    const { updateFile, removeFile } = useFilesContext();

    const uploadMutation = useConvertFilesMutation(file.id);

    const alert = useAlert();

    const StateIcon = useMemo(() => {
        if (file.passwordState !== undefined && file.passwordState.correct === undefined) {
            return LockedIcon;
        }
        switch (file.state) {
            case 'loading':
                return LoadingSpinner;
            case 'loaded':
            case 'uploading':
                return LoadedIcon;
            case 'uploaded':
                return UploadedIcon;
            case 'error':
                return ErrorIcon;
        }
    }, [file]);

    const sendFile = useCallback(() => {
        updateFile({
            ...file,
            state: 'uploading',
            error: undefined,
        });
        uploadMutation.mutate([file]);
    }, [updateFile, file, uploadMutation]);

    const downloadFile = useCallback(() => {
        open(`/api/v1/download/${uploadMutation.data}`, '_blank');
    }, [uploadMutation]);

    // Симуляция загрузки файла
    useEffect(() => {
        // TODO: Any logic here? Maybe count pages?
        if (file.state === 'loading') {
            setTimeout(
                () =>
                    updateFile({
                        ...file,
                        state: 'loaded',
                    }),
                1000,
            );
        }
    }, [file, updateFile, removeFile, alert]);

    useEffect(() => {
        if (file.state === 'uploading') {
            if (uploadMutation.isSuccess) {
                updateFile({
                    ...file,
                    state: 'uploaded',
                });
            } else if (uploadMutation.isError) {
                updateFile({
                    ...file,
                    state: 'error',
                    error: uploadMutation.error.message,
                });
            }
        }
    }, [file, uploadMutation, updateFile]);

    return (
        <div className={classNames('p-2 p-md-4 align-items-md-center', styles.fileLoader)}>
            <div
                className={classNames(
                    styles.contentContainer,
                    'd-flex flex-column flex-md-row align-items-md-center',
                )}
            >
                <div className={styles.content__state}>
                    <StateIcon style={{ width: '40px', flexShrink: 0 }} />
                    <div className={styles.content__state__fileInfo}>
                        <Text variant='body-s' className={styles.content__state__fileInfo__name}>
                            {file.file.name}
                        </Text>
                        <Text variant='small' typColor='light'>
                            {formatSize(file.file.size)};
                            {/* {pagesCount && <>, {pagesCount} pages</>} */}
                        </Text>
                        {file.error && (
                            <Text variant='small' typColor='alarm'>
                                {file.error}
                            </Text>
                        )}
                    </div>
                </div>
                <div className={styles.actions}>
                    {(file.state === 'loading' ||
                        file.state === 'loaded' ||
                        file.state === 'error') && (
                        <Button
                            rightIcon={<ExcelBold />}
                            onClick={sendFile}
                            disabled={file.state === 'loading'}
                        >
                            Convert to Excel
                        </Button>
                    )}
                    {file.state === 'uploading' && (
                        <Button rightIcon={<LoadingSpinner color='white' />}>Converting...</Button>
                    )}
                    {file.state === 'uploaded' && (
                        <Button rightIcon={<DownloadIcon />} onClick={downloadFile}>
                            Download CSV
                        </Button>
                    )}
                    {/* <ButtonBase onClick={() => removeFile(file)}>
                        <CrossIcon />
                    </ButtonBase> */}
                </div>
            </div>
            <div className={classNames(styles.closeContainer)}>
                <ButtonBase onClick={() => removeFile(file)}>
                    <CrossIcon />
                </ButtonBase>
            </div>
        </div>
    );
};

export default FileView;
