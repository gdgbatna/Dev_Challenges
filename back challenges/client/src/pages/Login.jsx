import Input from "../Components/Input"
import { Link , useNavigate} from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from "react"
import axios from "axios"
const Login = () => {
    // declare 3 name , email , password , confirme password
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [landing , setLanding] = useState(false)
    const [errors , setErrors ] = useState(false)
    const navigate = useNavigate();

    const handleLogin = async () =>{
        try {
            setLanding(()=>true)
            const res = await axios.post("http://localhost:3000/api/v1/auth/login",{
                email,
                password,
            },{
                withCredentials: true
            })
            navigate("/main");
        } catch (error) {
            setErrors(() => error.response.data.msg)
        } finally{
            setLanding(()=>false)
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
                <div className="w-96 backdrop-blur-lg bg-opacity-80 rounded-lg shadow-lg p-4 bg-[#490041] text-white">
                    <form>
                        {errors && <p className="text-white bg-red-500 bg-opacity-25 w-full rounded-lg px-4 py-2 border-solid border-2 border-red-500">{errors}</p>}
                        <Input name="email" type="email" set={setEmail} value={email} />
                        <Input name="password" type="password" set={setPassword} value={password} />
                        <div className="flex items-center justify-center mb-4">
                            <button
                                type="button"
                                className="text-white bg-[#d46ac9] hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 px-5 w-full sm:w-auto"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleLogin()
                                }}
                            >
                                {landing ? "Landing..." : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login