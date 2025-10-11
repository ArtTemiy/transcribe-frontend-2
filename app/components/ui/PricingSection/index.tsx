import { useCallback } from 'react';
import { Col, Row } from 'react-bootstrap';

import { pricingPlans } from '@/consts/pricingPlans';
import { useUserInfoQuery } from '@/queries/userInfo';

import type { PricingPlan } from '../../../types/PricingPlan';
import FeedbackForm from '../FeedbackForm';
import { useModal } from '../Modal/useModal';

import PricingCard from './PricingCard';

const PricingSection = () => {
    const userInfoQuery = useUserInfoQuery();
    const contactUsModal = useModal();

    const getHandleChoose = useCallback(
        (pricingInfo: PricingPlan) => {
            if (pricingInfo.key === 'enterprise') {
                return () => contactUsModal.openModal();
            }
            return undefined;
        },
        [contactUsModal],
    );

    return (
        <>
            <Row className='gx-0 gx-md-3 gy-3'>
                {pricingPlans.map(plan => (
                    <Col key={plan.key} className='col-12 col-md-6 col-lg-3'>
                        <PricingCard
                            pricingInfo={plan}
                            isCurrent={plan.key === userInfoQuery.data?.data?.plan}
                            handleChooseOverride={getHandleChoose(plan)}
                        />
                    </Col>
                ))}
            </Row>
            <contactUsModal.Component>
                <FeedbackForm
                    onClose={contactUsModal.closeModal}
                    header='Contact us'
                    messageSettings={{
                        title: 'Message',
                        placeholder:
                            'Tell us about your needs, team size, and any specific requirements you have',
                    }}
                    variant='contact'
                />
            </contactUsModal.Component>
        </>
    );
};

export default PricingSection;
