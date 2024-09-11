import { Link } from "react-router-dom"
import "./style.css"
const Home = () => {
  return (
    <div className="home h-screen w-full relative text-white text-center p-24">
          <h1 className="text-8xl font-bold pb-4">Dev Challenges</h1>
            <h2 className="text-3xl font-bold">Welcome to the Home Page</h2>
            <div className="flex btns justify-center gap-4 py-6">
                <Link to="/auth/register"><button>Register</button></Link>
                <Link to="/auth/login"><button>Login</button></Link>
                <Link to="/auth/forget-password"><button>forget password</button></Link>
            </div>
    </div>
  )
}
export default Home