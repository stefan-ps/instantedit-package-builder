import { cva, type VariantProps } from 'class-variance-authority';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { cn } from '~/lib/utils';

const typographyVariants = cva('leading-5', {
  variants: {
    variant: {
      default: '',
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      lead: 'text-xl',
      small: 'text-sm',
    },
    appearance: {
      default: '',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
    appearance: 'default',
  },
});

interface Props
  extends React.LabelHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<
  HTMLParagraphElement,
  PropsWithChildren<Props>
>(({ children, variant, appearance, className, ...props }, ref) => {
  return (
    <p
      className={cn(typographyVariants({ variant, appearance, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </p>
  );
});

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
