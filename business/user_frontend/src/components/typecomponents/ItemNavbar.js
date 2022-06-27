import React from "react";
import { Link } from "react-router-dom";
const ItemNavbar = () => {
    return (
        <div className="tab-pane fade show active" id="types" role="tabpanel">
            <div className="row row-cols-lg-2 row-cols-1 g-3">
                <div className="col"><Link className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" to="/catalog">
                    <div className="icon-box-media bg-faded-accent text-accent rounded-circle mb-3 mx-auto"><i className="fi-bed" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Business</h3></Link></div>
                <div className="col"><Link className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" to="/deals">
                    <div className="icon-box-media bg-faded-success text-success rounded-circle mb-3 mx-auto"><i className="fi-disco-ball" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Deals</h3></Link></div>
                <div className="col"><Link className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" to="/events">
                    <div className="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"><i className="fi-shopping-bag" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Events</h3></Link></div>
                <div className="col"><Link className="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center" to="/classifieds">
                    <div className="icon-box-media bg-faded-info text-info rounded-circle mb-3 mx-auto"><i className="fi-meds" /></div>
                    <h3 className="icon-box-title fs-base mb-0">Classifieds</h3></Link></div>
            </div>
        </div>
    )
}
export default ItemNavbar;