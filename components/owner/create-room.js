import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase.config'
import { v4 as uuidv4 } from 'uuid'

import { toast } from 'react-toastify';
import { newRoom, clearErrors } from '../../redux/actions/roomActions'


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
    const [loading, setLoading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [imageNum, setImageNum] = useState([])

    const dispatch = useDispatch();
    const router = useRouter()

    const { success, error, loading: createLoading } = useSelector(state => state.newRoom);
    const { user } = useSelector(state => state.loadedUser);



    //images change handler for firebase
    const onMutate = (e) => {

        //Files
        if (e.target.files) {
            setImages(e.target.files)
        }

        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        window.scrollTo(0, 0)

        setLoading(true)


        //Store images in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = image.name + `-${user.name}` + `-${uuidv4()}`

                const storageRef = ref(storage, 'images/' + fileName);

                const uploadTask = uploadBytesResumable(storageRef, image)

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        console.log("Upload is " + progress + "% done")
                        setUploadProgress(progress)
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

        let imageUrls
        if (images.length === 0 || images.length <= 3) {
            setLoading(false)
            return toast.error("Please upload minimum 4 images")
        } else {

            imageUrls = await Promise.all(
                [...images].map((image) => storeImage(image))
            ).catch(() => {
                return
            })
            setImageNum(imageUrls)
        }

        // const imageUrls = await Promise.all(
        //     [...images].map((image) => storeImage(image))
        // ).catch(() => {
        //     return
        // })
        console.log(imageUrls)
        // setImageNum(imageUrls)


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

        if (images.length === 0 || images.length <= 3) {
            setLoading(false)
            return toast.error("Please upload minimum 4 images")
        }

        dispatch(newRoom(roomData))
        setLoading(false)
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

    useEffect(() => {
        if (error) {
            toast.error(error)
            setLoading(false)
            dispatch(clearErrors())
        }

        if (success) {
            router.push('/me')
        }
    }, [dispatch, success, error, router, createLoading])

    if (loading === true || createLoading === true) {
        return (
            <div className="bg-gray-100 p-2 rounded-md h-[90vh] flex justify-center ">
                <div>
                    <h1>Please Wait!</h1>
                    <p>Creating your room...</p>
                    <div className="my-[20%]">
                        <p>Upload is <br></br> <span className="text-6xl text-green-600">{parseFloat(uploadProgress).toFixed(2)}</span> % done</p>
                        <p>Total {imageNum.length} images</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="font-semibold">List your room</h1>
            <div className="sm:bg-gray-50 sm:shadow-md mt-4 max-w-2xl mx-auto p-4 rounded-md">
                <form onSubmit={submitHandler}>
                    {/* image */}
                    <div>
                        <label htmlFor="customFile">Choose Images <span className="text-xs text-gray-600">(min 4 images)</span></label>
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
                        <label htmlFor="name_field">Title <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            id="name_field"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="p-2 bg-gray-50 rounded-2xl outline-none"
                        />
                    </div>

                    {/* price */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="price_field">Price <span className="text-red-600">*</span></label>
                        <input
                            type="number"
                            id="price_field"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                            className="p-2 bg-gray-50 rounded-xl outline-none"
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
                            className="p-2 bg-gray-50 rounded-xl outline-none"
                        ></textarea>
                    </div>

                    {/* address */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="address_field">Address <span className="text-red-600">*</span></label>
                        <input
                            type="text"
                            id="address_field"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="p-2 bg-gray-50 rounded-xl outline-none"
                        />
                    </div>

                    {/* pincode */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="pincode">Pincode <span className="text-red-600">*</span></label>
                        <input
                            type="number"
                            id="pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            required
                            className="p-2 bg-gray-50 rounded-xl outline-none"
                        />
                    </div>

                    {/* coordinates */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="coordinate">Map ?</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="coordinate" value={true} onClick={e => setCoordinate(e.target.value)} className={`${coordinate === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >Yes</button>
                            <button type="button" id="coordinate" value={false} onClick={e => setCoordinate(e.target.value)} className={`${coordinate === "false" || coordinate === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >No</button>
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
                            className={`p-2 outline-none rounded-xl ${mapDisabled === false ? 'bg-gray-200' : 'bg-gray-50'}`}
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
                            className={`p-2 outline-none rounded-xl ${mapDisabled === false ? 'bg-gray-200' : 'bg-gray-50'}`}
                        />
                    </div>

                    {/* category */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="category_field">Room Type <span className="text-red-600">*</span></label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl outline-none"
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
                        <label htmlFor="furnish">Furnish <span className="text-red-600">*</span></label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl outline-none"
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
                        <label htmlFor="category_field">Bathroom Type <span className="text-red-600">*</span></label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl outline-none"
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
                        <label htmlFor="category_field">Preffered Tenants <span className="text-red-600">*</span></label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl outline-none"
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
                        <label htmlFor="electricbill">Electric Bill <span className="text-red-600">*</span></label>
                        <div className="flex gap-x-3">
                            <button type="button" id="electricbill" value={true} onClick={e => setElectricBill(e.target.value)} className={`${electricBill === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-3 rounded-xl shadow-md border outline-none`} >Included</button>
                            <button type="button" id="electricbill" value={false} onClick={e => setElectricBill(e.target.value)} className={`${electricBill === "false" || electricBill === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-3 rounded-xl shadow-md border outline-none`} >Not included</button>
                        </div>
                    </div>

                    {/* Floor */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="floor">Floor</label>
                        <select
                            className="p-2 bg-gray-50 rounded-xl outline-none"
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
                            <button type="button" id="balcony" value={true} onClick={e => setBalcony(e.target.value)} className={`${balcony === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >Yes</button>
                            <button type="button" id="balcony" value={false} onClick={e => setBalcony(e.target.value)} className={`${balcony === "false" || balcony === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >No</button>
                        </div>
                    </div>

                    {/* Pets Fried */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="petsFriendly">Pets Friendly</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="petsFriendly" value={true} onClick={e => setPetsFriendly(e.target.value)} className={`${petsFriendly === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >Yes</button>
                            <button type="button" id="petsFriendly" value={false} onClick={e => setPetsFriendly(e.target.value)} className={`${petsFriendly === "false" || petsFriendly === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >No</button>
                        </div>
                    </div>

                    {/* parking */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="parking">Parking</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="parking" value={true} onClick={e => setParking(e.target.value)} className={`${parking === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >Yes</button>
                            <button type="button" id="parking" value={false} onClick={e => setParking(e.target.value)} className={`${parking === "false" || parking === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >No</button>
                        </div>
                    </div>

                    {/* Water Supply */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="waterSupply">Water Supply</label>
                        <div className="flex gap-x-3">
                            <button type="button" id="waterSupply" value={true} onClick={e => setWaterSupply(e.target.value)} className={`${waterSupply === "true" ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >Yes</button>
                            <button type="button" id="waterSupply" value={false} onClick={e => setWaterSupply(e.target.value)} className={`${waterSupply === "false" || waterSupply === false ? "bg-[#512d6d] text-gray-50" : " bg-gray-50"} p-2 px-5 rounded-xl shadow-md border outline-none`} >No</button>
                        </div>
                    </div>

                    <button type="submit" className="px-6 p-2 outline-none rounded-md bg-[#ddad0f] my-4 font-semibold text-[#eee]">CREATE ROOM</button>
                </form>
            </div>
        </div >
    )
}

export default CreateRoom
