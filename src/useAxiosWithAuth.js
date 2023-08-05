import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "./api";
import MessageBox from "./component/MessageBox";


// 创建一个函数组件，用于获取用户令牌并创建Axios实例
function useAxiosWithAuth() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const axiosRequest = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      "Authorization": userInfo && userInfo.token ? `Bearer ${userInfo.token}` : undefined,
    },
  });


  return axiosRequest;
}

// 导出自定义的Axios实例
export default useAxiosWithAuth;