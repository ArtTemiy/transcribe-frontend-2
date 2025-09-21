import React from 'react';

import { Card } from '~/components/ui/Card';
import { Text } from '~/components/ui/Text';

import styles from './index.module.scss';

export interface FeatureCardProps {
    title: string;
    description: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    icon,
    className = '',
}) => (
    <Card className={className}>
        <div className={styles.content}>
            {icon && <div className={styles.icon}>{icon}</div>}
            <div className={styles.textContent}>
                <Text variant='title' className={styles.title}>
                    {title}
                </Text>
                <Text variant='body-m' className={styles.description}>
                    {description}
                </Text>
            </div>
        </div>
    </Card>
);

export default FeatureCard;
