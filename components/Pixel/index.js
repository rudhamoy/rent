import React from 'react';
import Head from 'next/head'
import FACEBOOK_PIXEL_1 from '../facebook/Pixel'

const index = ({ name }) => {
    return (
        <Head>
            {name === 'FACEBOOK_PIXEL_1' && <FACEBOOK_PIXEL_1 />}
        </Head>
    )
}

export default index