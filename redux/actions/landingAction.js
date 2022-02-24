import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import { ALL_LANDING_FAIL, ALL_LANDING_SUCCESS, ALL_LANDING_REQUEST, CLEAR_ERRORS } from "../constants/landingConstant"

//get all landing list
export const getLandingList = () => async (dispatch) => {
    try {
        // dispatch({
        //     type: ALL_LANDING_REQUEST,
        // })
        // const { origin } = absoluteUrl(req)
        // let link = `${origin}/api/landing`

        const { data } = await axios.get('https://rentmeroom.com/api/landing')

        dispatch({
            type: ALL_LANDING_SUCCESS,
            payload: data.landingQuery
        })
    } catch (error) {
        dispatch({
            type: ALL_LANDING_FAIL,
            payload: error.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}