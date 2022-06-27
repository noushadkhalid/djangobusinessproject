import React from "react";
import AuthContext from "../context/AuthContext";
import ItemNavbar from "../components/typecomponents/ItemNavbar";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import CategoryNavbar from "../Category/CategoryComponents/CategoryNav";
import FilterSearch from "../components/Filters/FilterSearch";
const Classifieds = () => {
    const { searchfunction } = React.useContext(AuthContext);
    const [businessdata, setBusinessData] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [link, setLink] = React.useState('/api/classifiedslist');
    const getBusiness = async () => {
        const url = link;
        const response = await fetch(url);
        const data = await response.json();
        if (response.status == 200) {
            setBusinessData(data["results"]);
            setCount(data.count);
        }
        else {
            console.log("data not recieved");
        }
    }
    const pagecount = Math.ceil(count / 10);
    const handleClickchange = (e) => {
        let pagenomber = e.selected + 1;
        if (pagenomber == 1) {
            setLink('/api/classifiedslist/');
        }
        else {
            setLink(`/api/classifiedslist/?page=${pagenomber}`);
        }
    }
    React.useEffect(() => {
        getBusiness();
    }, [link]);
    return (
        <div>
            <div className="container-fluid mt-5 pt-5 p-0">
                <div className="row g-0 mt-n3">
                    {/* Filters sidebar (Offcanvas on mobile)*/}
                    <aside className="col-lg-4 col-xl-3 border-top-lg border-end-lg shadow-sm px-3 px-xl-4 px-xxl-5 pt-lg-2">
                        <div className="offcanvas offcanvas-start offcanvas-collapse" id="filters-sidebar">
                            <div className="offcanvas-header d-flex d-lg-none align-items-center">
                                <h2 className="h5 mb-0">Filters</h2>
                                <button className="btn-close" type="button" data-bs-dismiss="offcanvas" />
                            </div>
                            {/* Search form*/}
                            <div className="offcanvas-header d-block border-bottom pt-0 pt-lg-4 px-lg-0">
                                <form className="form-group mb-lg-2 rounded-pill" onSubmit={searchfunction}>
                                    <div className="input-group"><span className="input-group-text text-muted"><i className="fi-search" /></span>
                                        <input className="form-control" type="text" placeholder="Search..." name="search" />
                                    </div>
                                    <button className="btn btn-primary rounded-pill d-lg-inline-block d-none" type="submit">Search</button>
                                    <button className="btn btn-icon btn-primary rounded-circle flex-shrink-0 d-lg-none d-inline-flex" type="button"><i className="fi-search mt-n2" /></button>
                                </form>
                            </div>
                            {/* Nav tabs*/}
                            <div className="offcanvas-header d-block border-bottom py-lg-4 py-3 px-lg-0">
                                <ul className="nav nav-pills" role="tablist">
                                    <li className="nav-item"><a className="nav-link d-flex align-items-center active" href="#types" data-bs-toggle="tab" role="tab"><i className="fi-list me-2" />Types</a></li>
                                    <li className="nav-item"><a className="nav-link d-flex align-items-center" href="#categories" data-bs-toggle="tab" role="tab"><i className="fi-list me-2" />Categories</a></li>
                                    <li className="nav-item" style={{ marginTop: 9 }}><a className="nav-link d-flex align-items-center" href="#filters" data-bs-toggle="tab" role="tab"><i className="fi-filter-alt-horizontal me-2" />Filters</a></li>
                                </ul>
                            </div>
                            <div className="offcanvas-body py-lg-4">
                                {/* Tabs content*/}
                                <div className="tab-content">
                                    <ItemNavbar/>
                                    {/* Categories*/}
                                    <CategoryNavbar/>
                                     {/* Filters*/}
                                     <div className="tab-pane fade" id="filters" role="tabpanel">
                                   <FilterSearch/>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                    {/* Page content*/}
                    <div className="col-lg-8 col-xl-9 position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5">
                        {/* Map popup*/}
                        <div className="map-popup invisible" id="map">
                            <button className="btn btn-icon btn-light btn-sm shadow-sm rounded-circle" type="button" data-bs-toggle-className="invisible" data-bs-target="#map"><i className="fi-x fs-xs" /></button>
                            <div className="interactive-map" data-map-options-json="json/map-options-city-guide.json" />
                        </div>
                        {/* Breadcrumb*/}
                        <nav className="mb-3 pt-md-2" aria-label="Breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link href="city-guide-home-v1.html" to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Find Classifieds</li>
                            </ol>
                        </nav>
                        {/* Title*/}
                        <div className="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4">
                            <h1 className="h2 mb-sm-0">Find Classifieds</h1><a className="d-inline-block fw-bold text-decoration-none py-1" href="/classifieds" data-bs-toggle-className="invisible" data-bs-target="#map"><i className="fi-map me-2" />Map view</a>
                        </div>
                        {/* Sorting*/}
                        <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2">
                            <div className="d-flex align-items-center flex-shrink-0">
                                <label className="fs-sm me-2 pe-1 text-nowrap" htmlFor="sortby"><i className="fi-arrows-sort text-muted mt-n1 me-2" />Sort by:</label>
                                <select className="form-select form-select-sm" id="sortby">
                                    <option>Newest</option>
                                    <option>Popularity</option>
                                    <option>Low - High Price</option>
                                    <option>High - Low Price</option>
                                    <option>High rating</option>
                                    <option>Average Rating</option>
                                </select>
                            </div>
                            <hr className="d-none d-sm-block w-100 mx-4" />
                            <div className="d-none d-sm-flex align-items-center flex-shrink-0 text-muted"><i className="fi-check-circle me-2" /><span className="fs-sm mt-n1">{count} results</span></div>
                        </div>
                        {/* Catalog grid*/}
                        <div className="row row-cols-xl-3 row-cols-sm-2 row-cols-1 gy-4 gx-3 gx-xxl-4 py-4">
                            {
                                businessdata.map((item) => {
                                    return (
                                        <div className="col pb-sm-2">
                                            <article className="position-relative">
                                                <div className="position-relative mb-3">
                                                    <button className="btn btn-icon btn-light-primary btn-xs text-primary rounded-circle position-absolute top-0 end-0 m-3 zindex-5" type="button" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Favorites"><i className="fi-heart" /></button><img className="rounded-3" src={item.image_field} alt="Article img" />
                                                </div>
                                                <h3 className="mb-2 fs-lg"><Link className="nav-link stretched-link" to={`/businessdetail/${item.slug}`}>{item.title}</Link></h3>
                                                <ul className="list-inline mb-0 fs-xs">
                                                        <li className="list-inline-item pe-1"><i className="fi-star-filled mt-n1 me-1 fs-base text-warning align-middle" /><b>{item.rate}</b><span className="text-muted">&nbsp;({item.rate_count})</span></li>
                                                    </ul>
                                            </article>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* Pagination*/}
                        <nav className="border-top pb-md-4 pt-4" aria-label="Page navigation example">
                            <ReactPaginate
                                className="pagination mb-1"
                                breakLabel="..."
                                nextLabel="Next"
                                pageRangeDisplayed={5}
                                pageCount={pagecount}
                                onPageChange={handleClickchange}
                                previousLabel="Previous"
                                renderOnZeroPageCount={null}
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                activeClassName="page-item active"
                                activeLinkClassName="page-link"
                            />
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Classifieds;