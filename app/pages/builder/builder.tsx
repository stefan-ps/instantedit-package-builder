import { useLayoutEffect, useRef, useState } from 'react';
import ImageCover from './image-cover';
import { Sidebar } from './sidebar';

export function Builder() {
  const coverRef = useRef<HTMLDivElement>(null);

  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  useLayoutEffect(() => {
    if (coverRef.current?.getBoundingClientRect()) {
      setScrollViewHeight(coverRef.current?.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div className='h-screen flex flex-col lg:flex-row-reverse relative'>
      <div
        ref={coverRef}
        className='z-10 lg:basis-4/6 h-64 lg:h-screen w-full lg:w-4/6 fixed top-0 left-0'
      >
        <ImageCover />
      </div>
      <div className={'relative top-64 lg:top-0 lg:basis-2/6'}>
        <Sidebar />
      </div>
    </div>
  );
}
