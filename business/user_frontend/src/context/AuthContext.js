import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from "react";
const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({ children }) => {
    const [user,setUser]=useState(null);
    const [is_vendor,setIsVendor]=useState(null);
    const [is_admin,setIsAdmin]=useState(null);
    const [searchdata,setSearchdata]=useState(null);
    const [error,setError]=useState({username:"",email:"",password:""});
    const [user_data,setUserData]=useState({first_name:"",last_name:"",email:"",image_field:"",profession:"",date_of_birth:""});
    const [loginError,setLoginError]=useState(null);
    const navigate = useNavigate();
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
    const searchfunction=async (e)=>{
        e.preventDefault();
        let search=e.target.search.value?e.target.search.value:"title";
        let location=e.target.location && e.target.location.value?e.target.location.value:"location";
        navigate(`/itemsearch/${search}/${location}`);
    }
    const filtersearch=async (e)=>{
        e.preventDefault();
        let rate_1_value=e.target.star_1 ? e.target.star_1.value:0;
        let rate_2_value=e.target.star_2 ? e.target.star_2.value:0;
        let rate_3_value=e.target.star_3 ? e.target.star_3.value:0;
        let rate_4_value=e.target.star_4 ? e.target.star_4.value:0;
        let rate_5_value=e.target.star_5 ? e.target.star_5.value:0;
        let address=e.target.address.value?e.target.address.value:'address';
        let city=e.target.city.value?e.target.city.value:"city";
        console.log(address,city);
        navigate(`/filteritems/${address}/${city}/${rate_1_value}/${rate_2_value}/${rate_3_value}/${rate_4_value}/${rate_5_value}`);
    }
    let loginUser = async (e) => {
        e.preventDefault();
        const csrf_token=getCookie('csrftoken');
        let url = "/api/login/";
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':csrf_token
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        });
        let data = await response.json();
        if (response.status === 200) {
            setUser(data.data.username);
            setIsVendor(data.data.vendor_ask);
            setIsAdmin(data.data.admin_ask);
            setUserData({first_name:data.data.first_name,last_name:data.data.last_name,email:data.data.email});
            document.getElementById("close-btn").click();
            document.getElementById("success_bootstrap_login").classList.add("show");
            document.getElementById("success_bootstrap_login").style.display="block";
            setLoginError(null);
        }
        else {
            setLoginError(data.message);
            document.getElementById("success_bootstrap_login").classList.remove("show");
            document.getElementById("success_bootstrap_login").style.display="none";
        }
    }
    let registerUser = async (e) => {
        e.preventDefault();
        const csrf_token=getCookie('csrftoken');
        let response = await fetch('/api/register/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':csrf_token
            },
            body: JSON.stringify({ 'first_name': e.target.first_name.value, 'last_name': e.target.last_name.value, 'username': e.target.username.value, 'email': e.target.email.value, 'password': e.target.password.value, 'password2': e.target.password2.value, 'vendor_ask': e.target.vendor_ask.value })
        });
        let data = await response.json();
        if (response.status == 201) {
            document.getElementById("register_success_alert").classList.add("show");
            document.getElementById("register_success_alert").style.display="block";
        }
        else {
            setError({username:data.username?data.username[0]:null,email:data.email?data.email[0]:null,password:data.password?data.password[0]:null});
            document.getElementById("register_success_alert").classList.remove("show");
            document.getElementById("register_success_alert").style.display="none";
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
            setUserData({first_name:data.first_name,last_name:data.last_name,email:data.email,image_field:data.image_field,profession:data.profession,date_of_birth:data.date_of_birth});
            localStorage.setItem("user",data.username);
        }
        else {
            setUser(null);
            setIsVendor(null);
            setIsAdmin(null);
            setUserData({first_name:null,last_name:null,email:null,image_field:null,profession:null,date_of_birth:null});
            localStorage.removeItem("user");
        }
    }
    let logoutUser = async () => {
        setUser(null);
        setIsVendor(null);
        setIsAdmin(null);
        setUserData({first_name:null,last_name:null,email:null,image_field:null,profession:null,date_of_birth:null});
        localStorage.removeItem("user");
    }
    let contextData = {
        loginUser: loginUser,
        user: user,
        registerUser: registerUser,
        logoutUser: logoutUser,
        vendor_ask:is_vendor,
        admin_ask:is_admin,
        searchfunction:searchfunction,
        searchdata:searchdata,
        getCookie:getCookie,
        user_data:user_data,
        logindata:logindata,
        error:error,
        loginError:loginError,
        filtersearch:filtersearch,
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