import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { useAuth } from './AuthProvider';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {


  const [notifications, setNotifications] = useState(3); // Example count


  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [submenuVisible1, setSubmenuVisible1] = useState(false);
  const [submenuVisible2, setSubmenuVisible2] = useState(false);
  const [submenuVisible3, setSubmenuVisible3] = useState(false);
  const [submenuVisible4, setSubmenuVisible4] = useState(false);

  // Function to toggle dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    if (submenuVisible1) {
      toggleSubmenu1();
    }
    if (submenuVisible2) {
      toggleSubmenu2();
    }
    if (submenuVisible3) {
      toggleSubmenu3();
    }
    if (submenuVisible4) {
      toggleSubmenu4();
    }
  };


  const toggleSubmenu1 = (e) => {
    // e.preventDefault(); // Prevent navigating to "/dashboard"
    setSubmenuVisible1(!submenuVisible1);

    if (submenuVisible2) {
      toggleSubmenu2();
    }
    if (submenuVisible3) {
      toggleSubmenu3();
    }

    if (submenuVisible4) {
      toggleSubmenu4();
    }
  };

  const toggleSubmenu2 = (e) => {
    // e.preventDefault(); // Prevent navigating to "/dashboard"
    setSubmenuVisible2(!submenuVisible2);
    if (submenuVisible1) {
      toggleSubmenu1();
    }

    if (submenuVisible3) {
      toggleSubmenu3();
    }
    if (submenuVisible4) {
      toggleSubmenu4();
    }
  };


  const toggleSubmenu3 = (e) => {
    // e.preventDefault(); // Prevent navigating to "/dashboard"
    setSubmenuVisible3(!submenuVisible3);
    if (submenuVisible1) {
      toggleSubmenu1();
    }
    if (submenuVisible2) {
      toggleSubmenu2();
    }
    if (submenuVisible4) {
      toggleSubmenu4();
    }
  };

  const toggleSubmenu4 = (e) => {
    // e.preventDefault(); // Prevent navigating to "/dashboard"
    setSubmenuVisible4(!submenuVisible4);
    if (submenuVisible1) {
      toggleSubmenu1();
    }
    if (submenuVisible2) {
      toggleSubmenu2();
    }
    if (submenuVisible3) {
      toggleSubmenu3();
    }
  };


  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/notification`);
      console.log(response);
      setNotifications(response?.data?.Response?.result?.notificationBookingCount); // Assume backend returns { count: 5 }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch notifications every 5 minutes
  useEffect(() => {
    fetchNotifications(); // Fetch immediately on load

    const interval = setInterval(() => {
      fetchNotifications();
    }, 5 * 60 * 1000); // 5 minutes = 300000ms

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);




  const [theme, settheme] = useState("light-mode");
  const navigate = useNavigate();


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout()
    navigate('/');
  };

  return (
    <>
      <nav className="main-header dark-mode navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link "
              data-widget="pushmenu"
              href="#"
              role="button"
              onClick={toggleDropdown}
            >
              <i className="fas fa-bars yellow" />
            </a>

            {dropdownVisible && (
              <ul className="dropdown-menu show" style={{ display: "block", position: "absolute" }}>


                <li>
                  <Link to="/Dashboard" className="dropdown-item" onClick={() => { toggleDropdown(); }}>
                    Dashboard
                  </Link>
                </li>


                <li className="dropdown-submenu">
                  <a className="dropdown-item" href="#" onClick={toggleSubmenu1}>
                    Reservations
                    <i className="fas fa-chevron-right" style={{ float: "right" }}></i>
                  </a>

                  {/* Submenu Items */}
                  {submenuVisible1 && (
                    <ul className="dropdown-menu show" style={{ position: "absolute", left: "100%", top: "0" }}>
                      <Link to="/ListReservation" className="dropdown-item" onClick={() => { toggleSubmenu1(false); toggleDropdown(false); }}>
                        Reservation List
                      </Link>
                      <Link to="/AddReservation" className="dropdown-item" onClick={() => { toggleSubmenu1(false); toggleDropdown(false); }}>
                        Reservation Add
                      </Link>
                      <Link to="/ListCategory" className="dropdown-item" onClick={() => { toggleSubmenu1(false); toggleDropdown(false); }}>
                        Category List
                      </Link>
                      <Link to="/AddCategory" className="dropdown-item" onClick={() => { toggleSubmenu1(false); toggleDropdown(false); }}>
                        Category Add
                      </Link>
                      <Link to="/ListSubCategory" className="dropdown-item" onClick={() => { toggleSubmenu1(false); toggleDropdown(false); }}>
                        Sub Category List
                      </Link>
                      <Link to="/AddSubCategory" className="dropdown-item" onClick={() => { toggleSubmenu1(false); toggleDropdown(false); }}>
                        Sub Category Add
                      </Link>
                    </ul>
                  )}
                </li>

                <li className="dropdown-submenu">
                  <a className="dropdown-item" href="#" onClick={toggleSubmenu2}>
                    Bookings
                    <i className="fas fa-chevron-right" style={{ float: "right" }}></i>
                  </a>

                  {/* Submenu Items */}
                  {submenuVisible2 && (
                    <ul className="dropdown-menu show" style={{ position: "absolute", left: "100%", top: "0" }}>
                      <Link to="/ListBooked" className="dropdown-item" onClick={() => { toggleSubmenu2(false); toggleDropdown(false); }}>
                        Booking Board
                      </Link>
                    </ul>
                  )}
                </li>
                <li className="dropdown-submenu">
                  <a className="dropdown-item" href="#" onClick={toggleSubmenu3}>
                    Customers
                    <i className="fas fa-chevron-right" style={{ float: "right" }}></i>
                  </a>

                  {/* Submenu Items */}
                  {submenuVisible3 && (
                    <ul className="dropdown-menu show" style={{ position: "absolute", left: "100%", top: "0" }}>
                      <Link to="/ListCustomer" className="dropdown-item" onClick={() => { toggleSubmenu3(false); toggleDropdown(false); }}>
                        Customers
                      </Link>
                    </ul>
                  )}
                </li>

                <li className="dropdown-submenu">
                  <a className="dropdown-item" href="#" onClick={toggleSubmenu4}>
                    Visitors
                    <i className="fas fa-chevron-right" style={{ float: "right" }}></i>
                  </a>

                  {/* Submenu Items */}
                  {submenuVisible4 && (
                    <ul className="dropdown-menu show" style={{ position: "absolute", left: "100%", top: "0" }}>
                      <Link to="/ListVisitor" className="dropdown-item" onClick={() => { toggleSubmenu4(false); toggleDropdown(false); }}>
                        Visitors
                      </Link>
                    </ul>
                  )}
                </li>
              </ul>
            )}

          </li>

        </ul>





        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <li className="nav-item mx-3">
            <Link className="nav-link position-relative" to="/ListBooked">
              <i className="fas yellow fa-bell fa-lg"></i>
              {notifications > 0 && (
                <span
                  className="badge badge-danger position-absolute"
                  style={{
                    top: "5px",
                    right: "-5px",
                    fontSize: "10px",
                    padding: "3px 6px",
                    borderRadius: "50%",
                  }}
                >
                  {notifications}
                </span>
              )}
            </Link>
          </li>

          <li className="nav-item">


            <Link onClick={handleLogout} className="nav-link position-relative">

              <i className="fas yellow fa-power-off fa-lg"></i>
            </Link>
          </li>
        </ul>
      </nav>


    </>
  );
}
