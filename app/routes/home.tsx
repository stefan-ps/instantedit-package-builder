import { Builder } from '~/pages/builder/builder';
import type { Route } from './+types/home';
import { data } from '~/pages/builder/data';
import { BuilderProvider } from '~/providers/builder-provider';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Test - Package Builder' },
    { name: 'description', content: 'Welcome to Package Builder' },
  ];
}

export default function Home() {
  return (
    <BuilderProvider sections={data.sections} settings={data.settings}>
      <Builder />
    </BuilderProvider>
  );
}
