import {
    WATCHLIST_ADD_ROOM,
    WATCHLIST_REMOVE_ROOM,
    WATCHLIST_CLEAR_ROOM,
    ALL_WATCHLIST_SUCCESS,
    ALL_WATCHLIST_FAIL
} from '../constants/watchListConstants'

let initialState = []

if (typeof window !== "undefined") {
    if (localStorage.getItem("watchList")) {
        initialState = JSON.parse(localStorage.getItem("watchList"))
    } else {
        initialState = []
    }
}




export const watchListReducer = (state = initialState, action) => {
    switch (action.type) {
        case WATCHLIST_ADD_ROOM:
            return action.payload

        default:
            return state
    }
};

// All watchlist reducers
export const allWatchListReducer = (state = { watchListRooms: [] }, action) => {
    switch (action.type) {
        case ALL_WATCHLIST_SUCCESS:
            return {
                rooms: action.payload
            }
        case ALL_WATCHLIST_FAIL:
            return {
                error: action.payload
            }
        default:
            return state
    }
}