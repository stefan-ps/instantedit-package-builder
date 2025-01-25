import React from 'react';
import { useBuilderContext } from '~/providers/builder-provider';

const ImageCover = () => {
  const { sections, activeSection } = useBuilderContext();

  return (
    <img
      src={sections.find((section) => section.id === activeSection)?.coverUrl}
      className='h-full w-full object-cover'
    />
  );
};

export default ImageCover;
