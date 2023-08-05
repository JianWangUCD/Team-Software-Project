import { BASE_URL } from "../api";
import { 
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL } from "../constents/productConstents"
import axios from "axios";



//获取所有产品的action
export const listProducts = () => async(dispatch) => {
    // const axios = useAxiosWithAuth();
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`${BASE_URL}/product-service/flashsale/products`);
        // const { data } = await axios.get(`/product-service/flashsale/products`);
        
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error){
        dispatch ({ type: PRODUCT_LIST_FAIL, payload: 
            error.response && error.response.data.message
        ? error.response.data.message
        : error.message, })
    }
}


