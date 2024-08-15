package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.UserDTO;
import com.example.Little_Light.DTOs.UserDetailsDTO;
import com.example.Little_Light.exceptions.APIException;
import com.example.Little_Light.security.JWTConfig;
import com.example.Little_Light.services.UserDetailsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/userdetails")
public class UserDetailsController {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsController.class);

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JWTConfig jwtConfig;

    @PostMapping
    public ResponseEntity<?> createUserDetails(@RequestBody UserDetailsDTO userDetailsDTO) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            // Here you can use the user's email or id from the security context
            // to associate the details with the authenticated user if needed

            logger.info("Creating user details for: {}", user.getUsername());

            UserDetailsDTO savedUserDetails = userDetailsService.saveUserDetails(userDetailsDTO);
            logger.info("User details created successfully for: {}", user.getUsername());

            return ResponseEntity.status(201).body(savedUserDetails);
        } catch (APIException e) {
            logger.error("APIException while creating user details: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Exception while creating user details: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserDetails(@PathVariable Long id) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            // Here you can use the user's email or id from the security context
            // to ensure that the user is only fetching their own details

            logger.info("Fetching user details for: {}", user.getUsername());

            UserDetailsDTO userDetailsDTO = userDetailsService.getUserDetails(id);
            logger.info("User details fetched successfully for: {}", user.getUsername());

            return ResponseEntity.ok(userDetailsDTO);
        } catch (APIException e) {
            logger.error("APIException while fetching user details: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Exception while fetching user details: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getUserDetails(@RequestParam("accessToken") String accessToken) {
        try {
            if(jwtConfig.isTokenExpired(accessToken)) {
                return ResponseEntity.status(403).body("Token expired.");
            }
            UserDTO user = userDetailsService.getUserDetailsFromToken(accessToken);
            return ResponseEntity.ok(user);
        } catch (APIException e) {
            logger.error("APIException while fetching user details: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Exception while fetching user details: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }
}
