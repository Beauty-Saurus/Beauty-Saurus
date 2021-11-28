import React, { useState } from "react";

interface Props {
  onDelete?: any;
}

const DeleteIconColor = ({ onDelete }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = (e: any) => {
    setIsHover(true);
    e.target.style.cursor = "pointer";
    e.target.style["box-shadow"] = "rgba(0, 0, 0, 0.1) 0px 2px 10px 0px";
    e.target.style["background-color"] = "white";
    e.stopPropagation();
  };
  const handleMouseLeave = (e: any) => {
    setIsHover(false);
    e.target.style["box-shadow"] = "";
    e.target.style["background-color"] = "";
  };
  return (
    <div style={{ width: "30px" }}>
      <div style={{ float: "right", borderRadius: "16px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="19px"
          viewBox="0 0 24 24"
          width="18px"
          fill="#545454"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={onDelete}
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill={isHover ? "#C4C4C4" : "#545454"}
          />
        </svg>
      </div>
    </div>
  );
};

export default DeleteIconColor;
