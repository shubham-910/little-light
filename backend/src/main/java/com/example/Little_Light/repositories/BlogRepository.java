package com.example.Little_Light.repositories;

import com.example.Little_Light.entities.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByTherapistEmail(String email);
}
