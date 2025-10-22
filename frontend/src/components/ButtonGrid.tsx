import React from "react";
import "./ButtonGrid.css";

interface Props {
  activeButton: number | null;
}

const ButtonGrid: React.FC<Props> = ({ activeButton }) => (
  <div className="grid">
    {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
      <div
        key={num}
        className={`grid-item ${activeButton === num ? "active" : ""}`}
      >
        {num}
      </div>
    ))}
  </div>
);

export default ButtonGrid;
