import { Builder } from '~/pages/builder/builder';
import type { Route } from './+types/home';
import { BuilderProvider } from '~/providers/builder-provider';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { useEffect } from 'react';
import { fetchAppConfiguration } from '~/store/app.slice';
import { cn } from '~/lib/utils';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Test - Package Builder' },
    { name: 'description', content: 'Welcome to Package Builder' },
  ];
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { configuration, loading, error, ready } = useAppSelector(
    (state) => state.app
  );

  useEffect(() => {
    // if (!configuration) {
      dispatch(fetchAppConfiguration());
    // }
  }, [dispatch]);


  if (loading || error || !configuration) {
    return null;
  }

  return (
    <div
      className={cn('relative h-[100vh] overflow-hidden', {
        'overflow-auto h-auto': ready,
      })}
    >
      <BuilderProvider>
        <Builder />
      </BuilderProvider>
    </div>
  );
}
