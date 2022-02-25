import { combineReducers } from 'redux';
import { addBookingReducer, bookingsReducer } from './bookingReducers';
import { allLandingReducer, createLandingReducer } from './landingReducer';
import { notificationReducer } from './notificationReducers';
import { allRoomsReducer, newRoomsListReducer, newRoomReducer, roomDetailsReducer, myRoomlistReducer, deleteRoomReducer, roomUpdateReducer } from './roomReducers'
import { authReducer, loadedUserReducer, updateUserReducer, forgotPasswordReducer } from './userReducers';
import { allWatchListReducer, watchListReducer } from './watchListReducers';


const reducers = combineReducers({
    allRooms: allRoomsReducer,
    newRoomsList: newRoomsListReducer,
    roomDetails: roomDetailsReducer,
    myRoomlist: myRoomlistReducer,
    newRoom: newRoomReducer,
    roomUpdate: roomUpdateReducer,
    deleteRoom: deleteRoomReducer,
    watchList: watchListReducer,
    allWatchList: allWatchListReducer,
    auth: authReducer,
    loadedUser: loadedUserReducer,
    updateUser: updateUserReducer,
    forgotPassword: forgotPasswordReducer,
    addBooking: addBookingReducer,
    bookings: bookingsReducer,
    notification: notificationReducer,
    allLanding: allLandingReducer,
    createLanding: createLandingReducer,
})

export default reducers