import React from "react";

const ItemNavbarAlerta = ({ alerta }) => {
  const Icono = (tipo) => {
    switch (tipo) {
      case "Activo nuevo":
        return (
          <div className="d-flex align-content-center justify-content-center">
            <i
              className="fas fa-plus-square text-success mr-3"
              style={{ fontSize: "1.5em" }}
            ></i>
            <span className="text-success">{alerta.tipo_alerta}</span>
          </div>
        );

      case "Activo Incongruente":
        return (
          <div className="d-flex align-content-center">
            <i
              className="fas fa-exclamation-triangle text-warning mr-3"
              style={{ fontSize: "1.5em" }}
            ></i>
            <span className="text-warning">{alerta.tipo_alerta}</span>
          </div>
        );

      case "Activo eliminado":
        return (
          <div className="d-flex align-content-center">
            <i
              className="fas fa-times-circle text-danger mr-3"
              style={{ fontSize: "1.5em" }}
            ></i>
            <span className="text-danger">{alerta.tipo_alerta}</span>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* <!-- Alerta #1 --> */}
      <div className="dropdown-item">
        <span className="small text-gray-500">{alerta.fecha_alerta}xx</span>
        {Icono(alerta.tipo_alerta)}
        <span className="text-success">{alerta.n_etiqueta}</span>
      </div>
    </>
  );
};

export default ItemNavbarAlerta;
