import axios from "axios"
import { BASE_URL, GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILURE } from "../constant"



export const getAllProduct = (query="") => async (dispatch) =>{
    dispatch({type: GET_PRODUCT_REQUEST})
    try {
        const {data} = await axios.get(`${BASE_URL}/products/?${query}`)
        dispatch({type: GET_PRODUCT_SUCCESS, payload: data})

    } catch (error) {
          dispatch({type: GET_PRODUCT_FAILURE, payload: error.response.data.message})
    }
}
export const getProductDetails = (id) => async (dispatch) =>{
    dispatch({type: PRODUCT_DETAILS_REQUEST})
    try {
        const {data} = await axios.get(`${BASE_URL}/products/${id}`)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})

    } catch (error) {
          dispatch({type: PRODUCT_DETAILS_FAILURE, payload: error.response.data.message})
    }
}