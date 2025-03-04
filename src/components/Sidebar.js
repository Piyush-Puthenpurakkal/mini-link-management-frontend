import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/dashboard.css";
import sparkLogo from "../assets/dashboard/spark-logo.png";
import links from "../assets/dashboard/links-icon.png";
import appearance from "../assets/dashboard/appearance-icon.png";
import analytics from "../assets/dashboard/analytics-icon.png";
import settings from "../assets/dashboard/settings-icon.png";
import logoutIcon from "../assets/dashboard/logout-icon.png";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="sidebar">
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
          <img src={analytics} alt="Analytics Icon" className="sidebar-icon" />
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
              <img src={logoutIcon} alt="Logout Icon" className="logout-icon" />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
