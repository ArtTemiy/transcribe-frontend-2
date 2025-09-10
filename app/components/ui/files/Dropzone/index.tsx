import React, { useCallback, useRef } from "react";
import styles from './index.module.scss';
import classNames from "classnames";
import type { PropsWithClassName } from "~/types/helpers/PropsWithClassName";
import { EmptyContent } from "./EmptyContent";
import FilesLoader from '~/components/ui/files/FilesLoader';
import { FilesProvider, useFilesContext } from "~/context/FilesContext";
import FileView from "../FileView";

type DropzoneProps = PropsWithClassName & {};

export const Dropzone: React.FC<DropzoneProps> = ({ className }: DropzoneProps) => {
    const { files, addFile } = useFilesContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Функция для фильтрации только PDF файлов
    const filterPdfFiles = useCallback((fileList: FileList): File[] => {
        return Array.from(fileList).filter(file => file.type === 'application/pdf');
    }, []);

    const onDrop = useCallback((newFiles: FileList) => {
        const pdfFiles = filterPdfFiles(newFiles);
        if (pdfFiles.length > 0) {
            addFile(pdfFiles);
        }
    }, [filterPdfFiles, addFile]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onDrop(e.dataTransfer.files);
        }
    }, [onDrop]);

    // Обработчик клика на дропзону
    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    // Обработчик выбора файлов через input
    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onDrop(e.target.files);
            // Очищаем input для возможности повторного выбора тех же файлов
            e.target.value = '';
        }
    }, [onDrop]);

    return <div className={styles.container}>
        <div
            className={classNames(files.length ? styles.dropzone : styles.dropzoneEmpty, className)}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileSelect}
            />
            {files.length ?
                <div
                    className={styles.container}
                    onClick={e => e.stopPropagation()}
                >
                    {files.map((userFile) => (
                        <FileView
                            key={userFile.id}
                            file={userFile}
                        />
                    ))}
                </div> :
                <EmptyContent />
            }
        </div>
        {files.length > 1 && <FilesLoader />}
    </div>;
};

const DropzoneWrapper = (props: DropzoneProps) => <FilesProvider>
    <Dropzone {...props} />
</FilesProvider>;

export default DropzoneWrapper;