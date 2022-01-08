import { combineReducers } from 'redux';
import { addBookingReducer, bookingsReducer } from './bookingReducers';
import { notificationReducer } from './notificationReducers';
import { allRoomsReducer, newRoomReducer, roomDetailsReducer, myRoomlistReducer, deleteRoomReducer, roomUpdateReducer } from './roomReducers'
import { authReducer, loadedUserReducer } from './userReducers';
import { allWatchListReducer, watchListReducer } from './watchListReducers';

const reducers = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    myRoomlist: myRoomlistReducer,
    newRoom: newRoomReducer,
    roomUpdate: roomUpdateReducer,
    deleteRoom: deleteRoomReducer,
    watchList: watchListReducer,
    allWatchList: allWatchListReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    addBooking: addBookingReducer,
    bookings: bookingsReducer,
    notification: notificationReducer,
})

export default reducers