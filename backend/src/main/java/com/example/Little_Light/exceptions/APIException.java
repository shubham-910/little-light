package com.example.Little_Light.exceptions;

public class APIException extends RuntimeException{

    public APIException(){
    }

    public APIException(String message){
        super(message);
    }
}