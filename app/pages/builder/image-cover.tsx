import React from 'react';
import { useBuilderContext } from '~/providers/builder-provider';
import { useAppSelector } from '~/store/hooks';

const ImageCover = () => {
  const sections = useAppSelector((state) => state.app.configuration.sections);
  const { activeSection } = useBuilderContext();

  return (
    <img
      src={sections.find((section) => section.id === activeSection)?.coverUrl}
      className='h-full w-full object-cover'
    />
  );
};

export default ImageCover;
