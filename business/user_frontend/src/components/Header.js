import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
    const { user, logoutUser, vendor_ask,admin_ask } = useContext(AuthContext);
    return (
        <div>
            <header className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" data-scroll-header>
                <div className="container"><Link className="navbar-brand me-0 me-xl-4" to="/"><img className="d-block" src="/static/img/logo/logo-light.svg" width={116} alt="Finder" /></Link>
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
                    {
                        vendor_ask == true && admin_ask==false && <a className="btn btn-primary btn-sm rounded-pill ms-2 order-lg-3" href="/dashboard" target="_blank">Vendor Dashboard</a>
                    }
                    {
                        vendor_ask == false && admin_ask==false && <a className="btn btn-primary btn-sm rounded-pill ms-2 order-lg-3" href="/dashboard" target="_blank">User Dashboard</a>
                    }
                    {
                        vendor_ask==true && admin_ask==true && <a className="btn btn-primary btn-sm rounded-pill ms-2 order-lg-3" href="/dashboard" target="_blank">Admin Dashboard</a>
                    }
                    <div className="collapse navbar-collapse order-lg-2" id="navbarNav">
                        <ul className="navbar-nav navbar-nav-scroll" style={{ maxHeight: '35rem' }}>
                            {/* Demos switcher*/}
                            <li className="nav-item dropdown me-lg-2"><a className="nav-link dropdown-toggle align-items-center pe-lg-4" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false"><i className="fi-layers me-2" />Demos<span className="d-none d-lg-block position-absolute top-50 end-0 translate-middle-y border-end border-light" style={{ width: 1, height: 30 }} /></a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="real-estate-home-v1.html"><i className="fi-building fs-base me-2" />Real Estate Demo</a></li>
                                    <li className="dropdown-divider" />
                                    <li><a className="dropdown-item" href="car-finder-home.html"><i className="fi-car fs-base me-2" />Car Finder Demo</a></li>
                                    <li className="dropdown-divider" />
                                    <li><a className="dropdown-item" href="job-board-home-v1.html"><i className="fi-briefcase fs-base me-2" />Job Board Demo</a></li>
                                    <li className="dropdown-divider" />
                                    <li><a className="dropdown-item" href="city-guide-home-v1.html"><i className="fi-map-pin fs-base me-2" />City Guide Demo</a></li>
                                    <li className="dropdown-divider" />
                                    <li><a className="dropdown-item" href="index.html"><i className="fi-home fs-base me-2" />Main Page</a></li>
                                    <li><a className="dropdown-item" href="components/typography.html"><i className="fi-list fs-base me-2" />Components</a></li>
                                    <li><a className="dropdown-item" href="docs/dev-setup.html"><i className="fi-file fs-base me-2" />Documentation</a></li>
                                </ul>
                            </li>
                            {/* Menu items*/}
                            <li className="nav-item"><Link className="nav-link" to="/" role="button" aria-expanded="false">Home</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/catalog" role="button" aria-expanded="false">Catalog</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/deals" role="button" aria-expanded="false">Deals</Link>
                            </li>
                            {
                                user ? <li className="nav-item"><Link className="nav-link"   to="/account"><i className="fi-user me-2" />Profile</Link></li> :
                                    <li className="nav-item"><a className="nav-link" href="#signin-modal" data-bs-toggle="modal"><i className="fi-user me-2" />Sign in</a></li>
                            }
                            {
                                user &&
                                <li className="nav-item">
                                    <a className="nav-link" href="/api/logout" onClick={logoutUser}>Log Out</a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </header>

        </div>
    )
}
export default Header;