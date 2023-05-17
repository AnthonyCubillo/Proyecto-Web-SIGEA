import React from "react";

const SingleColor = ({ hexColor,handleColor }) => {

  return (
    <div className="single-card" style={{ backgroundColor: `#${hexColor}` }} onClick={()=>handleColor(`#${hexColor}`)}>
      <div className="content">
        <p>#{hexColor}</p>
      </div>
    </div>
  );
};

export default SingleColor;
