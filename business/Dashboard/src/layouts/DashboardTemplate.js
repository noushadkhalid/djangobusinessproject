import {Outlet} from "react-router-dom";
import Header from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import React from "react";
const DashboardTemplate=()=>{
    return (
        <div>
            <Header/>
            <Sidebar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default DashboardTemplate;