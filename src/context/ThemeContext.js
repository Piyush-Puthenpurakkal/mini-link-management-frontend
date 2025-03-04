import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const themes = {
  "air-snow": {
    "--bg-color": "#ffffff",
    "--text-color": "#333333",
    "--accent-color": "#007bff",
  },
  "air-grey": {
    "--bg-color": "#f0f0f0",
    "--text-color": "#333333",
    "--accent-color": "#6c757d",
  },
  "air-smoke": {
    "--bg-color": "#333333",
    "--text-color": "#ffffff",
    "--accent-color": "#17a2b8",
  },
  "air-black": {
    "--bg-color": "#000000",
    "--text-color": "#ffffff",
    "--accent-color": "#ffc107",
  },
  "mineral-blue": {
    "--bg-color": "#d7eeff",
    "--text-color": "#333333",
    "--accent-color": "#007bff",
  },
  "mineral-green": {
    "--bg-color": "#ccffcc",
    "--text-color": "#333333",
    "--accent-color": "#28a745",
  },
  "mineral-orange": {
    "--bg-color": "#ffe5cc",
    "--text-color": "#333333",
    "--accent-color": "#fd7e14",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "air-snow"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const themeVariables = themes[theme];

    Object.keys(themeVariables).forEach((variable) => {
      if (variable !== "--button-font-color") {
        document.documentElement.style.setProperty(
          variable,
          themeVariables[variable]
        );
      }
    });
  }, [theme]);

  useEffect(() => {
    const storedCustomization = localStorage.getItem("customization");
    if (storedCustomization) {
      try {
        const { buttonColor, buttonFontColor, font, fontColor } =
          JSON.parse(storedCustomization);
        if (buttonColor) {
          document.documentElement.style.setProperty(
            "--button-background",
            buttonColor
          );
        }
        if (buttonFontColor) {
          document.documentElement.style.setProperty(
            "--button-font-color",
            buttonFontColor
          );
        }
        if (font) {
          document.documentElement.style.setProperty("--font-family", font);
        }
        if (fontColor) {
          document.documentElement.style.setProperty("--font-color", fontColor);
        }
      } catch (error) {
        console.error("Error parsing customization from localStorage", error);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
