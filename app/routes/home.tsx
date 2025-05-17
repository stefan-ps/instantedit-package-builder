import { Builder } from '~/pages/builder/builder';
import type { Route } from './+types/home';
import { BuilderProvider } from '~/providers/builder-provider';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { useEffect, useMemo } from 'react';
import { fetchAppConfiguration } from '~/store/app.slice';
import { cn } from '~/lib/utils';
import { Loader } from 'lucide-react';

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
    dispatch(fetchAppConfiguration());
  }, [dispatch]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  // if (!configuration) return <p>Something went wrong</p>;

  const page = useMemo(() => {
    if (loading || error || !configuration) {
      return null;
    }

    return (
      <BuilderProvider>
        <Builder />
      </BuilderProvider>
    );
  }, [loading, error, configuration]);

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
      {/* <div
        className={cn(
          'justify-center items-center absolute top-0 bottom-0 left-0 right-0 z-10 bg-background',
          'flex flex-col gap-10',
          {
            invisible: ready,
          }
        )}
      >
        <img src='/logo-big.png' />
        <Loader className='h-10 w-10 animate-[spin_2s_linear_infinite]' />
      </div> */}
    </div>
  );
}
