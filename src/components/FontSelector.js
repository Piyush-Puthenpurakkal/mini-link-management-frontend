import React, { useState, useEffect } from "react";
import aaIcon from "../assets/appearance/fonts/aa.png";

const FontSelector = ({ customization, setCustomization }) => {
  const { font = "DM Sans", fontColor = "#333333" } = customization;

  const fontOptions = [
    "DM Sans",
    "Roboto",
    "Montserrat",
    "Poppins",
    "Open Sans",
    "Lato",
    "Oswald",
    "Playfair Display",
  ];

  const [showDropdown, setShowDropdown] = useState(false);

  const handleFontSelect = (selectedFont) => {
    setCustomization((prev) => ({
      ...prev,
      font: selectedFont,
    }));
    setShowDropdown(false);
  };

  const handleFontColorChange = (e) => {
    setCustomization((prev) => ({
      ...prev,
      fontColor: e.target.value,
    }));
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--font-family", font);
    document.documentElement.style.setProperty("--font-color", fontColor);
  }, [font, fontColor]);

  return (
    <div className="font-selector">
      {/* FONT LABEL + BOX */}
      <label className="font-label">Font</label>
      <div className="font-box" onClick={() => setShowDropdown(!showDropdown)}>
        <img src={aaIcon} alt="Aa" className="font-box-icon" />
        <span className="font-box-name">{font}</span>
      </div>

      {/* Dropdown for fonts (optional). If you prefer a native select, see below. */}
      {showDropdown && (
        <div className="font-dropdown">
          {fontOptions.map((option) => (
            <div
              key={option}
              className="font-dropdown-option"
              onClick={() => handleFontSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {/* COLOR LABEL + PICKER */}
      <label className="font-color-label">Color</label>
      <div className="font-color-box">
        <input
          type="color"
          className="font-color-picker"
          value={fontColor}
          onChange={handleFontColorChange}
        />
        <div className="font-color-meta">
          <label>Color</label>
          <p className="font-color-text">{fontColor}</p>
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
