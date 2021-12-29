import React, { useState } from 'react'
import Link from 'next/link';

import { signIn } from 'next-auth/client'
import { toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault()

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
        });

        if (result.error) {
            toast.error(result.error);
        } else {
            window.location.href = "/"
        }
    }

    return (
        <div className="px-10 h-[80vh] flex justify-center items-center">
            <div className="bg-white w-[340px] shadow-md border rounded-md
            ">
                <form onSubmit={submitHandler} className="p-4">

                    <div className="flex flex-col my-4">
                        <label htmlFor="email_field">Email</label>
                        <input type="email" id="email_field" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-300 h-10 rounded-md" />
                    </div>
                    <div className="flex flex-col my-4">
                        <label htmlFor="password_field">Password</label>
                        <input type="password" id="password_field" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-300 h-10 rounded-md" />
                    </div>
                    <button className="text-sm bg-[#512d6d] text-gray-100 px-2 p-2 rounded-md w-full">LOGIN</button>
                    <div className="my-4">
                        <p>Create an Account?
                            <span className="mx-2 text-[#512d6d] font-semibold">
                                <Link href="/register">
                                    <a className="underline">click here</a>
                                </Link>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
