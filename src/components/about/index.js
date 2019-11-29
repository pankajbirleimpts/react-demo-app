import React from "react";
import './about.css';

export default function About() {
  console.log("About component");
  return (
    <div>
      <h2>About</h2>
      <div className="main-div">
        <div className="item"> Item 1</div>
        <div className="item">Item 2</div>
        <div className="item">Item 3</div>
        <div className="item">Item 4</div>
      </div>
    </div>
  );
}
