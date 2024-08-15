package com.example.Little_Light.repositories;

import com.example.Little_Light.entities.Therapist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TherapistRepository extends JpaRepository<Therapist,Long>{
     Therapist findByEmail(String email);
}
