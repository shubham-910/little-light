package com.example.Little_Light.controllers;

import com.example.Little_Light.entities.Booking;
import com.example.Little_Light.services.booking.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/booking")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<Object> createBooking(@RequestBody Booking bookingRequest) {
        try{
            bookingService.createBooking(bookingRequest);
            return new ResponseEntity<>("Booking Successful", HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>("Error while booking", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getStatus")
    public ResponseEntity<Object> getBookingStatus() {
        try{
            List<Booking> bookings = bookingService.getBookingStatus();
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>("Error while fetching booking status", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Object> updateStatus(@PathVariable Integer id,@RequestParam String status ) {
        try {
            bookingService.updateStatus(id, status);
            return new ResponseEntity<>("Status Updated Successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error while updating status", HttpStatus.BAD_REQUEST);
        }
    }
}
