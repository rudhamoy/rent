import { useRouter } from 'next/router'
import SearchBar from '../search/SearchBar';
import classes from './hero.module.css';
import { BiSearch } from 'react-icons/bi'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Image from 'next/image'

const HeroSection = ({ setShowSearch, showSearch }) => {

    const router = useRouter()

    // click handler for search modal
    const showSearchHandler = (e) => {
        e.preventDefault()
        setShowSearch(true)
    }

    //close search modal
    const closeSearch = () => {
        setShowSearch(false)
    }

    //onClick handler for search
    const onclickHandler = (location) => {
        if (location.trim()) {
            router.push(`/search?location=${location}`)
        } else {
            router.push('/search')
        }
    }

    return (
        <div className={`${classes.background_svg} ${showSearch === true ? 'h-[100%]' : 'h-[65vh]'}   sm:h-[85vh] relative`}>
            {/* <div className="absolute bg-white mix-blend-multiply filter blur-xl rounded-full w-[30%] h-[100%] "></div>
            <div className="absolute bg-yellow-50 mix-blend-multiply filter blur-xl rounded-full w-[30%] h-[100%] right-4"></div>
            <div className="absolute bg-gray-100 mix-blend-multiply filter blur-xl rounded-full w-[30%] h-[100%] right-44 "></div> */}
            <div className="px-[5%] sm:px-32 backdrop-blur-[3px] h-full w-full flex flex-col justify-center pt-[14vh] relative">
                <h1 className={`text-base text-gray-700  font-bold uppercase text-center`}><span className={`text-3xl font-sans `}>Searching a rent</span> <br /> is tiring, Say no more!</h1>
                <p className="my-2 text-center font-semibold text-gray-500">Let us find a perfect room for you</p>

                {/** Search bar */}
                {showSearch === true &&
                    <div className={`absolute top-0 bottom-0 left-0 right-0 bg-[#000000e5] z-50 pt-[5%]`}>
                        <SearchBar closeSearch={closeSearch} />
                        <div className='mx-[3%] p-2 shadow-md border mt-[5px] bg-gray-100 rounded-md'>
                            <ul>
                                <li className='text-gray-500 text-sm'>suggested keyword</li>
                                <li onClick={() => onclickHandler('abhaynagar')} className="flex justify-between items-center mb-2"><p>Abhaynagar</p> <HiOutlineArrowNarrowRight /></li>
                                <li onClick={() => onclickHandler('krishna nagar')} className="flex justify-between items-center mb-2"><p>Krishna nagar</p> <HiOutlineArrowNarrowRight /></li>
                                <li onClick={() => onclickHandler('radhanagar')} className="flex justify-between items-center mb-2"><p>Radha nagar</p> <HiOutlineArrowNarrowRight /></li>
                                <li onClick={() => onclickHandler('buddha mandir')} className="flex justify-between items-center mb-2"><p>Buddha Mandir</p> <HiOutlineArrowNarrowRight /></li>

                            </ul>
                        </div>
                    </div>
                }
                {/* search bar placeholder */}
                <div className={`bg-white   rounded-md  overflow-hidden flex gap-x-1 items-center py-2 p-1 shadow-md`} >
                    <BiSearch className="cursor-pointer text-2xl text-gray-600" />
                    <input type="text" disabled={showSearch === true ? true : false} onClick={showSearchHandler} placeholder="Search for location" className="h-[100%] w-full outline-none pl-3"
                    />
                </div>

            </div>
        </div>
    )
}

export default HeroSection
