import React from 'react'
import { getSession } from 'next-auth/client'
import UpdateRoom from '../../../components/owner/update-room'


const UpdateRoomPage = () => {
    return (
        <div>
            <UpdateRoom />
        </div>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if (!session || session.user.role === "user") {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}

export default UpdateRoomPage