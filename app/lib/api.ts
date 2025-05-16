import type { Booking } from '~/types/booking';

const API_HOST = `${import.meta.env.VITE_API}/api`;

export const getApp = async () => {
  const product = await fetch(`${API_HOST}/section`);
  return await product.json();
};

export const makeBooking = async (booking: Booking) => {
  return await fetch(`${API_HOST}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });
};

export const patchBooking = async (booking: Partial<Booking>) => {
  return await fetch(`${API_HOST}/booking`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });
};

export const putBooking = async (booking: Partial<Booking>) => {
  return await fetch(`${API_HOST}/booking`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });
};

