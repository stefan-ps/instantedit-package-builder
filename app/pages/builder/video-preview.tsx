import { useEffect, useRef } from 'react';
import { useBuilderContext } from '~/providers/builder-provider';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import ReactPlayer from 'react-player/vimeo';
import { setReady } from '~/store/app.slice';

const VideoPreview = ({
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
  }, []);

  return (
    <div className='flex-1 w-full aspect-video lg:h-[100vh] lg:overflow-hidden flex items-center justify-center'>
      <div
        ref={videoContainerRef}
        className='w-full lg:w-auto lg:h-screen aspect-video'
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
              //   responsive: true,
            },
          }}
          style={{
            backgroundColor: 'transparent',
            position: 'relative',
          }}
          onPlay={() => {
            dispatch(setReady(true));
          }}
        />
      </div>
    </div>
  );
};

export default VideoPreview;

{
  /* <div className='flex-1 w-full h-[100vh] overflow-hidden relative flex justify-center items-center'>
  <ReactPlayer
    // url={'https://player.vimeo.com/video/1066701989'}
    url={'https://player.vimeo.com/video/1066699071'}
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
      // position: 'absolute',
      // top: '25%',
      top: 0,
      left: '-50%',
      bottom: 0,
    }}
  />
</div> */
}
