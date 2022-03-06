import { useState, useEffect } from 'react'
import Head from 'next/head'
import HeroSection from "../components/hero"
import Featured from '../components/featured'
import HowItWorks from "../components/sections/how-it-work"
import Footer from '../components/layout/footer'
import { wrapper } from "../redux/store"
import { getRooms } from "../redux/actions/roomActions"

import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client';

const Home = ({ rooms, newRooms, featuredRoom }) => {
  const [showSearch, setShowSearch] = useState(false)
  const router = useRouter()
  // const { user } = useSelector(state => state.loadedUser)

  async function myFunction() {
    const session = await getSession()
    console.log(session)
    if (!session) {
      router.push('/landing')
    }
  }

  useEffect(() => {
    myFunction()
  }, [])



  return (
    <>
      <Head>
        <title>RentmeRoom | Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative">
        <div className={`${showSearch === true && 'fixed h-[100%] w-[100vw] z-50 bg-[#fff]'}`}>
          <HeroSection showSearch={showSearch} setShowSearch={setShowSearch} />
        </div>
        <Featured rooms={rooms} newRooms={newRooms} featuredRoom={featuredRoom} />
        <HowItWorks />
        <Footer />
      </div>
    </>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
//   await store.dispatch(getRooms(req))
// })

export async function getStaticProps() {
  const res = await fetch('https://rentmeroom.com/api/rooms?min=1000&max=30000')
  const { rooms } = await res.json()

  //fetch new Room list
  const newRoomRes = await fetch(`https://www.rentmeroom.com/api/rooms/featured`)
  const newRoom = await newRoomRes.json()

  //featured room list
  const featuredRoomres = await fetch('https://rentmeroom.com/api/rooms?min=1000&max=30000&featured=true')
  const featuredRoom = await featuredRoomres.json()

  return {
    props: {
      rooms,
      newRooms: newRoom.rooms,
      featuredRoom: featuredRoom.rooms
    },
    revalidate: 2, // In seconds
  }
}



export default Home