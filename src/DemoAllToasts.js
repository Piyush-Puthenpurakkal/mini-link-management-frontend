import React from "react";
import Toast from "./Toast";
import "./Toast.css";

const DemoAllToasts = () => {
  const successMessages = [
    "Copied to clipboard",
    "Successfully saved",
    "Successfully added shop",
    "Successfully added link",
  ];

  const errorMessages = [
    "Failed to save",
    "Failed to retry again",
    "Something went wrong",
    "Failed to add shop",
    "Failed to add link",
  ];

  const handleClose = (msg) => {
    console.log("Closed toast:", msg);
  };

  return (
    <div style={{ display: "flex", gap: "60px", margin: "40px" }}>
      <div>
        <h3 style={{ fontFamily: "sans-serif", marginBottom: "10px" }}>
          Success
        </h3>
        {successMessages.map((msg, index) => (
          <Toast
            key={index}
            type="success"
            message={msg}
            onClose={() => handleClose(msg)}
          />
        ))}
      </div>

      <div>
        <h3 style={{ fontFamily: "sans-serif", marginBottom: "10px" }}>
          Error
        </h3>
        {errorMessages.map((msg, index) => (
          <Toast
            key={index}
            type="error"
            message={msg}
            onClose={() => handleClose(msg)}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoAllToasts;
