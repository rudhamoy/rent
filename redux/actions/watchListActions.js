// import axios from 'axios';
// import absoluteUrl from 'next-absolute-url';
import { WATCHLIST_ADD_ROOM, WATCHLIST_REMOVE_ROOM, WATCHLIST_CLEAR_ROOM, ALL_WATCHLIST_SUCCESS, ALL_WATCHLIST_FAIL } from '../constants/watchListConstants'

//add to watch list
export const addToWatchlist = (room) => async (dispatch) => {
    dispatch({
        type: WATCHLIST_ADD_ROOM,
        payload: room
    })

}

//get all watchList
export const getWatchList = () => (dispatch) => {
    try {
        let data = []
        if (typeof window !== "undefined") {
            if (localStorage.getItem("watchList")) {
                data = JSON.parse(localStorage.getItem("watchList"))
            } else {
                data = []
            }
        }

        dispatch({
            type: ALL_WATCHLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_WATCHLIST_FAIL,
            payload: error.response.data.message
        })
    }
}
