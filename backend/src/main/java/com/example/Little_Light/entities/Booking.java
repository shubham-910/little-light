package com.example.Little_Light.entities;

import com.example.Little_Light.DTOs.APPOINTMENT_STATUS;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "Booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "booking_id")
    private int booking_Id;

    private String booking_day_time;
    private String therapist_name;
    private String patient_name;
    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_status")
    private APPOINTMENT_STATUS appointment_status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date", updatable = false)
    private Date createdDate;

    public void setAppointmentStatus(String status) {
        this.appointment_status =  APPOINTMENT_STATUS.getInstance(status);
    }
    
}
