import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import {
    MY_BOOKINGS_SUCCESS,
    MY_BOOKINGS_FAIL,

} from '../constants/bookingConstants';


export const myBookings = (authCookie, req) => async (dispatch) => {
    try {

        const { origin } = absoluteUrl(req);

        const config = {
            headers: {
                cookie: authCookie
            }
        }

        const { data } = await axios.get(`${origin}/api/bookings/me`, config);

        dispatch({
            type: MY_BOOKINGS_SUCCESS,
            payload: data.bookings
        })

    } catch (error) {
        dispatch({
            type: MY_BOOKINGS_FAIL,
            payload: error.response.data.message
        })
    }
}