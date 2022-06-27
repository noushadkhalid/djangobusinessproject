import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomepageTemplate from './OutletPage/HomepageTemplate';
import Homepage from './pages/Homepage';
import RedirectPage from './pages/RedirectPage';
import { AuthProvider } from './context/AuthContext';
import Catalog from "./pages/Catalog";
import Testing from "./pages/testing";
import Events from "./PageTypes/Events";
import Classifieds from "./PageTypes/Classifieds";
import Deals from "./PageTypes/Deals";
import BusinessDetail from "./DetailViewPages/BusinessDetail";
import BusinessInfo from "./DetailViewPages/BusinessInfo";
import BusinessReview from "./DetailViewPages/BusinessReview";
import CatalogSearch from "./pages/CatalogSearch";
import Account from "./pages/Account";
import UserReview from "./AccountPages/UserReview";
import LoginProtected from "./ProtectedRoutes.js/LoginProtected";
import ByCategory from "./Category/ByCategory";
import ResetPassword from "./pages/ResetPassword";
import GetEmailPage from "./pages/GetEmailPage";
import EmailVerification from "./pages/EmailVerification";
import FilterItems from "./components/Filters/FilterItemsPage";
import DeleteReview from "./AccountPages/DeleteReview";
import UserFavourites from "./AccountPages/UserFavourites";
import RemoveFavorites from "./AccountPages/RemoveFavorites";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<HomepageTemplate />}>
                        <Route index element={<Homepage />}></Route>
                    </Route>
                    <Route path="/catalog" element={<HomepageTemplate/>}>
                        <Route index element={<Catalog/>}></Route>
                    </Route>
                    <Route path="/businessdetail/:slug" element={<HomepageTemplate/>}>
                        <Route index element={<BusinessDetail/>}></Route>
                    </Route>
                    <Route path="/businessinfo/:slug" element={<HomepageTemplate/>}>
                        <Route index element={<BusinessInfo/>}></Route>
                    </Route>
                    <Route path="/businessreview/:slug" element={<HomepageTemplate/>}>
                        <Route index element={<BusinessReview/>}></Route>
                    </Route>
                    <Route path="/itemsearch/:title/:location" element={<HomepageTemplate/>}>
                        <Route index element={<CatalogSearch/>}></Route>
                    </Route>
                    <Route path="/events" element={<HomepageTemplate/>}>
                        <Route index element={<Events/>}></Route>
                    </Route>
                    <Route path="/deals" element={<HomepageTemplate/>}>
                        <Route index element={<Deals/>}></Route>
                    </Route>
                    <Route path="/classifieds" element={<HomepageTemplate/>}>
                        <Route index element={<Classifieds/>}></Route>
                    </Route>
                    <Route path="/account" element={<LoginProtected><HomepageTemplate/></LoginProtected>}>
                        <Route index element={<Account/>}></Route>
                    </Route>
                    <Route path="/user_reviews" element={<LoginProtected><HomepageTemplate/></LoginProtected>}>
                        <Route index element={<UserReview/>}></Route>
                    </Route>
                    <Route path="/category/:category" element={<HomepageTemplate/>}>
                        <Route index element={<ByCategory/>}></Route>
                    </Route>
                    <Route path="/reset/user/:uid/:token" element={<HomepageTemplate/>}>
                        <Route index element={<ResetPassword/>}></Route>
                    </Route>
                    <Route path="/emailpage" element={<HomepageTemplate/>}>
                        <Route index element={<GetEmailPage/>}></Route>
                    </Route>
                    <Route path="/verifyemail/user/:uid/:token" element={<HomepageTemplate/>}>
                        <Route index element={<EmailVerification/>}></Route>
                    </Route>
                    <Route path="/filteritems/:address/:city/:rate_1/:rate_2/:rate_3/:rate_4/:rate_5" element={<HomepageTemplate/>}>
                        <Route index element={<FilterItems/>}></Route>
                    </Route>
                    <Route path="/reviewdelete/:slug" element={<LoginProtected><HomepageTemplate/></LoginProtected>}>
                        <Route index element={<DeleteReview/>}></Route>
                    </Route>
                    <Route path="/myfavourites" element={<LoginProtected><HomepageTemplate/></LoginProtected>}>
                        <Route index element={<UserFavourites/>}></Route>
                    </Route>
                    <Route path="/favoritesremove/:slug" element={<LoginProtected><HomepageTemplate/></LoginProtected>}>
                        <Route index element={<RemoveFavorites/>}></Route>
                    </Route>
                    <Route path="/testing" element={<Testing/>}>
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    </React.StrictMode>
)
