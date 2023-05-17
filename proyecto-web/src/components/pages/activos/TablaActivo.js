import React, { useState, useEffect, useContext } from "react";
import ItemTablaActivo from "./ItemTablaActivo";
import Modal from "../../modal/Modal";
import EditarActivo from "./EditarActivo";
import FuncionesActivo from "./FuncionesActivo";
//dependencias
import html2canvas from "html2canvas";
import QRCode from "qrcode";
//context
import AlertaContext from "../../../context/alertas/alertaContext";
import ActivosContext from "../../../context/activos/activosContext";

const TablaActivo = () => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //importar los valores del context de ubicaciones
  const activoContext = useContext(ActivosContext);
  const { obtenerActivos, activos, cargando } = activoContext;

  //state de acivos filtrados
  const [activosFiltrados, setActivosFiltrados] = useState(activos);

  //booleanos para mostrar modales
  const [editar, setEditar] = useState(false);

  //funciones para manipular booleanos de modales
  const mostrarEditar = () => {
    setEditar(!editar);
  };

  //*******paginacion
  // state para el numero de resultados a mostrar
  const [nResultados, setNResultados] = useState(5);

  // state para indicar el numero de pagina actual
  const [paginaActual, setPaginaActual] = useState(1);

  /* state para activo elejido para codigo qr */

  const [activoElejido, setActivoElejido] = useState(false);

  /*state para controlar Modal para qr */
  const [modalQr, setModalQr] = useState(false);

  /*state codigo qr */
  const [qrCode, setQrCode] = useState("");

  /* funcion para cambiar el state del modal*/
  const manejarModalQr = () => {
    setModalQr(!modalQr);
  };

  /* Funcion que genera codigo qr */
  const generarCodigoQr = async (n_etiqueta) => {
    const configQr = {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.3,
      width: 150,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    };

    try {
      const respuesta = await QRCode.toDataURL(n_etiqueta, configQr);
      setQrCode(respuesta);
    } catch (error) {
      console.log(error);
    }
  };

  /* funcion que genera foto de un componente */
  const screenShotQr = () => {
    const contenedorDatos = document.querySelector("#capturaQr");

    html2canvas(contenedorDatos).then(function (canvas) {
      // Crear un elemento <a>
      let enlace = document.createElement("a");
      /* activar la opcion de descarga y nombre */
      enlace.download = `Activo ${activoElejido.n_etiqueta}`;
      // Convertir la imagen a Base64
      enlace.href = canvas.toDataURL();
      // Hacer click en él
      enlace.click();
    });
  };

  //buscador
  const [buscador, setBuscador] = useState("");

  const filtrarBuscador = () => {
    if (activos.length <= 0) {
      alert("No hay Activos Registrados");
      return;
    }

    let filtrados = activosFiltrados.filter((activo) => {
      const valores = Object.values(activo).map((val) =>
        String(val).toLowerCase()
      );
      return valores.some((val) => val.includes(buscador.toLowerCase()));
    });

    if (filtrados.length === 0) {
      //alert("no hay coincidencias");
      setActivosFiltrados([]);

      setTimeout(() => {
        setActivosFiltrados(activos);
      }, 4000);
    } else {
      setActivosFiltrados(filtrados);
    }
  };

  useEffect(() => {
    obtenerActivos(mostrarAlerta);
    setActivosFiltrados(activos);
    // eslint-disable-next-line
  }, [cargando]);

  useEffect(() => {
    if (buscador === "") {
      setActivosFiltrados(activos);
    } else if (buscador !== "") {
      filtrarBuscador();
    }

    // eslint-disable-next-line
  }, [nResultados, buscador]);

  useEffect(() => {
    if (activosFiltrados.length === 0) {
      setActivosFiltrados(activos);
    }
    // eslint-disable-next-line
  }, [activos]);

  return (
    <>
      <FuncionesActivo listaActivosFiltados={activosFiltrados} />

      <div className="card mt-4 shadow mb-5">
        <div className="card-header py-3 d-flex align-items-center justify-content-around">
          <h4 className="m-0 d-block font-weight-bold text-secondary">
            Activos Campus Sarapiquí
          </h4>

          <div className="">
            <form className="form-inline" onSubmit={filtrarBuscador}>
              <input
                className="form-control w-75 mr-2"
                type="search"
                name="buscador"
                id="buscador"
                placeholder="Buscar..."
                onChange={(e) => setBuscador(e.target.value)}
              />
              <label className="btn btn-ligth btn-sm">
                <i className="fas fa-search"></i>
              </label>
            </form>
          </div>

          <div className="">
            <label className="d-inline" htmlFor="nResultados">
              Resultados por página:{" "}
            </label>
            <select
              className="mx-2 w-auto custom-select"
              name="nResultados"
              id="nResultados"
              value={nResultados}
              onChange={(e) => setNResultados(e.target.value)}
            >
              <option value={5} className="text-center">
                5
              </option>
              <option value={10} className="text-center">
                10
              </option>
              <option value={15} className="text-center">
                15
              </option>
              <option value={20} className="text-center">
                20
              </option>
            </select>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover"
              id="dataTableActivo"
              width="160%"
              cellSpacing="0"
            >
              <thead className="thead-dark">
                <tr className="text-center">
                  <th>N° Etiqueta</th>
                  <th>Descripción</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Ubicación</th>
                  <th>Serie</th>
                  <th>Valor en Libros</th>
                  <th>Condición</th>
                  <th>Clase Activo</th>
                  <th>Identificación Funcionario</th>
                  <th>Nombre Funcionario</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {/* <!-- elementos de tabla --> */}
                {activosFiltrados
                  .slice(
                    (paginaActual - 1) * nResultados,
                    paginaActual * nResultados
                  )
                  .map((item) => (
                    <ItemTablaActivo
                      key={item.n_etiqueta}
                      activo={item}
                      setModalQr={setModalQr}
                      setActivoElejido={setActivoElejido}
                      generarCodigoQr={generarCodigoQr}
                      setMostrarEditar={mostrarEditar}
                    />
                  ))}
              </tbody>
            </table>

            {activosFiltrados.length === 0 && (
              <div className="alert alert-warning" role="alert">
                No se encontraron resultados!
              </div>
            )}

            <div className="d-flex justify-content-center align-items-center my-3">
              {paginaActual > 1 && (
                <button
                  id="anterior"
                  type="button"
                  className="btn btn-sm btn-outline-light text-secondary border-secondary mx-2"
                  onClick={() => {
                    setPaginaActual(paginaActual - 1);
                  }}
                >
                  Anterior
                </button>
              )}

              <div id="proxima" className="bg-dark text-white px-3 py-1">
                {paginaActual}
              </div>

              {paginaActual <
                Math.ceil(activosFiltrados.length / nResultados) && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light text-secondary border-secondary mx-2"
                  onClick={() => {
                    if (
                      paginaActual <
                      Math.ceil(activosFiltrados.length / nResultados)
                    ) {
                      setPaginaActual(paginaActual + 1);
                    }
                  }}
                >
                  Próxima
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {editar && <EditarActivo setMostrarEditar={mostrarEditar} />}

      {modalQr && (
        <Modal
          funcionVentana={manejarModalQr}
          tituloModal={"Generar Código QR"}
        >
          <p> Código QR generado</p>

          <div className="d-flex flex-column align-items-center justify-content-center">
            <div
              className="d-flex flex-column align-items-center justify-content-center p-2"
              id="capturaQr"
            >
              <p>
                <span className="font-weight-bold">N° Etiqueta:</span>{" "}
                {activoElejido.n_etiqueta}{" "}
              </p>
              <p>
                <span className="font-weight-bold">Descripción:</span>{" "}
                {activoElejido.descripcion}{" "}
              </p>

              <a
                href={qrCode}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="text-center"
              >
                <img
                  src={qrCode}
                  className="shadow-lg"
                  alt="Codigo Qr del activo"
                />
              </a>
            </div>
            <button
              className="btn btn-dark d-block w-25  bg-gradient-dark mt-3"
              onClick={() => screenShotQr(activoElejido.nEtiqueta)}
            >
              <i className="fas fa-download"></i>
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TablaActivo;
