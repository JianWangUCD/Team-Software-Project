import { 
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL } from "../constents/productConstents"
import axios from "axios";
//获取所有产品的action

export const listProducts = () => async(dispatch) => {
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('http://localhost:9000/product-service/flashsale/products');

        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error){
        dispatch ({ type: PRODUCT_LIST_FAIL, payload: 
            error.response && error.response.data.message
        ? error.response.data.message
        : error.message, })
    }
}

//创建产品Action
export const addProduct = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST })
  
      //获取登录成功后的用户信息
      const {
        userLogin: { userInfo },
      } = getState()
  
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${userInfo.token}`,
    //     },
    //   }
  
      const { data } = await axios.post(`http://localhost:9000/product-service/flashsale/products`, {}, 
    //   config
      )
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

