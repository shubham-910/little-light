package com.example.Little_Light.services.user;

import com.example.Little_Light.DTOs.UserDTO;
import com.example.Little_Light.payloads.LoginCredentials;
import com.example.Little_Light.responses.AuthenticationResponse;

import java.util.List;

public interface UserService {
    AuthenticationResponse registerUser(UserDTO userDTO);
    AuthenticationResponse loginUser(LoginCredentials loginCredentials);
    UserDTO getUser(String email);
    UserDTO updateUser(UserDTO userDTO);
    List<UserDTO> getAllUsers();
    String forgotPassword(String email);
}
