import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import {
    ALL_ROOMS_FAIL,
    ALL_ROOMS_SUCCESS,
    ROOM_DETAILS_FAIL,
    ROOM_DETAILS_SUCCESS,
    NEW_ROOM_REQUEST,
    NEW_ROOM_SUCCESS,
    NEW_ROOM_RESET,
    NEW_ROOM_FAIL,
    OWNER_ROOMLIST_REQUEST,
    OWNER_ROOMLIST_SUCCESS,
    OWNER_ROOMLIST_FAIL,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAIL,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAIL,
} from '../constants/roomConstants';

//get all rooms
export const getRooms = (req, currentPage = 1, location = "", roomCategory, tenants, bathroomType, waterSupply, furnish) => async (dispatch) => {
    try {
        const { origin } = absoluteUrl(req)

        let link = `${origin}/api/rooms?page=${currentPage}&location=${location}`

        if (roomCategory) link = link.concat(`&category=${roomCategory}`)
        if (tenants) link = link.concat(`&tenants=${tenants}`)
        if (bathroomType) link = link.concat(`&bathroom=${bathroomType}`)
        if (waterSupply) link = link.concat(`&waterSupply=${waterSupply}`)
        if (furnish) link = link.concat(`&furnish=${furnish}`)

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_ROOMS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ROOMS_FAIL,
            payload: error.message
        })
    }
}

//get room details by id 
export const getRoomDetails = (req, id) => async (dispatch) => {
    try {

        const { origin } = absoluteUrl(req)
        const { data } = await axios.get(`${origin}/api/rooms/${id}`)

        dispatch({
            type: ROOM_DETAILS_SUCCESS,
            payload: data.room
        })
    } catch (error) {
        dispatch({
            type: ROOM_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Create new Room
export const newRoom = (roomData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_ROOM_REQUEST
        });

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/rooms`, roomData, config);

        dispatch({
            type: NEW_ROOM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ROOM_FAIL,
            payload: error.response.data.message
        })
    }
}

//get all owner rooms
export const getOwnerRooms = (req) => async (dispatch) => {
    try {
        // dispatch({
        //     type: OWNER_ROOMLIST_REQUEST
        // })

        const { origin } = absoluteUrl(req)
        let link = `${origin}/api/owner`

        const { data } = await axios.get(link)

        dispatch({
            type: OWNER_ROOMLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: OWNER_ROOMLIST_FAIL,
            payload: error.message
        })
    }
}

export const updateRoom = (id, roomData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ROOM_REQUEST
        })

        const config = {
            header: {
                'Content-Type': 'applicatoin/json'
            }
        }

        const { data } = await axios.put(`/api/rooms/${id}`, roomData, config)

        dispatch({
            type: UPDATE_ROOM_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ROOM_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteRoom = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ROOM_REQUEST })

        const { data } = await axios.delete(`/api/rooms/${id}`)

        dispatch({
            type: DELETE_ROOM_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ROOM_FAIL,
            payload: error.response.data.message
        })
    }
}