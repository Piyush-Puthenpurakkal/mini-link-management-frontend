import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import API from "../api/axiosInstance";
import "../styles/auth.css";
import googleIcon from "../assets/google-icon.png";
import signupIllustration from "../assets/illustration.png";
import sparkLogo from "../assets/spark-logo.png";
import divider from "../assets/divider.png";

// 1. Strong password regex
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*])[A-Za-z\d!@#$%^*]{8,}$/;

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await API.post("api/auth/register", data);
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Send user info to backend for authentication
      const response = await fetch(
        "https://mini-link-management-backend.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          }),
        }
      );

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
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
      <div className="auth-left">
        <div className="auth-box">
          <div className="logo">
            <img src={sparkLogo} alt="Spark Logo" className="spark-logo" />
          </div>
          <h2>Sign up to your Spark</h2>
          <div class="signup-footer-signup">
            <span>Create an account</span>
            <Link to="/login" className="auth-switch">
              Sign in instead
            </Link>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label>First name</label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <p className="error">{errors.firstName.message}</p>
              )}
              <label>Last name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="error">{errors.lastName.message}</p>
              )}
            </div>

            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Please enter your password*",
                pattern: {
                  value: strongPasswordRegex,
                  message:
                    "Please choose a strong password (8+ chars) with at least 1 lowercase, 1 uppercase, 1 number, and 1 special character (!@#$%^*)",
                },
              })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") ||
                  "The password you entered does not match*",
              })}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
            {/* Terms & Privacy */}
            <div className="terms-container">
              <input type="checkbox" required id="terms" />
              <span>
                By creating an account, I agree to the{" "}
                <Link to="#">Terms of Use</Link> and{" "}
                <Link to="#">Privacy Policy</Link>.
              </span>
            </div>
            <br />
            <button type="submit" className="auth-btn">
              Create an Account
            </button>
          </form>

          {/* OR Divider */}
          <div className="divider">
            <img src={divider} alt="Divider" />
          </div>

          {/* Google Signup Button */}
          <button onClick={handleGoogleSignIn} className="google-btn">
            <img src={googleIcon} alt="Google" />
            Continue with Google
          </button>
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
        <div className="image-container">
          <img
            src={signupIllustration}
            alt="Signup Visual"
            className="illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
