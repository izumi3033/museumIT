import React from "react";
import "./ButtonGrid.css";

interface Props {
  activeButton: number | null;
}

const ButtonGrid: React.FC<Props> = ({ activeButton }) => {
  // 1行目: A-E (1-5), 2行目: F-J (6-10), 3行目: K-O (11-15)
  const buttonOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  
  // 数字をアルファベットに変換 (1->A, 2->B, ..., 15->O)
  const numToLetter = (num: number): string => {
    return String.fromCharCode(64 + num); // 65 = 'A'
  };
  
  return (
    <div className="grid">
      {buttonOrder.map((num) => (
        <div
          key={num}
          className={`grid-item ${activeButton === num ? "active" : ""}`}
        >
          {numToLetter(num)}
        </div>
      ))}
    </div>
  );
};

export default ButtonGrid;
