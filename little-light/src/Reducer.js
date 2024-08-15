const INITIAL_STATE = {
    therapists: null,
    bookingSuccess: false,
    bookingError: false,
    bookingDetails: null
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case 'set_therapists': return {
            ...state,
            therapists: action.therapists
        }
        case 'booking_success': return {
            ...state,
            bookingSuccess: action.value
        }
        case 'booking_error': return {
            ...state,
            bookingError: action.value
        }
        case 'set_booking_details': return {
            ...state,
            bookingDetails: action.bookingDetails
        }
        default: return state;
    }
}

export default rootReducer;