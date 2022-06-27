import React from "react";

const CategoryNavbar = () => {
    return (
        <div className="tab-pane fade show" id="categories" role="tabpanel">
            <div className="row row-cols-lg-2 row-cols-1 g-3">
                <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Electronics">
                    <div className="icon-box-media bg-faded-accent text-accent rounded-circle mb-3 mx-auto"><i className="fi-bed" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Electronics</h3></a></div>
                <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Wood">
                    <div className="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i className="fi-shopping-bag" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Wood</h3></a></div>
                <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Oil Company">
                    <div className="icon-box-media bg-faded-info text-info rounded-circle mb-3 mx-auto"><i className="fi-meds" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Oil Company</h3></a></div>
                <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Plumber">
                    <div className="icon-box-media bg-faded-warning text-warning rounded-circle mb-3 mx-auto"><i className="fi-makeup" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Plumber</h3></a></div>
                <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Carpenter">
                    <div className="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i className="fi-entertainment" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Carpenter</h3></a></div>
                <div className="col"><a className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" href="/category/Iron">
                    <div className="icon-box-media bg-faded-info text-info rounded-circle mb-3 mx-auto"><i className="fi-car" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Iron</h3></a></div>
            </div>
        </div>
    )
}
export default CategoryNavbar;