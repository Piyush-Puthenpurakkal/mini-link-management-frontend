import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div className="dashboard-container">
      {/* <Sidebar /> */}
      <main className="dashboard-content">
        <h1>
          Hi, {user?.firstName} {user?.lastName}!
        </h1>
        <p>Great response today! Keep growing your digital presence.</p>
        <div className="profile-section" onClick={toggleLogout}>
          <img
            src={user?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="profile-img"
          />
          <h3>{user?.username}</h3>
          <p>{user?.email}</p>
          {showLogout && <button className="logout-btn">Logout</button>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
