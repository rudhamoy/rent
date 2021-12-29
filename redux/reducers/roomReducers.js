import {
    ALL_ROOMS_SUCCESS,
    ALL_ROOMS_FAIL,
    CLEAR_ERRORS,
    ROOM_DETAILS_SUCCESS,
    ROOM_DETAILS_FAIL,
    NEW_ROOM_REQUEST,
    NEW_ROOM_SUCCESS,
    NEW_ROOM_RESET,
    NEW_ROOM_FAIL,
    OWNER_ROOMLIST_REQUEST,
    OWNER_ROOMLIST_SUCCESS,
    OWNER_ROOMLIST_FAIL,

} from '../constants/roomConstants'

//All rooms reducers
export const allRoomsReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ALL_ROOMS_SUCCESS:
            return {
                rooms: action.payload.rooms
            }
        case ALL_ROOMS_FAIL:
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

//room details reducers
export const roomDetailsReducer = (state = { room: {} }, action) => {
    switch (action.type) {
        case ROOM_DETAILS_SUCCESS:
            return {
                room: action.payload
            }
        case ROOM_DETAILS_FAIL:
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

export const newRoomReducer = (state = { room: {} }, action) => {
    switch (action.type) {
        case NEW_ROOM_REQUEST:
            return {
                loading: true
            }

        case NEW_ROOM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                room: action.payload.room
            }

        case NEW_ROOM_RESET:
            return {
                success: false
            }

        case NEW_ROOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

//Get single owner room list
export const myRoomlistReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        // case OWNER_ROOMLIST_REQUEST:
        //     return {
        //         loading: true
        //     }
        case OWNER_ROOMLIST_SUCCESS:
            return {
                loading: false,
                rooms: action.payload.rooms
            }
        case OWNER_ROOMLIST_FAIL:
            return {
                error: action.payload
            }
        default:
            return state
    }
}