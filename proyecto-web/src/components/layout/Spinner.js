import React from "react";

const Spinner = () => {
  return (
    <div className="text-center my-5">
      <div className="d-flex justify-content-center ">
        <div
          className="spinner-border"
          
          role="status"
        ></div>
      </div>

      <span className="text-dark mt-2">Cargando...</span>
    </div>
  );
};

export default Spinner;
