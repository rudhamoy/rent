import { wrapper } from "../redux/store"
import { getRooms } from "../redux/actions/roomActions"
import Search from "../components/search"
import Head from 'next/head'

const SearchPage = () => {
    return (
        <>
            <Head>
                <title>RentmeRoom | Explore</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Search />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, query }) => {

    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate')
    await store.dispatch(getRooms(req, query.page, query.location, query.roomCategory, query.tenants, query.min, query.max, query.bathroomType, query.electricBil, query.petsFriendly, query.parking, query.waterSupply, query.furnish, query.featured))
})


export default SearchPage
