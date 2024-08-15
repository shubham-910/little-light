package com.example.Little_Light.controllers;

import com.example.Little_Light.DTOs.TherapistDTO;
import com.example.Little_Light.DTOs.UserDTO;
import com.example.Little_Light.entities.Role;
import com.example.Little_Light.entities.User;
import com.example.Little_Light.exceptions.APIException;
import com.example.Little_Light.payloads.LoginCredentials;
import com.example.Little_Light.repositories.UserRepository;
import com.example.Little_Light.responses.AuthenticationResponse;
import com.example.Little_Light.services.therapist.TherapistServiceImpl;
import com.example.Little_Light.services.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static com.example.Little_Light.entities.Role.THERAPIST;
import static com.example.Little_Light.entities.Role.USER;

@RestController
@CrossOrigin
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final TherapistServiceImpl therapistService;
    private final UserRepository userRepo;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> registerHandler(HttpServletRequest request, HttpServletResponse response, @Valid @RequestBody UserDTO user){
        logger.info("Attempting to register user: {}", user.getEmail());

        String encodedPass = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPass);

        try {
            AuthenticationResponse authenticationResponse;
            if (user.getRole() == Role.THERAPIST) {
                TherapistDTO therapist = new TherapistDTO();
                therapist.setEmail(user.getEmail());
                therapist.setFirstName(user.getFirstName());
                therapist.setLastName(user.getLastName());
                therapist.setPassword(user.getPassword());
                therapist.setRole(Role.THERAPIST);
                logger.info("Therapist details: {}", therapist);
                authenticationResponse = therapistService.registerTherapist(therapist);
            } else {
                user.setRole(Role.USER);
                authenticationResponse = userService.registerUser(user);
            }

            logger.info("User registered successfully: {}", user.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(authenticationResponse);
        } catch (APIException e){
            logger.error("APIException while registering user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthenticationResponse.builder().message(e.getMessage()).build());
        } catch (Exception e) {
            logger.error("Exception while registering user: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(AuthenticationResponse.builder().message("Internal Server Error").build());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginHandler(HttpServletRequest request, @Valid @RequestBody LoginCredentials credentials) {
        try {
            AuthenticationResponse response;
            User user = userRepo.findByEmail(credentials.getEmail());
            if (user != null) {
                response = userService.loginUser(credentials);
            } else {
                response = therapistService.loginTherapist(credentials);
            }
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (AuthenticationException e) {
            logger.error("AuthenticationException while logging in user: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(AuthenticationResponse.builder().message(e.getMessage()).build());
        }
    }
    @PostMapping("/user/forgot")
    public ResponseEntity<String> userForgotPasswordHandler(String email) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(userService.forgotPassword(email));
        } catch (AuthenticationException e) {
            logger.error("AuthenticationException while handling forgot password: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AuthenticationResponse.builder().message(e.getMessage()).build()");
        }
    }


    @PostMapping("/logout")
    public ResponseEntity<AuthenticationResponse> logoutHandler(HttpServletRequest request) {
        return null;
    }
}
