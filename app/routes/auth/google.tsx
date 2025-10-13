import { useEffect } from 'react';
import LoadingPlaceholder from '../../components/ui/LoadingPlaceholder/LoadingPlaceholder';
import axios from 'axios';
import { useGoogleAuthMutation } from '../../mutations/auth/googleAuth';
import { useAlert } from '../../hooks/useAlert';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

const Page = () => {
    const googleMutation = useGoogleAuthMutation();
    const alert = useAlert();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const hash = window.location.hash.slice(1);
            const params = new URLSearchParams(hash);
            const access_token = params.get('access_token') || '';

            googleMutation.mutate({ token: access_token });
        })();
    }, []);
    useEffect(() => {
        if (googleMutation.isPending) {
            return;
        }
        if (googleMutation.isError) {
            alert.showError(googleMutation.error?.response?.data?.message ?? 'Unknown error');
            return;
        }
        if (googleMutation.isSuccess) {
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            navigate('/');
        }
    }, [googleMutation.isSuccess, googleMutation.isPending, googleMutation.isError]);
    return googleMutation.isPending && <LoadingPlaceholder />;
};

export default Page;
