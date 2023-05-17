import React,{useContext} from "react";
//context
import ActivosContext from "../../../context/activos/activosContext";

const ItemTablaActivo = ({ activo, setModalQr, setActivoElejido, generarCodigoQr, setMostrarEditar}) => {

    //importar los valores del context de activos
    const activosContext = useContext(ActivosContext);
    const {setActivoActual} = activosContext

  /* mostrar  y generar codigo qr*/
  const ejecutarModal = (activoModal) => {
    setModalQr(true);
    setActivoElejido(activoModal);
    generarCodigoQr(activoModal.n_etiqueta);
  };

  const modificarActivo = (activo) => {
    setActivoActual(activo);
    setMostrarEditar();
  }

  return (
    <>
      <tr>
        <td style={{ minWidth: "150px" ,textAlign: "center"}}>{activo.n_etiqueta}</td>
        <td style={{ minWidth: "300px" ,textAlign: "center"}}>{activo.descripcion}</td>
        <td style={{ minWidth: "150px" ,textAlign: "center"}}>{activo.marca}</td>
        <td style={{ minWidth: "150px" ,textAlign: "center"}}>{activo.modelo}</td>
        <td style={{ minWidth: "200px" ,textAlign: "center"}}>{activo.nombre_ubicacion}</td>
        <td style={{ minWidth: "150px" ,textAlign: "center"}}>{activo.serie}</td>
        <td style={{ minWidth: "150px" ,textAlign: "center"}}>₡{activo.valor_libro}</td>
        <td style={{ minWidth: "100"   ,textAlign: "center"}}>{activo.condicion}</td>
        <td style={{ minWidth: "150px" ,textAlign: "center"}}>{activo.clase_activo}</td>
        <td style={{ minWidth: "150px" ,textAlign: "center"}}>{activo.dni_funcionario}</td>
        <td style={{ minWidth: "300px" ,textAlign: "center"  }}>{activo.nombre_funcionario}</td>

        <td style={{ minWidth: "150px" }}>
          <div className="d-flex justify-content-around mt-3">
            <button
              className="btn btn-warning"
              data-toggle="modal"
              data-target="#editActiveModal"
              onClick={() => modificarActivo(activo) }
            >
              <i className="fas fa-edit"></i>
            </button>

            <button
              className="btn btn-dark bg-gradient-dark"
              onClick={() => ejecutarModal(activo)}
            >
              <i className="fas fa-qrcode"></i>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ItemTablaActivo;
