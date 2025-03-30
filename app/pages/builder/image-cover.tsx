import React, { useEffect, useRef } from 'react';
import { useBuilderContext } from '~/providers/builder-provider';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import ReactPlayer from 'react-player/vimeo';
import { setReady } from '~/store/app.slice';

const ImageCover = ({
  onVideoContainerHeight,
}: {
  onVideoContainerHeight: (height: number) => void;
}) => {
  const sections = useAppSelector((state) => state.app.configuration.sections);
  const dispatch = useAppDispatch();
  const { activeSection } = useBuilderContext();
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        onVideoContainerHeight(
          videoContainerRef.current?.getBoundingClientRect().height ?? 0
        );
      }
    });

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  });

  return (
    <div className='w-full flex justify-center items-center'>
      <div
        ref={videoContainerRef}
        className='w-full aspect-video'
      >
        <ReactPlayer
          url={'https://player.vimeo.com/video/1066701989'}
          playing
          loop
          stopOnUnmount
          width={'100%'}
          height={'100%'}
          config={{
            playerOptions: {
              colors: ['000000', '00ADEF', 'FFFFFF', '000000'],
              responsive: true,
            },
          }}
          style={{
            backgroundColor: 'transparent',
          }}
          onPlay={() => {
            dispatch(setReady(true));
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(ImageCover);