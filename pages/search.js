import { wrapper } from "../redux/store"
import { getRooms } from "../redux/actions/roomActions"
import Search from "../components/search"


const SearchPage = () => {
    return (
        <Search />
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, query }) => {
    await store.dispatch(getRooms(req, query.page, query.location, query.roomCategory, query.tenants, query.min, query.max, query.bathroomType, query.electricBil, query.petsFriendly, query.parking, query.waterSupply, query.furnish, query.featured))
})


export default SearchPage
