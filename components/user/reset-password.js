import React, {
    useState, useEffect
} from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/userActions'
import { toast } from 'react-toastify'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const router = useRouter()
    const { error, loading, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            toast.error(error)
        }

        if (success) {
            router.push('/login')
        }
    }, [dispatch, success, error])

    const submitHandler = (e) => {
        e.preventDefault()

        const passwords = {
            password, confirmPassword
        }

        dispatch(resetPassword(router.query.token, passwords))
    }

    return (
        <div className="px-[3%] h-[80vh] flex justify-center items-center">
            <div className="bg-white w-[340px] shadow-md border rounded-md
            ">
                <form onSubmit={submitHandler} className="p-4">

                    <div className="flex flex-col my-4">
                        <label htmlFor="password">New Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-300 py-3 px-2 rounded-md outline-none" />
                    </div>
                    <div className="flex flex-col my-4">
                        <label htmlFor="confirm password">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="bg-gray-300 py-3 px-2 rounded-md outline-none" />
                    </div>

                    <button disabled={loading ? true : false} className="text-md bg-[#512d6d] text-gray-100 px-2 p-2 rounded-md w-full">RESET PASSWORD</button>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword
