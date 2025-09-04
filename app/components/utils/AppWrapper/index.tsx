import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { enableMocking, initMocks } from "@/mocks/init";

const AppWrapper = ({children} : PropsWithChildren) => {
    const [isReady, setIsReady] = useState(!enableMocking());

    useEffect(() => {
        if (enableMocking()) {
            initMocks().then(() => {
                setIsReady(true);
            });
        }
    }, []);

    // Показываем загрузку, пока мок сервер не инициализирован
    if (!isReady) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px'
            }}>
                Инициализация мок сервера...
            </div>
        );
    }

    return <QueryClientProvider client={new QueryClient()}>
        {children}
    </QueryClientProvider>
}

export default AppWrapper;
