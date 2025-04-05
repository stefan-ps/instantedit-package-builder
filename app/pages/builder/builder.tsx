import { useState } from 'react';
import { Sidebar } from './sidebar';
import VideoPreview from './video-preview';

export function Builder() {
  const [containerWidth, setContainerWidth] = useState(0);
  const isLg = window.matchMedia('(min-width: 1024px)').matches;

  return (
    <div className='flex flex-col lg:flex-row-reverse overflow-hidden'>
      <div className='z-10 w-full lg:h-screen lg:w-[calc(100vw-460px)] fixed top-0 left-0 flex'>
        <VideoPreview onVideoContainerHeight={setContainerWidth} />
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
