import React from "react";
import { Link } from "react-router-dom";
import BusinessCarousel from "../components/homecomponents/BusinessCarousel";
import ClassifedsCarousel from "../components/homecomponents/ClassifiedsCarousel";
import DealsCarousel from "../components/homecomponents/DealsCarousel";
import EventCarousel from "../components/homecomponents/EventCarousel";
import AuthContext from "../context/AuthContext";
const Homepage = () => {
    const { searchfunction } = React.useContext(AuthContext);
    return (
        <div>
            <section className="bg-dark pb-4 pt-5">
                <div className="container py-5">
                    <div className="row align-items-center mt-2 mt-md-0 pt-md-4 pt-lg-5 pb-5">
                        <div className="col-md-5 order-md-2 mb-5 mb-md-0">
                            <div className="parallax mx-auto" style={{ maxWidth: 526 }}>
                                <div className="parallax-layer position-relative" data-depth="0.1"><img src="static/img/job-board/hero-banner-1/layer01.svg" alt="Layer" /></div>
                                <div className="parallax-layer" data-depth="0.16"><img src="static/img/job-board/hero-banner-1/layer02.svg" alt="Layer" /></div>
                                <div className="parallax-layer" data-depth="0.38"><img src="static/img/job-board/hero-banner-1/layer03.svg" alt="Layer" /></div>
                                <div className="parallax-layer" data-depth="0.16"><img src="static/img/job-board/hero-banner-1/layer04.svg" alt="Layer" /></div>
                                <div className="parallax-layer" data-depth="0.16"><img src="static/img/job-board/hero-banner-1/layer05.svg" alt="Layer" /></div>
                                <div className="parallax-layer" data-depth="0.45"><img src="static/img/job-board/hero-banner-1/layer06.svg" alt="Layer" /></div>
                                <div className="parallax-layer" data-depth="0.3"><img src="static/img/job-board/hero-banner-1/layer07.svg" alt="Layer" /></div>
                                <div className="parallax-layer" data-depth="0.2"><img src="static/img/job-board/hero-banner-1/layer08.svg" alt="Layer" /></div>
                            </div>
                        </div>
                        <div className="col-md-7 order-md-1">
                            <h1 className="display-4 text-light pb-2 mb-4 mb-lg-5" style={{ maxWidth: '29.5rem' }}>Hack your way to the <span className="text-primary">dream job</span></h1>
                            <h2 className="h5 text-light mb-4">Popular requests:</h2>
                            <div className="d-flex flex-wrap"><a className="btn btn-translucent-light btn-xs rounded-pill fs-sm me-2 mb-2" href="#"><i className="fi-search me-2" />Engineer</a><a className="btn btn-translucent-light btn-xs rounded-pill fs-sm me-2 mb-2" href="#"><i className="fi-search me-2" />Customer Service</a><a className="btn btn-translucent-light btn-xs rounded-pill fs-sm me-2 mb-2" href="#"><i className="fi-search me-2" />Delivery</a><a className="btn btn-translucent-light btn-xs rounded-pill fs-sm me-2 mb-2" href="#"><i className="fi-search me-2" />Cashier</a><a className="btn btn-translucent-light btn-xs rounded-pill fs-sm me-2 mb-2" href="#"><i className="fi-search me-2" />Remote</a><a className="btn btn-translucent-light btn-xs rounded-pill fs-sm mb-2" href="#"><i className="fi-search me-2" />IT</a></div>
                        </div>
                    </div>
                    {/* Search form*/}
                    <form className="form-group form-group-light d-block rounded-xl-pill mt-n3 mt-md-4 mt-xl-5 mb-md-4" onSubmit={searchfunction}>
                        <div className="row align-items-center g-0 ms-n2">
                            <div className="col-md-5 col-xl-3">
                                <div className="input-group input-group-lg border-end-md border-light"><span className="input-group-text text-light rounded-pill opacity-50 ps-3"><i className="fi-search" /></span>
                                    <input className="form-control" type="text" placeholder="Enter Title..." name="search"  />
                                </div>
                            </div>
                            <hr className="hr-light d-md-none my-2" />
                            <div className="col-md-7 col-xl-6 d-sm-flex">
                                <div className="input-group input-group-lg border-end-md border-light"><span className="input-group-text text-light rounded-pill opacity-50 ps-3"><i className="fi-map-pin me-2">
                                </i>
                                </span>
                                    <input className="form-control" type="text" placeholder="Enter Location..." name="location"  />
                                </div>
                                <hr className="hr-light d-sm-none my-2" />
                                <div className="dropdown w-sm-50 border-end-xl border-light" >
                                    <button className="btn btn-primary btn-lg w-100 w-sm-50 w-lg-auto rounded-pill mt-4 mt-sm-0" type="submit">Search</button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </section >
            {/* Categories*/}
            < section className="position-relative bg-white rounded-xxl-4 pt-md-3 zindex-5" style={{ marginTop: '-30px' }}>
                <div className="container pt-5 pb-2 mb-4 mb-md-5">
                    <h2 className="h3 pb-2 pb-sm-3">Items By Category</h2>
                    <div className="d-flex flex-wrap flex-column flex-sm-row"><Link className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 bg-secondary rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4" to="/category/Oil Company">
                        <div className="icon-box-media bg-light text-primary rounded-circle me-2"><i className="fi-accounting" /></div>
                        <h3 className="icon-box-title fs-sm ps-1 pe-2 mb-0">Oil Company</h3>
                    </Link><Link className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 bg-secondary rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4" to="/category/Electronics">
                            <div className="icon-box-media bg-light text-primary rounded-circle me-2"><i className="fi-meds" /></div>
                            <h3 className="icon-box-title fs-sm ps-1 pe-2 mb-0">Electronics</h3>
                        </Link><Link className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 bg-secondary rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4" to="/category/Iron">
                            <div className="icon-box-media bg-light text-primary rounded-circle me-2"><i className="fi-plant" /></div>
                            <h3 className="icon-box-title fs-sm ps-1 pe-2 mb-0">Iron</h3>
                        </Link><Link className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 bg-secondary rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4" to="/category/Plumber">
                            <div className="icon-box-media bg-light text-primary rounded-circle me-2"><i className="fi-computer" /></div>
                            <h3 className="icon-box-title fs-sm ps-1 pe-2 mb-0">Plumber</h3>
                        </Link><Link className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 bg-secondary rounded-pill py-2 ps-2 pe-4 mb-2 mb-sm-3 me-sm-3 me-xxl-4" to="/category/Wood">
                            <div className="icon-box-media bg-light text-primary rounded-circle me-2"><i className="fi-security" /></div>
                            <h3 className="icon-box-title fs-sm ps-1 pe-2 mb-0">Wood</h3>
                        </Link>
                        <div className="dropdown mb-2 mb-sm-3"><a className="icon-box card flex-row align-items-center flex-shrink-0 card-hover border-0 bg-secondary rounded-pill py-2 ps-2 pe-4" href="/catalog" data-bs-toggle="dropdown">
                            <div className="icon-box-media bg-light text-primary rounded-circle me-2"><i className="fi-dots-horisontal" />
                            </div>
                            <h3 className="icon-box-title fs-sm ps-1 pe-2 mb-0">More</h3>
                        </a>
                            <div className="dropdown-menu dropdown-menu-sm-end my-1"><Link className="dropdown-item fw-bold" to="/category/Carpenter"><i className="fi-briefcase fs-base opacity-60 me-2" />Carpenter</Link><a className="dropdown-item fw-bold" href="job-board-catalog.html"><i className="fi-building fs-base opacity-60 me-2" />Construction</a><a className="dropdown-item fw-bold" href="job-board-catalog.html"><i className="fi-car fs-base opacity-60 me-2" />Transportation</a><a className="dropdown-item fw-bold" href="job-board-catalog.html"><i className="fi-cart fs-base opacity-60 me-2" />Retail &amp; Shopping</a><a className="dropdown-item fw-bold" href="job-board-catalog.html"><i className="fi-cash fs-base opacity-60 me-2" />Finance</a></div>
                        </div>
                    </div>
                </div>
            </section >
            {/* Where to stay*/}
            < section className="container mb-sm-5 mb-4 pb-lg-4" >
                <BusinessCarousel />
            </section >
            {/* Deals */}
            < section className="container mb-sm-5 mb-4 pb-lg-4" >
                <DealsCarousel />
            </section >
            {/* Events */}
            < section className="container mb-sm-5 mb-4 pb-lg-4" >
                <EventCarousel />
            </section >
            {/* Classifieds */}
            < section className="container mb-sm-5 mb-4 pb-lg-4" >
                <ClassifedsCarousel />
            </section >
            {/* Banners*/}
            < section className="container mb-4 mb-md-5" >
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="d-sm-flex align-items-center">
                                <div className="pt-4 ps-sm-4 py-sm-4 p-lg-5 flex-shrink-0"><img className="d-block mx-auto" src="static/img/pricing/icon-4.svg" width={86} alt="Icon" /></div>
                                <div className="card-body text-center text-sm-start">
                                    <h2 className="h5 mb-2">Recently added jobs</h2>
                                    <p className="mb-sm-4">Nulla sit congue nunc lacus, laoreet nulla iaculis faucibus. Ut morbi enim.</p><a className="fw-bold text-decoration-none py-1" href="job-board-catalog.html">Find jobs<i className="fi-chevron-right fs-xs ms-2" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="d-sm-flex align-items-center">
                                <div className="pt-4 ps-sm-4 py-sm-4 p-lg-5 flex-shrink-0"><img className="d-block mx-auto" src="static/img/pricing/icon-1.svg" width={86} alt="Icon" /></div>
                                <div className="card-body text-center text-sm-start">
                                    <h2 className="h5 mb-2">Urgently hiring</h2>
                                    <p className="mb-sm-4">Viverra gravida id magna diam enim morbi enim mi vestibulum. Mus aliquet ut facilisi
                                        elit.</p><a className="fw-bold text-decoration-none py-1" href="job-board-catalog.html">Find jobs<i className="fi-chevron-right fs-xs ms-2" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* Jobs list + Post resume CTA*/}
            < section className="container pb-5 mb-md-4" >
                <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <div className="d-sm-flex align-items-center justify-content-between pb-4 mb-sm-2">
                            <h2 className="h3 mb-sm-0">Jobs of the day</h2><a className="btn btn-link fw-normal p-0" href="job-board-catalog.html">View all<i className="fi-arrow-long-right ms-2" /></a>
                        </div>
                        {/* Accordion*/}
                        <div id="accordionJobs">
                            <div className="card bg-secondary collapsed mb-2" data-bs-toggle="collapse" data-bs-target="#jobCollapse1">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="d-flex align-items-center"><img className="me-2" src="static/img/job-board/company/it-pro.png" width={24} alt="IT Pro Logo" /><span className="fs-sm text-dark opacity-80 ps-1">IT Pro TV</span></div>
                                        <span className="badge bg-faded-danger rounded-pill fs-sm">Hot</span>
                                    </div>
                                    <h3 className="h6 card-title pt-1 mb-0">Business Analyst</h3>
                                </div>
                                <div className="collapse" id="jobCollapse1" data-bs-parent="#accordionJobs">
                                    <div className="card-body mt-n1 pt-0">
                                        <p className="fs-sm">Euismod nec sagittis sit arcu libero, metus. Aliquam nisl rhoncus porttitor volutpat,
                                            ante cras tincidunt. Nec sit nunc, ornare tincidunt enim, neque. Ornare pulvinar enim fames orci
                                            enim in libero. <a href="#">Read more...</a></p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="fs-sm"><span className="text-nowrap me-3"><i className="fi-map-pin text-muted me-1">
                                            </i>Chicago</span><span className="text-nowrap me-3"><i className="fi-cash fs-base text-muted me-1" />$7,500</span></div>
                                            <button className="btn btn-icon btn-light btn-xs text-primary shadow-sm rounded-circle" type="button" data-bs-toggle="tooltip" title="Add to saved jobs"><i className="fi-heart" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-secondary mb-2" data-bs-toggle="collapse" data-bs-target="#jobCollapse2">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="d-flex align-items-center"><img className="me-2" src="static/img/job-board/company/xbox.png" width={24} alt="Xbox Logo" /><span className="fs-sm text-dark opacity-80 ps-1">Xbox Company</span></div>
                                        <span className="badge bg-faded-accent rounded-pill fs-sm">Featured</span>
                                    </div>
                                    <h3 className="h6 card-title pt-1 mb-0">Full-Stack Developer</h3>
                                </div>
                                <div className="collapse show" id="jobCollapse2" data-bs-parent="#accordionJobs">
                                    <div className="card-body mt-n1 pt-0">
                                        <p className="fs-sm">Euismod nec sagittis sit arcu libero, metus. Aliquam nisl rhoncus porttitor volutpat,
                                            ante cras tincidunt. Nec sit nunc, ornare tincidunt enim, neque. Ornare pulvinar enim fames orci
                                            enim in libero. <a href="#">Read more...</a></p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="fs-sm"><span className="text-nowrap me-3"><i className="fi-map-pin text-muted me-1">
                                            </i>Washington</span><span className="text-nowrap me-3"><i className="fi-cash fs-base text-muted me-1" />$13,000</span></div>
                                            <button className="btn btn-icon btn-light btn-xs text-primary shadow-sm rounded-circle" type="button" data-bs-toggle="tooltip" title="Add to saved jobs"><i className="fi-heart" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-secondary collapsed mb-2" data-bs-toggle="collapse" data-bs-target="#jobCollapse3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="d-flex align-items-center"><img className="me-2" src="static/img/job-board/company/xampp.png" width={24} alt="XAMPP Logo" /><span className="fs-sm text-dark opacity-80 ps-1">XAMPP Company</span>
                                        </div><span className="badge bg-faded-danger rounded-pill fs-sm">Hot</span>
                                    </div>
                                    <h3 className="h6 card-title pt-1 mb-0">Sales Manager</h3>
                                </div>
                                <div className="collapse" id="jobCollapse3" data-bs-parent="#accordionJobs">
                                    <div className="card-body mt-n1 pt-0">
                                        <p className="fs-sm">Euismod nec sagittis sit arcu libero, metus. Aliquam nisl rhoncus porttitor volutpat,
                                            ante cras tincidunt. Nec sit nunc, ornare tincidunt enim, neque. Ornare pulvinar enim fames orci
                                            enim in libero. <a href="#">Read more...</a></p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="fs-sm"><span className="text-nowrap me-3"><i className="fi-map-pin text-muted me-1"> </i>New
                                                Jersey</span><span className="text-nowrap me-3"><i className="fi-cash fs-base text-muted me-1" />$6,500</span></div>
                                            <button className="btn btn-icon btn-light btn-xs text-primary shadow-sm rounded-circle" type="button" data-bs-toggle="tooltip" title="Add to saved jobs"><i className="fi-heart" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card bg-secondary collapsed mb-2" data-bs-toggle="collapse" data-bs-target="#jobCollapse4">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="d-flex align-items-center"><img className="me-2" src="static/img/job-board/company/elastic.png" width={24} alt="Elastic Logo" /><span className="fs-sm text-dark opacity-80 ps-1">Elastic Inc.</span>
                                        </div><span className="badge bg-faded-accent rounded-pill fs-sm">Featured</span>
                                    </div>
                                    <h3 className="h6 card-title pt-1 mb-0">Senior Credit Analyst</h3>
                                </div>
                                <div className="collapse" id="jobCollapse4" data-bs-parent="#accordionJobs">
                                    <div className="card-body mt-n1 pt-0">
                                        <p className="fs-sm">Euismod nec sagittis sit arcu libero, metus. Aliquam nisl rhoncus porttitor volutpat,
                                            ante cras tincidunt. Nec sit nunc, ornare tincidunt enim, neque. Ornare pulvinar enim fames orci
                                            enim in libero. <a href="#">Read more...</a></p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="fs-sm"><span className="text-nowrap me-3"><i className="fi-map-pin text-muted me-1">
                                            </i>Dallas</span><span className="text-nowrap me-3"><i className="fi-cash fs-base text-muted me-1" />$8,000</span></div>
                                            <button className="btn btn-icon btn-light btn-xs text-primary shadow-sm rounded-circle" type="button" data-bs-toggle="tooltip" title="Add to saved jobs"><i className="fi-heart" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <hr className="hr-vertical mx-auto" />
                    </div>
                    <div className="col-md-5 text-center text-md-start"><img className="d-block mx-auto mb-4" src="static/img/job-board/illustrations/post-resume-cta2.svg" width={416} alt="Illustration" />
                        <h2 className="h3 pt-2 mb-4">Professional CV&nbsp;is&nbsp;your ticket to&nbsp;the&nbsp;dream job</h2>
                        <p className="pb-md-3">Create a&nbsp;great resume on&nbsp;Finder and take a&nbsp;step toward finding your dream&nbsp;job!</p><a className="btn btn-primary btn-lg rounded-pill ms-sm-auto" href="job-board-post-resume-1.html">Post resume<i className="fi-chevron-right fs-sm ms-2" /></a>
                    </div>
                </div>
            </section >
            {/* Blog*/}
            < section className="container pb-4 pb-md-5 mb-2 mb-md-3" >
                <div className="d-sm-flex align-items-center justify-content-between pb-4 mb-sm-2">
                    <h2 className="h3 mb-sm-0">Online journal by top HRs</h2><a className="btn btn-link fw-normal p-0" href="job-board-blog.html">Go to blog<i className="fi-arrow-long-right ms-2" /></a>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-4">
                        <article className="card card-hover border-0 shadow-sm h-100"><a className="card-img-top overflow-hidden position-relative" href="job-board-blog-single.html"><span className="badge bg-faded-info position-absolute top-0 end-0 fs-sm rounded-pill m-3">New</span><img className="d-block" src="static/img/job-board/blog/03.jpg" alt="Image" /></a>
                            <div className="card-body pb-3"><a className="fs-xs text-uppercase text-decoration-none" href="#">Guides</a>
                                <h3 className="fs-base pt-1 mb-2"><a className="nav-link" href="job-board-blog-single.html">How to Hire
                                    World-Class Engineers</a></h3>
                                <p className="fs-sm text-muted m-0">Nunc, hac augue ante in facilisi id. Consectetur egestas orci, arcu ac
                                    tellus. Morbi orci, nunc dictum...</p>
                            </div><a className="card-footer d-flex align-items-center text-decoration-none border-top-0 pt-0 mb-1" href="#"><img className="rounded-circle" src="static/img/avatars/16.png" width={44} alt="Avatar" />
                                <div className="ps-2">
                                    <h6 className="fs-sm text-nav lh-base mb-1">Bessie Cooper</h6>
                                    <div className="d-flex text-body fs-xs"><span className="me-2 pe-1"><i className="fi-calendar-alt opacity-70 me-1" />May 23</span><span><i className="fi-chat-circle opacity-70 me-1" />4 comments</span></div>
                                </div>
                            </a>
                        </article>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-sm-6 mb-4">
                                <article className="card card-hover border-0 shadow-sm h-100"><a className="card-img-top overflow-hidden position-relative" href="job-board-blog-single.html"><img className="d-block" src="static/img/job-board/blog/04.jpg" alt="Image" /></a>
                                    <div className="card-body pb-3"><a className="fs-xs text-uppercase text-decoration-none" href="#">Guides</a>
                                        <h3 className="fs-base pt-1 mb-2"><a className="nav-link" href="job-board-blog-single.html">How to Choose Your
                                            First Job In Tech</a></h3>
                                    </div><a className="card-footer d-flex align-items-center text-decoration-none border-top-0 pt-0 mb-1" href="#"><img className="rounded-circle" src="static/img/avatars/18.png" width={44} alt="Avatar" />
                                        <div className="ps-2">
                                            <h6 className="fs-sm text-nav lh-base mb-1">Annette Black</h6>
                                            <div className="d-flex text-body fs-xs"><span className="me-2 pe-1"><i className="fi-calendar-alt opacity-70 me-1" />May 21</span><span><i className="fi-chat-circle opacity-70 me-1" />No comments</span></div>
                                        </div>
                                    </a>
                                </article>
                            </div>
                            <div className="col-sm-6 mb-4">
                                <article className="card card-hover border-0 shadow-sm h-100"><a className="card-img-top overflow-hidden position-relative" href="job-board-blog-single.html"><img className="d-block" src="static/img/job-board/blog/05.jpg" alt="Image" /></a>
                                    <div className="card-body pb-3"><a className="fs-xs text-uppercase text-decoration-none" href="#">Tips &amp;
                                        Advice</a>
                                        <h3 className="fs-base pt-1 mb-2"><a className="nav-link" href="job-board-blog-single.html">15 Tips for a
                                            Better Resume</a></h3>
                                    </div><a className="card-footer d-flex align-items-center text-decoration-none border-top-0 pt-0 mb-1" href="#"><img className="rounded-circle" src="static/img/avatars/17.png" width={44} alt="Avatar" />
                                        <div className="ps-2">
                                            <h6 className="fs-sm text-nav lh-base mb-1">Ralph Edwards</h6>
                                            <div className="d-flex text-body fs-xs"><span className="me-2 pe-1"><i className="fi-calendar-alt opacity-70 me-1" />May 19</span><span><i className="fi-chat-circle opacity-70 me-1" />1 comment</span></div>
                                        </div>
                                    </a>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}
export default Homepage;