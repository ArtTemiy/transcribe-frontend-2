import DownloadIcon from '@/../src/icons/features/download.svg';

import { Text } from '../../Text';

import styles from './EmptyContent.module.scss';

export const EmptyContent = () => {
    return (
        <div className={styles.dropzone}>
            <DownloadIcon />
            <div className={styles.dropzoneText}>
                <Text variant='body-l'>Click or drag your files here to convert</Text>
                <Text variant='caption'>You can upload up to 20 files at once</Text>
            </div>
        </div>
    );
};
