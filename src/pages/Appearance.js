import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import API from "../api/axiosInstance";
import ProfilePreview from "../components/ProfilePreview";
import LayoutSelector from "../components/LayoutSelector";
import ButtonStyleSelector from "../components/ButtonStyleSelector";
import FontSelector from "../components/FontSelector";
import ThemeSelector from "../components/ThemeSelector";
import { ThemeContext } from "../context/ThemeContext";
import { ToastContext } from "../context/ToastContext";
import "../styles/appearance.css";

const Appearance = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { addToast } = useContext(ToastContext);

  const exampleLinks = [
    { title: "Latest YouTube Video", icon: "youtube-icon.png" },
    { title: "Latest Instagram Reel", icon: "instagram-icon.png" },
    { title: "Another YouTube Video", icon: "youtube-icon.png" },
    { title: "Another Instagram Reel", icon: "instagram-icon.png" },
  ];

  const [customization, setCustomization] = useState(() => {
    const stored = localStorage.getItem("customization");
    return stored
      ? JSON.parse(stored)
      : {
          username: "",
          avatar: "",
          bannerColor: "",
          layout: "stack",
          buttonStyle: "solid",
          font: "DM Sans",
          theme: "air-snow",
          buttonColor: "#ffffff",
          buttonFontColor: "#888888",
          fontColor: "#333333",
        };
  });

  useEffect(() => {
    const fetchCustomization = async () => {
      try {
        const customizationRes = await API.get("api/appearance", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const profileRes = await API.get("api/user/profile", {
          withCredentials: true,
        });
        const updatedCustomization = {
          username: profileRes.data.username,
          avatar: profileRes.data.profileImage,
          bannerColor: customizationRes.data.backgroundColor,
          layout: customizationRes.data.layout,
          buttonStyle: customizationRes.data.buttonStyle,
          font: customizationRes.data.font,
          theme: customizationRes.data.theme,
          buttonColor: customizationRes.data.buttonColor || "#ffffff",
          buttonFontColor: customizationRes.data.buttonFontColor || "#888888",
          fontColor: customizationRes.data.fontColor || "#333333",
        };
        setCustomization(updatedCustomization);
        localStorage.setItem(
          "customization",
          JSON.stringify(updatedCustomization)
        );
        setTheme(customizationRes.data.theme);
      } catch (error) {
        console.error("Error fetching customization:", error);
        addToast("error", "Error fetching customization settings");
      }
    };
    fetchCustomization();
  }, [addToast, setTheme]);

  useEffect(() => {
    setCustomization((prev) => ({
      ...prev,
      theme: theme,
    }));
  }, [theme]);

  const handleSaveChanges = async () => {
    try {
      const res = await API.put("api/appearance", customization, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      addToast("success", "Customization saved successfully!");
      localStorage.setItem("customization", JSON.stringify(customization));
    } catch (error) {
      console.error("Error saving customization:", error);
      addToast("error", "Error saving customization");
    }
  };

  const handleThemeSelect = (selectedTheme) => {
    setTheme(selectedTheme);
    setCustomization((prev) => ({ ...prev, theme: selectedTheme }));
  };

  return (
    <div className="appearance-container">
      <div className="greeting">
        <h2 className="analytics-title">
          Hi, {user?.firstName} {user?.lastName}!
        </h2>
        <p className="analytics-subtitle">
          Congratulations! You got a great response today.
        </p>
      </div>

      {/* Left Side: Profile Preview */}
      <ProfilePreview
        customization={customization}
        links={exampleLinks}
        setCustomization={setCustomization}
      />

      {/* Right Side: Customization Panel */}
      <div className="customization-panel">
        {/* 1. Layout Section */}
        <div className="customization-section">
          <h3>Layout</h3>
          <LayoutSelector
            customization={customization}
            setCustomization={setCustomization}
          />
        </div>

        {/* 2. Buttons Section */}
        <div className="customization-section">
          <h3>Buttons</h3>
          <ButtonStyleSelector
            customization={customization}
            setCustomization={setCustomization}
          />
        </div>

        {/* 3. Fonts Section */}
        <div className="customization-section">
          <h3>Fonts</h3>
          <FontSelector
            customization={customization}
            setCustomization={setCustomization}
          />
        </div>

        {/* 4. Themes Section */}
        <div className="customization-section">
          <h3>Themes</h3>
          <ThemeSelector
            customization={customization}
            setCustomization={setCustomization}
          />
        </div>

        <button className="save-btn-appearance" onClick={handleSaveChanges}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Appearance;
