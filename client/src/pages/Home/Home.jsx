import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import ProductSection from './ProductSection'

const Home = () => {
  const [search, setSearch] = useState("")
  return (
    <>
     <Navbar search={search} setSearch={setSearch}/>  
      <div className='w-[90%] m-auto mt-10 max-lg:w-[98%]'>
       <ProductSection  keyword={search} />
      </div>
    </>
  )
}

export default Home