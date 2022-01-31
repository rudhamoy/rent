import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter'
import { ImLocation2 } from 'react-icons/im'
import { BsBookmark } from 'react-icons/bs'
import _ from 'lodash'
import { addToWatchlist } from '../../redux/actions/watchListActions'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

const Map = ({ rooms }) => {
    const [selectedLocation, setSelectedLocation] = useState({})
    const dispatch = useDispatch()

    const coordinates = rooms.map((room) => ({
        longitude: room.coordinates.lng,
        latitude: room.coordinates.lat
    }))

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 12,
    })

    useEffect(() => {

    }, [dispatch])

    let watchList = []

    // click handler for adding to watchlist/bookmark
    const handleAddToWatchlist = (room) => {
        if (typeof window !== "undefined") {
            if (localStorage.getItem("watchList")) {
                watchList = JSON.parse(localStorage.getItem("watchList"))
            }

            watchList.push({
                ...room,
            })

            let unique = _.uniqWith(watchList, _.isEqual)

            localStorage.setItem("watchList", JSON.stringify(unique));

            dispatch(addToWatchlist(unique))

            toast.success("Added to Bookmarks")
        }
    }

    return (
        <div className="h-[100vh] w-[100vw] flex justify-center bg-[#EAE6E0]">
            <ReactMapGL
                mapStyle="mapbox://styles/rentmeroom/ckz1nnvvz006a14o21ik2wpbg"
                // mapStyle="mapbox://styles/rentmeroom/ckz1d1lbx002214lto3r1q6eg"
                mapboxApiAccessToken={process.env.mapbox_key}
                {...viewport}
                width="100%"
                height="93%"
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
                {rooms.map(room => (
                    <div key={room._id}>
                        <Marker
                            longitude={room.coordinates.lng}
                            latitude={room.coordinates.lat}
                            offsetLeft={-20}
                            offsetTop={-20}
                        >
                            <ImLocation2 onClick={() => setSelectedLocation(room)} className={`text-xl  ${selectedLocation._id === room._id ? 'text-yellow-600 animate-bounce' : 'text-[#512d6d]'}`} />
                        </Marker>

                        {selectedLocation._id === room._id ? (
                            <Popup
                                onClose={() => setSelectedLocation({})}
                                closeOnClick={true}
                                latitude={room.coordinates.lat}
                                longitude={room.coordinates.lng}
                                anchor="top"
                                className='shadow-md z-50 w-[280px] rounded-md'
                            >
                                <div className="flex  gap-x-2 w-[100%] relative ">
                                    <img src={room.images[0]} alt="room._name" className="w-[80px] h-[80px] rounded-md" />
                                    <div className="relative text-sm">
                                        <p className=" font-semibold">{room.name}</p>
                                        <p className="text-gray-500">{room.roomCategory}, for {room.tenants} tenants</p>
                                        <p className=" absolute bottom-0 left-0">{room.pricePerMonth}/Mo</p>
                                    </div>
                                    <BsBookmark onClick={() => handleAddToWatchlist(room)} className="absolute right-0 bottom-0" />
                                </div>
                            </Popup>
                        ) : (false)}
                    </div>
                ))}
            </ReactMapGL>
        </div>
    );
};

export default Map;
