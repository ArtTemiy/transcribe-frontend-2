import { PricingCard } from "../components/ui/PricingCard";
import { Text } from "../components/ui/Text";
import { Button } from "../components/ui/Button";
import styles from "./pricing.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import { pricingPlans } from '~/consts/pricingPlans';
import { useUserInfoQuery } from "~/queries/userInfo";
import { Suspense } from "react";

const PricingPage = () => {
    const userInfoQuery = useUserInfoQuery();
    return (
        <div className={styles.pricing}>
            <Container className={styles.pricingContainer}>
                <div className={styles.pricingContent}>
                    <h1 className={styles.pricingTitle}>Pricing</h1>
                    <Row className="gx-0 gx-md-3 gy-3">
                        {pricingPlans.map((plan) => (
                            <Col key={plan.key} className="col-12 col-md-3">
                                <PricingCard
                                    pricingInfo={plan}
                                    isCurrent={plan.key === userInfoQuery.data?.planKey}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default PricingPage;