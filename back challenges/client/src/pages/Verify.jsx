import { IoIosArrowRoundBack } from 'react-icons/io'
import axios from 'axios'
import { useState, useEffect  } from 'react'
import { useLocation, Link } from 'react-router-dom'
const Verify = () => {
  const [verificationMsg, setVerificationMsg] = useState(false)
  const [landing, SetLanding] = useState(true)
  //Get the current location and query parameters from the URL
  const location = useLocation()
  const verifyEmailUrl = async (email, verificationToken) => {
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/verify-email', { email, verificationToken });
      console.log(res);
      SetLanding(false)
      setVerificationMsg(true);
    } catch (error) {
      setVerificationMsg(false);
      SetLanding(false)
      console.log(error);
    }
  }
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const verificationToken = searchParams.get('token');
    verifyEmailUrl(email, verificationToken)
  }, [location.search])

  return (
    <div className="home w-full h-screen p-10">
      <Link to="/">
        <p className="text-white flex items-center">
          <IoIosArrowRoundBack className="text-xl" />
          Back to home
        </p>
      </Link>

      {landing ? <p className='text-3xl'>Landing ...</p> :
        <div className='w-full h-full  flex flex-col justify-center items-center text-white'>
          {verificationMsg ?
            <>
              <img src="./Verify.svg" className='h-4/5' />
              <p className='text-3xl'>email Verified</p>
            </> :
            <>
              <img src="./error.svg" className='h-4/5' />
              <p className='text-3xl'>email verified failed</p>
            </>
          }
        </div>
      }
    </div>
  )
}
export default Verify