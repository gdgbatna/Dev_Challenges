import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaPowerOff } from "react-icons/fa";
const Main = () => {
    const [name, setName] = useState("")
    const [userId, setUserId] = useState("")
    const [landing, setLanding] = useState(true)
    const [errors, setErrors] = useState(false)
    const navigate = useNavigate();

    const showMe = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/user/showMe", {
                withCredentials: true
            })
            const data = res.data.user
            setName(() => data.name)
            setUserId(() => data.userId)
        } catch (error) {
            setErrors(() => error.response.data.msg)
        }
        finally {
            setLanding(() => false)
        }
    }
    const logout = async () => {
        try {
            const res = await axios.delete("http://localhost:3000/api/v1/auth/logout", {
                withCredentials: true
            })
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        showMe()
    })
    return (
        <div className="home w-full h-screen p-10 text-white">
            <div className="flex justify-between">
                <Link to="/">
                    <p className="text-white flex items-center">
                        <IoIosArrowRoundBack className="text-xl" />
                        Back to home
                    </p>
                </Link>
                <button className="text-xl flex text-white justify-center items-center gap-2" onClick={
                    (e) => {
                        e.preventDefault()
                        logout()
                    }}>
                    <FaPowerOff />
                    Logout
                </button>
            </div>
            <div className="flex flex-col justify-center items-center p-24">
                <h1 className="text-8xl font-bold pb-4">Dev Challenges</h1>
                {landing ? <p className="text-3xl ">Landing ...</p> :
                    <>
                        {
                            errors ? <p className="text-3xl ">Somthing Wrong </p> :
                                <>
                                    <h2 className="text-3xl font-bold">Welcome {name}</h2>
                                    <p className="text-xl">ID : {userId}</p>
                                </>
                        }
                    </>
                }
            </div>
        </div >
    )
}
export default Main