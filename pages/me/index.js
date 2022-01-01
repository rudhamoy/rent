import React from 'react'
import { getSession } from 'next-auth/client'

import Account from '../../components/user/Account'
import { wrapper } from '../../redux/store'
import { myBookings } from '../../redux/actions/bookingActions'
// import { getOwnerRooms } from '../../redux/actions/roomActions'


const MyProfilePage = () => {
    return (
        <div>
            <Account />
        </div>
    )
}

// export async function getServerSideProps(context) {

//     const session = await getSession({ req: context.req });

//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/login",
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: { session }
//     }
// }


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
    // await store.dispatch(getOwnerRooms(req))

    return {
        props: { session }
    }
})

export default MyProfilePage
