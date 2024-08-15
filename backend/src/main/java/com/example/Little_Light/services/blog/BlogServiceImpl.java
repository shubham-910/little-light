package com.example.Little_Light.services.blog;

import com.example.Little_Light.DTOs.BlogDTO;
import com.example.Little_Light.entities.Blog;
import com.example.Little_Light.entities.Therapist;
import com.example.Little_Light.exceptions.ResourceNotFoundException;
import com.example.Little_Light.repositories.BlogRepository;
import com.example.Little_Light.repositories.TherapistRepository;
import com.example.Little_Light.services.blog.BlogService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private TherapistRepository therapistRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Blog addBlog(BlogDTO blogDTO) {
        Blog blog = modelMapper.map(blogDTO, Blog.class);
        Therapist therapist = therapistRepository.findById(blogDTO.getTherapistId())
                .orElseThrow(() -> new ResourceNotFoundException("Therapist not found"));
        blog.setTherapist(therapist);
        return blogRepository.save(blog);
    }

    @Override
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    @Override
    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    @Override
    public List<Blog> getBlogsByAuthorEmail(String email) {
        return blogRepository.findByTherapistEmail(email);
    }

    @Override
    public Blog updateBlog(Long id, BlogDTO blogDTO) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));
        blog.setTitle(blogDTO.getTitle());
        blog.setDescription(blogDTO.getDescription());
        blog.setImage(blogDTO.getImage());
        return blogRepository.save(blog);
    }

    @Override
    public void deleteBlog(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found"));
        blogRepository.delete(blog);
    }
}
