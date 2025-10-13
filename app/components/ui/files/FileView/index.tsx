import { isAxiosError } from 'axios';
import classNames from 'classnames';
import { useEffect, useCallback, useMemo, useState } from 'react';
// Icons
import { useForm } from 'react-hook-form';

import CrossIcon from '@/../src/icons/cross.svg';
import DownloadIcon from '@/../src/icons/download.svg';
import ErrorIcon from '@/../src/icons/files/error.svg';
import ExcelBold from '@/../src/icons/files/excel_bold.svg';
import LoadedIcon from '@/../src/icons/files/loaded.svg';
import LockedIcon from '@/../src/icons/files/locked.svg';
import UploadedIcon from '@/../src/icons/files/uploaded.svg';
import { useAlert } from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import ButtonBase from '@/components/ui/ButtonBase';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Text } from '@/components/ui/Text';
import { useFilesContext } from '@/hooks/useFilesContext';
import type { UserFile } from '@/context/FilesContext';
import { useConvertFilesMutation } from '@/mutations/files/convertFile';
import { processFile } from '@/utils/fileProcessor';

import { fileFormats } from '../../../../types/files/formats';
import type { Response } from '../../../../types/response';
import { formatSize } from '../../../../utils/formatSize';
import TextInput from '../../input/TextInput/TextInput';
import Select from '../../Select';

import styles from './style.module.scss';

type FileLoaderProps = {
    file: UserFile;
};

const FileView: React.FC<FileLoaderProps> = ({ file }) => {
    const [pagesCount, setPagesCount] = useState<number | undefined>(undefined);
    const { updateFile, removeFile } = useFilesContext();
    const [fileType, setFileType] = useState<string>(fileFormats[0].key);

    const uploadMutation = useConvertFilesMutation(file.id);

    const alert = useAlert();

    const StateIcon = useMemo(() => {
        if (file.passwordState !== undefined && file.passwordState.correct === undefined) {
            return LockedIcon;
        }
        switch (file.state) {
            case 'loading':
                return () => <LoadingSpinner size='large' className={styles.stateIcon} />;
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
        uploadMutation.mutate({ files: [file], fileType });
    }, [updateFile, file, uploadMutation, fileType]);

    const downloadFile = useCallback(() => {
        open(`/api/v1/download/${uploadMutation.data}`, '_blank');
    }, [uploadMutation]);

    const { register, getValues } = useForm<{ password: string }>({
        defaultValues: { password: '' },
    });
    const checkPassword = useCallback(async () => {
        try {
            const checkResult = await processFile(file.file, getValues('password'));
            if (checkResult.passwordValid) {
                updateFile({
                    ...file,
                    state: 'loaded',
                    passwordState: {
                        password: getValues('password'),
                        correct: true,
                    },
                });
                setPagesCount(checkResult.pages);
            } else {
                updateFile({
                    ...file,
                    state: 'error',
                    error: 'Incorrect password',
                });
            }
        } catch (error) {
            updateFile({
                ...file,
                state: 'error',
                error: String(error),
            });
        }
    }, [file, getValues, updateFile]);

    // Подсчет страниц и обработка паролей
    useEffect(() => {
        (async () => {
            if (file.state === 'loading') {
                try {
                    const password = file.passwordState?.password;
                    const fileInfo = await processFile(file.file, password);

                    setPagesCount(fileInfo.pages);

                    if (fileInfo.hasPassword) {
                        if (fileInfo.passwordValid === false) {
                            // Неверный пароль
                            updateFile({
                                ...file,
                                state: 'error',
                                error: 'Неверный пароль',
                                passwordState: file.passwordState
                                    ? {
                                          ...file.passwordState,
                                          correct: false,
                                      }
                                    : undefined,
                            });
                        } else if (fileInfo.passwordValid === undefined && !password) {
                            // Файл защищен паролем, но пароль не предоставлен
                            updateFile({
                                ...file,
                                state: 'loaded',
                                passwordState: {
                                    password: '',
                                    correct: undefined,
                                },
                            });
                        } else {
                            // Пароль правильный
                            updateFile({
                                ...file,
                                state: 'loaded',
                                passwordState: file.passwordState
                                    ? {
                                          ...file.passwordState,
                                          correct: true,
                                      }
                                    : undefined,
                            });
                        }
                    } else {
                        // Файл не защищен паролем
                        updateFile({
                            ...file,
                            state: 'loaded',
                        });
                    }
                } catch (error) {
                    console.error('Failed to process file', error);

                    updateFile({
                        ...file,
                        state: 'error',
                        error: 'Не удалось обработать файл',
                    });
                }
            }
        })();
    }, [file, updateFile]);

    useEffect(() => {
        if (file.state === 'uploading') {
            if (uploadMutation.isSuccess) {
                updateFile({
                    ...file,
                    state: 'uploaded',
                });
            } else if (uploadMutation.isError) {
                let msg = 'Error while loading';
                const error = uploadMutation.error;
                if (isAxiosError(error)) {
                    msg = (error.response?.data as Response).humanError || msg;
                }
                updateFile({
                    ...file,
                    state: 'error',
                    error: msg,
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
                    <div className={styles.stateIcon}>
                        <StateIcon />
                    </div>
                    <div className={styles.content__state__fileInfo}>
                        <Text variant='body-s' className={styles.content__state__fileInfo__name}>
                            {file.file.name}
                        </Text>
                        <Text variant='small' typColor='light'>
                            {formatSize(file.file.size)}
                            {pagesCount && pagesCount > 0 && <>, {pagesCount} Pages</>}
                        </Text>
                        {file.state === 'error' && file.error && (
                            <Text variant='small' typColor='alarm'>
                                {file.error}
                            </Text>
                        )}
                    </div>
                </div>
                <div className={classNames(styles.actions, 'flex-column flex-md-row')}>
                    {file.passwordState && !file.passwordState.correct && (
                        <>
                            <TextInput
                                type='password'
                                placeholder='Password'
                                {...register('password')}
                                className={styles.passwordInput}
                            />
                            <Button variant='primary' onClick={checkPassword}>
                                Submit
                            </Button>
                        </>
                    )}
                    {(file.state === 'loading' ||
                        file.state === 'loaded' ||
                        file.state === 'error') &&
                        (file.passwordState === undefined || file.passwordState.correct) && (
                            <>
                                <Select
                                    options={fileFormats.map(format => ({
                                        value: format.key,
                                        label: format.displayName,
                                    }))}
                                    value={fileType}
                                    onChange={setFileType}
                                />
                                <Button
                                    rightIcon={<ExcelBold />}
                                    onClick={sendFile}
                                    disabled={file.state === 'loading'}
                                >
                                    Convert to{' '}
                                    {
                                        fileFormats.find(format => format.key === fileType)
                                            ?.displayName
                                    }
                                </Button>
                            </>
                        )}
                    {file.state === 'uploading' && (
                        <Button rightIcon={<LoadingSpinner color='white' />}>Converting...</Button>
                    )}
                    {file.state === 'uploaded' && (
                        <Button rightIcon={<DownloadIcon />} onClick={downloadFile}>
                            Download{' '}
                            {fileFormats.find(format => format.key === fileType)?.displayName}
                        </Button>
                    )}
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
