package com.example.Little_Light.services.user;

import com.example.Little_Light.entities.Therapist;
import com.example.Little_Light.entities.User;
import com.example.Little_Light.repositories.TherapistRepository;
import com.example.Little_Light.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TherapistRepository therapistRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByEmail(username);
        Therapist therapist = therapistRepo.findByEmail(username);

        if(user == null && therapist == null){
            throw new UsernameNotFoundException("No user found");
        }

        else{
            return org.springframework.security.core.userdetails.User.builder()
                    .username((user != null) ? user.getUsername() : therapist.getUsername())
                    .password((user != null) ? user.getPassword() : therapist.getPassword())
                    .authorities((user != null) ? user.getAuthorities() : therapist.getAuthorities())
                    .build();
        }
    }
}
