import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/dashboard.css";
import sparkLogo from "../assets/dashboard/spark-logo.png";
import links from "../assets/dashboard/links-icon.png";
import appearance from "../assets/dashboard/appearance-icon.png";
import analytics from "../assets/dashboard/analytics-icon.png";
import settings from "../assets/dashboard/settings-icon.png";
import logoutIcon from "../assets/dashboard/logout-icon.png";

const MobileHeader = ({ user, onLogout }) => {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <header className="mobile-header">
      <div className="mobile-logo">
        <img src={sparkLogo} alt="Logo" />
      </div>
      <div
        className="mobile-profile"
        onClick={() => setShowLogout(!showLogout)}
      >
        <img
          src={user?.profileImage || "/assets/dashboard/sidebar-profile.png"}
          alt="Profile"
          className="profile-icon"
        />
        {showLogout && (
          <div className="logout-popup">
            <button onClick={onLogout} className="logout-btn">
              <img src={logoutIcon} alt="Logout Icon" className="logout-icon" />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  // State to track scrolling
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout = null;

    const handleScroll = () => {
      // Show sidebar immediately on scroll
      setIsScrolling(true);

      // Clear any previous timer and start a new one
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Hide sidebar if no scroll event fires for 300ms
        setIsScrolling(false);
      }, 1000);
    };

    // Attach listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <MobileHeader user={user} onLogout={handleLogout} />
      <aside
        className={`sidebar ${
          isScrolling ? "show-on-scroll" : "hide-on-scroll"
        }`}
      >
        <div className="sidebar-logo">
          <img src={sparkLogo} alt="Logo" />
        </div>
        <nav>
          <Link
            to="/links"
            className={location.pathname === "/links" ? "active" : ""}
          >
            <img src={links} alt="Links Icon" className="sidebar-icon" />
            Links
          </Link>
          <Link
            to="/profile/appearance"
            className={
              location.pathname === "/profile/appearance" ? "active" : ""
            }
          >
            <img
              src={appearance}
              alt="Appearance Icon"
              className="sidebar-icon"
            />
            Appearance
          </Link>
          <Link
            to="/analytics"
            className={location.pathname === "/analytics" ? "active" : ""}
          >
            <img
              src={analytics}
              alt="Analytics Icon"
              className="sidebar-icon"
            />
            Analytics
          </Link>
          <Link
            to="/settings"
            className={location.pathname === "/settings" ? "active" : ""}
          >
            <img src={settings} alt="Settings Icon" className="sidebar-icon" />
            Settings
          </Link>
        </nav>
        <div
          className="sidebar-profile"
          onClick={() => setShowLogout(!showLogout)}
        >
          <img
            src={user?.profileImage || "/assets/dashboard/sidebar-profile.png"}
            alt="Profile"
            className="profile-icon"
          />
          <span>
            {user?.firstName} {user?.lastName}
          </span>
          {showLogout && (
            <div className="logout-popup">
              <button onClick={handleLogout} className="logout-btn">
                <img
                  src={logoutIcon}
                  alt="Logout Icon"
                  className="logout-icon"
                />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
