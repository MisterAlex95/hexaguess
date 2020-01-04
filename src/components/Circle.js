import React from "react";

function Circle(props) {
  const { color, onClick } = props;
  return (
    <div
      className="circle"
      onClick={() => onClick(color)}
      style={{ backgroundColor: color }}
    ></div>
  );
}

export default Circle;
