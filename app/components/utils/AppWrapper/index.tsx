import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

import LoadingPlaceholder from '~/components/ui/LoadingPlaceholder/LoadingPlaceholder';
import { useUserInfoQuery } from '~/queries/userInfo';

const RequiresWrapper = ({ children }: PropsWithChildren) => {
    const queries = [useUserInfoQuery()];

    const isLoading = queries.filter(el => el.isLoading).length > 0;

    if (isLoading) {
        return <LoadingPlaceholder />;
    }

    return children;
};

const ComponentsWrapper = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
};

export default function ({ children }: PropsWithChildren) {
    return (
        <ComponentsWrapper>
            <RequiresWrapper>{children}</RequiresWrapper>
        </ComponentsWrapper>
    );
}
