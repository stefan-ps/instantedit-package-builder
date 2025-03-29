import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import type GooglePlacesAutocompleteProps from './types';
import type { GooglePlacesAutocompleteHandle } from './types';
import usePlacesService from './hooks/use-places-service';
import useFetchSuggestions, {
  type Options,
} from './hooks/use-fetch-suggestions';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';
import { cn } from '~/lib/utils';

const GooglePlacesAutocomplete: React.ForwardRefRenderFunction<
  GooglePlacesAutocompleteHandle,
  GooglePlacesAutocompleteProps
> = (args: GooglePlacesAutocompleteProps, ref): React.ReactElement => {
  const { sessionToken, setSessionToken } = usePlacesService({
    apiKey: args.apiKey ?? '',
    apiOptions: args.apiOptions ?? {},
    onLoadFailed: args.onLoadFailed ?? console.error,
  });
  const fetchSuggestions = useFetchSuggestions({
    autocompletionRequest: args.autocompletionRequest ?? {},
    debounce: args.debounce ?? 300,
    minLengthAutocomplete: args.minLengthAutocomplete ?? 0,
    sessionToken,
  });

  useImperativeHandle(
    ref,
    () => ({
      getSessionToken: () => {
        return sessionToken;
      },
      refreshSessionToken: () => {
        setSessionToken(new google.maps.places.AutocompleteSessionToken());
      },
    }),
    [sessionToken]
  );
  const [predictions, setPredictions] = useState<Options<any>>([]);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const getPredictionsHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoading(true);
      fetchSuggestions(e.target.value, (options) => {
        if (options.length > 0) {
          setPredictions(options);
        }
        console.log(e.target.value);
        setLoading(false);
      });
    },
    [setLoading, setPredictions, fetchSuggestions]
  );
  useEffect(() => {
    if (triggerRef.current) {
      setWidth(triggerRef.current.offsetWidth);
    }
  }, [setWidth]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-full justify-between text-muted-foreground border-input text-base md:text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            {
              'text-foreground': !!args.value && args.value !== '',
            }
          )}
          title={args.value}
        >
          <p className='whitespace-nowrap overflow-hidden text-ellipsis'>
            {args.value && args.value !== ''
              ? args.value
              : 'Search for a location...'}
          </p>
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='p-0'
        style={{ width: width ? `${width}px` : 'auto' }}
      >
        <Command>
          <CommandInput
            ref={inputRef}
            placeholder='Search address...'
            className='h-9'
            onChangeCapture={getPredictionsHandler}
          />
          <CommandList>
            <CommandEmpty className='py-2 px-3 text-sm text-muted-foreground'>No known address found.</CommandEmpty>
            {loading && (
              <div className='py-2 px-3 text-sm text-muted-foreground'>
                <Loader className='h-4 w-4 animate-spin' />
              </div>
            )}
            <CommandGroup>
              {predictions.map((prediction) => (
                <CommandItem
                  key={prediction.value}
                  value={prediction.value}
                  onSelect={(currentValue) => {
                    args.onSelect(
                      currentValue === args.value ? '' : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  {prediction.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      args.value === prediction.label
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default forwardRef(GooglePlacesAutocomplete);
