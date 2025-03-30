import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ImageCover from './image-cover';
import { Sidebar } from './sidebar';

export function Builder() {
  const coverRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const isLg = window.matchMedia('(min-width: 1024px)').matches;

  useLayoutEffect(() => {
    if (coverRef.current?.getBoundingClientRect()) {
      setScrollViewHeight(coverRef.current?.getBoundingClientRect().height);
    }
  }, []);
  console.log(containerWidth);
  return (
    <div className='flex flex-col lg:flex-row-reverse overflow-hidden'>
      <div
        ref={coverRef}
        className='z-10 lg:h-screen w-full lg:w-[calc(100vw-460px)] fixed top-0 left-0 flex'
      >
        <ImageCover onVideoContainerHeight={setContainerWidth} />
      </div>
      <div
        style={isLg ? {} : { paddingTop: `${containerWidth}px` }}
        className={'lg:pt-0! lg:w-[450px]'}
      >
        <Sidebar />
      </div>
    </div>
  );
}
