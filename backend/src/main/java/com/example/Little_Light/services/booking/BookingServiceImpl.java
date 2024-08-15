package com.example.Little_Light.services.booking;

import com.example.Little_Light.entities.Booking;
import com.example.Little_Light.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.oauth2.resourceserver.OpaqueTokenDsl;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService{
    @Autowired
    BookingRepository bookingRepository;


    @Override
    public void createBooking(Booking bookingRequest) {
        bookingRepository.save(bookingRequest);
    }

    @Override
    public List<Booking> getBookingStatus()
    {
        return bookingRepository.findAll();
    }

    @Override
    public void updateStatus(Integer id, String status) {
        Optional<Booking> opt = bookingRepository.findById(id);
        if(opt.isPresent()){
            Booking booking = opt.get();
            booking.setAppointmentStatus(status);
            bookingRepository.save(booking);
        }
    }

}
