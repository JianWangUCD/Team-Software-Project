// import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constents/productConstents"


import {
    USER_DETAILS_RESET,
    USER_LIST_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    SELLER_LOGIN_REQUEST, 
    SELLER_LOGIN_SUCCESS, 
    SELLER_LOGIN_FAIL, 
    SELLER_LOGOUT,
    SELLER_LIST_RESET,
    SELLER_DETAILS_RESET
  } from '../constents/userConstents'
  import axios from "axios";
//   import { ORDER_LIST_MY_RESET } from '../contents/orderContents'
  
  //用户登录Action
  export const login = (username, password) => async (dispatch) => {
    try {
      // 派发action type
      dispatch({ type: USER_LOGIN_REQUEST })
      // 设置headers内容类型（传递Json对象,username, password）
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      // data储存返回的信息
      const { data } = await axios.post(
        'http://localhost:8080/api/login',
        { username, password },
        config
      )
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      
      // 本地存储返回的信息，记录登陆状态和现在登陆的用户
      localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  //用户退出的action
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_LIST_RESET })
  dispatch({ type: USER_DETAILS_RESET })
  document.location.href = '/login'
}

//   //卖家登录Action
//   export const sellerLogin = (username, password) => async (dispatch) => {
//     try {
//       dispatch({ type: SELLER_LOGIN_REQUEST })
  
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
  
//       const { data } = await axios.post(
//         '/api/seller/login',
//         { username, password },
//         config
//       )
//       dispatch({ type: SELLER_LOGIN_SUCCESS, payload: data })
  
//       localStorage.setItem('userInfo', JSON.stringify(data))
//     } catch (error) {
//       dispatch({
//         type: SELLER_LOGIN_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }
  
  //用户退出的action
  export const userLogout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_LIST_RESET })
    dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: ORDER_LIST_MY_RESET })
    document.location.href = '/user/login'
  }


//   //卖家退出的action
//   export const sellerLogout = () => (dispatch) => {
//     localStorage.removeItem('userInfo')
//     dispatch({ type: SELLER_LOGOUT })
//     dispatch({ type: SELLER_LIST_RESET })
//     dispatch({ type: SELLER_DETAILS_RESET })
//     // dispatch({ type: ORDER_LIST_MY_RESET })
//     document.location.href = '/seller/login'
//   }
  
  //用户注册Action
  export const register = (username, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/users',
        { username, password },
        config
      )
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  