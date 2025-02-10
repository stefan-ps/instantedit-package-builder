import { Builder } from '~/pages/builder/builder';
import type { Route } from './+types/home';
import { BuilderProvider } from '~/providers/builder-provider';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Test - Package Builder' },
    { name: 'description', content: 'Welcome to Package Builder' },
  ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const product = await fetch('http://localhost:3000/api/section');
  return await product.json();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <BuilderProvider
      sections={loaderData.sections}
      settings={loaderData.settings}
    >
      <Builder />
    </BuilderProvider>
  );
}
