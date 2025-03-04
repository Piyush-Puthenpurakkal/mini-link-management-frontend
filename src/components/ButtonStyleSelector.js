import React, { useEffect } from "react";
// Example placeholders. Replace with actual file paths:
import fill1Img from "../assets/appearance/buttons/fill1.png";
import fill2Img from "../assets/appearance/buttons/fill2.png";
import fill3Img from "../assets/appearance/buttons/fill3.png";

import outline1Img from "../assets/appearance/buttons/outline1.png";
import outline2Img from "../assets/appearance/buttons/outline2.png";
import outline3Img from "../assets/appearance/buttons/outline3.png";

import hardShadow1Img from "../assets/appearance/buttons/hardshadow1.png";
import hardShadow2Img from "../assets/appearance/buttons/hardshadow2.png";
import hardShadow3Img from "../assets/appearance/buttons/hardshadow3.png";

import softShadow1Img from "../assets/appearance/buttons/softshadow1.png";
import softShadow2Img from "../assets/appearance/buttons/softshadow2.png";
import softShadow3Img from "../assets/appearance/buttons/softshadow3.png";

import special1Img from "../assets/appearance/buttons/special1.png";
import special2Img from "../assets/appearance/buttons/special2.png";
import special3Img from "../assets/appearance/buttons/special3.png";
import special4Img from "../assets/appearance/buttons/special4.png";
import special5Img from "../assets/appearance/buttons/special5.png";
import special6Img from "../assets/appearance/buttons/special6.png";

const ButtonStyleSelector = ({ customization, setCustomization }) => {
  // De-structure the relevant fields from your customization state
  const {
    buttonStyle = "fill-1",
    buttonColor = "#ffffff",
    buttonFontColor = "#888888",
  } = customization;

  // ─────────────────────────────────────────────────────────────────────────
  // 1) Define all 18 styles, grouped by category
  // ─────────────────────────────────────────────────────────────────────────
  const styleGroups = [
    {
      title: "Fill",
      items: [
        { id: "fill-1", label: "Fill 1", image: fill1Img },
        { id: "fill-2", label: "Fill 2", image: fill2Img },
        { id: "fill-3", label: "Fill 3", image: fill3Img },
      ],
    },
    {
      title: "Outline",
      items: [
        { id: "outline-1", label: "Outline 1", image: outline1Img },
        { id: "outline-2", label: "Outline 2", image: outline2Img },
        { id: "outline-3", label: "Outline 3", image: outline3Img },
      ],
    },
    {
      title: "Hard Shadow",
      items: [
        { id: "hardshadow-1", label: "Hard Shadow 1", image: hardShadow1Img },
        { id: "hardshadow-2", label: "Hard Shadow 2", image: hardShadow2Img },
        { id: "hardshadow-3", label: "Hard Shadow 3", image: hardShadow3Img },
      ],
    },
    {
      title: "Soft Shadow",
      items: [
        { id: "softshadow-1", label: "Soft Shadow 1", image: softShadow1Img },
        { id: "softshadow-2", label: "Soft Shadow 2", image: softShadow2Img },
        { id: "softshadow-3", label: "Soft Shadow 3", image: softShadow3Img },
      ],
    },
    {
      title: "Special",
      items: [
        { id: "special-1", label: "Special 1", image: special1Img },
        { id: "special-2", label: "Special 2", image: special2Img },
        { id: "special-3", label: "Special 3", image: special3Img },
        { id: "special-4", label: "Special 4", image: special4Img },
        { id: "special-5", label: "Special 5", image: special5Img },
        { id: "special-6", label: "Special 6", image: special6Img },
      ],
    },
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // 2) Handlers
  // ─────────────────────────────────────────────────────────────────────────
  // Select a button style
  const handleStyleSelect = (styleId) => {
    setCustomization((prev) => ({
      ...prev,
      buttonStyle: styleId,
    }));
  };

  // Update the button color
  const handleButtonColorChange = (e) => {
    setCustomization((prev) => ({
      ...prev,
      buttonColor: e.target.value,
    }));
  };

  // Update the font color
  const handleButtonFontColorChange = (e) => {
    setCustomization((prev) => ({
      ...prev,
      buttonFontColor: e.target.value,
    }));
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--button-background",
      customization.buttonColor
    );
    document.documentElement.style.setProperty(
      "--button-font-color",
      customization.buttonFontColor
    );
  }, [customization.buttonColor, customization.buttonFontColor]);

  return (
    <div className="button-style-selector">
      {/* Loop over each category (Fill, Outline, etc.) */}
      {styleGroups.map((group) => (
        <div key={group.title} className="button-style-group">
          <h4 className="button-style-group-title">{group.title}</h4>
          <div className="button-style-row">
            {group.items.map((item) => (
              <div
                key={item.id}
                className={`button-style-option ${
                  buttonStyle === item.id ? "selected" : ""
                }`}
                onClick={() => handleStyleSelect(item.id)}
              >
                <img src={item.image} alt={item.label} />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Color Pickers */}
      <div className="button-color-row">
        <div className="color-picker-block">
          <label>Button color</label>
          <div className="color-picker-block-meta">
            <input
              type="color"
              value={buttonColor}
              onChange={handleButtonColorChange}
            />
            <div className="color-picker-block-font">
              <label>Button color</label>
              <p>{buttonColor}</p>
            </div>
          </div>
        </div>
        <div className="color-picker-block">
          <label>Button font color</label>
          <div className="color-picker-block-meta">
            <input
              type="color"
              value={buttonFontColor}
              onChange={handleButtonFontColorChange}
            />
            <div className="color-picker-block-font">
              <label>Button font color</label>
              <p>{buttonFontColor}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonStyleSelector;
