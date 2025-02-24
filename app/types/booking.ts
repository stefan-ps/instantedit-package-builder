import type { Addon, Bundle, Event } from './api';

export type Booking = {
  contact: BookingContact;
  venues: Venue[];
  bundles: Bundle[];
  addons: Addon[];
};

export type Venue = {
  eventId: number;
  location: string;
  slot: Date;
};

export type BookingContact = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};
