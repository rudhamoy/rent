import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'

import { toast } from 'react-toastify';
import { newRoom } from '../../redux/actions/roomActions'


const CreateRoom = () => {

    const [images, setImages] = useState({});
    const [imagesPreview, setImagesPreview] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState('')
    const [pincode, setPincode] = useState(0)
    const [category, setCategory] = useState('1RK')
    const [bathroom, setBathroom] = useState('Shared')
    const [tenants, setTenants] = useState('All')
    const [electricBill, setElectricBill] = useState(false);
    const [floor, setFloor] = useState();
    const [balcony, setBalcony] = useState(false)
    const [petsFriendly, setPetsFriendly] = useState(false)
    const [parking, setParking] = useState(false)
    const [waterSupply, setWaterSupply] = useState(false);
    const [furnish, setFurnish] = useState()
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [coordinate, setCoordinate] = useState(false)

    const dispatch = useDispatch();
    const router = useRouter()

    const { loading, success, error } = useSelector(state => state.newRoom);
    const { user } = useSelector(state => state.loadedUser);

    useEffect(() => {
        if (error) {
            toast.error(error)
        }

        if (success) {
            router.push('/')
        }
    }, [dispatch, success, error, router])

    //images change handler for firebase
    const onMutate = (e) => {

        //Files
        if (e.target.files) {
            setImages(e.target.files)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        //Store images in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = image.name

                const storageRef = ref(storage, 'images/' + fileName);

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log("Upload is " + progress + "% done")
                    },
                    (error) => {
                        reject(error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                            resolve(downloadURL)
                        })
                    }
                )
            })
        }

        const imageUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            return
        })

        console.log(imageUrls)

        const formDataCopy = {
            imageUrls
        }
        await addDoc(collection(db, "images"), formDataCopy)

        const roomData = {
            name,
            pricePerMonth: price,
            description,
            address,
            pincode,
            roomCategory: category,
            bathroomType: bathroom,
            tenants,
            electricBill,
            floor,
            balcony,
            petsFriendly,
            parking,
            waterSupply,
            furnish,
            images: imageUrls,
            coordinates: {
                lat: latitude,
                lng: longitude
            }
        }

        if (images.length === 0 || images.length <= 3) return toast.error("Please uplaod images or minimum 4 images")

        dispatch(newRoom(roomData))
    }

    let mapDisabled = false

    if (coordinate === "true") {
        mapDisabled = true
    }

    if (coordinate === 'false') {
        mapDisabled = false
    }
    // images change handler

    // const onChange = (e) => {
    //     const files = Array.from(e.target.files);

    //     setImages([])
    //     setImagesPreview([]);

    //     files.forEach(file => {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setImages(oldArray => [...oldArray, reader.result]);
    //                 setImagesPreview(oldArray => [...oldArray, reader.result])
    //             }
    //         }

    //         reader.readAsDataURL(file)
    //     })
    // }

    return (
        <div>
            <h1 className="font-semibold">List your room</h1>
            <div className="sm:bg-gray-50 sm:shadow-md mt-4 max-w-2xl mx-auto p-4 rounded-md">
                <form onSubmit={submitHandler}>
                    {/* image */}
                    <div>
                        <label htmlFor="customFile">Choose Images</label>
                        <div className='p-2 bg-gray-50 rounded-xl'>
                            <input type="file"
                                name="room_images"
                                id="customFile"
                                onChange={onMutate}
                                multiple
                            />

                        </div>
                        <div className='grid grid-cols-4 sm:grid-cols-6 mb-2' >
                            {imagesPreview.map(img => (

                                <img
                                    src={img}
                                    key={img}
                                    alt="Images Preview"
                                    className="mt-3 mr-2 w-[55px] h-[52px]"
                                // width="55"
                                // height="52"
                                />

                            ))}
                        </div>
                    </div>

                    {/* name */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="name_field">Title</label>
                        <input
                            type="text"
                            id="name_field"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="p-2 bg-gray-50 rounded-2xl"
                        />
                    </div>

                    {/* price */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="price_field">Price</label>
                        <input
                            type="text"
                            id="price_field"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                            className="p-2 bg-gray-50 rounded-xl"
                        />
                    </div>

                    {/* description */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="description_field">Description</label>
                        <textarea
                            id="description_field"
                            rows="8"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="p-2 bg-gray-50 rounded-xl"
                        ></textarea>
                    </div>

                    {/* address */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="address_field">Address</label>
                        <input
                            type="text"
                            id="address_field"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="p-2 bg-gray-50 rounded-xl"
                        />
                    </div>

                    {/* pincode */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="pincode">Pincode</label>
                        <input
                            type="number"
                            id="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            required
                            className="p-2 bg-gray-50 rounded-xl"
                        />
                    </div>

                    {/* coordinates */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="coordinate">Map ?</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="coordinate" value={true} onClick={e => setCoordinate(e.target.value)} className={`${coordinate === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >Yes</button>
                            <button type="button" id="coordinate" value={false} onClick={e => setCoordinate(e.target.value)} className={`${coordinate === "false" || coordinate === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >No</button>
                        </div>
                    </div>

                    {/* co-ordinates - latitude */}
                    <div className={`flex flex-col py-2 ${mapDisabled === false ? 'text-gray-400' : ''}`}>
                        <label htmlFor="pincode">Latitude</label>
                        <input
                            type="number"
                            id="latitude"
                            disabled={!mapDisabled}
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            className={`p-2  rounded-xl ${mapDisabled === false ? 'bg-gray-200' : 'bg-gray-50'}`}
                        />
                    </div>
                    {/* co-ordinates - longitude */}
                    <div className={`flex flex-col py-2 ${mapDisabled === false ? 'text-gray-400' : ''}`}>
                        <label htmlFor="pincode">Longitude</label>
                        <input
                            type="number"
                            id="longitude"
                            disabled={!mapDisabled}
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            className={`p-2  rounded-xl ${mapDisabled === false ? 'bg-gray-200' : 'bg-gray-50'}`}
                        />
                    </div>

                    {/* category */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="category_field">Room Type</label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl"
                            id="room_type_field"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {["1R", "1RK", "1BHK", "2R", "2RK", "2BHK", "3BHK"].map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Furnish */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="furnish">Furnish</label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl"
                            id="furnish"
                            value={furnish}
                            onChange={(e) => setFurnish(e.target.value)}
                        >
                            {['Not Furnished', 'Semi-furnished', 'Furnished'].map(furnish => (
                                <option key={furnish} value={furnish}>{furnish}</option>
                            ))}
                        </select>
                    </div>

                    {/* bathroom */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="category_field">Bathroom Type</label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl"
                            id="room_type_field"
                            value={bathroom}
                            onChange={(e) => setBathroom(e.target.value)}
                        >
                            {["Attached", "Shared"].map(bathroom => (
                                <option key={bathroom} value={bathroom}>{bathroom}</option>
                            ))}
                        </select>
                    </div>

                    {/* tenants */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="category_field">Preffered Tenants</label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl"
                            id="room_type_field"
                            value={tenants}
                            onChange={(e) => setTenants(e.target.value)}
                        >
                            {["All", "Students", "Family", "Girls", "Boys", "Bachelor",].map(tenants => (
                                <option key={tenants} value={tenants}>{tenants}</option>
                            ))}
                        </select>
                    </div>

                    {/* Electric Bill */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="electricbill">Electric Bill</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="electricbill" value={true} onClick={e => setElectricBill(e.target.value)} className={`${electricBill === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-3 rounded-xl shadow-md border`} >Included</button>
                            <button type="button" id="electricbill" value={false} onClick={e => setElectricBill(e.target.value)} className={`${electricBill === "false" || electricBill === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-3 rounded-xl shadow-md border`} >Not included</button>
                        </div>
                    </div>

                    {/* Floor */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="floor">Floor</label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl"
                            id="floor"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                        >
                            {['Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Fouth Floor', 'Fifth Floor'].map(floor => (
                                <option key={floor} value={floor}>{floor}</option>
                            ))}
                        </select>
                    </div>

                    {/* Balcony */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="balcony">Balcony</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="balcony" value={true} onClick={e => setBalcony(e.target.value)} className={`${balcony === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >Yes</button>
                            <button type="button" id="balcony" value={false} onClick={e => setBalcony(e.target.value)} className={`${balcony === "false" || balcony === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >No</button>
                        </div>
                    </div>

                    {/* Pets Fried */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="petsFriendly">Pets Friendly</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="petsFriendly" value={true} onClick={e => setPetsFriendly(e.target.value)} className={`${petsFriendly === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >Yes</button>
                            <button type="button" id="petsFriendly" value={false} onClick={e => setPetsFriendly(e.target.value)} className={`${petsFriendly === "false" || petsFriendly === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >No</button>
                        </div>
                    </div>

                    {/* parking */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="parking">Parking</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="parking" value={true} onClick={e => setParking(e.target.value)} className={`${parking === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >Yes</button>
                            <button type="button" id="parking" value={false} onClick={e => setParking(e.target.value)} className={`${parking === "false" || parking === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >No</button>
                        </div>
                    </div>

                    {/* Water Supply */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="waterSupply">Water Supply</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="waterSupply" value={true} onClick={e => setWaterSupply(e.target.value)} className={`${waterSupply === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >Yes</button>
                            <button type="button" id="waterSupply" value={false} onClick={e => setWaterSupply(e.target.value)} className={`${waterSupply === "false" || waterSupply === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border`} >No</button>
                        </div>
                    </div>

                    <button type="submit" className="px-6 p-2 rounded-md bg-[#ddad0f] my-4 font-semibold text-[#eee]">CREATE ROOM</button>
                </form>
            </div>
        </div >
    )
}

export default CreateRoom
