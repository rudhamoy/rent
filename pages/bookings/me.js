import React from 'react'
import Head from 'next/head'

import MyBookings from '../../components/booking/my-bookings';
import { getSession } from 'next-auth/client';
import { wrapper } from '../../redux/store'
import { myBookings } from '../../redux/actions/bookingActions'

const MyBookingPage = () => {
    return (
        <div>
            <Head>
                <title>My Booking</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
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
