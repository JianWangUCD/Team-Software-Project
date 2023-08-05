// import { useSelector } from 'react-redux';
// import { Route, Navigate } from 'react-router-dom';

// // 路由保护的高阶组件
// export default function protectedRoute({ role, component: Component, ...rest }) {

//         // 返回获取的状态值
//         const userLogin = useSelector( state  => state.userLogin)
//         const { loading, error, userInfo } = userLogin

//   // 检查用户的角色是否与路由所需角色匹配
//   const isAuthorized = role === userInfo.role;

//   return (
//     <Route
//       {...rest}
//       element={isAuthorized ? <Component /> : <Navigate to="/login" />}
//     />
//   );
// }

import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

// 路由保护的高阶组件
function ProtectedRoute({ role, component: Component, ...rest }) {
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // 检查用户的角色是否与路由所需角色匹配
  const isAuthorized = role === userInfo.role;

  return (
    <Route
      {...rest}
      element={isAuthorized ? <Component /> : <Navigate to="/login" />}
    />
  );
}

export default ProtectedRoute;
