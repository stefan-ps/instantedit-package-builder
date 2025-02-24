import type { Booking } from '~/types/booking';

const API_HOST = 'http://localhost:3000/api';

export const getApp = async () => {
  const product = await fetch(`${API_HOST}/section`);
  return await product.json();
};

export const makeBooking = async (booking: Booking) => {
  await fetch(`${API_HOST}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });
};
