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

   
  } from '../contents/userContents'
  import axios from "axios";
//   import { ORDER_LIST_MY_RESET } from '../contents/orderContents'
  
  //用户登录Action
  export const userLogin = (username, password) => async (dispatch) => {
    try {
      // 派发action type
      dispatch({ type: USER_LOGIN_REQUEST })
      // 设置headers内容类型（传递Json对象）
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      // data储存返回的信息
      const { data } = await axios.post(
        '/api/users/login',
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

  //卖家登录Action
  export const sellerLogin = (username, password) => async (dispatch) => {
    try {
      dispatch({ type: SELLER_LOGIN_REQUEST })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/seller/login',
        { username, password },
        config
      )
      dispatch({ type: SELLER_LOGIN_SUCCESS, payload: data })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: SELLER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  //用户退出的action
  export const userLogout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_LIST_RESET })
    dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: ORDER_LIST_MY_RESET })
    document.location.href = '/user/login'
  }


  //卖家退出的action
  export const sellerLogout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: SELLER_LOGOUT })
    dispatch({ type: SELLER_LIST_RESET })
    dispatch({ type: SELLER_DETAILS_RESET })
    // dispatch({ type: ORDER_LIST_MY_RESET })
    document.location.href = '/seller/login'
  }
  
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
  
//   //用户详情Action
//   export const getUserDetails = (id) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: USER_DETAILS_REQUEST })
  
//       //获取登录成功后的用户信息
//       const {
//         userLogin: { userInfo },
//       } = getState()
  
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }
  
//       const { data } = await axios.get(`/api/users/${id}`, config)
//       dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
//     } catch (error) {
//       dispatch({
//         type: USER_DETAILS_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }
  
//   //更新用户详情Action
//   export const updateUserDetails = (user) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
  
//       //获取登录成功后的用户信息
//       const {
//         userLogin: { userInfo },
//       } = getState()
  
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }
  
//       const { data } = await axios.put(`/api/users/profile`, user, config)
//       dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
//       dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
//       localStorage.setItem('userInfo', JSON.stringify(data))
//     } catch (error) {
//       dispatch({
//         type: USER_UPDATE_PROFILE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }
  
//   //用户列表Action
//   export const listUsers = () => async (dispatch, getState) => {
//     try {
//       dispatch({ type: USER_LIST_REQUEST })
  
//       //获取登录成功后的用户信息
//       const {
//         userLogin: { userInfo },
//       } = getState()
  
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }
  
//       const { data } = await axios.get(`/api/users`, config)
//       dispatch({ type: USER_LIST_SUCCESS, payload: data })
//     } catch (error) {
//       dispatch({
//         type: USER_LIST_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }
  
//   //删除用户Action
//   export const deleteUser = (id) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: USER_DELETE_REQUEST })
  
//       //获取登录成功后的用户信息
//       const {
//         userLogin: { userInfo },
//       } = getState()
  
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }
  
//       await axios.delete(`/api/users/${id}`, config)
//       dispatch({ type: USER_DELETE_SUCCESS })
//     } catch (error) {
//       dispatch({
//         type: USER_DELETE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }
  
//   //更新用户资料Action
//   export const updateUser = (user) => async (dispatch, getState) => {
//     try {
//       dispatch({ type: USER_UPDATE_REQUEST })
  
//       //获取登录成功后的用户信息
//       const {
//         userLogin: { userInfo },
//       } = getState()
  
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }
  
//       const { data } = await axios.put(`/api/users/${user._id}`, user, config)
//       dispatch({ type: USER_UPDATE_SUCCESS })
//       dispatch({ type: USER_DETAILS_SUCCESS, payload: data })
//     } catch (error) {
//       dispatch({
//         type: USER_UPDATE_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }
  