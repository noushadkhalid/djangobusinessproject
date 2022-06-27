import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from 'react-router-dom';
import React, { useEffect } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
const HomepageTemplate = () => {
    const onloadfunction = () => {
        var preloader = document.querySelector('.page-loading');
        preloader.classList.remove('active');
        setTimeout(function () {
            preloader.remove();
        }, 2000);
    }
    useEffect(() => {
        onloadfunction();
    }, []);
    return (
        <div>
            <div className="page-loading active">
                <div className="page-loading-inner">
                    <div className="page-spinner" /><span>Loading...</span>
                </div>
            </div>
            <main class="page-wrapper">
                <Header />
                <Login />
                <Register />
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
export default HomepageTemplate;