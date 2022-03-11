import RoomDetails from '../../components/room/room-detail';
import Head from 'next/head'
// import { getRoomDetails } from '../../redux/actions/roomActions';
// import { wrapper } from '../../redux/store';

const RoomDetailPage = ({ room }) => {
    return (
        <>
            <Head>
                {/* <title>{room.name}</title> */}
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {/* <RoomDetails room={room} /> */}
            <div>
                <h1>Single room details</h1>
            </div>
        </>
    )
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
//     await store.dispatch(getRoomDetails(req, params.id))
// })

// export async function getStaticPaths() {
//     const res = await fetch('https://rentmeroom.com/api/rooms')
//     const { rooms } = await res.json()

//     const paths = rooms.map((room) => ({
//         params: { id: room._id },
//     }))

//     return { paths, fallback: 'blocking' }
// }


// export async function getStaticProps({ params }) {
//     const res = await fetch(`https://rentmeroom.com/api/rooms/${params.id}`)
//     const { room } = await res.json()

//     return {
//         props: { room },
//         revalidate: 1,
//     }
// }

export default RoomDetailPage;