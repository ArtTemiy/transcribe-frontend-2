import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { useAlert } from '../../hooks/useAlert';
import type { PricingPlan } from '../../types/PricingPlan';
import type { Response } from '../../types/response';
import { apiClient } from '../../utils/apiClient';

type CheckoutSessionResponse = {
    checkout_url: string;
    session_id: string;
};

export const useChoosePlanMutation = (plan: PricingPlan) => {
    const alert = useAlert();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['choosePlan', plan.key],
        mutationFn: async () => {
            const sessionResponse = (
                await apiClient.post(`/payments/create-checkout-session?plan_id=${plan.key}`)
            ).data as Response<CheckoutSessionResponse>;
            const url = sessionResponse.data?.checkout_url;
            if (!url) {
                queryClient.invalidateQueries({ queryKey: ['userInfo'] });
                return;
            }
            window.location.href = url;
        },
        onError: error => {
            console.error(error);
            let errorMessage = 'Unknown Error';
            if (isAxiosError(error)) {
                errorMessage = (error.response?.data as Response).humanError || 'Unknown Error';
            }
            alert.showError(errorMessage, { autoHide: 10 });
        },
    });
    return mutation;
};
