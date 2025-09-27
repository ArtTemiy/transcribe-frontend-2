import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('pricing', 'routes/pricing.tsx'),
    route('settings', 'routes/settings.tsx'),

    route('test', 'routes/test.tsx'),
    route('alert-test', 'routes/alert-test.tsx'),
    route('global-alert-test', 'routes/global-alert-test.tsx'),

    route('auth/google', 'routes/auth/google.tsx'),
] satisfies RouteConfig;
