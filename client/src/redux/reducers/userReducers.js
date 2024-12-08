import { LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constant";


let initState =[]
export const userReducer = (state=initState, action) =>{
    switch (action.type) {
        case REGISTER_REQUEST:
          return { ...state, loading: true, isAuthentication: false, error: null };
        case REGISTER_SUCCESS:
          return { ...state, loading: false,isAuthentication: true, user: action.payload.user, message: action.payload.message };
        case REGISTER_FAILURE:
          return { ...state, loading: false,isAuthentication: false, error: action.payload };

        case LOGIN_REQUEST:
          return { ...state, loading: true, isAuthentication: false, error: null };
        case LOGIN_SUCCESS:
          return { ...state, loading: false,isAuthentication: true, user: action.payload.user, message: action.payload.message };
        case LOGIN_FAILURE:
          return { ...state, loading: false,isAuthentication: false, error: action.payload };

        case LOAD_USER_REQUEST:
          return { ...state, loading: true, isAuthentication: false, error: null };
        case LOAD_USER_SUCCESS:
          return { ...state, loading: false,isAuthentication: true, user: action.payload.user, message: action.payload.message };
        case LOAD_USER_FAILURE:
          return { ...state, loading: false,isAuthentication: false, error: action.payload };

        case LOGOUT_USER_REQUEST:
          return { ...state, loading: true, isAuthentication: true, error: null };
        case LOGOUT_USER_SUCCESS:
          return { ...state, loading: false,isAuthentication: false,  message: action.payload.message };
        case LOGOUT_USER_FAILURE:
          return { ...state, loading: false,isAuthentication: false, error: action.payload };
        default:
          return state;
    }
}
