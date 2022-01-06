import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

const Upload = () => {
    const [images, setImages] = useState({})

    // const onChange = (e) => {
    //     const files = Array.from(e.target.files);

    //     setImages({})

    //     files.forEach(file => {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setImages(reader.result);
    //             }
    //         }

    //         reader.readAsDataURL(file)
    //     })
    // }

    const onMutate = (e) => {

        //Files
        if (e.target.files) {
            setImages(e.target.files)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

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


        // await addDoc(collection(db, "images"), formDataCopy)
    }



    return (
        <div className="py-28">
            <form onSubmit={submitHandler}>
                <label className="formLabel">Images</label>
                <p className="">The First image will be the cover(max 6)</p>
                <input type="file"
                    className="bg-gray-50 p-2 rounded-md"
                    // value={images}
                    onChange={onMutate}
                    max="6"
                    accept='.jpg,.png,.jpeg'
                    multiple
                    required
                />

                <button type="submit" className=" bg-gray-800 text-white">Create Listing</button>
            </form>
        </div>
    )
}

export default Upload
