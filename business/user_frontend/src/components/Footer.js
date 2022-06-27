import React from "react";
const Footer = () => {
    return (
        <div>
            <footer className="footer bg-dark pt-5">
                <div className="container pb-2">
                    <div className="row align-items-center pb-4">
                        <div className="col-md-6 col-xl-5">
                            {/* Links*/}
                            <div className="row">
                                <div className="col-sm-4 mb-4">
                                    <h3 className="h6 mb-2 pb-1 fs-base text-light">Finder</h3>
                                    <ul className="list-unstyled fs-sm">
                                        <li><a className="nav-link-light" href="#">About us</a></li>
                                        <li><a className="nav-link-light" href="#">News</a></li>
                                        <li><a className="nav-link-light" href="#">Contacts</a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-4 mb-4">
                                    <h3 className="h6 mb-2 pb-1 fs-base text-light">For Job Seekers</h3>
                                    <ul className="list-unstyled fs-sm">
                                        <li><a className="nav-link-light" href="#">Find job</a></li>
                                        <li><a className="nav-link-light" href="#">Post a resume</a></li>
                                        <li><a className="nav-link-light" href="#">Vacancy mailing</a></li>
                                    </ul>
                                </div>
                                <div className="col-sm-4 mb-4">
                                    <h3 className="h6 mb-2 pb-1 fs-base text-light">For Employers</h3>
                                    <ul className="list-unstyled fs-sm">
                                        <li><a className="nav-link-light" href="#">Find resume</a></li>
                                        <li><a className="nav-link-light" href="#">Post a job</a></li>
                                        <li><a className="nav-link-light" href="#">Resume mailing</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Socials*/}
                            <div className="text-nowrap border-top border-light py-4"><a className="btn btn-icon btn-translucent-light btn-xs rounded-circle me-2" href="#"><i className="fi-facebook" /></a><a className="btn btn-icon btn-translucent-light btn-xs rounded-circle me-2" href="#"><i className="fi-twitter" /></a><a className="btn btn-icon btn-translucent-light btn-xs rounded-circle me-2" href="#"><i className="fi-messenger" /></a><a className="btn btn-icon btn-translucent-light btn-xs rounded-circle me-2" href="#"><i className="fi-telegram" /></a><a className="btn btn-icon btn-translucent-light btn-xs rounded-circle" href="#"><i className="fi-whatsapp" /></a></div>
                        </div>
                    </div>
                    {/* Copyright*/}
                    <p className="fs-sm text-center text-sm-start mb-4"><span className="text-light opacity-50">© All rights reserved. Made by </span><a className="nav-link-light fw-bold" href="https://createx.studio/" target="_blank" rel="noopener">Createx Studio</a></p>
                </div>
            </footer>
            {/* Back to top button*/}<a className="btn-scroll-top" href="#top" data-scroll><span className="btn-scroll-top-tooltip text-muted fs-sm me-2">Top</span><i className="btn-scroll-top-icon fi-chevron-up">
            </i></a>
        </div>
    )
}

export default Footer;