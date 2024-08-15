package com.example.Little_Light.services.user;

import com.example.Little_Light.DTOs.UserDTO;
import com.example.Little_Light.entities.User;
import com.example.Little_Light.exceptions.APIException;
import com.example.Little_Light.exceptions.ResourceNotFoundException;
import com.example.Little_Light.payloads.LoginCredentials;
import com.example.Little_Light.repositories.UserRepository;
import com.example.Little_Light.responses.AuthenticationResponse;
import com.example.Little_Light.security.JWTConfig;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final ModelMapper modelMapper;
    private final UserRepository userRepo;
    private final JWTConfig jwtConfig;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse registerUser(UserDTO userDTO) {
        try {
            logger.info("Registering user: {}", userDTO.getEmail());

            User user = modelMapper.map(userDTO, User.class);
            logger.debug("Mapped User entity: {}", user);

            User registeredUser = userRepo.save(user);
            logger.info("User registered successfully: {}", registeredUser.getEmail());

            String accessToken = jwtConfig.generateToken(registeredUser);
            String refreshToken = jwtConfig.generateRefreshToken(registeredUser);

            return AuthenticationResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();

        } catch (DataIntegrityViolationException e) {
            logger.error("User already exists with emailId: {}", userDTO.getEmail(), e);
            throw new APIException("User already exists with emailId");
        } catch (ConstraintViolationException e) {
            logger.error("Constraint violation: {}", e.getConstraintViolations(), e);
            throw new APIException(e.getConstraintViolations().toString());
        } catch (Exception e) {
            logger.error("Unexpected error occurred: {}", e.getMessage(), e);
            throw new RuntimeException("Internal Server Error", e);
        }
    }

    @Override
    public AuthenticationResponse loginUser(LoginCredentials credentials) {
        UsernamePasswordAuthenticationToken authCredentials = new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword());
        authenticationManager.authenticate(authCredentials);

        User user = userRepo.findByEmail(credentials.getEmail());

        if (user == null) {
            throw new ResourceNotFoundException("User not found with email: " + credentials.getEmail());
        }

        String accessToken = jwtConfig.generateToken(user);
        String refreshToken = jwtConfig.generateRefreshToken(user);

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .role(user.getRole().name()) // Set the role in the response
                .build();
    }

    @Override
    public UserDTO getUser(String email) {
        logger.info("Fetching user: {}", email);

        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User not found with email: " + email);
        }

        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        userDTO.setPassword(null);
        return userDTO;
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO) {
        User existingUser = userRepo.findByEmail(userDTO.getEmail());
        if (existingUser == null) {
            throw new ResourceNotFoundException("User not found with email: " + userDTO.getEmail());
        }

        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        existingUser.setPhoneNumber(userDTO.getPhoneNumber());
        // Update other fields as necessary

        User updatedUser = userRepo.save(existingUser);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public String forgotPassword(String email) {
        logger.info("Handling forgot password for: {}", email);

        User user = userRepo.findByEmail(email);

        if (user == null) {
            logger.error("User not found with email: {}", email);
            throw new RuntimeException("User not found with email : " + email);
        }

        byte[] bytes = new byte[32]; // adjust length as needed
        new SecureRandom().nextBytes(bytes);
        String token = Base64.getEncoder().encodeToString(bytes);
        System.out.println(token);
        return null;
    }
}
