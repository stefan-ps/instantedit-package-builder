import type { Addon, Bundle, Event } from './api';

export type Booking = {
  contact: BookingContact;
  venues: Venue[];
  events: Event[];
  bundles: Bundle[];
  addons: Addon[];
};

export type Venue = {
  location: string;
  date: number;
};

export type BookingContact = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
