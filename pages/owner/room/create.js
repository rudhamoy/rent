import React from 'react'
import CreateRoom from '../../../components/owner/create-room'
import { getSession } from 'next-auth/client'

const CreateRoomPage = () => {
    return (
        <div className="py-28 px-[3%] sm:px-32">
            <CreateRoom />
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


export default CreateRoomPage
