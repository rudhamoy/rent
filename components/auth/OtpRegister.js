import React, { useState } from 'react'
import axios from 'axios'

const OtpRegister = () => {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [verify, setVerify] = useState('');
    const [userId, setUserId] = useState('')
    const [otp, setOtp] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()

        const userData = {
            name,
            mobile,
            password
        }

        // const config = {
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }

        const data = await axios.post("/api/auth/otpuser", userData).then(res => {
            console.log(res)
            const { data } = res
            setUserId(data.data.userId)
            console.log(data.data.userId)
            setOtp(true)
        })

        console.log(data)

    }

    const OTP = parseInt(verify)

    const verfiyHandler = async (e) => {
        e.preventDefault()

        const userData = {
            otp: verify,
            userId: userId
        }

        const data = await axios.post("/api/auth/verify", userData)
        console.log(data)

    }

    console.log(typeof (OTP))

    return (
        <div className="h-[100vh] flex justify-center items-center">
            {otp === true ? (
                <form className=" w-[90%]" onSubmit={verfiyHandler}>

                    <div className="flex flex-col py-2">
                        <label htmlFor="otp">Enter OTP</label>
                        <input type="number" placeholder="Enter OTP" value={verify} onChange={e => setVerify(e.target.value)} className="p-2 rounded-md outline-none " />
                    </div>
                    <button className="p-2 px-3 w-[100%] rounded-md outline-none bg-gray-600 text-gray-100">Verify</button>
                </form>
            ) : (

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
            )}
        </div>
    )
}

export default OtpRegister