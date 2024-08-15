package com.example.Little_Light.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/")
public class TestController {
    @GetMapping(path = "test/")
    public void testing(){
        System.out.println("Hello TestingSSS");
    }
}
