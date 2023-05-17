import React,{useState, useContext, useEffect} from "react";
import ItemTablaAlerta from "./ItemTablaAlerta";
import DetallesAlerta from "./DetallesAlerta";
import AlertaActivoContext from "../../../context/alertaActivos/alertaActivoContext";
import alertaContext from "../../../context/alertas/alertaContext";

const TablaAlerta = () => {

  // importar valores del context de alertas

    const alertasContext = useContext(alertaContext); //context de alertas
    const {mostrarAlerta} = alertasContext; //funcion para mostrar alertas

    const activoAlertaContex = useContext(AlertaActivoContext); //*context de alertas de activos
    const {obtenerAlertas, alertas} = activoAlertaContex; //*funcion para obtener alertas de activos
 
    //booleanos para mostrar modales
    const [verDetalles, setVerDetalles] = useState(false);

    //funciones para manipular booleanos de modales
    const mostrarDetalles = () => {
      setVerDetalles(!verDetalles);
    };

    //obtener alertas de activos
    useEffect(() => {
      obtenerAlertas(mostrarAlerta);
      // eslint-disable-next-line
    }, []);


  return (
    <>
      {/* <!-- tabla Alertas --> */}
      <div className="card my-5 shadow mb-5">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-secondary">
            Alertas de Activos
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead className="thead-dark">
                <tr className="text-center">
                  <th>N°</th>
                  <th>Fecha</th>
                  <th>Etiqueta Activo</th>
                  <th>Tipo Alerta</th>
                  <th>Detalles</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              
              <tbody>
                {
                  alertas.map((item) => (
                    <ItemTablaAlerta key={item.tb_alerta_id} alerta={item} setMostrarDetalles={mostrarDetalles}/>
                  ))
                }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {verDetalles && <DetallesAlerta setMostrarDetalles={mostrarDetalles}/>}

    </>
  );
};

export default TablaAlerta;
