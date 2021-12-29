import React from 'react'
import { getSession } from 'next-auth/client';
import NewRoom from '../../../components/admin/new-room'

const NewRoomPage = () => {
    return (
        <div>
            <NewRoom />
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (!session || session.user.role !== 'admin') {
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

export default NewRoomPage
