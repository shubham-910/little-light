package com.example.Little_Light.repositories;

import com.example.Little_Light.entities.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JournalRepository extends JpaRepository<Journal, Long> {
    List<Journal> findByUserUserId(Long userId);
}
