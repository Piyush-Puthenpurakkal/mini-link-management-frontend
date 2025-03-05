import { useState } from "react";
import API from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import loginImage from "../assets/illustration.png";
import sparkLogo from "../assets/spark-logo.png";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("api/auth/login", credentials);
      localStorage.setItem("token", res.data.token);

      const user = res.data.user;
      if (!user.username) {
        navigate("/about-yourself");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-box">
          <div className="logo">
            <img src={sparkLogo} alt="Spark Logo" className="spark-logo" />
          </div>
          <h2>Sign in to your Spark</h2>
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Spark/ Username"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
            <button
              type="submit"
              className="login-btn"
              disabled={!credentials.email || !credentials.password}
            >
              Log in
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
            <br />
            <br />
            <span> Don't have an account? </span>
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </div>
        </div>
        <p className="recaptcha-text">
          This site is protected by reCAPTCHA and the
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Privacy Policy
          </a>{" "}
          and
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Terms of Service
          </a>
          .
        </p>
      </div>
      <div className="auth-right">
        <img
          src={loginImage}
          alt="Login Visual"
          className="illustration-image"
        />
      </div>
    </div>
  );
};

export default Login;
