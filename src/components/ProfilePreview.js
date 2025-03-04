import React, { useState } from "react";
import youtubeIcon from "../assets/youtube.png";
import instagramIcon from "../assets/instagram.png";
import shopItemImg from "../assets/shop-item.png";
import cartIcon from "../assets/cart-icon.png";

const ProfilePreview = ({ customization }) => {
  const {
    username = "@opopo_08",
    avatar = "/default-avatar.png",
    bannerColor = "#3f2f2b",
    layout = "stack",
  } = customization || {};

  const [activeType, setActiveType] = useState("link");

  const links = [
    {
      icon: youtubeIcon,
      label: "Latest YouTube Video",
      bgColor: "#e0e0e0",
    },
    {
      icon: instagramIcon,
      label: "Latest Instagram Reel",
      bgColor: "#e0e0e0",
    },
  ];

  const shopItem = {
    image: shopItemImg,
    title: "OCOOPA 2 in 1 Magnetic Rechargeable Hand Warmer",
    price: "$39.99",
    grayBgColor: "#f8f8f8",
  };

  // Handler for the toggle switch
  const handleToggleChange = () => {
    setActiveType((prev) => (prev === "link" ? "shop" : "link"));
  };

  return (
    <div className="profile-preview-container">
      {/* Top Banner */}
      <div
        className="profile-preview-banner"
        style={{ backgroundColor: bannerColor }}
      >
        <img className="profile-preview-avatar" src={avatar} alt="Avatar" />
      </div>

      {/* Profile Content */}
      <div className="profile-preview-body">
        <h3 className="profile-preview-username">{username}</h3>

        {/* Toggle Switch for Link / Shop */}
        <div className="profile-toggle-container">
          <input
            type="checkbox"
            id="profile-toggle"
            className="toggleCheckbox"
            checked={activeType === "shop"}
            onChange={() => handleToggleChange()}
          />
          <label htmlFor="profile-toggle" className="toggleContainer">
            <div>Link</div>
            <div>Shop</div>
          </label>
        </div>

        {activeType === "link" ? (
          <div
            className={`profile-preview-links layout-${customization.layout}`}
          >
            {links.map((linkItem, index) => (
              <div
                key={index}
                className="preview-link-item"
                style={{ backgroundColor: linkItem.bgColor }}
              >
                {linkItem.icon && (
                  <img src={linkItem.icon} alt="icon" className="link-icon" />
                )}
                <span>{linkItem.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="profile-preview-shop" style={{ marginTop: "20px" }}>
            <div
              className="shop-item-gray-box"
              style={{
                backgroundColor: shopItem.grayBgColor,
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <img
                src={shopItem.image}
                alt="Shop Item"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <p style={{ margin: "10px 0", fontWeight: "bold" }}>
                {shopItem.title}
              </p>

              {/* Buy Now Button and Price inside the gray box */}
              <button
                className="buy-now-btn"
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: "bold",
                  margin: "10px auto 0 auto",
                }}
              >
                <img
                  src={cartIcon}
                  alt="Cart Icon"
                  style={{ width: "18px", height: "18px" }}
                />
                Buy Now
              </button>
            </div>
          </div>
        )}

        {/* "Get Connected" CTA Button */}
        <button className="profile-preview-cta">Get Connected</button>

        {/* Branding at the bottom */}
        <p className="profile-preview-brand">© SPARK</p>
      </div>
    </div>
  );
};

export default ProfilePreview;
