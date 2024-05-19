import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Product = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const querysearch = new URLSearchParams(window.location.search);
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');
    const [currentPage, setCurrentPage] = useState(querysearch.get("page") ? parseInt(querysearch.get("page")) : 1);
    const [recordPage] = useState(20);

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/getproduct?productname=${search}&page=${currentPage}&limit=${recordPage}&startprice=${startPrice}&endprice=${endPrice}`);
            console.log(response.data);
            console.log(Math.ceil(response.data.total / recordPage));
            setCount(Math.ceil(response.data.total / recordPage));
            setData(response.data.products);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [search, currentPage]);

    useEffect(() => {
        console.log(endPrice, startPrice);
        if (startPrice > 0 && endPrice > 0) {
            getData();
        }
    }, [endPrice, startPrice]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getData();
    };

    const handleSelectPrice = (event) => {
        console.log(event.target.value);
        setStartPrice(event.target.value);
    };

    const handleEndPrice = (event) => {
        console.log(event.target.value);
        setEndPrice(event.target.value);
    };

    const pageNumbers = [...Array([page + 1].keys()).slice(1)];

    return (
        <div>
            <form style={{ marginRight: "50px", alignItems: "center", justifyContent: "center" }} onSubmit={handleSubmit} className="form-inline">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={handleSearch}
                />
            </form>
            <div className="select-container">
                <label htmlFor="startamt">Start Amount</label>
                <select id="startamt" value={startPrice} onChange={handleSelectPrice}>
                    <option value="">All Prices</option>
                    <option value="100">100</option>
                    <option value="5000">5000</option>
                    <option value="11000">11000</option>
                </select>

                <label htmlFor="endamt">End Amount</label>
                <select id="endamt" value={endPrice} onChange={handleEndPrice}>
                    <option value="">All Prices</option>
                    <option value="100000">100000</option>
                    <option value="150000">150000</option>
                    <option value="200000">200000</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {loading ? (
                    <div className="loader">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    data.map((product, index) => (
                        <div key={index} className="card" style={{ width: "300px", margin: "20px", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", borderRadius: "10px", overflow: "hidden", transition: "transform 0.3s" }}>
                            <img className="card-img-top" src={"http://localhost:4000/" + product.image[0]} alt="Product" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                            <div className="card-body" style={{ padding: "20px" }}>
                                <h5 className="card-title" style={{ marginBottom: "10px", fontSize: "1.2rem" }}>{product.productname}</h5>
                                <p className="card-text" style={{ marginBottom: "10px", fontSize: "1rem" }}>{product.description}</p>
                                <p className="card-text" style={{ marginBottom: "5px", fontSize: "1rem", fontWeight: "bold" }}>Price:{product.price}</p>
                                <p className="card-text" style={{ marginBottom: "5px", fontSize: "1rem" }}>Rating: {product.rating}</p>
                                <p className="card-text" style={{ marginBottom: "20px", fontSize: "1rem" }}>Stock: {product.stock}</p>
                                <button style={{ fontSize: '1rem', borderRadius: '5px', background: 'blue', color: 'white', padding: '8px 15px', border: 'none', cursor: 'pointer', transition: 'background 0.3s' }} onClick={() => {
                                    navigate(`/singel/${product._id}`)
                                }}>View Details</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div>

                {count > recordPage ? (
                    <nav aria-label="Page navigation example" >
                        <ul className="pagination justify-content-center">
                            <li key={""} className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} tabIndex="-1">Previous</button>
                            </li>
                            {Array.from(Array(count).keys()).map((it, i) => {
                                return (
                                    <li className="page-item"><Link className="page-link" onClick={() => {
                                        setCurrentPage(i + 1)
                                    }} to={`/product?page=${i + 1}`}>{i + 1}</Link></li>
                                )
                            })}
                            <li className="page-item">
                                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </nav>
                ) : ('')
                }
            </div>

            {/* Footer */}
         
            <footer className="bg-light text-center">
  <div className="container p-4">
    <section className="mb-4">
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#3b5998"}} href="#!" role="button"><i className="fab fa-facebook-f"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#55acee"}} href="#!" role="button"><i className="fab fa-twitter"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#dd4b39"}} href="#!" role="button"><i className="fab fa-google"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#ac2bac"}} href="#!" role="button"><i className="fab fa-instagram"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#0082ca"}} href="#!" role="button"><i className="fab fa-linkedin-in"></i></a>
      <a className="btn btn-primary btn-floating m-1" style={{backgroundColor: "#333333"}} href="#!" role="button"><i className="fab fa-github"></i></a>
    </section>

    <section className="">
      <form action="">
        <div className="row d-flex justify-content-center">
          <div className="col-auto">
            <p className="pt-2">
              <strong>Sign up for our newsletter</strong>
            </p>
          </div>
          <div className="col-md-5 col-12">
            <div className="form-outline mb-4">
              <input type="email" id="form5Example2" className="form-control" />
              <label className="form-label" htmlFor="form5Example2">Email address</label>
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-4">Subscribe</button>
          </div>
        </div>
      </form>
    </section>

    <section className="mb-4">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.
      </p>
    </section>

    <section className="">
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="#!" className="text-dark">Link 1</a></li>
            <li><a href="#!" className="text-dark">Link 2</a></li>
            <li><a href="#!" className="text-dark">Link 3</a></li>
            <li><a href="#!" className="text-dark">Link 4</a></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="#!" className="text-dark">Link 1</a></li>
            <li><a href="#!" className="text-dark">Link 2</a></li>
            <li><a href="#!" className="text-dark">Link 3</a></li>
            <li><a href="#!" className="text-dark">Link 4</a></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="#!" className="text-dark">Link 1</a></li>
            <li><a href="#!" className="text-dark">Link 2</a></li>
            <li><a href="#!" className="text-dark">Link 3</a></li>
            <li><a href="#!" className="text-dark">Link 4</a></li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Links</h5>
          <ul className="list-unstyled mb-0">
            <li><a href="#!" className="text-dark">Link 1</a></li>
            <li><a href="#!" className="text-dark">Link 2</a></li>
            <li><a href="#!" className="text-dark">Link 3</a></li>
            <li><a href="#!" className="text-dark">Link 4</a></li>
          </ul>
        </div>
      </div>
    </section>
  </div>
  <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2020 Copyright:
    <a className="text-dark" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
</footer>


            {/* End of Footer */}
        </div>
    );
};

export default Product;
