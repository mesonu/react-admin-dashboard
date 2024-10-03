import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../features/booking/bookingSlice';

const BookingManagement = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const bookingStatus = useSelector((state) => state.bookings.status);

  useEffect(() => {
    if (bookingStatus === 'idle') {
      dispatch(fetchBookings());
    }
  }, [bookingStatus, dispatch]);

  return (
    <div>
      <h1>Booking Management</h1>
      {bookingStatus === 'loading' && <p>Loading...</p>}
      {bookingStatus === 'succeeded' && (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>{booking.details}</li>
          ))}
        </ul>
      )}
      {bookingStatus === 'failed' && <p>Error loading bookings.</p>}
    </div>
  );
};

export default BookingManagement;