import { GET_PRODUCT_FAILURE, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILURE } from "../constant";



let initState = [];

export const productReducers = (state =initState, action) =>{
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {...state, loading: true, products: []};
        case GET_PRODUCT_SUCCESS:
            return {...state, loading: false, products: action.payload.products, productCount: action.payload.productCount};
        case GET_PRODUCT_FAILURE:
            return {...state, loading: false, error: action.payload};
        case PRODUCT_DETAILS_REQUEST:
            return {...state, loading: true, };
        case PRODUCT_DETAILS_SUCCESS:
            return {...state, loading: false, product: action.payload.product};
        case PRODUCT_DETAILS_FAILURE:
            return {...state, loading: false, error: action.payload};
        default: 
            return state    
    }
}