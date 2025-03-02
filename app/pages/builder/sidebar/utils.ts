import type { Event, Bundle, Settings, Service } from '~/types/api';

export const calculateEventPrice = (events: Event[], settings: Settings) => {
  return events
    ?.filter((ev) => ev.type === 'pre-ceremony')
    .reduce((prev, _, index) => {
      if (index === 0) {
        return prev + settings.events.firstPrice;
      }

      return prev + settings.events.price;
    }, 0);
};

export const calculateBundlePrice = (
  bundle: Bundle,
  events: Event[],
  settings: Settings
) => {
  return bundle.price + calculateEventPrice(events, settings);
};
