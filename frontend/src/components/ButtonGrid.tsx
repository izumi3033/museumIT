import React from "react";

interface ButtonGridProps {
  active: number | null;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ active }) => {
  const items = Array.from({ length: 15 }, (_, i) => i + 1);
  return (
    <div className="grid">
      {items.map((n) => {
        // 番号ごとに c1..c15 の色クラスを付与
        const colorClass = `c${n}`;
        const isActive = active === n;
        return (
          <div
            key={n}
            className={`grid-item ${colorClass} ${isActive ? "active" : ""}`}
          >
            {n}
          </div>
        );
      })}
    </div>
  );
};

export default ButtonGrid;
