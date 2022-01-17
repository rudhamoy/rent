import React, {
    useState, useEffect
} from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/userActions'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            toast.error(error)
        }

        if (message) {
            toast.success(message)
        }
    }, [dispatch, message, error])

    const submitHandler = (e) => {
        e.preventDefault()

        const userData = {
            email
        }

        dispatch(forgotPassword(userData))
    }

    return (
        <>
            <div className="mx-[3%] h-[80vh] flex flex-col justify-center items-center">
                <h1 className="font-semibold text-3xl my-5">Forgot Password</h1>
                <form className="p-2 flex flex-col w-full bg-white rounded-md" onSubmit={submitHandler}>
                    <label htmlFor="email" className="font-semibold my-2">Enter Your Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='outline-none rounded-md p-2 border bg-gray-200' />
                    <button disabled={loading ? true : false} className="p-2 px-4 rounded-md bg-[#512d6d] my-4 text-gray-50">Send Reset Email</button>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword
