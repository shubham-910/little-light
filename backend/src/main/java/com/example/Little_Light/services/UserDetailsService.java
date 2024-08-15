package com.example.Little_Light.services;

import com.example.Little_Light.DTOs.UserDTO;
import com.example.Little_Light.DTOs.UserDetailsDTO;
import com.example.Little_Light.entities.Role;
import com.example.Little_Light.entities.UserDetails;
import com.example.Little_Light.exceptions.ResourceNotFoundException;
import com.example.Little_Light.repositories.UserDetailsRepository;
import com.example.Little_Light.security.JWTConfig;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService {
    @Autowired
    JWTConfig jwtConfig;

    private final UserDetailsRepository userDetailsRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UserDetailsService(UserDetailsRepository userDetailsRepository, ModelMapper modelMapper) {
        this.userDetailsRepository = userDetailsRepository;
        this.modelMapper = modelMapper;
    }

    public UserDetailsDTO saveUserDetails(UserDetailsDTO userDetailsDTO) {
        UserDetails userDetails = modelMapper.map(userDetailsDTO, UserDetails.class);
        UserDetails savedUserDetails = userDetailsRepository.save(userDetails);
        return modelMapper.map(savedUserDetails, UserDetailsDTO.class);
    }

    public UserDetailsDTO getUserDetails(Long id) {
        UserDetails userDetails = userDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User details not found with id: " + id));
        return modelMapper.map(userDetails, UserDetailsDTO.class);
    }

    public UserDTO getUserDetailsFromToken(String accessToken) {
        UserDTO userDTO = new UserDTO();
        userDTO.setRole(Role.valueOf(jwtConfig.extractRole(accessToken)));
        userDTO.setEmail(jwtConfig.extractEmail(accessToken));
        userDTO.setFirstName(jwtConfig.extractFirstName(accessToken));
        userDTO.setLastName(jwtConfig.extractLastName(accessToken));
        userDTO.setUserId(jwtConfig.extractID(accessToken));
        return  userDTO;
    }
}
