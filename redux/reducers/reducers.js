import { combineReducers } from 'redux';
import { addBookingReducer, bookingsReducer } from './bookingReducers';
import { allRoomsReducer, newRoomReducer, roomDetailsReducer, myRoomlistReducer } from './roomReducers'
import { authReducer, loadedUserReducer } from './userReducers';
import { allWatchListReducer, watchListReducer } from './watchListReducers';

const reducers = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    watchList: watchListReducer,
    allWatchList: allWatchListReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    addBooking: addBookingReducer,
    bookings: bookingsReducer,
    newRoom: newRoomReducer,
    myRoomlist: myRoomlistReducer,
})

export default reducers