import React from 'react'
import CreateRoom from '../../../components/owner/create-room'
import { getSession } from 'next-auth/client'
import Head from 'next/head'


const CreateRoomPage = () => {
    return (
        <>
            <Head>
                <title>RentmeRoom | Create Room</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="py-28 px-[3%] sm:px-32">
                <CreateRoom />
            </div>
        </>
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
