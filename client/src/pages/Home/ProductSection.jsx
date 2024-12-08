import React, { useEffect, useState } from 'react'
import ProductItem from '../../components/ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProduct } from '../../redux/actions/productActions'
import Loading from '../../components/Loading'

const ProductSection = ({ keyword = "" }) => {
    const [page, setPage] = useState(1)
    const { products, productCount, loading } = useSelector(state => state.product)
    const maxPageCount = Math.ceil(productCount/10)


    const dispatch = useDispatch()
    useEffect(() => {
        const query = `page=${page}&search=${keyword}`
        dispatch(getAllProduct(query))
    }, [page, keyword])
    return (
        <>
            <div className='max-lg:w-[98%]'>
                <h1 className='text-lg'>Latest Product</h1>
                <hr />
                {loading ? (
                    <div className='flex justify-center w-full h-full items-center'>
                        <Loading />
                    </div>
                ) :
                    (
                        <div className='mt-5 grid grid-cols-4 gap-y-10 max-lg:grid-cols-3 max-lg:gap-2 max-md:grid-cols-2 max-sm:grid-cols-1'>
                            {
                                products?.map(item => (
                                    <ProductItem key={item._id} product={item} />
                                ))
                            }
                        </div>
                    )
                }
                <div className='flex w-[100%] gap-5 justify-center items-center my-10'>
                    <button onClick={() => setPage(page - 1)} disabled={page === 1 ? true : false} className=" cursor-pointer disabled:bg-blue-400 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{"<<Previes"}</button>
                    <p>{page}</p>
                    <button onClick={() => setPage(page + 1)} disabled={page === maxPageCount ? true : false}  className="cursor-pointer disabled:bg-blue-400 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{"Next>>"}</button>
                </div>
            </div>
        </>
    )
}

export default ProductSection