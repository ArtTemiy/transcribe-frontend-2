import React, { useCallback } from 'react';

import CheckIcon from '@/../src/icons/features/PricingFeatureCheck.svg';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import type { PricingPlan } from '@/types/PricingPlan';

import { useChoosePlanMutation } from '../../../mutations/payments/choosePlan';
import RoundLabel from '../RoundLabel';

import styles from './PricingCard.module.scss';

export interface PricingCardProps {
    pricingInfo: PricingPlan;
    isCurrent?: boolean;
    handleChooseOverride?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
    pricingInfo,
    isCurrent = false,
    handleChooseOverride,
}) => {
    const paymentMutation = useChoosePlanMutation(pricingInfo);
    const handlePlanChoose = useCallback(() => {
        paymentMutation.mutate();
    }, [paymentMutation]);
    return (
        <Card className={isCurrent ? styles.pricingCardCurrent : styles.pricingCard}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <Text variant='title'>{pricingInfo.title}</Text>
                    {isCurrent && <RoundLabel variant='small'>Current plan</RoundLabel>}
                </div>
                <div className={styles.priceInfo}>
                    <div className={styles.priceRow}>
                        {typeof pricingInfo.price === 'number' ? (
                            <>
                                <Text className={styles.priceValue}>${pricingInfo.price}</Text>
                                <Text variant='caption'>/mount</Text>
                            </>
                        ) : (
                            <Text className={styles.priceValue_custom}>{pricingInfo.price}</Text>
                        )}
                    </div>
                    {pricingInfo.subtext && <Text variant='caption'>{pricingInfo.subtext}</Text>}
                </div>
                <div className={styles.features}>
                    {pricingInfo.features.map((f, i) => (
                        <div key={i} className={styles.feature}>
                            <CheckIcon style={{ 'flex-shrink': 0 }} />
                            <Text variant='body-s'>{f}</Text>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.action}>
                <Button
                    fullWidth
                    variant={pricingInfo.recommended ? 'primary' : 'secondary'}
                    onClick={handleChooseOverride || handlePlanChoose}
                    disabled={isCurrent || paymentMutation.isPending}
                >
                    {pricingInfo.buttonText}
                </Button>
            </div>
        </Card>
    );
};

export default PricingCard;
