import type { Addon, Bundle, Event } from './api';

export type Booking = {
  contact: BookingContact;
  venues: Venue[];
  bundles: Bundle[];
  addons: Addon[];
  events: Event[],
};

export type Venue = {
  eventId: number;
  location: string;
  slot: number;
  slotBeginning: number;
  slotEnding: number;
};

export type BookingContact = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
