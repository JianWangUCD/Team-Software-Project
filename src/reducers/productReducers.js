import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from '../constents/productConstents'

// 获取所有产品的reducer
export const productListReducer = (state = {products: []}, action) => {
    switch(action.type) {
        // 发起请求
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products : []}
        // 请求成功
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products:action.payload }
        // 请求失败 ：loading false， error属性
        case PRODUCT_LIST_FAIL:
            return { loading: false, srror: action.payload }
            default:
                return state
    }
}
