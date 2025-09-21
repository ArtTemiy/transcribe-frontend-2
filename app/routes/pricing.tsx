import { Container } from 'react-bootstrap';

import PricingSection from '@/components/ui/PricingSection';

import styles from './pricing.module.scss';

const PricingPage = () => {
    return (
        <div className={styles.pricing}>
            <Container>
                <div className={styles.pricingContent}>
                    <h1 className={styles.pricingTitle}>Pricing</h1>
                    <PricingSection />
                </div>
            </Container>
        </div>
    );
};

export default PricingPage;
