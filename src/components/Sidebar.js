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

const MobileHeader = ({ showMobileHeader, className, user, onLogout }) => {
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (!showMobileHeader) {
      setShowLogout(false);
    }
  }, [showMobileHeader]);

  return (
    <header className={`mobile-header ${className}`}>
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
  const [isScrolling, setIsScrolling] = useState(false);
  const [showMobileHeader, setShowMobileHeader] = useState(true);

  useEffect(() => {
    let scrollTimeout = null;
    let headerTimeout = null;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);

      if (document.body.scrollHeight <= window.innerHeight) {
        setShowMobileHeader(true);
        return;
      }

      if (window.pageYOffset === 0) {
        setShowMobileHeader(true);
        clearTimeout(headerTimeout);
      } else {
        setShowMobileHeader(true);
        clearTimeout(headerTimeout);
        headerTimeout = setTimeout(() => {
          if (window.pageYOffset > 0) {
            setShowMobileHeader(false);
          }
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      clearTimeout(headerTimeout);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <MobileHeader
        showMobileHeader={showMobileHeader}
        className={
          showMobileHeader ? "show-mobile-header" : "hide-mobile-header"
        }
        user={user}
        onLogout={handleLogout}
      />
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
