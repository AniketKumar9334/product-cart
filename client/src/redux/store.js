import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./reducers/userReducers";
import { thunk } from "redux-thunk";
import { productReducers } from "./reducers/productRouter";
const combinReeducer = combineReducers({
  user: userReducer,
  product: productReducers
});

export const store = legacy_createStore(combinReeducer, applyMiddleware(thunk));
