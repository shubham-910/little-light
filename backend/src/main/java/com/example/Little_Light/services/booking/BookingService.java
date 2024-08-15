package com.example.Little_Light.services.booking;

import com.example.Little_Light.entities.Booking;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookingService {
    void createBooking(Booking bookingRequest);

    List<Booking> getBookingStatus();

    void updateStatus(Integer id, String status);
}
