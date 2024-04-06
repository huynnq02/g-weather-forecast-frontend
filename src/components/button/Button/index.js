import React from "react";

function Button({ label, onClick, color, height, width }) {
  const buttonStyle = {
    backgroundColor: color,
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    height: height,
    width: width,
    padding: "10px",
  };

  return (
    <button className="custom-button" onClick={onClick} style={buttonStyle}>
      {label}
    </button>
  );
}

export default Button;
