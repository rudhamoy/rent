import { ALL_LANDING_FAIL, ALL_LANDING_SUCCESS, ALL_LANDING_REQUEST, CLEAR_ERRORS } from "../constants/landingConstant"


//All landing reducers
export const allLandingReducer = (state = { landings: [] }, action) => {
    switch (action.type) {
        // case ALL_LANDING_REQUEST:
        //     return { loading: true, landings: [] };
        case ALL_LANDING_SUCCESS:
            return {
                landings: action.payload
            }
        case ALL_LANDING_FAIL:
            return {
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}