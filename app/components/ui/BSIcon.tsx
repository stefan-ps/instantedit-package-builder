import React, { lazy, Suspense } from 'react';

type FaIconName = keyof typeof import('react-icons/fa');

type Props = {
  iconName: string;
  size?: number;
  color?: string;
};

const BSIcon = ({ iconName, size = 24, color = 'black' }: Props) => {
  const IconComponent = lazy(() =>
    import(`react-icons/fa`).then((module) => ({
      default: module[iconName] as React.ComponentType<{
        size?: number;
        color?: string;
        style?: React.CSSProperties;
      }>,
    }))
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IconComponent size={size} color={color} />
    </Suspense>
  );
};
