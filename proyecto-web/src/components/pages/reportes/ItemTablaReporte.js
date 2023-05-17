import React from "react";

const ItemTablaReporte = ({ activo }) => {
  return (
    <>
      <tr>
        <td style={{ minWidth: "150px",textAlign: "center" }}>{activo.n_etiqueta}</td>
        <td style={{ minWidth: "300px",textAlign: "center" }}>{activo.descripcion}</td>
        <td style={{ minWidth: "150px",textAlign: "center" }}>{activo.marca}</td>
        <td style={{ minWidth: "150px",textAlign: "center" }}>{activo.modelo}</td>
        <td style={{ minWidth: "200px",textAlign: "center" }}>{activo.nombre_ubicacion}</td>
        <td style={{ minWidth: "150px",textAlign: "center" }}>{activo.serie}</td>
        <td style={{ minWidth: "150px",textAlign: "center" }}>₡{activo.valor_libro}</td>
        <td style={{ minWidth: "100",textAlign: "center" }}>{activo.condicion}</td>
        <td style={{ minWidth: "150px",textAlign: "center" }}>{activo.clase_activo}</td>
        <td style={{ minWidth: "150px",textAlign: "center" }}>{activo.dni_funcionario}</td>
        <td style={{ minWidth: "300px",textAlign: "center" }}>{activo.nombre_funcionario}</td>
      </tr>
    </>
  );
};

export default ItemTablaReporte;
