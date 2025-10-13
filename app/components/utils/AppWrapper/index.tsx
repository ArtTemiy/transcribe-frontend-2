import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';

import LoadingPlaceholder from '@/components/ui/LoadingPlaceholder/LoadingPlaceholder';
import { useUserInfoQuery } from '@/queries/userInfo';

const RequiresWrapper = ({ children }: PropsWithChildren) => {
    const queries = [useUserInfoQuery()];

    const isLoading = queries.filter(el => el.isLoading).length > 0;

    if (isLoading) {
        return <LoadingPlaceholder />;
    }

    return children;
};

const ComponentsWrapper = ({ children }: PropsWithChildren) => {
    // Создаем QueryClient только один раз с помощью useMemo
    const queryClient = useMemo(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 минут
                retry: 1,
            },
        },
    }), []);

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default function AppWrapper({ children }: PropsWithChildren) {
    return (
        <ComponentsWrapper>
            <RequiresWrapper>{children}</RequiresWrapper>
        </ComponentsWrapper>
    );
}
