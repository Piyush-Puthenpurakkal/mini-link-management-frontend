import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AuthStart from "./pages/AuthStart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutYourself from "./pages/AboutYourself";
import Dashboard from "./pages/Dashboard";
import Links from "./pages/Links";
import ProfileCustomization from "./pages/ProfileCustomization";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Appearance from "./pages/Appearance";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth-start" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleAuthSuccess = (event) => {
      if (event.data === "auth-success") {
        window.location.reload();
      }
    };

    window.addEventListener("message", handleAuthSuccess);
    return () => window.removeEventListener("message", handleAuthSuccess);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route path="/auth-start" element={<AuthStart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/about-yourself"
          element={
            <ProtectedRoute>
              <AboutYourself />
            </ProtectedRoute>
          }
        />

        {/* Protected Routes with Sidebar */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout">
                <Sidebar />
                <div className="main-content">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="links" element={<Links />} />
                    <Route
                      path="profile/customization"
                      element={<ProfileCustomization />}
                    />
                    <Route path="profile/appearance" element={<Appearance />} />

                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
