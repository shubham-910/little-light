export const getTherapistDetails = () => {
    return { 
        type:"get_therapists"
    }
}

export const createBooking = (params) => {
    return {
        type: 'create_booking',
        params
    }
}

export const setBookingError = (params) => {
    return {
        type: 'set_booking_error',
        params
    }
}

export const setBookingSuccess = (params) => {
    return {
        type: 'set_booking_success',
        params
    }
}

export const getBookingStatus = () => {
    return { 
        type:"get_booking_status"
    }
}

export const setStatus = (params) => {
    return {
        type: "set_status",
        params
    }
}