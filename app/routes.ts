import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('v2', 'routes/home-v2.tsx'),
  route('summary', 'routes/summary.tsx'),
  route('success', 'routes/request-sent.tsx'),
] satisfies RouteConfig;
