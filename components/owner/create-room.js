import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { newRoom } from '../../redux/actions/roomActions'


const CreateRoom = () => {

    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState('')
    const [category, setCategory] = useState('1RK')
    const [bathroom, setBathroom] = useState('Shared')
    const [tenants, setTenants] = useState('All')

    const dispatch = useDispatch();
    const router = useRouter()

    const { loading, success, error } = useSelector(state => state.newRoom);

    useEffect(() => {
        if (error) {
            toast.error(error)
        }

        if (success) {
            router.push('/')
        }
    }, [dispatch, success, error])

    const submitHandler = (e) => {
        e.preventDefault();

        const roomData = {
            name,
            pricePerMonth: price,
            description,
            address,
            roomCategory: category,
            bathroomType: bathroom,
            tenants,
            images
        }

        if (images.length === 0 || images.length <= 3) return toast.error("Please uplaod images or minimum 4 images")

        dispatch(newRoom(roomData))
    }

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([])
        setImagesPreview([]);

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result]);
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

    return (
        <div>
            <h1>List your room</h1>
            <div className="bg-gray-50 shadow-md mt-4 max-w-2xl mx-auto p-4 rounded-md">
                <form onSubmit={submitHandler}>
                    {/* image */}
                    <div>
                        <label>Images</label>
                        <div>
                            <input type="file"
                                name="room_images"
                                id="customFile"
                                onChange={onChange}
                                multiple
                            />
                            <label htmlFor="customFile">Choose Images</label>
                        </div>
                        <div className='grid grid-cols-3 sm:grid-cols-6' >
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
                        <label htmlFor="name_field">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="p-2 bg-gray-300 rounded-sm"
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
                            className="p-2 bg-gray-300 rounded-sm"
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
                            required
                            className="p-2 bg-gray-300 rounded-sm"
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
                            className="p-2 bg-gray-300 rounded-sm"
                        />
                    </div>

                    {/* category */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="category_field">Room Type</label>
                        <select
                            className="p-2 bg-gray-300 rounded-sm"
                            id="room_type_field"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {["1R", "1RK", "1BHK", "2BHK", "3BHK"].map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* bathroom */}
                    <div className="flex flex-col py-2">
                        <label htmlFor="category_field">Bathroom Type</label>
                        <select
                            className="p-2 bg-gray-300 rounded-sm"
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
                            className="p-2 bg-gray-300 rounded-sm"
                            id="room_type_field"
                            value={tenants}
                            onChange={(e) => setTenants(e.target.value)}
                        >
                            {["All", "Students", "Family", "Girls", "Boys", "Bachelor",].map(tenants => (
                                <option key={tenants} value={tenants}>{tenants}</option>
                            ))}
                        </select>
                    </div>
                    <button className="px-3 p-2 rounded-md bg-[#512d6d] text-[#eee]">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom
