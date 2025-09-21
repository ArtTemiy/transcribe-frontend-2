import { Col, Row } from 'react-bootstrap';

import { pricingPlans } from '@/consts/pricingPlans';
import { useUserInfoQuery } from '@/queries/userInfo';

import PricingCard from './PricingCard';

const PricingSection = () => {
    const userInfoQuery = useUserInfoQuery();
    return (
        <Row className='gx-0 gx-md-3 gy-3'>
            {pricingPlans.map(plan => (
                <Col key={plan.key} className='col-12 col-md-3'>
                    <PricingCard
                        pricingInfo={plan}
                        isCurrent={plan.key === userInfoQuery.data?.data?.plan}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default PricingSection;
