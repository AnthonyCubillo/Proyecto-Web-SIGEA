import React from "react";
import Layout from "../../layout/Layout";
import TablaAlerta from "./TablaAlerta";

function Alertas() {
  //Aqui logica Alertas Pendiente
  const alertas = [
    {
      id_alerta: "1",
      fecha_alerta: "09/10/2022",
      n_etiqueta: "N5401487",
      marca: "SONY",
      modelo: "Xperia 1",
      serie: "son12312",
      descripcion: "COMPUTADORA DE TRABAJO",
      id_ubicacion: "oficina 1",
      valor_libro: "00,21",
      condicion: "bueno",
      clase_activo: "Computadora",
      id_funcionario: 1,
      dni_funcionario: "702860409",
      nombre_funcionario: "Anthony Cubillo Cruz",
      tipo_alerta: "Activo nuevo",
    },
    {
      id_alerta: "2",
      fecha_alerta: "19/11/2022",
      n_etiqueta: "N0012287",
      marca: "HP",
      modelo: "HP 1",
      serie: "hp12312",
      descripcion: "COMPUTADORA DE oficina",
      id_ubicacion: "gym 1",
      valor_libro: "00,21",
      condicion: "bueno",
      clase_activo: "Computadora",
      id_funcionario: 1,
      dni_funcionario: "402050851",
      nombre_funcionario: "Emily Ramirez Esquivel",
      tipo_alerta: "Activo Incongruente",
    },
    {
      id_alerta: "3",
      fecha_alerta: "1/11/2022",
      n_etiqueta: "N0012001",
      marca: "acer",
      modelo: "acer 1",
      serie: "acc12312",
      descripcion: "COMPUTADORA DE campo",
      id_ubicacion: "oficina 1",
      valor_libro: "00,21",
      condicion: "bueno",
      clase_activo: "Computadora",
      id_funcionario: 1,
      dni_funcionario: "25689345",
      nombre_funcionario: "Marvin Esteban Rodriguez",
      tipo_alerta: "Activo eliminado",
    },
  ];

  return (
    <>
      <Layout pageName={"Alertas"}>
        {/* <!-- tabla usuario  --> */}
        <TablaAlerta alertas={alertas} />
      </Layout>
    </>
  );
}

export default Alertas;
