import React, { useContext, useEffect, useState } from "react";
import "../styles/settings.css";
import API from "../api/axiosInstance";
import { ToastContext } from "../context/ToastContext";

const Settings = () => {
  const { addToast } = useContext(ToastContext);
  const [user, setUser] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await API.get("api/settings");
        const { firstName = "", lastName = "", email = "" } = res.data;

        // Ensure both user state and formData are set correctly
        setUser({ name: `${firstName} ${lastName}`, email });
        setFormData((prev) => ({ ...prev, firstName, lastName, email }));
      } catch (error) {
        console.error(
          "Error fetching user info:",
          error.response?.data || error
        );
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      addToast("error", "Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const updatedName = `${formData.firstName} ${formData.lastName}`;

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      if (formData.password) {
        payload.password = formData.password;
      }

      const res = await API.put("/settings/update", payload);

      setUser({ name: updatedName, email: formData.email });
      setMessage(res.data.message || "Profile updated successfully");
      addToast("success", res.data.message || "Profile updated successfully");
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      setMessage(error.response?.data?.message || "Error updating profile");
      addToast(
        "error",
        error.response?.data?.message || "Error updating profile"
      );
    }

    setLoading(false);
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="user-name">
          Hi, {formData.firstName} {formData.lastName}!
        </h2>
        <p>Congratulations. You got a response today.</p>
      </div>

      <div className="settings-content">
        <div className="settings-title">
          <span className="edit-profile">Edit Profile</span>
          <hr />
        </div>

        {message && <p className="message">{message}</p>}

        <form className="settings-form" onSubmit={handleProfileUpdate}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="save-btn-settings"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
