import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import React from 'react';
const ProtectedRoute=({children})=>{
    const {user}=React.useContext(AuthContext);
    if(user!=null){
        return children
    }
    else {
        return <Navigate to="/login" ></Navigate>
    }
}
export default ProtectedRoute;