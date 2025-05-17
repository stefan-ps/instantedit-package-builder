import { useState } from 'react';
import { Sidebar } from './sidebar';
import VideoPreview from './video-preview';
import { useAppSelector } from '~/store/hooks';
import { cn } from '~/lib/utils';
import { Loader } from 'lucide-react';

export function Builder() {
  const [containerWidth, setContainerWidth] = useState(0);
  const isLg = window.matchMedia('(min-width: 1024px)').matches;
  const { ready } = useAppSelector((state) => state.app);

  return (
    <div className='flex flex-col lg:flex-row-reverse overflow-hidden'>
      <div className='z-10 w-full lg:h-screen lg:w-[calc(100vw-460px)] fixed top-0 left-0 flex'>
        <VideoPreview onVideoContainerHeight={setContainerWidth} />
        <div
          className={cn(
            'justify-center items-center absolute top-0 bottom-0 left-0 right-0 z-20 bg-background',
            'flex flex-col gap-10',
            {
              invisible: ready,
            }
          )}
        >
          <img src='/logo-big.png' className='h-[20%]' />
          <Loader className='h-10 w-10 animate-[spin_2s_linear_infinite]' />
        </div>
      </div>
      <div
        style={isLg ? {} : { paddingTop: `${containerWidth}px` }}
        className={'lg:pt-0 lg:w-[450px]'}
      >
        <Sidebar />
      </div>
    </div>
  );
}
