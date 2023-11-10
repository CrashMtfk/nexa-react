import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export default function Stage({ stage, handleStatusChange }) {
  const handleClick = () => {
    handleStatusChange(stage.id);
  };

  return (
    <div>
      {stage.status ? (
        <AiIcons.AiFillCheckCircle
          className="j-complete-button"
          onClick={handleClick}
        />
      ) : (
        <BsIcons.BsCircle className="j-complete-button" onClick={handleClick} />
      )}
      <span className="stage-connect-line"></span>
    </div>
  );
}
