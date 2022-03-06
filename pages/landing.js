import React from 'react'
import Head from 'next/head'
import Landing from '../components/landingPage'

const LandingPage = () => {
    return (
        <>
            <Head>
                <title>RentmeRoom | Landing</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="">
                <Landing />
            </div>
        </>
    )
}

export default LandingPage