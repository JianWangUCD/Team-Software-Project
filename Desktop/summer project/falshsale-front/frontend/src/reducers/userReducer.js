import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT} from "../constents/userConstents"
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL} from "../constents/userConstents"
import { SELLER_LOGIN_REQUEST, SELLER_LOGIN_SUCCESS, SELLER_LOGIN_FAIL, SELLER_LOGOUT} from "../constents/userConstents"

//用户登录reducer
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true }
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      // 不需要保存任何信息
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
  }

//卖家登录reducer
export const sellerLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case SELLER_LOGIN_REQUEST:
        return { loading: true }
      case SELLER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case SELLER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case SELLER_LOGOUT:
        return {}
      default:
        return state
    }
  }
  
  //用户注册reducer
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  
//   //更新用户详情reducer
//   export const userUpdateProfileReducer = (state = {}, action) => {
//     switch (action.type) {
//       case USER_UPDATE_PROFILE_REQUEST:
//         return { loading: true }
//       case USER_UPDATE_PROFILE_SUCCESS:
//         return { loading: false, userInfo: action.payload, success: true }
//       case USER_UPDATE_PROFILE_FAIL:
//         return { loading: false, error: action.payload }
//       case USER_UPDATE_PROFILE_RESET:
//         return {}
//       default:
//         return state
//     }
//   }
  
//   //获取用户列表reducer
//   export const userListReducer = (state = { users: [] }, action) => {
//     switch (action.type) {
//       case USER_LIST_REQUEST:
//         return { loading: true }
//       case USER_LIST_SUCCESS:
//         return { loading: false, users: action.payload }
//       case USER_LIST_FAIL:
//         return { loading: false, error: action.payload }
//       case USER_LIST_RESET:
//         return { users: [] }
//       default:
//         return state
//     }
//   }
  
//   //删除单个用户reducer
//   export const userDeleteReducer = (state = {}, action) => {
//     switch (action.type) {
//       case USER_DELETE_REQUEST:
//         return { loading: true }
//       case USER_DELETE_SUCCESS:
//         return { loading: false, success: true }
//       case USER_DELETE_FAIL:
//         return { loading: false, error: action.payload }
//       default:
//         return state
//     }
//   }
  
//   //更新单个用户资料reducer
//   export const userUpdateReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//       case USER_UPDATE_REQUEST:
//         return { loading: true }
//       case USER_UPDATE_SUCCESS:
//         return { loading: false, success: true }
//       case USER_UPDATE_FAIL:
//         return { loading: false, error: action.payload }
//       case USER_UPDATE_RESET:
//         return { user: {} }
//       default:
//         return state
//     }
//   }
