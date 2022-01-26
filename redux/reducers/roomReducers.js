import {
    ALL_ROOMS_SUCCESS,
    ALL_ROOMS_FAIL,
    ROOM_DETAILS_SUCCESS,
    ROOM_DETAILS_FAIL,
    NEW_ROOM_REQUEST,
    NEW_ROOM_SUCCESS,
    NEW_ROOM_RESET,
    NEW_ROOM_FAIL,
    OWNER_ROOMLIST_REQUEST,
    OWNER_ROOMLIST_SUCCESS,
    OWNER_ROOMLIST_FAIL,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_RESET,
    DELETE_ROOM_FAIL,
    UPDATE_ROOM_FAIL,
    UPDATE_ROOM_RESET,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_REQUEST,
    CLEAR_ERRORS
} from '../constants/roomConstants'

//All rooms reducers
export const allRoomsReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case ALL_ROOMS_SUCCESS:
            return {
                roomsCount: action.payload.roomsCount,
                resPerPage: action.payload.resPerPage,
                filteredRoomsCount: action.payload.filteredRoomsCount,
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
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

//Get single owner room list
export const myRoomlistReducer = (state = { rooms: [] }, action) => {
    switch (action.type) {
        case OWNER_ROOMLIST_REQUEST:
            return {
                loading: true
            }
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

//update room
export const roomUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ROOM_REQUEST:
            return {
                loading: true
            }

        case UPDATE_ROOM_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_ROOM_RESET:
            return {
                isUpdated: false
            }

        case UPDATE_ROOM_FAIL:
            return {
                loading: false,
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

//rooom delete
export const deleteRoomReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ROOM_REQUEST:
            return {
                loading: true
            }

        case DELETE_ROOM_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_ROOM_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_ROOM_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}