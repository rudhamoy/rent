import axios from 'axios'
import absoluteUrl from 'next-absolute-url'
import { MY_NOTIFICATION_FAIL, MY_NOTIFICATION_SUCCESS } from '../constants/notificationConstants';

// export const myNotifications = (req) => async (dispatch) => {
//     try {

//         // const config = {
//         //     headers: {
//         //         cookie: authCookie
//         //     }
//         // }

//         const { data } = await axios.get(`https://rentmeroom.vercel.app/api/notifications/me`);

//         dispatch({
//             type: MY_NOTIFICATION_SUCCESS,
//             payload: data.notifications
//         })

//     } catch (error) {
//         dispatch({
//             type: MY_NOTIFICATION_FAIL,
//             payload: error.message
//         })
//     }
// }

export const myNotifications = (req) => async (dispatch) => {
    try {

        const { origin } = absoluteUrl(req);

        // const config = {
        //     headers: {
        //         cookie: authCookie
        //     }
        // }

        const { data } = await axios.get(`${origin}/api/notifications/me`);

        dispatch({
            type: MY_NOTIFICATION_SUCCESS,
            payload: data.notifications
        })

    } catch (error) {
        dispatch({
            type: MY_NOTIFICATION_FAIL,
            payload: error.response.data.message
        })
    }
}