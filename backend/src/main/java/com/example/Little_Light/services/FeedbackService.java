package com.example.Little_Light.services;

import com.example.Little_Light.DTOs.FeedbackDTO;
import com.example.Little_Light.entities.Feedback;
import com.example.Little_Light.repositories.FeedbackRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FeedbackService(FeedbackRepository feedbackRepository, ModelMapper modelMapper) {
        this.feedbackRepository = feedbackRepository;
        this.modelMapper = modelMapper;
    }

    public Feedback saveFeedback(FeedbackDTO feedbackDTO) {
        Feedback feedback = modelMapper.map(feedbackDTO, Feedback.class);
        return feedbackRepository.save(feedback);
    }
}
