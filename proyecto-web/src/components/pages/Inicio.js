import React from "react";
import Layout from "../layout/Layout";

function Inicio() {
  return (
    <>
      <Layout pageName={"Inicio"}>
        {/* <!-- Imagen inicio --> */}
        <div className="row justify-content-center my-5">
          <div className="col-xl-6 col-lg-8 col-md-10 col-sm-12 bg-image-home bg-opacity-5 rounded-lg"></div>
        </div>
      </Layout>
    </>
  );
}

export default Inicio;
