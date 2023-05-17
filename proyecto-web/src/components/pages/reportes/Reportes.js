import React, { useEffect, useContext, useState } from "react";
import Layout from "../../layout/Layout";
import FiltrosReportes from "./FiltrosReportes";
import TablaReportes from "./TablaReportes";

//context
import AlertaContext from "../../../context/alertas/alertaContext";
import ActivosContext from "../../../context/activos/activosContext";

function Reportes() {

  //importar los valores del context de alertas
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //importar los valores del context de ubicaciones
  const activoContext = useContext(ActivosContext);
  const { obtenerActivos, activos, cargando } = activoContext;
 
  useEffect(() => {
    obtenerActivos(mostrarAlerta);
  
      // eslint-disable-next-line
   }, []);

// state de este componente
const [activosTabla, setActivosTabla] = useState([]);

  const [nResultado, setNResultado] = useState(5);
 
  useEffect(() => {
    setActivosTabla(activos);
    // eslint-disable-next-line
  }, [activos]);


  useEffect(() => {
    obtenerActivos(mostrarAlerta);
    // eslint-disable-next-line
  }, [cargando]);

  return (
    <>
      <Layout pageName={"Reportes"}>
        <FiltrosReportes
         activosTabla={activosTabla} setActivosTabla={setActivosTabla} 
         nResultado = {nResultado} setNResultado = {setNResultado}
          activos={activos}
        />

        <TablaReportes activosTabla={activosTabla} nResultado ={nResultado} />
      </Layout>
    </>
  );
}

export default Reportes;