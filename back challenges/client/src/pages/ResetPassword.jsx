import { Link, useLocation } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import axios from "axios"
import { useState, useEffect } from "react"
import Input from "../Components/Input"
const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [landing, setLanding] = useState(false)
    const [errors, setErrors] = useState(false)
    const [success , setSuccess] = useState(false)
    const location = useLocation()

    const resetPassword = async () => {
        try {
            setSuccess(()=>false)
            setErrors(()=>false)
            setLanding(()=>true)
            if (password !== confirmPassword) {
                setError(() => "passwords do not match")
                return
            }
            const searchParams = new URLSearchParams(location.search);
            const email = searchParams.get('email');
            const token = searchParams.get('token');
            const res = await axios.post('http://localhost:3000/api/v1/auth/reset-password', { password, email, token });
            console.log(res.data);
            setSuccess(()=>res.data.msg)
        } catch (error) {
            setErrors(() => "password reset failed")
        } finally {
            setLanding(() => false)
        }
    }

    return (
        <div className="home w-full h-screen p-10">
            <Link to="/">
                <p className="text-white flex items-center">
                    <IoIosArrowRoundBack className="text-xl" />
                    Back to home
                </p>
            </Link>
                <div className="flex justify-center items-center w-full h-full">
                    <div className="bg-[#490041] w-96  p-4 rounded-3xl">
                        {success && <p className="text-white bg-green-500 bg-opacity-25 w-full rounded-lg px-4 py-2 border-solid border-2 border-green-500">{success}</p>}
                        {errors && <p className="text-white bg-red-500 bg-opacity-25 w-full rounded-lg px-4 py-2 border-solid border-2 border-red-500">{errors}</p>}
                        <Input name="password" type="password" set={setPassword} value={password} />
                        <Input name="Confirm the password" type="password" set={setConfirmPassword} value={confirmPassword} />
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                resetPassword()
                            }}
                            className="text-white px-4 py-2 bg-[#d46ac9] hover:bg-purple-700   font-medium rounded-lg text-sm">
                            {landing ? "Landing ... " : "confirm"}
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default ResetPassword;