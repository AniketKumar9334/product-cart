import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingButton from '../components/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/actions/userActions'

const Register = ({loading}) => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profile, setProfile] = useState('')

  const dispatch = useDispatch()

  
  const handleRegister = async(e) => {
    e.preventDefault()
    await dispatch(registerUser({
      name,
      username,
      email,
      password,
      photo: profile
    }))
  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            
            <div className="space-y-4 md:space-y-6" >
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " placeholder="abcd efg" required="" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="username" placeholder="abcd1234" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " required="" />
              </div>
              <div >

                <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="file_input">Upload file</label>
                <input onChange={(e) => setProfile(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept='image/*' />
                <p className="mt-1 text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required="" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-blue-600 hover:underline ">Terms and Conditions</Link></label>
                </div>
              </div>
              {
                loading ? (
                  <LoadingButton />
                ) : (
                  <button onClick={(e) => handleRegister(e)}  type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>

                )
              }

              <p className="text-sm font-light text-gray-500 ">
                Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Register