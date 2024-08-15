package com.example.Little_Light.repositories;

import com.example.Little_Light.entities.MusicEntities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

     @Query("SELECT c.id FROM Category c WHERE c.name = :category_name")
     Optional<Category> findIdByCategoryName(@Param("category_name") String categoryName);
}
