import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import React from 'react';

const AdminProtected=({children})=>{
    const {admin_ask}=React.useContext(AuthContext);
    setTimeout(()=>{
        if(admin_ask==true){
            return children
        }
        else {
            return <Navigate to="/dashboard" ></Navigate>
        }
    },4000);
}
export default AdminProtected;