package com.example.Little_Light.DTOs;

public enum APPOINTMENT_STATUS {
    APPROVED, DECLINED, PENDING;

    public static APPOINTMENT_STATUS getInstance(String status){
        switch (status){
            case "APPROVED": return APPOINTMENT_STATUS.APPROVED;
            case "DECLINED": return APPOINTMENT_STATUS.DECLINED;
            case "PENDING": return APPOINTMENT_STATUS.PENDING;
        }
        return APPOINTMENT_STATUS.PENDING;
    }
}
