import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

const OtpRegister = () => {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState({})
    const [password, setPassword] = useState('')

    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault()

        const userData = {
            name,
            mobile,
            password
        }

        const data = await axios.post("/api/trialuser", userData).then(res => {
            console.log(res)

            router.push('/login')
        })

        console.log(data)

    }



    return (
        <div className="h-[100vh] flex justify-center items-center">

            <form className=" w-[90%]" onSubmit={submitHandler}>
                <div className="flex flex-col py-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="p-2 rounded-md outline-none " />
                </div>
                <div className="flex flex-col py-2">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="number" placeholder="Mobile number" value={mobile} onChange={e => setMobile(e.target.value)} className="p-2 rounded-md outline-none " />
                </div>
                <div className="flex flex-col py-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 rounded-md outline-none " />
                </div>

                <button className="p-2 px-3 w-[100%] rounded-md outline-none bg-gray-600 text-gray-100">Submit</button>
            </form>
        </div>
    )
}

export default OtpRegister