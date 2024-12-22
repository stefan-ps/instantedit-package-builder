import type { PropsWithChildren } from 'react';
import { Typography } from './ui/typography';
import React, { useEffect, useState } from 'react';
import { cn } from '~/lib/utils';
import { Badge } from './ui/badge';

type ListContextType = {
  selected?: number[];
  variant: 'tile' | 'badge';
  onChange: (id: number) => void;
};

const ListContext = React.createContext<ListContextType | null>(null);

const ListContextProvider = ({
  children,
  variant,
  isMulti = false,
}: PropsWithChildren<{ variant: 'tile' | 'badge'; isMulti?: boolean }>) => {
  const [selected, setSelected] = useState<number[]>([]);

  const onChange = React.useCallback(
    (id: number) => {
      if (selected.includes(id)) {
        setSelected((previous) => previous.filter((item) => item !== id));
      } else {
        if (isMulti) {
          setSelected((previous) => [...previous, id]);
        } else {
          setSelected([id]);
        }
      }
    },
    [selected, setSelected]
  );

  const state = React.useMemo(
    () => ({
      selected,
      variant,
      onChange,
    }),
    [selected, variant, onChange]
  );

  return <ListContext.Provider value={state}>{children}</ListContext.Provider>;
};

const useListContext = () => {
  const listContext = React.useContext(ListContext);

  if (!listContext) {
    throw new Error(
      'useListContext has to be used within <ListContext.Provider>'
    );
  }

  return listContext;
};

export function List({
  children,
  variant = 'tile',
  isMulti = false,
}: PropsWithChildren<{ variant: 'tile' | 'badge'; isMulti?: boolean }>) {
  return (
    <ListContextProvider isMulti={isMulti} variant={variant}>
      <ul
        className={cn('flex flex-col gap-2', {
          'flex flex-row': variant === 'badge',
        })}
      >
        {children}
      </ul>
    </ListContextProvider>
  );
}

type ListItemProps = {
  id: number;
  title: string;
  description?: string;
  hint?: string;
  onChange?: (isSelected: boolean) => void;
};

export function ListItem({
  id,
  title,
  description,
  hint,
  onChange,
}: ListItemProps) {
  const { selected, variant, onChange: onChangeHandler } = useListContext();

  const onClickHandler = React.useCallback(() => {
    if (!selected?.includes(id)) {
      onChange?.(true);
    } else {
      onChange?.(false);
    }

    onChangeHandler(id);
  }, [id, selected, onChange]);

  if (variant === 'badge') {
    return (
      <li>
        <Badge
          variant={selected?.includes(id) ? 'default' : 'outline'}
          onClick={onClickHandler}
          size={'lg'}
        >
          {title}
        </Badge>
      </li>
    );
  }

  return (
    <li
      className={cn(
        'flex flex-col gap-3 border-2 rounded bg-white px-4 py-3 hover:bg-primary/10 hover:border-primary/10',
        { 'border-primary text-primary bg-primary/20': selected?.includes(id) }
      )}
      onClick={onClickHandler}
    >
      <div className='flex flex-row justify-between items-center'>
        <Typography>{title}</Typography>
        {hint && (
          <Typography variant={'small'} appearance={'muted'}>
            {hint}
          </Typography>
        )}
      </div>
      {description && (
        <Typography variant={'small'} appearance={'muted'}>
          {description}
        </Typography>
      )}
    </li>
  );
}
