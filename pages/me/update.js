import React from 'react'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import Update from '../../components/user/update';

const UpdateProfilePage = () => {
    return (
        <div>
            <Head>
                <title>RentmeRoom | Update Profile</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Update />
        </div>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}

export default UpdateProfilePage
