import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter'
import { ImLocation2 } from 'react-icons/im'

const SingleRoomMap = ({ coords }) => {


    const coordinates = ({
        longitude: coords.lng,
        latitude: coords.lat,
        // longitude: 91.283172,
        // latitude: 23.839195,
    })

    const center = getCenter([
        { latitude: coords.lat, longitude: coords.lng },
    ]);

    const [viewport, setViewport] = useState({
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 14,
    })

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/rentmeroom/ckz1nnvvz006a14o21ik2wpbg"
            // mapStyle="mapbox://styles/rentmeroom/ckz1d1lbx002214lto3r1q6eg"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            width="100%"
            height="240px"
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            <Marker
                longitude={coordinates.longitude}
                latitude={coordinates.latitude}
                offsetLeft={-20}
                offsetTop={-20}
            >
                <ImLocation2 className="text-3xl text-[#512d6d]" />
            </Marker>
        </ReactMapGL>
    )
}

export default SingleRoomMap