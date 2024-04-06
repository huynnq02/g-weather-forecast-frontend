import React from "react";
import "./styles.scss"; // Make sure to define the styles for the line in your SCSS file

function TextLine({ text }) {
  return (
    <div className="text-line">
      <div className="line"></div>
      <div className="text">{text}</div>
      <div className="line"></div>
    </div>
  );
}

export default TextLine;
