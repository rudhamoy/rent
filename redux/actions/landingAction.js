import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import { ALL_LANDING_FAIL, ALL_LANDING_SUCCESS, NEW_LANDING_REQUEST, NEW_LANDING_SUCCESS, NEW_LANDING_FAIL, CLEAR_ERRORS } from "../constants/landingConstant"

//get all landing list
export const getLandingList = (req) => async (dispatch) => {
    try {
        // dispatch({
        //     type: ALL_LANDING_REQUEST,
        // })
        const { origin } = absoluteUrl(req)
        let link = `${origin}/api/landing`

        const { data } = await axios.get(link)

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

export const createLanding = (data) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_LANDING_REQUEST,
        });

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { origin } = absoluteUrl(req)
        let link = `${origin}/api/landing`

        // const landingData = {
        //     queryName: data
        // }

        const { data } = await axios.post(link, data, config)

        dispatch({
            type: NEW_LANDING_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_LANDING_FAIL,
            payload: error.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}