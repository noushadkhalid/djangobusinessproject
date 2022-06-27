import React from "react";
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
const ProductList = () => {
    const [businessdata, setBusinessData] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [link, setLink] = React.useState('/api/particularuserproducts/');
    const {vendor_ask}=React.useContext(AuthContext);
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
    const pagecount = Math.ceil(count / 8);
    const handleClickchange = (e) => {
        let pagenomber = e.selected + 1;
        if (pagenomber == 1) {
            setLink('/api/particularuserproducts/');
        }
        else {
            setLink(`/api/particularuserproducts/?page=${pagenomber}`);
        }
    }
    React.useEffect(() => {
        getBusiness();
    }, [link]);
    return (
        <div>
            {
                vendor_ask==true ?  <div className="content-wrapper" >
                {/* Content Header (Page header) */}
                < section className="content-header" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>DataTables</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">DataTables</li>
                                </ol>
                            </div>
                        </div>
                    </div>{/* /.container-fluid */}
                </section >
                {/* Main content */}
                < section className="content" >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">All the Products that you have created</h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>title</th>
                                                    <th>Description</th>
                                                    <th>Dates</th>
                                                    <th>Business</th>
                                                    <th>Edits</th>
                                                    <th>Deletes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    businessdata && businessdata.map((item) => {
                                                        return (
                                                            <tr>
                                                                <td>{item.title}</td>
                                                                <td>{item.description}</td>
                                                                <td>
                                                                    {item.created_at}
                                                                </td>
                                                                <td>
                                                                    {item.business_name}
                                                                </td>
                                                                <td><Link className="btn btn-primary" to={`/updateproductform/${item.slug}`}>Edit</Link>
                                                                </td>
                                                                <td>
                                                                    <Link className="btn btn-danger" to={`/deleteview/${item.type}/${item.slug}`}>Delete</Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>title</th>
                                                    <th>Description</th>
                                                    <th>Dates</th>
                                                    <th>Business</th>
                                                    <th>Edits</th>
                                                    <th>Deletes</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <div className="container" style={{ marginTop: 12 }}>
                                            <nav aria-label="Page navigation example">
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
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </section >
                {/* /.content */}
            </div>:<div className="content-wrapper"></div> 
            }
        </div>
    )
}
export default ProductList;