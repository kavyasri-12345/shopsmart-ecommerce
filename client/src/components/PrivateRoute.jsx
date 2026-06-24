import {
 Navigate,
 Outlet,
} from "react-router-dom";

function PrivateRoute() {

 const userInfo =
 JSON.parse(
 localStorage.getItem(
 "userInfo"
 ));

 return userInfo
 ? <Outlet/>
 : <Navigate to="/login"/>;
}

export default PrivateRoute;