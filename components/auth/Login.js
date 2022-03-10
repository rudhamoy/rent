import React, { useState } from 'react'
import Link from 'next/link';

import { signIn } from 'next-auth/client'
import { toast } from 'react-toastify';

const Login = () => {
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        const result = await signIn("credentials", {
            redirect: false,
            mobile,
            password
        });

        setLoading(false)

        if (result.error) {
            toast.error(result.error);
            setLoading(false)
        } else {
            window.location.href = "/"
        }
    }

    return (
        <div className="px-[3%] h-[80vh] flex justify-center items-center">
            {loading === true ? (
                <div className="w-[340px] bg-gray-50 p-2 rounded-md py-20">
                    <h1>Please Wait!</h1>
                    <p>Login your account...</p>
                </div>
            ) : (
                <div className="bg-white w-[340px] shadow-md border rounded-md">
                    <form onSubmit={submitHandler} className="p-4">

                        <div className="flex flex-col my-4">
                            <label htmlFor="mobile_field">Mobile</label>
                            <input type="number" id="mobile_field" value={mobile} onChange={e => setMobile(e.target.value)} className="bg-gray-300 py-3 px-2 rounded-md outline-none" />
                        </div >
                        <div className="flex flex-col my-4">
                            <label htmlFor="password_field">Password</label>
                            <input type="password" id="password_field" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-300 py-3 px-2 rounded-md outline-none" />
                        </div>
                        <div>
                            <p className="text-right mb-2">
                                <Link href='/password/forgot'>
                                    <a className='text-yellow-700'>Forgot Password</a>
                                </Link>
                            </p>
                        </div>
                        <button className="text-md bg-[#512d6d] text-gray-100 px-2 p-2 rounded-md w-full">LOGIN</button>
                        <div className="my-4">
                            <p>Create an Account?
                                <span className="mx-2 text-[#512d6d] font-semibold">
                                    <Link href="/register">
                                        <a className="underline">click here</a>
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </form >
                </div >
            )}
        </div>
    )
}

export default Login
