
import React from "react";
import Layout from "../../layout/Layout";
import TablaActivo from "./TablaActivo";

function Activos() {

  return (
    <>
      <Layout pageName={"Activos"}>
        <TablaActivo/>
      </Layout>
    </>
  );
}

export default Activos;
