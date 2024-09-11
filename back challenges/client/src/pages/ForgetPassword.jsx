import Input from "../Components/Input"
import { useState } from "react"
import { Link } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import axios from "axios"
const ForgetPassword = () => {
  const [email, setEmail] = useState("")
  const [landing , setLanding ] = useState(false)
  const [errors, setErrors] = useState("")
  const [success , setSuccess] = useState("")
  const handleForgetPassword = async () => {
    try {
      setLanding(()=>true)
      const res = await axios.post("http://localhost:3000/api/v1/auth/forgot-password", {
        email
      })
      setSuccess(()=>res.data.msg)
    } catch (error) {
      setErrors(() => error.response.data.msg)
    } finally{
      setLanding(()=>false)
    }
  }
  return (
    <div className="home w-full h-screen p-10 text-white ">
      <Link to="/">
        <p className="text-white flex items-center">
          <IoIosArrowRoundBack className="text-xl" />
          Back to home
        </p>
      </Link>
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-[#490041] w-96  p-4 rounded-3xl">
          {success && <p className="text-white bg-green-500 bg-opacity-25 w-full rounded-lg px-4 py-2 border-solid border-2 border-green-500">{success}</p>}
          {errors && <p className="text-white bg-red-500 bg-opacity-25 w-full rounded-lg px-4 py-2 border-solid border-2 border-red-500">{errors}</p>}
          <Input name="email" type="email" set={setEmail} value={email} />
          <button 
          onClick={(e)=>{
            e.preventDefault()
            handleForgetPassword()
          }}
          className="text-white px-4 py-2 bg-[#d46ac9] hover:bg-purple-700   font-medium rounded-lg text-sm">
            {landing ? "Landing ... " : "Send email"  }
          </button>
        </div>
      </div>
    </div>
  )
}
export default ForgetPassword