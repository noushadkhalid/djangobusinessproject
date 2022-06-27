import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import BusinessForm from "../views/BusinessForm"
import DashboardTemplate from "./DashboardTemplate";
import Login from "../views/Login";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../utils/ProtectedRoute";
const Admin = () => {
  return (
    <div className="wrapper">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><DashboardTemplate /></ProtectedRoute>}>
              <Route index element={<Dashboard />}></Route>
              <Route exact path="/businessform" element={<BusinessForm />}></Route>
            </Route>
            <Route exact path="/login" element={<Login />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default Admin;
