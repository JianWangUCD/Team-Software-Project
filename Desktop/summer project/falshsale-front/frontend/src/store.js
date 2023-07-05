// import data from './data';
import { legacy_createStore as createStore , combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducer'; 

//获取本地存储的登录用户信息
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const reducer = combineReducers({
    productList : productListReducer,
    userLogin : userLoginReducer
})

const initialState = {
    userLogin : { userInfo: userInfoFromStorage }
};

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;
