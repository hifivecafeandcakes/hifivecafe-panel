import axios from "axios";
import React, { useEffect, useState } from "react";
import wallpaper from '../theme/assets/wallpaper.jpg';
import { Link } from "react-router-dom";
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Dashboard() {

  
    const { isAuthenticated } = useAuth();
    // console.log("Redirect to the login page", isAuthenticated())
    const navigate = useNavigate();

    const location = useLocation();
  localStorage.setItem('prevLocSubAdmin', location.pathname);
    useEffect(() => {
      if (!isAuthenticated()) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);




  const [user, setUser] = useState('null');
  // console.log(user);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/totaluser`)
      .then((res) => {
        // console.log(res);
        if (res?.data.Response.Success == "1") {
          setUser(res?.data.Response.Result);
        } else {
          alert(res?.data.Response.Message);
        }
      })
      .catch((err) => {
        console.log("No server Response");
      });
  }, []);

  // ============================================================
  const [result, setresult] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Common/company_status.php`);
      if (response.ok) {
        const data = await response.json();

        setresult(data.Response.Result);

      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  // console.log(result);

  // =================================================================
  const [dceo, setDceo] = useState([]);
  const fetchdceodata = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}dceoaccountdetails`);
      if (response.ok) {
        const data = await response.json();

        setDceo(data.Response.Result);

      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchdceodata()
  }, [])
  // console.log(dceo);




  return (
    <>
      <div className="content-wrapper"  
        style={{
          background: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#fff', // Fallback color
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1 className="m-0 Dashboard1-head">Dashboard</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 ">
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-3 col-6 ">
                      <div className="small-box bg-info">
                        <div className="inner">
                          <h4>{user[0].user_total}</h4>
                          <p className="Dashboard1-content">Total Users</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-bag" />
                        </div>
                        <a
                          href="#"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info
                          <i className="fas fa-arrow-circle-right" />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="small-box bg-success">
                        <div className="inner">
                          <h4>{user[1].vendors_total}</h4>
                          <p className="Dashboard1-content">Vendors</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars" />
                        </div>
                        <a
                          href="#"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info <i className="fas fa-arrow-circle-right" />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="small-box bg-warning">
                        <div className="inner">
                          <h4>{user[2].business_total}</h4>
                          <p className="Dashboard1-content">Business</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-person-add" />
                        </div>
                        <a
                          href="#"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info <i className="fas fa-arrow-circle-right" />
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="small-box bg-danger">
                        <div className="inner">
                          <h4>65</h4>
                          <p className="Dashboard1-content">Turn Over</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-pie-graph" />
                        </div>
                        <a
                          href="#"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info <i className="fas fa-arrow-circle-right" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>


            <div className="col-lg-4 Dashboard1-content">
              <div className="info-box mb-3 bg-warning">
                <span className="info-box-icon">
                  <i className="fas fa-tag" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">
                    Total Turn Over this Month
                  </span>
                  <span className="info-box-number">{result.monthlyProfit}</span>
                </div>
                {/* {/ /.info - box - content /} */}
              </div>
              <div className="info-box mb-3 bg-success">
                <span className="info-box-icon">
                  <i className="far fa-heart" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Total UPASS this Month</span>
                  <span className="info-box-number">{result.activeUpass}</span>
                </div>
                {/* {/ /.info - box - content /} */}
              </div>
              <div className="info-box mb-3 bg-danger">
                <span className="info-box-icon">
                  <i className="fas fa-cloud-download-alt" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Total UPASS</span>
                  <span className="info-box-number">{result.availUpass}</span>
                </div>
                {/* {/ /.info - box - content /} */}
              </div>
              {/* {/ /.info - box /} */}
              <div className="info-box mb-3 bg-info">
                <span className="info-box-icon">
                  <i className="far fa-comment" />
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">Total Requirements</span>
                  <span className="info-box-number">{result.completedUpass}</span>
                </div>
                {/* {/ /.info - box - content /} */}
              </div>
            </div>

            <div className="col-lg-4 Dashboard1-content">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title ">Recently Added Products</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>

                <div className="card-body p-0 Dashboard1-content">
                  <ul className="products-list product-list-in-card pl-2 pr-2">
                    <li className="item">
                      <div className="product-img">
                        <img
                          src="dist/img/default-150x150.png"
                          alt="Product Image"
                          className="img-size-50"
                        />
                      </div>
                      <div className="product-info">
                        <a href="javascript:void(0)" className="product-title">
                          Samsung TV
                          <span className="badge badge-warning float-right">
                            $1800
                          </span>
                        </a>
                        <span className="product-description">
                          Samsung 32" 1080p 60Hz LED Smart HDTV.
                        </span>
                      </div>
                    </li>

                    <li className="item">
                      <div className="product-img">
                        <img
                          src="dist/img/default-150x150.png"
                          alt="Product Image"
                          className="img-size-50"
                        />
                      </div>
                      <div className="product-info">
                        <a href="javascript:void(0)" className="product-title">
                          Bicycle
                          <span className="badge badge-info float-right">
                            $700
                          </span>
                        </a>
                        <span className="product-description">
                          26" Mongoose Dolomite Men's 7-speed, Navy Blue.
                        </span>
                      </div>
                    </li>

                    <li className="item">
                      <div className="product-img">
                        <img
                          src="dist/img/default-150x150.png"
                          alt="Product Image"
                          className="img-size-50"
                        />
                      </div>
                      <div className="product-info">
                        <a href="javascript:void(0)" className="product-title">
                          Xbox One{" "}
                          <span className="badge badge-danger float-right">
                            $350
                          </span>
                        </a>
                        <span className="product-description">
                          Xbox One Console Bundle with Halo Master Chief
                          Collection.
                        </span>
                      </div>
                    </li>

                    <li className="item">
                      <div className="product-img">
                        <img
                          src="dist/img/default-150x150.png"
                          alt="Product Image"
                          className="img-size-50"
                        />
                      </div>
                      <div className="product-info">
                        <a href="javascript:void(0)" className="product-title">
                          PlayStation 4
                          <span className="badge badge-success float-right">
                            $399
                          </span>
                        </a>
                        <span className="product-description">
                          PlayStation 4 500GB Console (PS4)
                        </span>
                      </div>
                    </li>
                    {/* {/ /.item /} */}
                  </ul>
                </div>
                {/* {/ /.card - body /} */}
                <div className="card-footer text-center">
                  <a href="javascript:void(0)" className="uppercase">
                    View All Products
                  </a>
                </div>
                {/* {/ /.card - footer /} */}
              </div>
            </div>
            <div className="col-lg-12 Dashboard1-content">
              <div className="card">
                <div className="card-header border-transparent">
                  <h3 className="card-title">Latest Orders</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="remove"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
                {/* {/ /.card - header /} */}
                <div className="card-body p-0 Dashboard1-content">
                  <div className="table-responsive">
                    <table className="table m-0">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Item</th>
                          <th>Status</th>
                          <th>Popularity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="pages/examples/invoice.html">OR9842</a>
                          </td>
                          <td>Call of Duty IV</td>
                          <td>
                            <span className="badge badge-success">Shipped</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#00a65a"
                              data-height={20}
                            >
                              90,80,90,-70,61,-83,63
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="pages/examples/invoice.html">OR1848</a>
                          </td>
                          <td>Samsung Smart TV</td>
                          <td>
                            <span className="badge badge-warning">Pending</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#f39c12"
                              data-height={20}
                            >
                              90,80,-90,70,61,-83,68
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="pages/examples/invoice.html">OR7429</a>
                          </td>
                          <td>iPhone 6 Plus</td>
                          <td>
                            <span className="badge badge-danger">
                              Delivered
                            </span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#f56954"
                              data-height={20}
                            >
                              90,-80,90,70,-61,83,63
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="pages/examples/invoice.html">OR7429</a>
                          </td>
                          <td>Samsung Smart TV</td>
                          <td>
                            <span className="badge badge-info">Processing</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#00c0ef"
                              data-height={20}
                            >
                              90,80,-90,70,-61,83,63
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="pages/examples/invoice.html">OR1848</a>
                          </td>
                          <td>Samsung Smart TV</td>
                          <td>
                            <span className="badge badge-warning">Pending</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#f39c12"
                              data-height={20}
                            >
                              90,80,-90,70,61,-83,68
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="pages/examples/invoice.html">OR7429</a>
                          </td>
                          <td>iPhone 6 Plus</td>
                          <td>
                            <span className="badge badge-danger">
                              Delivered
                            </span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#f56954"
                              data-height={20}
                            >
                              90,-80,90,70,-61,83,63
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="pages/examples/invoice.html">OR9842</a>
                          </td>
                          <td>Call of Duty IV</td>
                          <td>
                            <span className="badge badge-success">Shipped</span>
                          </td>
                          <td>
                            <div
                              className="sparkbar"
                              data-color="#00a65a"
                              data-height={20}
                            >
                              90,80,90,-70,61,-83,63
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/* {/ /.table - responsive /} */}
                </div>
                {/* {/ /.card - body /} */}
                <div className="card-footer clearfix">
                  <a
                    href="javascript:void(0)"
                    className="btn btn-sm btn-info float-left"
                  >
                    Place New Order
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="btn btn-sm btn-secondary float-right"
                  >
                    View All Orders
                  </a>
                </div>
                {/* {/ /.card - footer /} */}
              </div>
            </div>
          </div>
        </div>
        <aside class="control-sidebar control-sidebar-dark">
          {/* {/ <!-- Control sidebar content goes here --> /} */}
        </aside>
      </div>
    </>
  );
}
