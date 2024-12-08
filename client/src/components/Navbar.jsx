import React, { useEffect, useRef, useState } from 'react'
import PROFILE from '../assets/profile.jpg'
import { Link } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import SearchSuggestion from './SearchSuggestion';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL, PROFILE_URL } from '../redux/constant';
import axios from 'axios';
import { getAllProduct } from '../redux/actions/productActions';
import { logoutUser } from '../redux/actions/userActions';



const Navbar = ({setSearch, search}) => {

  const { user, isAuthentication } = useSelector(state => state.user)
  // const [search2, setSearch2] = useState("")
  const [product, setProduct] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchSuggestion = async() =>{
      const {data} = await axios(`${BASE_URL}/products?search=${search}`)
      setProduct(data.products)
    }
    fetchSuggestion()
  }, [search])
  
  // const handleRenderProduct = (e) =>{
  //   if(e.key === 'Enter'){
  //     dispatch(getAllProduct(search))
  //   }
  // }
  

  const handleLogout = () =>{
    dispatch(logoutUser())
  }


  return (
    <>

      <nav className='relative flex items-center  justify-between px-20 max-md:px-10 mt-2 mb-5'>
        <div>
          <Link className='flex items-center gap-3' to="/">
            <div className='w-12 h-12'>
              <img className='w-full h-full rounded-full' src={`${PROFILE_URL}/${user?.profilePhoto}` || PROFILE} alt="" />
            </div>
            <h6>Hello, {user?.name.split(" ")[0] || "User"}</h6>
          </Link>
        </div>
        <div className=' relative w-[50%]'>
          <input onChange={(e) => setSearch(e.target.value)} value={search} className=' bg-gray-50 w-full py-2 px-4 rounded-md border-gray-300 border-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 text-gray-700' type="text" placeholder='Search your product...' />
          <SearchIcon className='absolute right-2 top-2 text-gray-500' />
        </div>
        <div >
          {
            isAuthentication ? (
              <div className='flex gap-8 items-center '>
                <Link to="/profile" className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center '>Profile</Link>
                <button onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center ">logout</button>

              </div>
            ) : (
              <Link to={'/login'} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center ">Login</Link>

            )
          }
        </div>
        <SearchSuggestion product={product} search={search} />
      </nav>




    </>
  )
}

export default Navbar