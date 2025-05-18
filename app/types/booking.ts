import type { Addon, Bundle, Event } from './api';

export type Booking = {
  id?: number;
  status?: 'contact' | 'venue' | 'requested' | 'confirmed' | 'cancelled';
  contact: BookingContact;
  venues?: Venue[];
  bundles: Bundle[];
  addons: Addon[];
  events: Event[];
};

export type Venue = {
  eventId: number;
  location?: string;
  slot: number;
  slotBeginning: number;
  slotEnding: number;
};

export type BookingContact = {
  id?: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};
