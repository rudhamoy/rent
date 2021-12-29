import {
    MY_BOOKINGS_SUCCESS,
    MY_BOOKINGS_FAIL,
    ADD_BOOKING_REQUEST,
    ADD_BOOKING_FAIL,
} from '../constants/bookingConstants'

export const addBookingReducer = (state = { booking: {} }, action) => {
    switch (action.type) {
        case ADD_BOOKING_REQUEST:
            return {
                loading: false,
                booking: action.payload
            }
        case ADD_BOOKING_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const bookingsReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case MY_BOOKINGS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }
        case MY_BOOKINGS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}