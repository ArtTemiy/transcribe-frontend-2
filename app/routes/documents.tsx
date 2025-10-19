import { Container } from 'react-bootstrap';

import DownloadIcon from '@/../src/icons/download.svg';
import ErrorIcon from '@/../src/icons/files/error.svg';
import UploadedIcon from '@/../src/icons/files/uploaded.svg';
import { Text } from '@/components/ui/Text';
import { type JobStatus } from '@/queries/jobs';

import Button from '../components/ui/Button';
import LoadingPlaceholder from '../components/ui/LoadingPlaceholder/LoadingPlaceholder';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useDocumentsQuery } from '../queries/documents';

import styles from './documents.module.scss';

const chooseIcon = (status: JobStatus) => {
    switch (status) {
        case 'completed':
            return <UploadedIcon />;
        case 'created':
        case 'uploaded':
        case 'processing':
            return <LoadingSpinner />;
        case 'error':
            return <ErrorIcon />;
    }
};

const DocumentsPage = () => {
    const documentssQ = useDocumentsQuery();
    const documents = documentssQ.data || [];

    return (
        <Container className={styles.documents}>
            {documentssQ.isLoading ? (
                <LoadingPlaceholder />
            ) : (
                <>
                    <div className={styles.header}>
                        <Text variant='display'>Documents</Text>
                        <Text variant='body-l'>Your recent converstions</Text>
                    </div>

                    <Container className={styles.documentsList}>
                        {documents.map(document => (
                            <div key={document.id} className={styles.documentItem}>
                                <div className={styles.documentInfo}>
                                    {chooseIcon(document.status)}
                                    <Text variant='caption'>{document.file_name || '-'}</Text>
                                </div>

                                <div className={styles.documentInfo}>
                                    <Text variant='caption' typColor='light'>
                                        Used {document.pages_used} pages
                                    </Text>
                                    {document.status === 'completed' && (
                                        <Button
                                            onClick={() => open(document.download_url, '_blank')}
                                        >
                                            <DownloadIcon />
                                            Download
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Container>
                </>
            )}
        </Container>
    );
};

export default DocumentsPage;
