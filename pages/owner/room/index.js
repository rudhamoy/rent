import React from 'react'
import MyRoom from '../../../components/owner/my-room'
import { getSession } from 'next-auth/client'

const RoomPage = () => {
    return (
        <div className="py-28 px-6 sm:px-32">
            <MyRoom />
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });


    if (!session || session.user.role === "user") {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {}
    }
}


export default RoomPage
