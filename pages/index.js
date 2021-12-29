import HeroSection from "../components/hero"
import Featured from '../components/featured'
import HowItWorks from "../components/sections/how-it-work"
import { wrapper } from "../redux/store"
import { getRooms } from "../redux/actions/roomActions"

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Featured />
      <HowItWorks />
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  await store.dispatch(getRooms(req))
})


export default Home