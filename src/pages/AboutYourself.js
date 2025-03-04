import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import "../styles/auth.css";

// Example image imports
import sparkLogo from "../assets/spark-logo.png";
import illustration from "../assets/illustration.png";

// Example category icons
import businessIcon from "../assets/AboutYourself/business.png";
import creativeIcon from "../assets/AboutYourself/creative.png";
import educationIcon from "../assets/AboutYourself/education.png";
import entertainmentIcon from "../assets/AboutYourself/entertainment.png";
import fashionandbeautyIcon from "../assets/AboutYourself/fashionandbeauty.png";
import foodandbeverageIcon from "../assets/AboutYourself/foodandbeverage.png";
import governmentandpoliticsIcon from "../assets/AboutYourself/governmentandpolitics.png";
import healthandwellnessIcon from "../assets/AboutYourself/healthandwellness.png";
import nonprofitIcon from "../assets/AboutYourself/nonprofit.png";
import otherIcon from "../assets/AboutYourself/other.png";
import techIcon from "../assets/AboutYourself/tech.png";
import travelandtourismIcon from "../assets/AboutYourself/travelandtourism.png";

const AboutYourself = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/user/profile")
      .then((res) => {
        setUsername(res.data.username || "");
        setSelectedCategory(res.data.category || "");
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, []);

  // Handler for picking a category
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  // Handler for "Continue" button
  const handleContinue = async () => {
    if (!username) return;

    setLoading(true);
    try {
      await API.put("/user/profile", {
        username,
        category: selectedCategory,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-box">
          <div className="logo">
            <img src={sparkLogo} alt="Spark Logo" className="spark-logo" />
          </div>

          <h2>Tell us about yourself</h2>
          <p style={{ marginBottom: "1rem" }}>
            For a personalized Spark experience
          </p>

          {/* USERNAME INPUT */}
          <input
            type="text"
            placeholder="Set your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />

          {/* CATEGORY SELECTION */}
          <p style={{ marginTop: "1.5rem" }}>
            Select one category that best describes you:
          </p>
          <div className="categories-container">
            {/* Business */}
            <div
              className={`category-item ${
                selectedCategory === "Business" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Business")}
            >
              <img src={businessIcon} alt="Business" />
              <span>Business</span>
            </div>

            {/* Creator */}
            <div
              className={`category-item ${
                selectedCategory === "Creator" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Creator")}
            >
              <img src={creativeIcon} alt="Creator" />
              <span>Creator</span>
            </div>

            {/* Education */}
            <div
              className={`category-item ${
                selectedCategory === "Education" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Education")}
            >
              <img src={educationIcon} alt="Education" />
              <span>Education</span>
            </div>

            {/* Entertainment */}
            <div
              className={`category-item ${
                selectedCategory === "Entertainment" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Entertainment")}
            >
              <img src={entertainmentIcon} alt="Entertainment" />
              <span>Entertainment</span>
            </div>

            <div
              className={`category-item ${
                selectedCategory === "Fashion & Beauty" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Fashion & Beauty")}
            >
              <img src={fashionandbeautyIcon} alt="Fashion & Beauty" />
              <span>Fashion & Beauty</span>
            </div>

            <div
              className={`category-item ${
                selectedCategory === "Food & Beverage" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Food & Beverage")}
            >
              <img src={foodandbeverageIcon} alt="Food & Beverage" />
              <span>Food & Beverage</span>
            </div>

            <div
              className={`category-item ${
                selectedCategory === "Government & Politics" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Government & Politics")}
            >
              <img
                src={governmentandpoliticsIcon}
                alt="Government & Politics"
              />
              <span>Government & Politics</span>
            </div>

            <div
              className={`category-item ${
                selectedCategory === "Health & Wellness" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Health & Wellness")}
            >
              <img src={healthandwellnessIcon} alt="Health & Wellness" />
              <span>Health & Wellness</span>
            </div>

            <div
              className={`category-item ${
                selectedCategory === "Non-Profit" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Non-Profit")}
            >
              <img src={nonprofitIcon} alt="Non-Profit" />
              <span>Non-Profit</span>
            </div>

            <div
              className={`category-item ${
                selectedCategory === "Other" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Other")}
            >
              <img src={otherIcon} alt="Other" />
              <span>Other</span>
            </div>

            <div
              className={`category-item ${
                selectedCategory === "Tech" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Tech")}
            >
              <img src={techIcon} alt="Tech" />
              <span>Tech</span>
            </div>

            <div
              className={`category-item ${
                selectedCategory === "Travel & Tourism" ? "selected" : ""
              }`}
              onClick={() => handleSelectCategory("Travel & Tourism")}
            >
              <img src={travelandtourismIcon} alt="Travel & Tourism" />
              <span>Travel & Tourism</span>
            </div>
          </div>

          {/* CONTINUE BUTTON (DISABLED IF NO USERNAME) */}
          <button
            className="continue-btn"
            onClick={handleContinue}
            disabled={!username}
          >
            Continue
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: illustration */}
      <div className="auth-right">
        <div className="image-container">
          <img
            src={illustration}
            alt="Illustration"
            className="illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutYourself;
