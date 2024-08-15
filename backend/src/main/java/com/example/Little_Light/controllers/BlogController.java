package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.BlogDTO;
import com.example.Little_Light.DTOs.TherapistDTO;
import com.example.Little_Light.entities.Blog;
import com.example.Little_Light.entities.Role;
import com.example.Little_Light.exceptions.APIException;
import com.example.Little_Light.exceptions.BlogNotFoundException;
import com.example.Little_Light.exceptions.ResourceNotFoundException;
import com.example.Little_Light.services.blog.BlogService;
import com.example.Little_Light.services.therapist.TherapistService;
import com.example.Little_Light.services.FileUploadService;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private TherapistService therapistService;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private ModelMapper modelMapper;

    private static final Logger logger = LoggerFactory.getLogger(BlogController.class);

    /**
     * Endpoint to create a new blog post. Only therapists can create blog posts.
     * @param title The title of the blog post.
     * @param description The description of the blog post.
     * @param image The image file to be uploaded.
     * @return ResponseEntity containing the created Blog object.
     */
    @PostMapping
    public ResponseEntity<?> addBlog(@RequestParam("title") String title,
                                     @RequestParam("description") String description,
                                     @RequestParam("image") MultipartFile image) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Logging the roles for debugging
            user.getAuthorities().forEach(auth -> logger.info("User Authority: " + auth.getAuthority()));

            if (user.getAuthorities().stream().noneMatch(auth -> auth.getAuthority().equals(Role.THERAPIST.name()))) {
                throw new APIException("Only therapists can create blogs.");
            }

            TherapistDTO therapistDTO = therapistService.getTherapist(user.getUsername());

            // Upload image to Cloudinary
            String imageUrl = fileUploadService.uploadFile(image);

            BlogDTO blogDTO = new BlogDTO();
            blogDTO.setTitle(title);
            blogDTO.setDescription(description);
            blogDTO.setImage(imageUrl);
            blogDTO.setTherapistId(therapistDTO.getTherapistId());
            blogDTO.setTherapistFirstName(therapistDTO.getFirstName());
            blogDTO.setTherapistLastName(therapistDTO.getLastName());

            Blog savedBlog = blogService.addBlog(blogDTO);
            return ResponseEntity.ok(savedBlog);
        } catch (APIException e) {
            logger.error("APIException while adding blog: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Exception while adding blog: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }


    /**
     * Endpoint to retrieve all blog posts.
     * @return ResponseEntity containing a list of all Blog objects.
     */
    @GetMapping
    public ResponseEntity<?> getAllBlogs() {
        try {
            List<Blog> blogs = blogService.getAllBlogs();
            return ResponseEntity.ok(blogs);
        } catch (Exception e) {
            logger.error("Exception while fetching all blogs: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    /**
     * Endpoint to retrieve a blog post by its ID.
     * @param id The ID of the blog post.
     * @return ResponseEntity containing the Blog object.
     * @throws BlogNotFoundException if the blog post is not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Long id) {
        try {
            Optional<Blog> blog = blogService.getBlogById(id);
            if (blog.isPresent()) {
                return ResponseEntity.ok(blog.get());
            } else {
                return ResponseEntity.status(404).body("Blog not found with id: " + id);
            }
        } catch (Exception e) {
            logger.error("Exception while fetching blog by id: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    /**
     * Endpoint to retrieve all blog posts by the currently authenticated therapist.
     * @return ResponseEntity containing a list of Blog objects.
     */
    @GetMapping("/author")
    public ResponseEntity<?> getBlogsByAuthorEmail() {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            List<Blog> blogs = blogService.getBlogsByAuthorEmail(user.getUsername());
            return ResponseEntity.ok(blogs);
        } catch (Exception e) {
            logger.error("Exception while fetching blogs by author email: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    /**
     * Endpoint to update a blog post. Only therapists can update their own blog posts.
     * @param id The ID of the blog post to update.
     * @param title The new title of the blog post.
     * @param description The new description of the blog post.
     * @param image The new image file to be uploaded (optional).
     * @return ResponseEntity containing the updated Blog object.
     * @throws BlogNotFoundException if the blog post is not found.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable Long id,
                                        @RequestParam(value = "title", required = false) String title,
                                        @RequestParam(value = "description", required = false) String description,
                                        @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if (user.getAuthorities().stream().noneMatch(auth -> auth.getAuthority().equals(Role.THERAPIST.name()))) {
                throw new APIException("Only therapists can update blogs.");
            }

            TherapistDTO therapistDTO = therapistService.getTherapist(user.getUsername());

            // Fetch the existing blog from the database
            Blog existingBlog = blogService.getBlogById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));

            // Update only the fields that are provided
            if (title != null) {
                existingBlog.setTitle(title);
            }
            if (description != null) {
                existingBlog.setDescription(description);
            }
            if (image != null) {
                String imageUrl = fileUploadService.uploadFile(image);
                existingBlog.setImage(imageUrl);
            }

            BlogDTO blogDTO = modelMapper.map(existingBlog, BlogDTO.class);

            Blog updatedBlog = blogService.updateBlog(id, blogDTO);

            return ResponseEntity.ok(updatedBlog);
        } catch (ResourceNotFoundException e) {
            logger.error("ResourceNotFoundException while updating blog: {}", e.getMessage(), e);
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (APIException e) {
            logger.error("APIException while updating blog: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Exception while updating blog: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }
    /**
     * Endpoint to check if the logged-in therapist is the author of a specific blog post.
     * @param id The ID of the blog post.
     * @return ResponseEntity indicating whether the logged-in therapist is the author.
     */
    @GetMapping("/{id}/isAuthor")
    public ResponseEntity<?> isAuthorOfBlog(@PathVariable Long id) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            Blog blog = blogService.getBlogById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Blog not found with id: " + id));

            TherapistDTO therapistDTO = therapistService.getTherapist(user.getUsername());

            boolean isAuthor = blog.getTherapist().getTherapistId().equals(therapistDTO.getTherapistId());

            return ResponseEntity.ok(isAuthor);
        } catch (ResourceNotFoundException e) {
            logger.error("ResourceNotFoundException while checking blog author: {}", e.getMessage(), e);
            return ResponseEntity.status(404).body("Blog not found with id: " + id);
        } catch (Exception e) {
            logger.error("Exception while checking blog author: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }
    /**
     * Endpoint to delete a blog post. Only therapists can delete their own blog posts.
     * @param id The ID of the blog post to delete.
     * @return ResponseEntity indicating the outcome of the delete operation.
     * @throws BlogNotFoundException if the blog post is not found.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        try {
            // Retrieve the authenticated user
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // Check if the user has the therapist role
            if (user.getAuthorities().stream().noneMatch(auth -> auth.getAuthority().equals(Role.THERAPIST.name()))) {
                logger.error("Unauthorized attempt to delete blog by user: {}", user.getUsername());
                throw new APIException("Only therapists can delete blogs.");
            }

            // Delete the blog
            blogService.deleteBlog(id);

            // Log success
            logger.info("Blog with id {} deleted successfully by therapist: {}", id, user.getUsername());

            // Return success message
            return ResponseEntity.ok("Blog deleted successfully.");
        } catch (ResourceNotFoundException e) {
            // Log resource not found
            logger.error("Blog not found with id: {}", id);
            return ResponseEntity.status(404).body("Blog not found with id: " + id);
        } catch (APIException e) {
            // Log API exception
            logger.error("APIException while deleting blog: {}", e.getMessage(), e);
            return ResponseEntity.status(403).body(e.getMessage());
        } catch (Exception e) {
            // Log general exceptions
            logger.error("Exception while deleting blog: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }
}
