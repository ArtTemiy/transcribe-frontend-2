import type { PricingPlan } from '@/types/PricingPlan';

export const pricingPlans: PricingPlan[] = [
    {
        key: 'free',
        title: 'Free',
        price: 0,
        subtext: '100 free total (one-time, upon registration)',
        features: ['PDF Bank Statement to CSV', 'One-click download', 'Global Bank Support'],
        buttonText: 'Start Free',
        recommended: false,
    },
    {
        key: 'personal',
        title: 'Personal',
        price: 35,
        subtext: '1000 pages /month',
        features: [
            'PDF Bank Statement to CSV',
            'Merge multiple PDFs into one CSV',
            'One-click download',
            'Global Bank Support',
            '24/7 Support',
        ],
        buttonText: 'Get Personal',
        recommended: false,
    },
    {
        key: 'business',
        title: 'Business',
        price: 150,
        subtext: '5000 pages /month',
        features: [
            'All features from Personal',
            'Scalable processing for teams',
            'Priority 24/7 Support',
        ],
        buttonText: 'Upgrade to Business',
        recommended: false,
    },
    {
        key: 'enterprise',
        title: 'Enterprise',
        price: 'Custom pricing',
        subtext: 'Unlimited pages/month',
        features: [
            'All features from Business',
            'Tailored integrations',
            'SLA & compliance options',
            'Dedicated account manager',
        ],
        buttonText: 'Contact Us',
        recommended: true,
    },
];
