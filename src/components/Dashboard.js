import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import wallpaper from '../theme/assets/wallpaper.jpg';
import Swal from "sweetalert2";

export default function Dashboard() {

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([])


  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/admin/dashboard`)
      .then((res) => {
        let data = res?.data;
        if (data?.Response.Success == "1") {
          setResult(data?.Response.result);
          console.log(data?.Response.result);
        } else {
          Swal.fire({ customClass: { container: 'smaller-swal', }, title: data?.Response.message, position: 'center' });
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        Swal.fire({ title: "error", text: "Failed to fetch data. Please contact admin!", icon: "error", position: 'center' });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <>
      <div className="content-wrapper"
        style={{
          // background: `url(${wallpaper})`,
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

                    <div className="col-lg-3 col-6">
                      <div className="small-box bg-warning">
                        <div className="inner">
                          <h4>{result.todayVisitorCount}</h4>
                          <p className="Dashboard1-content">Today Visitors</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-person-add" />
                        </div>
                        <div className="inner">
                          <h4>{result.yesterdayVisitorCount}</h4>
                          <p className="Dashboard1-content">Yesterday Visitors</p>
                        </div>

                        <div className="inner">
                          <h4>{result.oneweekVisitorCount}</h4>
                          <p className="Dashboard1-content">One Week Visitors</p>
                        </div>

                        <div className="inner">
                          <h4>{result.twoweekVisitorCount}</h4>
                          <p className="Dashboard1-content">Two Week Visitors</p>
                        </div>

                        <div className="inner">
                          <h4>{result.onemonthVisitorCount}</h4>
                          <p className="Dashboard1-content">One Month Visitors</p>
                        </div>

                        <Link to="/ListVisitor"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                      </div>
                    </div>


                    <div className="col-lg-3 col-6 ">
                      <div className="small-box bg-info">
                        <div className="inner">
                          <h4>{result.tableActiveCount}</h4>
                          <p className="Dashboard1-content">Total Active Tables</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-bag" />
                        </div>
                        <div className="inner">
                          <h4>{result.tableInactiveCount}</h4>
                          <p className="Dashboard1-content">Total Inactive Tables</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-bag" />
                        </div>
                        <Link to="/ListSubCategory"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info
                          <i className="fas fa-arrow-circle-right" />
                        </Link>
                      </div>

                      <div className="small-box bg-warning">
                        <div className="inner">
                          <h4>{result.customerActiveCount}</h4>
                          <p className="Dashboard1-content">Active Customers</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-person-add" />
                        </div>
                        <div className="inner">
                          <h4>{result.customerInactiveCount}</h4>
                          <p className="Dashboard1-content">Inactive Customers</p>
                        </div>
                        <Link to="/ListCustomer"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="small-box bg-success">
                        <div className="inner">
                          <h4>{result.todayBookingCount}</h4>
                          <p className="Dashboard1-content">Today Bookings</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars" />
                        </div>
                        <div className="inner">
                          <h4>{result.tommorowBookingCount}</h4>
                          <p className="Dashboard1-content">Tomorrow Bookings</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars" />
                        </div>
                        <Link to="/ListBooked"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">
                      <div className="small-box bg-success">
                        <div className="inner">
                          <h4>{result.onweekBookingCount}</h4>
                          <p className="Dashboard1-content">One Week Bookings</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars" />
                        </div>
                        <div className="inner">
                          <h4>{result.onemonthBookingCount}</h4>
                          <p className="Dashboard1-content">One Month Bookings</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars" />
                        </div>
                        <div className="inner">
                          <h4>{result.upcomingBookingCount}</h4>
                          <p className="Dashboard1-content">Upcoming Bookings</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars" />
                        </div>
                        <Link to="/ListBooked"
                          className="small-box-footer Dashboard1-content"
                        >
                          More info <i className="fas fa-arrow-circle-right" />
                        </Link>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">

                    </div>


                  </div>
                </div>
              </section>
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
