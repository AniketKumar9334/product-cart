import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  BASE_URL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
} from "../constant";
import axios from "axios";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const res = await axios.post(`${BASE_URL}/users/register`, userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch({ type: REGISTER_SUCCESS, payload: res?.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response.data.message });
  }
};
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const res = await axios.post(`${BASE_URL}/users/login`, userData, {
      headers:{
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: res?.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const res = await axios.get(`${BASE_URL}/users/profile`, {
      withCredentials: true,
    });
    dispatch({ type: LOAD_USER_SUCCESS, payload: res?.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOAD_USER_FAILURE, payload: error.response.data.message });
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });

    const res = await axios.get(`${BASE_URL}/users/profile`, {
      withCredentials: true,
    });
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: res?.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT_USER_FAILURE, payload: error.response.data.message });
  }
};
