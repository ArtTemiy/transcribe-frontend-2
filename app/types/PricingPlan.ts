export type PricingPlan = {
    key: string,
    title: string,
    price: number | string,
    subtext: string,
    features: string[],
    buttonText: string,
    recommended: boolean
}
