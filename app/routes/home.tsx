import { Builder } from '~/pages/builder/builder';
import type { Route } from './+types/home';
import { BuilderProvider } from '~/providers/builder-provider';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { useEffect } from 'react';
import { fetchAppConfiguration } from '~/store/app.slice';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Test - Package Builder' },
    { name: 'description', content: 'Welcome to Package Builder' },
  ];
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { configuration, loading, error } = useAppSelector(
    (state) => state.app
  );

  useEffect(() => {
    dispatch(fetchAppConfiguration());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!configuration) return <p>Something went wrong</p>;

  return (
    <BuilderProvider>
      <Builder />
    </BuilderProvider>
  );
}
