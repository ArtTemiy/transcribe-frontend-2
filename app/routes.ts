import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route('settings', 'routes/settings.tsx'),

  route("test", "routes/test.tsx"),
] satisfies RouteConfig;
