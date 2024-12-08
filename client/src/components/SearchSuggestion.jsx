import React from 'react'
import {  PROFILE_URL } from '../redux/constant'
import { Link } from 'react-router-dom'



const SearchSuggestion = ({ product, search }) => {
    return (
        <>
            <div className={` ${!search && "invisible"} z-[99]  absolute w-[45%] bg-white rounded-r-lg shadow-lg top-12 left-[26.5%]`}>
                {
                    product.map((item) => (
                        <Link key={item._id} to={`/${item._id}`} className='flex items-center mb-2 gap-2 cursor-pointer px-3 py-3 hover:bg-gray-100' >
                            <div className='w-8 rounded-sm'>
                                <img src={`${PROFILE_URL}/${item?.productImage}`} className='rounded-md' alt="" />
                            </div>
                            <p className='font-medium'>{item?.name?.slice(0, 40)}</p>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default SearchSuggestion