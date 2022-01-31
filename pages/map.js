import MapView from '../components/map/map'
import Head from 'next/head'

const Map = ({ rooms }) => {

    return (
        <div>
            <Head>
                <title>RentmeRoom | Explore Map</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <MapView rooms={rooms} />
        </div>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
//   await store.dispatch(getRooms(req))
// })

export async function getStaticProps() {
    const res = await fetch('https://www.rentmeroom.com/api/rooms/featured')
    const { rooms } = await res.json()


    return {
        props: {
            rooms,
        },
        revalidate: 3, // In seconds
    }
}

export default Map