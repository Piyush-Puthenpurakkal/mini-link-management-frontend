import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/auth.css";
import googleIcon from "../assets/google-icon.png";
import signupIllustration from "../assets/illustration.png";
import sparkLogo from "../assets/spark-logo.png";

const AuthStart = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send user info to backend for authentication
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);

        // Redirect without closing popup to prevent COOP errors
        window.location.href = "/dashboard";
      } else {
        alert("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        <div className="auth-box">
          <div className="logo">
            <img src={sparkLogo} alt="Spark Logo" className="spark-logo" />
          </div>
          <h2>Sign up to your Spark</h2>
          <h3>Welcome to Spark</h3>

          {/* Buttons */}
          <div className="auth-buttons">
            <button onClick={handleGoogleSignIn} className="google-btn">
              <img src={googleIcon} alt="Google" className="google-icon" />
              Continue with Google
            </button>
            <button className="auth-btn" onClick={() => navigate("/signup")}>
              Continue with Email
            </button>
          </div>

          {/* Sign-in Link */}
          <p className="signup-footer">
            Already have an account?
            <Link to="/signin" className="signup-link">
              Sign in
            </Link>
          </p>
        </div>

        {/* reCAPTCHA Disclaimer */}
        <p className="recaptcha-text">
          This site is protected by reCAPTCHA and the{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="image-container">
          <img
            src={signupIllustration}
            alt="Authentication Illustration"
            className="illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthStart;
