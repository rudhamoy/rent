import RoomDetails from '../../components/room/room-detail';
import { getRoomDetails } from '../../redux/actions/roomActions';

import { wrapper } from '../../redux/store';

const RoomDetailPage = () => <RoomDetails />

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
    await store.dispatch(getRoomDetails(req, params.id))
})

export default RoomDetailPage;