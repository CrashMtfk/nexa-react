import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Stage({ stage}) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/dashboard/stage-details", {
      state: {
         stage: stage
      },
    })
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
