// import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constents/productConstents"


import { BASE_URL } from '../api';
import {
    USER_DETAILS_RESET,
    USER_LIST_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
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
        `${BASE_URL}/user-service/login`,
        { username, password },
        config
      )
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      
      // 本地存储返回的信息，记录登陆状态和现在登陆的用户
      localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: "Incorrect username or password",
        });
      } else {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.message,
        });
      }
    }}

  //用户退出的action
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_LIST_RESET })
  dispatch({ type: USER_DETAILS_RESET })
  document.location.href = '/login'
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

  