import { Builder } from '~/pages/builder/builder';
import type { Route } from './+types/home';
import { data } from '~/pages/builder/data';
import { BuilderProvider } from '~/providers/builder-provider';

export async function loader() {
  return data;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <BuilderProvider sections={loaderData.sections}>
      <Builder />
    </BuilderProvider>
  );
}
