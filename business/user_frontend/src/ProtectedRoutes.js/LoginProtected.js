import React from "react";
import { Navigate } from "react-router-dom";
const LoginProtected=({children})=>{
    let user=localStorage.getItem("user");
        if(user!=null){
            return children
        }
        else {
            return (
                <Navigate to="/" />
            )
        }
}

export default LoginProtected;