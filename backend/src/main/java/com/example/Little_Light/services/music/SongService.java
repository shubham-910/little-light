package com.example.Little_Light.services.music;

import com.example.Little_Light.entities.MusicEntities.Category;
import com.example.Little_Light.entities.MusicEntities.Song;
import com.example.Little_Light.entities.User;
import com.example.Little_Light.repositories.CategoryRepository;
import com.example.Little_Light.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SongRepository songRepository;


//    public List<Song> getSongsByCategoryName(String categoryName) {
//        return songRepository.findSongsByCategoryName(categoryName);

       public List<Song> getSongsByCategoryName (String categoryName){
            // Ensure user is authenticated
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (user == null) {
                throw new SecurityException("User is not authenticated");
            }

            // Fetch songs by category
            Optional<Category> categoryOptional = categoryRepository.findIdByCategoryName(categoryName);
            System.out.println(categoryOptional);
            if (categoryOptional.isPresent()) {
                Long categoryId = categoryOptional.get().getId();
                return songRepository.findByCategoryId(categoryId);
            } else {
                throw new IllegalArgumentException("Category not found with name: " + categoryName);
            }

//        }
    }

}
