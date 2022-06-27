import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext=React.createContext();
export default AuthContext;

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [is_vendor,setIsVendor]=useState(null);
    const [is_admin,setIsAdmin]=useState(null);
    const navigate=useNavigate();
    let  getCookie=(name)=> {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const loginUser=async(e)=>{
        e.preventDefault();
        const csrf_token=getCookie('csrftoken');
        const url='/api/login/';
        const response=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken':csrf_token
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value}),
        });
        const data=await response.json();
        if(response.status===200){
            setUser(data.data.username);
            setIsVendor(data.data.vendor_ask);
            navigate("/dashboard");
        }
        else {
            console.log("some problem there");
        }
    }
    let logindata=async ()=>{
        let url="/api/logindata";
        let response=await fetch(url);
        let data=await response.json();
        if(response.status==200){
            setUser(data.username);
            setIsVendor(data.vendor_ask);
            setIsAdmin(data.admin_ask);
        }
        else {
            setUser(null);
            setIsVendor(null);
            setIsAdmin(null);
        }
    }
    const logoutUser=()=>{
        setUser(null);
        setIsVendor(null);
        setIsAdmin(null);
    }
    const contextData={
        loginUser:loginUser,
        user:user,
        logOutUser:logoutUser,
        vendor_ask:is_vendor,
        admin_ask:is_admin,
        getCookie:getCookie
    }
    useEffect(() => {
        logindata();
    }, [user,is_vendor]);
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}