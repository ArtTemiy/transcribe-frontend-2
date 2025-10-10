import classNames from 'classnames';
import { useCallback, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import Cross from '@/../src/icons/cross.svg';
import FileAdd from '@/../src/icons/feedback/fileAdd.svg';
import FileLoaded from '@/../src/icons/feedback/fileLoaded.svg';
import FileRemove from '@/../src/icons/feedback/fileRemove.svg';

import {
    useFeedbackMutation,
    type FeedbackData,
} from '../../../mutations/feedback/useFeedbackMutation';
import { formatSize } from '../../../utils/formatSize';
import Button from '../Button';
import ButtonBase from '../ButtonBase';
import Flex from '../Flex';
import TextArea from '../input/TextArea';
import TextInput from '../input/TextInput/TextInput';
import Spacer from '../Spacer';
import { Text } from '../Text';

import styles from './feedbackForm.module.scss';

type Props = {
    header: string;
    onClose: () => void;
    messageSettings: {
        title: string;
        placeholder: string;
    };
    withFiles?: boolean;
};

const FeedbackForm = ({ header, onClose, messageSettings, withFiles = false }: Props) => {
    const { register, handleSubmit, watch, formState, getValues, setValue, reset } =
        useForm<FeedbackData>();
    const feedbackMutation = useFeedbackMutation();

    const onSubmit = useCallback(
        (data: FeedbackData) => {
            feedbackMutation.mutate(data);
        },
        [feedbackMutation],
    );

    useEffect(() => console.log('init component'), []);

    useEffect(() => {
        if (feedbackMutation.isSuccess) {
            onClose();
        }
    }, [feedbackMutation.isSuccess, onClose, reset]);

    const msg = watch('message');
    const files = watch('files');

    const onDrop = useCallback(
        (newFiles: FileList) => {
            setValue('files', [...(getValues('files') || []), ...newFiles]);
        },
        [setValue, getValues],
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                onDrop(e.dataTransfer.files);
            }
        },
        [onDrop],
    );

    const fileInputRef = useRef<HTMLInputElement>(null);
    // Обработчик клика на дропзону
    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    // Обработчик выбора файлов через input
    const handleFileSelect = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                onDrop(e.target.files);
                // Очищаем input для возможности повторного выбора тех же файлов
                e.target.value = '';
            }
        },
        [onDrop],
    );
    const deleteFile = useCallback(
        (index: number) => {
            const files = getValues('files');
            files.splice(index, 1);
            setValue('files', files);
        },
        [setValue, getValues],
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className={styles.container}>
                <Flex justify='between' className={styles.header}>
                    <Text variant='title'>{header}</Text>
                    <ButtonBase onClick={onClose}>
                        <Cross />
                    </ButtonBase>
                </Flex>

                <Flex gap='lg' direction='column'>
                    <Flex direction='column'>
                        <Text variant='small'>Full Name</Text>
                        <TextInput
                            placeholder='Jane Smith'
                            {...register('name', { required: 'Field is required' })}
                            error={formState.errors.name?.message}
                        />
                    </Flex>
                    <Flex direction='column'>
                        <Text variant='small'>Email Address</Text>
                        <TextInput
                            type='email'
                            placeholder='your@gmail.com'
                            {...register('email', { required: 'Field is required' })}
                            error={formState.errors.email?.message}
                        />
                    </Flex>
                    <Flex direction='column'>
                        <Flex justify='between'>
                            <Text variant='small' typColor='standard'>
                                {messageSettings.title}
                            </Text>
                            <Text variant='small' typColor='light'>
                                {msg?.length || 0}/300
                            </Text>
                        </Flex>
                        <TextArea
                            placeholder={messageSettings.placeholder}
                            {...register('message', {
                                maxLength: 300,
                                required: 'Field is required',
                            })}
                            error={
                                formState.errors.message?.message ||
                                (formState.errors.message?.type === 'maxLength'
                                    ? 'Max length is 300'
                                    : '')
                            }
                        />
                    </Flex>
                    {withFiles && (
                        <Flex direction='column' gap='sm'>
                            <Text variant='small'>
                                Attach the statement file that didn’t upload
                            </Text>
                            <div
                                className={classNames(styles.dropzone)}
                                onDragOver={e => e.preventDefault()}
                                onDrop={handleDrop}
                            >
                                <input
                                    ref={fileInputRef}
                                    type='file'
                                    accept='.pdf,application/pdf'
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={handleFileSelect}
                                />
                                <FileAdd />
                                <Text variant='small' typColor='light'>
                                    Drag and drop your file(s) or{' '}
                                    <span className={styles.onClick} onClick={handleClick}>
                                        click to upload
                                    </span>
                                </Text>
                            </div>
                            {files?.map((file, index) => (
                                <Flex
                                    key={index}
                                    align='center'
                                    className={styles.fileViewer}
                                    gap='sm'
                                >
                                    <FileLoaded />
                                    <Text variant='small' typColor='light'>
                                        {file.name}
                                    </Text>
                                    <Spacer />
                                    <Text variant='small' typColor='light'>
                                        {formatSize(file.size)}
                                    </Text>
                                    <ButtonBase onClick={() => deleteFile(index)}>
                                        <FileRemove />
                                    </ButtonBase>
                                </Flex>
                            ))}
                        </Flex>
                    )}

                    <Button fullWidth variant='primary' type='submit'>
                        Send
                    </Button>
                </Flex>
            </Container>
        </form>
    );
};

export default FeedbackForm;
