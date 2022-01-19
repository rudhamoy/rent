import HeroSection from "../components/hero"
import Featured from '../components/featured'
import HowItWorks from "../components/sections/how-it-work"
import { wrapper } from "../redux/store"
import { getRooms } from "../redux/actions/roomActions"

const Home = ({ rooms }) => {
  return (
    <div>
      <HeroSection />
      <Featured rooms={rooms.rooms} />
      <HowItWorks />
    </div>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
//   await store.dispatch(getRooms(req))
// })

export async function getStaticProps() {
  const res = await fetch('https://rentmeroom.com/api/rooms')
  const rooms = await res.json()

  return {
    props: {
      rooms,
    },
    revalidate: 10, // In seconds
  }
}


export default Home