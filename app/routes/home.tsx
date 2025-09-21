import { Col, Container, Row } from 'react-bootstrap';

// icons
import AIIcon from '@/../src/icons/features/ai.svg';
import GlobalIcon from '@/../src/icons/features/global.svg';
import SearchIcon from '@/../src/icons/features/search.svg';
import SecureIcon from '@/../src/icons/features/secure.svg';
import PricingSection from '@/components/ui/PricingSection';
import { Text } from '~/components/ui/Text';

import { FeatureCard } from '../components/ui/FeatureCard';
import { FeedbackCard } from '../components/ui/FeedbackCard';
import Dropzone from '../components/ui/files/Dropzone';

import FeedbackSlider from './home/components/FeedbackSlider';
import styles from './home.module.scss';

// Моки для преимуществ
const features = [
    {
        title: 'Fast',
        description: 'Lightning-speed AI extraction with no compromise on quality',
        icon: <AIIcon />,
    },
    {
        title: 'Precise',
        description:
            'Context-aware parsing with extra validation — making sense of even messy documents',
        icon: <SearchIcon />,
    },
    {
        title: 'Secure',
        description: 'Secure upload, encrypted processing, automatic data purge in 24h',
        icon: <SecureIcon />,
    },
    {
        title: 'Global support',
        description: (
            <>
                <span style={{ color: '#0353a4' }}>150+</span> countries. Unlimited formats. Even
                scans. One powerful AI engine
            </>
        ),
        icon: <GlobalIcon />,
    },
];

// Моки для отзывов
const feedbacks = [
    {
        name: 'Ethan Johnson',
        role: 'Sales manager',
        avatar: '/avatars/ethan.png',
        text: 'The converter is lightning-fast and extremely easy to use. I love how it handles different formats effortlessly!',
    },
    {
        name: 'Michael Brown',
        role: 'IT Project Manager',
        avatar: '/avatars/michael.png',
        text: 'I’ve tested several tools, but this one is by far the most reliable. Just upload and get your file in seconds',
    },
    {
        name: 'Sophie Miller',
        role: 'Financial Analyst',
        avatar: '/avatars/sophie.png',
        text: 'Very user-friendly interface, I figured it out instantly. Works perfectly without glitches',
    },
];

const HomePage = () => {
    return (
        <div className={styles.home}>
            <Container className={styles.heroSection}>
                <h1 className={styles.heroTitle}>
                    The Smartest <br /> AI Bank Statement Converter
                </h1>
                <Row>
                    <Col className='col-12 col-md-6'>
                        <Text variant='body-l'>
                            Works with global bank formats, even scans — just upload, we&apos;ll
                            handle the rest
                        </Text>
                    </Col>
                </Row>
                <Dropzone className={styles.dropzone} />
            </Container>

            <Container>
                <h2 className={styles.whyTrustUsTitle}>Why trust us</h2>
                <Row className='gx-3 gy-3'>
                    {features.map(feature => (
                        <Col key={feature.title} className='col-12 col-md-3'>
                            <FeatureCard
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container>
                <h2 className={styles.pricingTitle}>Pricing</h2>
                {/* <Row className='gx-3 gy-3'>
                    {pricingPlans.map(plan => (
                        <Col key={plan.key} className='col-12 col-md-3'>
                            <PricingCard pricingInfo={plan} />
                        </Col>
                    ))}
                </Row> */}
                <PricingSection />
            </Container>

            <Container fluid className={styles.feedbackSection}>
                <Container>
                    <h2 className={styles.feedbackTitle}>Feedback from our users</h2>
                    <FeedbackSlider>
                        <Row className='gx-3 gy-3'>
                            {feedbacks.map(feedback => (
                                <Col key={feedback.name} className='col-12 col-md-4'>
                                    <FeedbackCard
                                        name={feedback.name}
                                        role={feedback.role}
                                        avatar={feedback.avatar}
                                        text={feedback.text}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </FeedbackSlider>
                </Container>
            </Container>
        </div>
    );
};

export default HomePage;
