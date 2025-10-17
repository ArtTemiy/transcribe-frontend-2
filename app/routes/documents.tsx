import { Container } from 'react-bootstrap';

import DownloadIcon from '@/../src/icons/download.svg';
import ErrorIcon from '@/../src/icons/files/error.svg';
import UploadedIcon from '@/../src/icons/files/uploaded.svg';
import { Text } from '@/components/ui/Text';
import { useJobsQuery, type JobStatus } from '@/queries/jobs';

import Button from '../components/ui/Button';
import LoadingPlaceholder from '../components/ui/LoadingPlaceholder/LoadingPlaceholder';
import LoadingSpinner from '../components/ui/LoadingSpinner';

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
    const jobsQ = useJobsQuery();
    const jobs = jobsQ.data || [];

    return (
        <Container className={styles.documents}>
            {jobsQ.isLoading ? (
                <LoadingPlaceholder />
            ) : (
                <>
                    <div className={styles.header}>
                        <Text variant='display'>Documents</Text>
                        <Text variant='body-l'>Your recent converstions</Text>
                    </div>

                    <Container className={styles.documentsList}>
                        {jobs.map(job => (
                            <div key={job.id} className={styles.documentItem}>
                                <div className={styles.documentInfo}>
                                    {chooseIcon(job.status)}
                                    <Text variant='caption'>{job.id}</Text>
                                </div>

                                <div className={styles.documentInfo}>
                                    <Text variant='caption' typColor='light'>
                                        Used {job.pages_used} pages
                                    </Text>
                                    {job.status === 'completed' && (
                                        <Button
                                            onClick={() =>
                                                open(`/api/v1/download/${job.id}`, '_blank')
                                            }
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
