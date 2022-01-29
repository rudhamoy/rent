import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classes from './header.module.css'
import { AiFillHome } from 'react-icons/ai'
import { CgProfile, CgClose } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import OutsideClickHandler from 'react-outside-click-handler';


import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions'
import { signOut } from 'next-auth/client'
import { myNotifications } from '../../redux/actions/notificationActions'

const Header = () => {
    const [show, handleShow] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const dispatch = useDispatch();
    const router = useRouter()

    // Get user from state => redux
    const { user, loading } = useSelector(state => state.loadedUser);

    useEffect(() => {
        dispatch(myNotifications())
        //Header
        if (!user) {
            dispatch(loadUser())
        }
        const scroll = window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                handleShow(true)
            } else {
                handleShow(false)
            }
        })

        return () => {
            window.removeEventListener("scroll", scroll)
        }


    }, [dispatch, user])

    //Logout function using next session
    const logoutHandler = () => {
        signOut()
    }

    //show menu modal function
    const openMenu = () => {
        setShowModal(true)
    }

    const closeMenu = () => {
        setShowModal(false)
    }

    return (
        <div className={`${classes.header, show && "bg-gray-50 shadow-md"} fixed z-10 w-full py-[10px] sm:py-3 px-3 sm:px-32 flex items-center  text-xl font-serif `}>
            {/** logo */}
            <div className={`flex items-center ${classes.header__logo} text-3xl`} >
                <AiFillHome onClick={() => router.push('/')} className={`${classes.logo__icon}`} />
                <Link href="/">
                    <a className="hidden sm:block text-1xl hover:no-underline">Rent Me Room</a>
                </Link>
            </div>

            {/** Menu List */}
            <div className={`${classes.header__menu} mr-4`}>
                <ul className="flex items-center gap-x-5 hover:no-underline ">

                    <li className="hidden sm:block">
                        <Link href="/search">
                            <a className="hover:no-underline ">Explore</a>
                        </Link>
                    </li>

                </ul>
            </div>

            {/** profile */}
            <div className="relative">
                <div className={`${classes.burger_conatainer} ml-[40vw] sm:ml-12 sm:m-0`}>
                    <div className={`${classes.header__profile} bg-gray-100 px-[12px;] text-[16px]`}>
                        {showModal === true ? (<CgClose onClick={closeMenu} className="font-bold cursor-pointer hover:text-[blueviolet]" />) : (
                            <GiHamburgerMenu onClick={openMenu} className="cursor-pointer hover:text-[blueviolet]" />
                        )}

                        {user ? (
                            <img src={user?.avatar} alt="user" className="w-[32px] h-[32px] rounded-full" />
                        ) : (

                            <CgProfile className="text-3xl cursor-pointer hover:text-[blueviolet]" />
                        )}
                    </div>
                </div>
                {/* modal menu */}
                {showModal === true && (
                    <OutsideClickHandler onOutsideClick={closeMenu}>
                        <div className="bg-white shadow-md my-2 p-4 rounded-md absolute right-[2px] sm:right-10 w-[250px] text-base text-gray-600">
                            <ul className="py-2 flex flex-col gap-y-2">

                                <li className="hidden sm:block" >
                                    <Link href="/watch-list">
                                        <a className="hover:no-underline flex items-center gap-x-4">Bookmarks <span className="font-bold text-[#512d6d] text-xl">2</span></a>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/bookings/me">
                                        <a className="hover:no-underline flex items-center gap-x-4">Bookings </a>
                                    </Link>
                                </li>

                            </ul>
                            <ul className="py-1 flex flex-col gap-y-2">
                                {user?.role === 'owner' && (

                                    <li>
                                        <Link href="/owner/room">
                                            <a className="hover:no-underline flex items-center gap-x-4">List your room</a>
                                        </Link>

                                    </li>
                                )}
                                <li>
                                    {user ? (
                                        <Link href="/" >
                                            <a onClick={logoutHandler} className="font-semibold">Logout</a>
                                        </Link>
                                    ) : (

                                        <Link href="/login">
                                            <a className="hover:no-underline font-semibold">Sing in</a>
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </OutsideClickHandler>
                )}
            </div>


        </div>


    )
}

export default Header;