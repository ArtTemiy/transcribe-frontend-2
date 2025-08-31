import { Dropzone } from "../components/ui/Dropzone";
import { FeatureCard } from "../components/ui/FeatureCard";
import { PricingCard } from "../components/ui/PricingCard";
import { FeedbackCard } from "../components/ui/FeedbackCard";
import FeedbackSlider from "./home/components/FeedbackSlider";
import styles from "./home.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { Text } from "~/components/ui/Text";
import { pricingPlans } from "~/consts/pricingPlans";

// icons
import DownloadIcon from '@/../src/icons/download.svg';
import AIIcon from '@/../src/icons/ai.svg';
import SearchIcon from '@/../src/icons/search.svg';
import SecureIcon from '@/../src/icons/secure.svg';
import GlobalIcon from '@/../src/icons/global.svg';

// Моки для преимуществ
const features = [
    {
        title: "Fast",
        description: "Lightning-speed AI extraction with no compromise on quality",
        icon: <AIIcon />,
    },
    {
        title: "Precise",
        description: "Context-aware parsing with extra validation — making sense of even messy documents",
        icon: <SearchIcon />,
    },
    {
        title: "Secure",
        description: "Secure upload, encrypted processing, automatic data purge in 24h",
        icon: <SecureIcon />,
    },
    {
        title: "Global support",
        description: (
            <>
                <span style={{ color: "#0353a4" }}>150+</span> countries. Unlimited formats. Even scans. One powerful AI engine
            </>
        ),
        icon: <GlobalIcon />,
    },
];

// Моки для отзывов
const feedbacks = [
    {
        name: "Ethan Johnson",
        role: "Sales manager",
        avatar: "/avatars/ethan.png",
        text: "The converter is lightning-fast and extremely easy to use. I love how it handles different formats effortlessly!",
    },
    {
        name: "Michael Brown",
        role: "IT Project Manager",
        avatar: "/avatars/michael.png",
        text: "I’ve tested several tools, but this one is by far the most reliable. Just upload and get your file in seconds",
    },
    {
        name: "Sophie Miller",
        role: "Financial Analyst",
        avatar: "/avatars/sophie.png",
        text: "Very user-friendly interface, I figured it out instantly. Works perfectly without glitches",
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
                    <Col className="col-12 col-md-6">
                        <Text variant='body-l'>
                            Works with global bank formats, even scans — just upload, we'll handle the rest
                        </Text>
                    </Col>
                </Row>
                <Dropzone onDrop={files => { }} className={styles.dropzone}>
                    <DownloadIcon />
                    <div className={styles.dropzoneTitle}>
                        Click or drag your files here to convert
                    </div>
                    <div className={styles.dropzoneDesc}>You can upload up to 20 files at once</div>
                </Dropzone>
            </Container>

            <Container>
                <h2 className={styles.whyTrustUsTitle}>Why trust us</h2>
                <Row className="gx-3 gy-3">
                    {features.map((f, i) => (
                        <Col className="col-12 col-md-3">
                            <FeatureCard key={i} title={f.title} description={f.description} icon={f.icon} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container>
                <h2 className={styles.pricingTitle}>Pricing</h2>
                <Row className="gx-3 gy-3">
                    {pricingPlans.map((plan) => (
                        <Col key={plan.key} className="col-12 col-md-3">
                            <PricingCard pricingInfo={plan} />
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container fluid className={styles.feedbackSection}>
                <Container>
                    <h2 className={styles.feedbackTitle}>Feedback from our users</h2>
                    <FeedbackSlider>
                        <Row className="gx-3 gy-3">
                            {feedbacks.map((f, i) => (
                                <Col className="col-12 col-md-4">
                                    <FeedbackCard
                                        key={i}
                                        name={f.name}
                                        role={f.role}
                                        avatar={f.avatar}
                                        text={f.text}
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
