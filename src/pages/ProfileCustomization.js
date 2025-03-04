import { useState, useEffect } from "react";
import API from "../api/axiosInstance";
import ThemeSelector from "../components/ThemeSelector";
import ButtonStyleSelector from "../components/ButtonStyleSelector";
import LayoutSelector from "../components/LayoutSelector";
import "../styles/profileCustomization.css";

const ProfileCustomization = () => {
  const [customization, setCustomization] = useState({
    theme: "light",
    buttonStyle: "rounded",
    layout: "default",
  });

  useEffect(() => {
    const fetchCustomization = async () => {
      try {
        const res = await API.get("/profile/customization", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCustomization(res.data);
      } catch (error) {
        console.error("Error fetching customization:", error);
      }
    };
    fetchCustomization();
  }, []);

  const handleSaveChanges = async () => {
    try {
      await API.put("/profile/customization", customization, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Customization saved successfully!");
    } catch (error) {
      console.error("Error saving customization:", error);
    }
  };

  return (
    <div className="customization-container">
      <h2>Customize Your Profile</h2>

      <ThemeSelector
        customization={customization}
        setCustomization={setCustomization}
      />
      <ButtonStyleSelector
        customization={customization}
        setCustomization={setCustomization}
      />
      <LayoutSelector
        customization={customization}
        setCustomization={setCustomization}
      />

      <button className="save-btn" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
};

export default ProfileCustomization;
