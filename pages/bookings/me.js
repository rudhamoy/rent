import React from 'react'
import { getSession } from 'next-auth/client';

import MyBookings from '../../components/booking/my-bookings';
import { wrapper } from '../../redux/store'
import { myBookings } from '../../redux/actions/bookingActions'

const MyBookingPage = () => {
    return (
        <div>
            <MyBookings />
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    await store.dispatch(myBookings(req.headers.cookie, req))
})

export default MyBookingPage
