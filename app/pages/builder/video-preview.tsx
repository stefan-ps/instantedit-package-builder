import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import ReactPlayer from 'react-player/vimeo';
import { setReady } from '~/store/app.slice';

const VideoPreview = ({
  onVideoContainerHeight,
  onReadyHandler,
}: {
  onVideoContainerHeight: (height: number) => void;
  onReadyHandler: () => void;
}) => {
  const preview = useAppSelector((state) => state.app.activePreview);
  const dispatch = useAppDispatch();

  const [previews, setPreviews] = useState<string[]>([]);

  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        onVideoContainerHeight(
          videoContainerRef.current?.getBoundingClientRect().height ?? 0
        );
      }
    });

    if (videoContainerRef.current && previews.length === 1) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  }, [previews]);

  useEffect(() => {
    if (preview) {
      setPreviews((prev) => {
        if (prev.includes(preview)) {
          return prev;
        }
        return [...prev, preview];
      });
    }
  }, [preview]);

  const previewVideos = useMemo(
    () =>
      previews.map((p, index) => (
        <video
          key={index}
          autoPlay
          loop
          muted
          playsInline
          src={p}
          width={'100%'}
          height={index === 0 ? '100%' : 0}
          onPlay={() => {
            dispatch(setReady(true));
            onReadyHandler();

            if (index === previews.length - 1) {
              setPreviews((prev) => prev.slice(-1));
            }
          }}
        />
      )),
    [previews, dispatch, setReady, setPreviews, onReadyHandler]
  );

  return (
    <div
      className={
        'flex-1 w-full aspect-video lg:h-[100vh] lg:overflow-hidden flex items-center justify-center'
      }
    >
      <div
        ref={videoContainerRef}
        className='w-full lg:w-auto lg:h-screen aspect-video bg-black'
      >
        {previewVideos}
        {/* <video
          autoPlay
          loop
          src={'/cover_video.mp4'}
          width={'100%'}
          onPlay={() => {
            dispatch(setReady(true));
            onReadyHandler();
          }}
        /> */}
      </div>
    </div>
  );
};

export default VideoPreview;
