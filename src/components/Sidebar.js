import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
// import Company_img from "../spark images/spark.jpg";
import CompanyLogo from "../theme/assets/sparkLogo.png";
import Logo from "../theme/assets/LogoSpark.jpg";
import "../theme/main.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [reportsOpen, setReportsOpen] = useState(false);
  const [reportsOpen1, setReportsOpen1] = useState(false);
  const [reportsOpen2, setReportsOpen2] = useState(false);
  const [reportsOpen3, setReportsOpen3] = useState(false);
  const [reportsOpen4, setReportsOpen4] = useState(false);
  const [reportsOpen5, setReportsOpen5] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  const [DailyActivityOpen, setdailyactivity] = useState(false);
  const [Report, setReport] = useState(false);

  const [management, setmanagement] = useState(false);
  const [invoice, setinvoice] = useState(false);

  const toggleReports = () => {
    setReportsOpen(!reportsOpen);
  };

  const toggleReports1 = () => {
    setReportsOpen1(!reportsOpen1);
  };

  const toggleReports2 = () => {
    setReportsOpen2(!reportsOpen2);
  };

  const toggleReports3 = () => {
    setReportsOpen3(!reportsOpen3);
  };

  const toggleReports4 = () => {
    setReportsOpen4(!reportsOpen4);
  };

  const toggleReports5 = () => {
    setReportsOpen5(!reportsOpen5);
  };



  const toggleRegistration = () => {
    setRegistrationOpen(!registrationOpen);
  };

  const toggledailyactivity = () => {
    setdailyactivity(!DailyActivityOpen);
  };
  const toggleReport = () => {
    setReport(!Report);
  };

  const togglemanagement = () => {
    setmanagement(!management);
  };

  const toggleinvoice = () => {
    setinvoice(!invoice);
  };


  const [notification, setNotification] = useState(false)
  const togglenotification = () => {
    setNotification(!notification);
  };

  const [Business, setBusiness] = useState(false)
  const toggleBusiness = () => {
    setBusiness(!Business);
  };


  const imageStyle = {
    backgroundImage: 'url(https://play-lh.googleusercontent.com/buDNmnRLdwIsFlouZ84laorIHpy3R-YNsH_D2pPi22xoYEBpWEdlJ1eEmCWOl1k1lbo)',
    backgroundSize: 'cover',
    borderRadius: '50%', // Make it a circle
    animation: 'rotation 1s linear infinite', // Adjust the duration as needed
    transformOrigin: 'center center', // Optional: set the transform origin to the center
  };


  const [Giftcard, setGiftcard] = useState(false)
  const toggleGiftcard = () => {
    setGiftcard(!Giftcard);
  };


  return (
    <>
      <style>
        {`
        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
      </style>

      <aside className="main-sidebar sidebar-dark-primary elevation-4 Dashboard1-content" style={{ position: 'fixed', opacity: 0.99 }}>

        <a href="#" className="brand-link" style={{ textDecoration: 'none' }}>
          {/* <img
            // src="https://play-lh.googleusercontent.com/buDNmnRLdwIsFlouZ84laorIHpy3R-YNsH_D2pPi22xoYEBpWEdlJ1eEmCWOl1k1lbo"
            src={Logo}
            alt={CompanyLogo}
            className="brand-image img-circle elevation-3"
            style={imageStyle}
          /> */}
          <span style={{
            textDecoration: 'none',
            fontSize: '2.5vh',
            marginLeft: "1vh",
            fontFamily: 'anta',
            fontWeight: '800',
            letterSpacing: '0.5vh',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Adding box shadow
          }} className="brand-text sidebar-head">ADMIN PANEL</span>

        </a>

        <div className="sidebar" style={{ scrollBehavior: 'auto' }}>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item ">
                <Link to="/Dashboard" className="nav-link active sidebar-head">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p className="treeview-fontsize1">
                    Dashboard
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
              </li>





              <li
                className={`nav-item ${reportsOpen ? "menu-open" : "menu-close"
                  }`}
              >
                <a className="nav-link sidebar-head" onClick={toggleReports}>
                  <i className="nav-icon fas fa-user" />
                  <p className="treeview-fontsize1">
                    Reservations Tables
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul
                  className={`nav nav-treeview ${reportsOpen ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      to="/ListReservation"
                      className="nav-link ml-4 sidebar-content"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p className="treeview-fontsize1">Reservation List</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/AddReservation"
                      className="nav-link ml-4 sidebar-content"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p className="treeview-fontsize1">Reservation Add</p>
                    </Link>
                  </li>



                  <li className="nav-item">
                    <Link
                      to="/ListCategory"
                      className="nav-link ml-4 sidebar-content"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p className="treeview-fontsize1">Category List</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/AddCategory"
                      className="nav-link ml-4 sidebar-content"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p className="treeview-fontsize1">Category Add</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/ListSubCategory"
                      className="nav-link ml-4 sidebar-content"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p className="treeview-fontsize1">Sub Category List</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/AddSubCategory"
                      className="nav-link ml-4 sidebar-content"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p className="treeview-fontsize1">Sub Category Add</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className={`nav-item ${reportsOpen1 ? "menu-open" : "menu-close"
                  }`}
              >
                <a className="nav-link sidebar-head" onClick={toggleReports1}>
                  <i className="nav-icon fas fa-user" />
                  <p className="treeview-fontsize1">
                    Reservations Booking
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul
                  className={`nav nav-treeview ${reportsOpen1 ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      to="/ListBooked"
                      className="nav-link ml-4 sidebar-content"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p className="treeview-fontsize1">Booked Board</p>
                    </Link>
                  </li>

                  
                </ul>
              </li>


              <li
                className={`nav-item ${reportsOpen2 ? "menu-open" : "menu-close"
                  }`}
              >
                <a className="nav-link sidebar-head" onClick={toggleReports2}>
                  <i className="nav-icon fas fa-user" />
                  <p className="treeview-fontsize1">
                    Customers
                    <i className="fas fa-angle-left right" />
                  </p>
                </a>
                <ul
                  className={`nav nav-treeview ${reportsOpen2 ? "d-block" : "d-none"
                    }`}
                >
                  <li className="nav-item">
                    <Link
                      to="/ListCustomer"
                      className="nav-link ml-4 sidebar-content"
                    >
                      <i className="far fa-circle nav-icon" />
                      <p className="treeview-fontsize1">Customer</p>
                    </Link>
                  </li>

                  
                </ul>
              </li>

            </ul>
          </nav>
        </div>
      </aside>
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </>
  );
}
