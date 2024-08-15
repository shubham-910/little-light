package com.example.Little_Light.services.blog;

import com.example.Little_Light.DTOs.BlogDTO;
import com.example.Little_Light.entities.Blog;
import java.util.List;
import java.util.Optional;

public interface BlogService {
    Blog addBlog(BlogDTO blogDTO);
    List<Blog> getAllBlogs();
    Optional<Blog> getBlogById(Long id);
    List<Blog> getBlogsByAuthorEmail(String email);
    Blog updateBlog(Long id, BlogDTO blogDTO);
    void deleteBlog(Long id);
}
