import { useDebouncedCallback } from 'use-debounce';

import type { AutocompletionRequest } from '../types';

export type Options<Option> = readonly Option[];
type CBType = (options: Options<any>) => void;

type UseFetchSuggestionsArg = {
  autocompletionRequest: AutocompletionRequest;
  debounce: number;
  minLengthAutocomplete: number;
  sessionToken?: google.maps.places.AutocompleteSessionToken;
};

const useFetchSuggestions = (
  arg: UseFetchSuggestionsArg
): ((value: string, cb: CBType) => void) => {
  const {
    autocompletionRequest,
    debounce,
    minLengthAutocomplete,
    sessionToken,
  } = arg;

  const fetchSuggestions = useDebouncedCallback(
    async (value: string, cb: CBType) => {
      if (value.length < minLengthAutocomplete) return cb([]);

      const { suggestions } =
        await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          { ...autocompletionRequest, input: value, sessionToken: sessionToken }
        );

      cb(
        (suggestions || []).map((suggestion) => ({
          label: suggestion.placePrediction?.text.text,
          value: suggestion.placePrediction?.text.text,
        }))
      );
    },
    debounce
  );

  return fetchSuggestions;
};

export default useFetchSuggestions;
