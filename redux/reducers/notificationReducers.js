import { MY_NOTIFICATION_FAIL, MY_NOTIFICATION_SUCCESS } from "../constants/notificationConstants"


export const notificationReducer = (state = { notifications: [] }, action) => {
    switch (action.type) {
        case MY_NOTIFICATION_SUCCESS:
            return {
                loading: false,
                notifications: action.payload
            }
        case MY_NOTIFICATION_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}