import React from "react";

interface Props {
  activeButton: number | null;
  onSelect?: (button: number) => void;
}

const ButtonGrid: React.FC<Props> = ({ activeButton, onSelect }) => {
  // 1行目: A-E (1-5), 2行目: F-J (6-10), 3行目: K-O (11-15)
  const buttonOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  
  // 数字をアルファベットに変換 (1->A, 2->B, ..., 15->O)
  const numToLetter = (num: number): string => {
    return String.fromCharCode(64 + num); // 65 = 'A'
  };
  
  return (
    <div className="grid">
      {buttonOrder.map((num) => (
        <button
          type="button"
          key={num}
          className={`grid-item ${activeButton === num ? "active" : ""}`}
          onClick={() => onSelect && onSelect(num)}
          tabIndex={0}
        >
          {numToLetter(num)}
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;
