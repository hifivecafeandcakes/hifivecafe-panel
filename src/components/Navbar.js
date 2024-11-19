import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { useAuth } from './AuthProvider';
import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const [theme, settheme] = useState("light-mode");
  const navigate = useNavigate();

  const toggletheme = () => {
    if (theme === "light-mode") {
      settheme("dark-mode");
    } else {
      settheme("light-mode");
    }
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem('prevLocSubAdmin');
    navigate('/');
  };

  return (
    <>
      <nav className="main-header dark-mode navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
        </ul>
      
        <ul className="navbar-nav ml-auto">
          {/* <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li>
            <div className="form-group mt-2">
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch1"
                  onClick={toggletheme}
                />
                <label
                  className="custom-control-label text-white"
                  htmlFor="customSwitch1"
                >
                  Dark mode
                </label>
              </div>
            </div>
          </li> */}
        </ul>
        <p
          onClick={handleLogout}
          className="mx-4 fw-bold text-warning"
          style={{ cursor: 'pointer' }}
        >
          Logout
        </p>


      </nav>

      <aside class="control-sidebar control-sidebar-dark"></aside>
    </>
  );
}
