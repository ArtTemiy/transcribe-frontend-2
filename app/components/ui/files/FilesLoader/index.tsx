import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";
import styles from "./index.module.scss";
import Button from "../../Button";
import classNames from "classnames";
import { Text } from "../../Text";
import { v4 as uuidV4 } from 'uuid'
// Icons
import DownloadIcon from '@/../src/icons/download.svg';
import ExcelBold from '@/../src/icons/files/excel_bold.svg';

import ButtonBase from "../../ButtonBase";
import { useUploadFilesMutation } from "~/mutations/uploadFile";
import LoadingSpinner from "../../LoadingSpinner";
import { useFilesContext, type UserFile } from "~/context/FilesContext";
import type { FileState } from "~/context/FilesContext/types";
// import { Document } from "react-pdf";

export type FilesLoaderState = "preparing" | "prepared" | "uploading" | "uploaded";

type FilesLoaderProps = {}

const FilesLoader: React.FC<FilesLoaderProps> = ({ }: FilesLoaderProps) => {
    const [requestId, setRequestId] = useState<string | undefined>(undefined);
    const { files } = useFilesContext();

    const [state, setState] = useState<FilesLoaderState>('preparing');
    const uploadMutation = useUploadFilesMutation('all');

    const sendFiles = useCallback(() => {
        setState('uploading');
        uploadMutation.mutate(files);
    }, [files, setState, uploadMutation]);

    const downloadFile = useCallback(() => {
        open(`/api/download/${requestId}`, '_blank');
    }, [requestId]);

    useEffect(() => {
        if (files.filter(file => ['error', 'loading'].includes(file.state)).length > 0) {
            setState('preparing');
            return;
        }

        setState('prepared');
    }, [setState, files]);

    useEffect(() => {
        if (uploadMutation.isSuccess) {
            const requestId = uploadMutation.data.requestId;
            setRequestId(requestId);
            setState(state => state === 'uploading' ? 'uploaded' : state);
        } else if (uploadMutation.isError) {
            // TODO:
        }
    }, [uploadMutation, setRequestId]);

    return (
        <div>
            {(state === 'preparing' || state === 'prepared') && <Button rightIcon={<ExcelBold />} onClick={sendFiles} disabled={state === 'preparing'}>
                Convert to Excel
            </Button>}
            {(state === 'uploading') && <Button rightIcon={<LoadingSpinner color='white' />}>
                Converting...
            </Button>}
            {(state === 'uploaded') && <Button rightIcon={<DownloadIcon />} onClick={downloadFile}>
                Download CSV
            </Button>}
        </div>
    );
};

export default FilesLoader;