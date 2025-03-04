import React from "react";
import stackImg from "../assets/appearance/stack.png";
import gridImg from "../assets/appearance/grid.png";
import carouselImg from "../assets/appearance/carousel.png";

const LayoutSelector = ({ customization, setCustomization }) => {
  const { layout } = customization;

  const handleLayoutSelect = (value) => {
    setCustomization((prev) => ({
      ...prev,
      layout: value,
    }));
  };

  return (
    <div className="layout-container">
      {/* Stack Option */}
      <div className="layout-stack">
        <div
          className={`layout-card ${layout === "stack" ? "selected" : ""}`}
          onClick={() => handleLayoutSelect("stack")}
        >
          <img src={stackImg} alt="Stack Layout" className="layout-icon" />
        </div>
        <p className="layout-label">Stack</p>
      </div>

      {/* Grid Option */}
      <div className="layout-grid">
        <div
          className={`layout-card ${layout === "grid" ? "selected" : ""}`}
          onClick={() => handleLayoutSelect("grid")}
        >
          <img src={gridImg} alt="Grid Layout" className="layout-icon" />
        </div>
        <p className="layout-label">Grid</p>
      </div>

      {/* Carousel Option */}
      <div className="layout-carousel">
        <div
          className={`layout-card ${layout === "carousel" ? "selected" : ""}`}
          onClick={() => handleLayoutSelect("carousel")}
        >
          <img
            src={carouselImg}
            alt="Carousel Layout"
            className="layout-icon"
          />
        </div>
        <p className="layout-label">Carousel</p>
      </div>
    </div>
  );
};

export default LayoutSelector;
