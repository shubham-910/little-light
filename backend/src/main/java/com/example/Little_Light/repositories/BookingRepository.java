package com.example.Little_Light.repositories;

import com.example.Little_Light.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Integer>{
}
