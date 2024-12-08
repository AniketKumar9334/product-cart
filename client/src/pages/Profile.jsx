import React from 'react'
import Navbar from '../components/Navbar'
import { PROFILE_URL } from '../redux/constant'
import Loading from '../components/Loading'

const Profile = ({ user, loading }) => {
  return (
    <>
      <Navbar />
      {
        loading ? (
          <Loading/>
        ) : (
          <section className="py-10 my-auto dark:bg-gray-900">
            <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
              <div
                className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
                <div className="">
                  <h1
                    className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                    Profile
                  </h1>
                  <form>
                    <div
                      className="w-full rounded-sm ">
                      <div
                        className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat">
                          <img className="ml-[80%] flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat" src={`${PROFILE_URL}/${user?.profilePhoto}`} alt="" />
                        <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

                        </div>
                      </div>
                      
                    </div>
                    <h2 className="text-center mt-1 font-semibold dark:text-gray-300">Profile Photo
                    </h2>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                      <div className="w-full  mb-4 mt-6">
                        <label for="" className="mb-2 dark:text-gray-300">Full Name</label>
                        <input type="text"
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          placeholder="Fullname" disabled value={user.name} />
                      </div>
                      <div className="w-full  mb-4 lg:mt-6">
                        <label for="" className=" dark:text-gray-300">Username</label>
                        <input type="text"
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          placeholder="Username" disabled value={user.username} />
                      </div>
                    </div>

                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                      <div className="w-full  mb-4 lg:mt-6">
                        <label for="" className=" dark:text-gray-300">Email</label>
                        <input type="text"
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          placeholder="Email" disabled value={user.email} />
                      </div>
                      <div className="w-full  mb-4 lg:mt-6">
                        <label for="" className=" dark:text-gray-300">Password</label>
                        <input type="text"
                          className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                          placeholder="********" />
                      </div>
                    </div>
                    <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                      <button  className="w-full p-4">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )
      }
    </>
  )
}

export default Profile