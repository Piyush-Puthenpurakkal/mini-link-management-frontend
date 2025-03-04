// src/components/ThemeSelector.js
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeSelector = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // Define theme options (id and label only)
  const themeOptions = [
    { id: "air-snow", label: "Air Snow" },
    { id: "air-grey", label: "Air Grey" },
    { id: "air-smoke", label: "Air Smoke" },
    { id: "air-black", label: "Air Black" },
    { id: "mineral-blue", label: "Mineral Blue" },
    { id: "mineral-green", label: "Mineral Green" },
    { id: "mineral-orange", label: "Mineral Orange" },
  ];

  return (
    <div className="theme-selector">
      <div className="theme-grid">
        {themeOptions.map((opt) => (
          <div
            key={opt.id}
            className={`theme-card ${theme === opt.id ? "selected" : ""}`}
            onClick={() => setTheme(opt.id)}
          >
            {/* Add a dynamic class corresponding to the theme id */}
            <div className={`theme-preview ${opt.id}`}>
              <div className="theme-line" />
              <div className="theme-line short" />
              <div className="theme-line" />
            </div>
            <p className="theme-label">{opt.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
