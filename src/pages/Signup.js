import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosInstance";
import "../styles/auth.css";
import googleIcon from "../assets/google-icon.png";
import signupIllustration from "../assets/illustration.png";
import sparkLogo from "../assets/spark-logo.png";
import divider from "../assets/divider.png";

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
      await API.post("/auth/register", data);
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
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
          <div class="signup-footer">
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
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
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
                  value === watch("password") || "Passwords do not match",
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
          <button className="google-btn">
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
