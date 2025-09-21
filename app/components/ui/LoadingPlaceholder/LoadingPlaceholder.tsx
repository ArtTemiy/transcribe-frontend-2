import LoadingSpinner from '../LoadingSpinner';

import styles from './loadingplaceholder.module.scss';

const LoadingPlaceholder = () => {
    return (
        <div className={styles.container}>
            <LoadingSpinner />
        </div>
    );
};

export default LoadingPlaceholder;
