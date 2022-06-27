import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardTemplate from "./layouts/DashboardTemplate";
import Dashboard from "./views/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import BusinessUpdate from "./views/BusinessUpdate";
import BusinessList from "./views/BusinessList";
import DeleteView from "./views/DeleteView";
import ProductList from "./views/ProductList";
import ClassifiedsList from "./views/ClassifiedsList";
import DealsList from "./views/DealsList";
import EventsList from "./views/EventsList";
import ClassifiedUpdate from "./views/UpdateViews/ClassifiedUpdate";
import ProductUpdate from "./views/UpdateViews/ProductUpdate";
import DealsUpdate from "./views/UpdateViews/DealsUpdate";
import EventsUpdate from "./views/UpdateViews/EventsUpdate";
import UsersView from "./views/AdminViews/Usersview";
import ApproveBusiness from "./views/AdminViews/ApproveBusiness";
import ApproveClassifieds from "./views/AdminViews/ApproveClassifieds";
import ApproveDeals from "./views/AdminViews/ApproveDeals";
import ApproveEvent from "./views/AdminViews/ApproveEvents";
import ApproveItemsDetail from "./views/ObjectDetailPages/ApproveBusinessDetail";
import ApproveProducts from "./views/AdminViews/ApproveProducts";
import MultipleLocations from "./views/MultipleLocation";
import MultipleLocationList from "./views/MultipleLocationList";
import LocationDelete from "./views/LocationDelete";
import MultipleLocationUpdate from "./views/UpdateViews/MultipleLocationUpdate";
import AdminDelete from "./views/AdminDelete";
import CategoryCreate from "./views/AdminViews/CategoryCreate";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <div className="wrapper">
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path="/dashboard" element={<DashboardTemplate />}>
                            <Route index element={<Dashboard />}></Route>
                        </Route>
                        <Route exact path="/updatebusinessform/:slug" element={<DashboardTemplate />}>
                            <Route index element={<BusinessUpdate/>}></Route>
                        </Route>
                        <Route exact path="/dashboardbusiness" element={<DashboardTemplate />}>
                            <Route index element={<BusinessList/>}></Route>
                        </Route>
                        <Route exact path="/dashboardclassifieds" element={<DashboardTemplate />}>
                            <Route index element={< ClassifiedsList/>}></Route>
                        </Route>
                        <Route exact path="/dashboarddeals" element={<DashboardTemplate />}>
                            <Route index element={< DealsList/>}></Route>
                        </Route>
                        <Route exact path="/dashboardevents" element={<DashboardTemplate />}>
                            <Route index element={< EventsList/>}></Route>
                        </Route>
                        <Route exact path="/dashboardproducts" element={<DashboardTemplate />}>
                            <Route index element={<ProductList/>}></Route>
                        </Route>
                        <Route exact path="/deleteview/:type/:slug" element={<DashboardTemplate />}>
                            <Route index element={< DeleteView/>}></Route>
                        </Route>
                        <Route exact path="/updateclassifiedform/:slug" element={<DashboardTemplate />}>
                            <Route index element={< ClassifiedUpdate/>}></Route>
                        </Route>
                        <Route exact path="/updatedealform/:slug" element={<DashboardTemplate />}>
                            <Route index element={< DealsUpdate/>}></Route>
                        </Route>
                        <Route exact path="/updateeventform/:slug" element={<DashboardTemplate />}>
                            <Route index element={< EventsUpdate/>}></Route>
                        </Route>
                        <Route exact path="/updateproductform/:slug" element={<DashboardTemplate />}>
                            <Route index element={<ProductUpdate/>}></Route>
                        </Route>
                        <Route exact path="/userslist" element={<DashboardTemplate />}>
                            <Route index element={<UsersView/>}></Route>
                        </Route>
                        <Route exact path="/approveitems" element={<DashboardTemplate />}>
                            <Route index element={<ApproveBusiness/>}></Route>
                        </Route>
                        <Route exact path="/approveclassifieds" element={<DashboardTemplate />}>
                            <Route index element={<ApproveClassifieds/>}></Route>
                        </Route>
                        <Route exact path="/approveevents" element={<DashboardTemplate />}>
                            <Route index element={<ApproveEvent/>}></Route>
                        </Route>
                        <Route exact path="/approvedeals" element={<DashboardTemplate />}>
                            <Route index element={<ApproveDeals/>}></Route>
                        </Route>
                        <Route exact path="/approvedetails/:slug" element={<DashboardTemplate />}>
                            <Route index element={<ApproveItemsDetail/>}></Route>
                        </Route>
                        <Route exact path="/approveproducts" element={<DashboardTemplate />}>
                            <Route index element={<ApproveProducts/>}></Route>
                        </Route>
                        <Route exact path="/locationform/:slug" element={<DashboardTemplate />}>
                            <Route index element={<MultipleLocations/>}></Route>
                        </Route>
                        <Route exact path="/dashboardlocations/:slug" element={<DashboardTemplate />}>
                            <Route index element={<MultipleLocationList/>}></Route>
                        </Route>
                        <Route exact path="/deletelocation/:business_slug/:slug" element={<DashboardTemplate />}>
                            <Route index element={< LocationDelete/>}></Route>
                        </Route>
                        <Route exact path="/updatelocation/:slug" element={<DashboardTemplate />}>
                            <Route index element={<MultipleLocationUpdate/>}></Route>
                        </Route>
                        <Route exact path="/deletebusiness/:slug" element={<DashboardTemplate />}>
                            <Route index element={<AdminDelete/>}></Route>
                        </Route>
                        <Route exact path="/createcategory" element={<DashboardTemplate />}>
                            <Route index element={<CategoryCreate/>}></Route>
                        </Route>
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    </React.StrictMode>
)
