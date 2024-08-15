package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.CategoryDTO;
import com.example.Little_Light.DTOs.SongDTO;
import com.example.Little_Light.entities.MusicEntities.Category;
import com.example.Little_Light.entities.MusicEntities.Song;
import com.example.Little_Light.repositories.CategoryRepository;
import com.example.Little_Light.services.category.CategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/category")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @Autowired
    CategoryRepository categoryRepository;
    private static final Logger logger = LoggerFactory.getLogger(CategoryController.class);

    @GetMapping
    public ResponseEntity<?> getAllCategories(){
        try {
            logger.info("Fetching all categories");
            List<Category> categories = categoryRepository.findAll();
            if (categories.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            List<CategoryDTO> listOfCategories = new ArrayList<>();
            for(Category category: categories){
                CategoryDTO newCategory = new CategoryDTO(category.getId(), category.getName(), category.getImagePath());
                listOfCategories.add(newCategory);
            }
            return ResponseEntity.ok(listOfCategories);
        } catch (Exception e) {
            logger.error("Error occurred: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
