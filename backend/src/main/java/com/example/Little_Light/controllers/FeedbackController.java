package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.FeedbackDTO;
import com.example.Little_Light.entities.Feedback;
import com.example.Little_Light.services.FeedbackService;
import com.example.Little_Light.exceptions.APIException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/feedback")
public class FeedbackController {

    private static final Logger logger = LoggerFactory.getLogger(FeedbackController.class);

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<?> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        try {
            // Log the feedback details
            logger.info("Received feedback from: {}", feedbackDTO.getEmail());

            // Save the feedback
            Feedback feedback = feedbackService.saveFeedback(feedbackDTO);

            logger.info("Feedback created successfully for user: {}", feedbackDTO.getEmail());
            return new ResponseEntity<>(feedback, HttpStatus.CREATED);
        } catch (APIException e) {
            logger.error("APIException while creating feedback: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            logger.error("Exception while creating feedback: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + e.getMessage());
        }
    }
}

