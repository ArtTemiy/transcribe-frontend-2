import React from "react";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { Card } from "~/components/ui/Card";
import styles from "./index.module.scss";
import classNames from "classnames";
import type { PricingPlan } from "~/types/PricingPlan";
import CheckIcon from '@/../src/icons/PricingFeatureCheck.svg';
import RoundLabel from "../RoundLabel";

export interface PricingCardProps {
    pricingInfo: PricingPlan;
    isCurrent?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
    pricingInfo,
    isCurrent = false,
}) => {
    return (
        <Card className={isCurrent ? styles.pricingCardCurrent : styles.pricingCard}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <Text variant='title'>{pricingInfo.title}</Text>
                    {isCurrent && <RoundLabel variant='small'>current plan</RoundLabel>}
                </div>
                <div className={styles.priceInfo}>
                    <div className={styles.priceRow}>
                        {typeof pricingInfo.price === 'number' ?
                            <>
                                <Text className={styles.priceValue}>${pricingInfo.price}</Text>
                                <Text variant='caption'>/mount</Text>
                            </> :
                            <Text className={styles.priceValue_custom}>{pricingInfo.price}</Text>
                        }
                    </div>
                    {pricingInfo.subtext && <Text variant='caption'>{pricingInfo.subtext}</Text>}
                </div>
                <div className={styles.features}>
                    {pricingInfo.features.map((f, i) => (
                        <div key={i} className={styles.feature}>
                            <CheckIcon style={{'flex-shrink': 0}} />
                            <Text variant='body-s'>{f}</Text>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.action}>
                <Button
                    fullWidth
                    variant={pricingInfo.recommended ? "primary" : "secondary"}
                    // onClick={onClick}
                    disabled={isCurrent}
                >
                    {pricingInfo.buttonText}
                </Button>
            </div>
        </Card>
    );
};

export default PricingCard;