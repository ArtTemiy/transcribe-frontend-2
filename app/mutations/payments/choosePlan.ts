import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useAlert } from '../../context/AlertContext';
import type { PricingPlan } from '../../types/PricingPlan';
import { apiClient } from '../../utils/apiClient';

type CheckoutSessionResponse = {
    checkout_url: string;
    session_id: string;
};

export const useChoosePlanMutation = (plan: PricingPlan) => {
    const alert = useAlert();
    const mutation = useMutation({
        mutationKey: ['choosePlan', plan.key],
        mutationFn: async () => {
            const sessionResponse = (
                await apiClient.post(`/payments/create-checkout-session?plan_id=${plan.key}`)
            ).data as CheckoutSessionResponse;
            window.location.href = sessionResponse.checkout_url;
        },
        onError: error => {
            console.error(error);
            let errorMessage = 'Unknown Error';
            if (isAxiosError(error)) {
                errorMessage = error.response?.data?.message || 'Unknown Error';
            }
            alert.showError(errorMessage, { autoHide: 10 });
        },
    });
    return mutation;
};
