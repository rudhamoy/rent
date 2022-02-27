import { ALL_LANDING_FAIL, ALL_LANDING_SUCCESS, ALL_LANDING_REQUEST, NEW_LANDING_REQUEST, NEW_LANDING_SUCCESS, NEW_LANDING_RESET, NEW_LANDING_FAIL, CLEAR_ERRORS } from "../constants/landingConstant"


//All landing reducers
export const allLandingReducer = (state = { landings: [] }, action) => {
    switch (action.type) {
        case ALL_LANDING_REQUEST:
            return { loading: true, landings: [] };
        case ALL_LANDING_SUCCESS:
            return {
                loading: false,
                landings: action.payload
            }
        case ALL_LANDING_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export const createLandingReducer = (state = { landing: {} }, action) => {
    switch (action.type) {
        case NEW_LANDING_REQUEST:
            return { loading: true };
        case NEW_LANDING_SUCCESS:
            return { loading: false, landing: action.payload };
        case NEW_LANDING_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};