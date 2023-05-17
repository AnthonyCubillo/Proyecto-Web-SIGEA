import React, { useState, useEffect } from "react";
import * as FileSaver from "file-saver";
import ExcelJS from "exceljs";

const FiltrosReportes = ({
  activosTabla,
  activos,
  setActivosTabla,
  setNResultado,
}) => {
  const [tipoFiltro, setTipoFiltro] = useState(0);
  const [filtros, setFiltros] = useState({
    nResultados: 0,
    valor: "",
    operador: "igual",
    buscador: "",
  });

  const obtenerDatos = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  const filtrarBuscador = (e) => {
    if (e) {
      e.preventDefault();
    }

    let resultFiltro =
      activos.length > 0
        ? [...activos]
        : (alert("no hay activos"), setActivosTabla([]));

    switch (tipoFiltro) {
      case 1:
        // Buscar por nombre aleatorio
        resultFiltro = activos;

        let dniFuncionario = obtenerDniAleatorio();
        resultFiltro = resultFiltro.filter((activo) =>
          activo.dni_funcionario
            .toLowerCase()
            .trim()
            .includes(dniFuncionario.toLowerCase())
        );

        break;
      case 2:
        let valorIngresado = filtros.valor;

        let valorNumerico = parseFloat(
          valorIngresado.replace(".", "").replace(",", ".")
        ); // convierte la cadena en un número, eliminando los separadores de miles y reemplazando las comas por puntos
        console.log(valorNumerico);
        switch (filtros.operador) {
          case "mayor":
            resultFiltro = resultFiltro.filter((activo) => {
              let activoNumber = parseFloat(
                activo.valor_libro.replace(".", "").replace(",", ".")
              );
              return activoNumber > valorNumerico;
            });
            break;
          case "menor":
            resultFiltro = resultFiltro.filter((activo) => {
              let activoNumber = parseFloat(
                activo.valor_libro.replace(".", "").replace(",", ".")
              );
              return activoNumber < valorNumerico;
            });
            break;
          case "igual":
            resultFiltro = resultFiltro.filter((activo) => {
              const valorLibro = String(activo.valor_libro).toLowerCase();
              return valorLibro.includes(valorIngresado.toLowerCase());
            });
            break;

          default:
            break;
        }
        break;

      default:
        // Buscar en todas las columnas
        resultFiltro = resultFiltro.filter((activo) => {
          const valores = Object.values(activo).map((val) =>
            String(val).toLowerCase()
          );
          return valores.some((val) =>
            val.includes(filtros.buscador.toLowerCase())
          );
        });
    }

    if (resultFiltro.length === 0) {
      setActivosTabla([]);
      setTimeout(() => {
        setActivosTabla(activos);
      }, 4000);
    } else {
      setActivosTabla(resultFiltro);
    }
  };

  useEffect(() => {
    if (filtros.buscador === "") {
      setActivosTabla(activos);
    } else if (filtros.buscador !== "") {
      filtrarBuscador();
    }
    // eslint-disable-next-line
  }, [filtros.buscador, setActivosTabla, setFiltros]);

  useEffect(() => {
    if (filtros.valor === "") {
      setActivosTabla(activos);
    } else if (filtros.valor !== "") {
      filtrarBuscador();
    }
    // eslint-disable-next-line
  }, [filtros.valor, setActivosTabla, setFiltros]);

  useEffect(() => {
    if (
      filtros.nResultados >= 5 &&
      filtros.nResultados <= 30 &&
      filtros.valor === "" &&
      filtros.buscador === ""
    ) {
      setNResultado(filtros.nResultados);
      setActivosTabla(activos);
    } else if (filtros.valor !== "" || filtros.buscador !== "") {
      console.log(filtros.nResultados);
      setNResultado(filtros.nResultados);
      filtrarBuscador();
    }
    // eslint-disable-next-line
  }, [filtros.nResultados, setActivosTabla, setFiltros]);

  const obtenerDniAleatorio = () => {
    // Generar un número aleatorio entre 0 y la longitud del array de activos
    const indiceAleatorio = Math.floor(Math.random() * activos.length);
    // Obtener el elemento del array de activos correspondiente al índice aleatorio
    const activoAleatorio = activos[indiceAleatorio];
    // Extraer el apellido del elemento aleatorio y devolverlo
    return activoAleatorio.dni_funcionario.trim();
  };

  //nombre de archivo exportar excel
  const [nombreArchivoR, setNombreArchivoR] = useState("Reporte de activos");

  //carga un nombre basado en la fecha y milisegundos
  useEffect(() => {
    const fecha = new Date();
    setNombreArchivoR(
      `Reporte de activos-${fecha.getDate()}-${
        fecha.getMonth() + 1
      }-${fecha.getFullYear()}-${fecha.getMilliseconds()}`
    );
  }, [nombreArchivoR]);

  const generarReporte = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Activos");
    setNombreArchivoR("Reporte de activos");
    //variables de configuraciones
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const columnas = [
      [
        { header: "N° Etiqueta", key: "n_etiqueta", width: 15 },
        { header: "Descripción", key: "descripcion", width: 30 },
        { header: "Marca", key: "marca", width: 15 },
        { header: "Modelo", key: "modelo", width: 15 },
        { header: "Ubicación", key: "nombre_ubicacion", width: 15 },
        { header: "Serie", key: "serie", width: 15 },
        { header: "Valor en Libros", key: "valor_libro", width: 15 },
        { header: "Condición", key: "condicion", width: 15 },
        { header: "Clase Activo", key: "clase_activo", width: 15 },
        {
          header: "Identificación Funcionario",
          key: "dni_funcionario",
          width: 30,
        },
        { header: "Nombre Funcionario", key: "nombre_funcionario", width: 35 },
      ],
    ];

    worksheet.columns = columnas[0];

    const datos = activosTabla;

    // Agregando datos a la hoja de trabajo
    worksheet.addRows(datos);

    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
      // Verificar si la fila está vacía
      let isEmpty = true;
      row.eachCell(function (cell) {
        if (cell.value !== null) {
          isEmpty = false;
          // Establecer estilo de borde en la celda
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };

          // Establecer estilo de alineación en la celda
          cell.alignment = {
            vertical: "middle",
            horizontal: "left",
          };
          row.height = 20;

          // Establecer estilo de fuente en la celda
          cell.font = {
            name: "Calibri",
            size: 11,
          };

          // Establecer estilo de relleno en la celda
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFFFFF" },
          };

          //Establecer estilo a las celdas impares
          if (rowNumber % 2 === 0) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFF2F2F2" },
            };
          }

          //Establecer estilo al encabezado
          if (rowNumber === 1) {
            cell.font = {
              name: "Calibri",
              size: 11,
              bold: true,
              color: { argb: "FFFFFFFF" },
            };
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "8b0000" },
            };
            cell.alignment = {
              vertical: "middle",
              horizontal: "center",
            };
            row.height = 25;
          }
        }
      });

      // Si la fila está vacía, borrar los estilos
      if (isEmpty) {
        row.eachCell(function (cell) {
          cell.style = {};
        });
      }
    });

    // Generando archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const data = new Blob([buffer], { type: fileType });
      FileSaver.saveAs(data, nombreArchivoR + fileExtension);
    });
  };

  return (
    <>
      {/* <!-- filtros --> */}
      <div className="row justify-content-md-around">
        <div className="col-md-3 col-lg-2 col-sm-4">
          <div className="dropdown no-arrow">
            <button
              className="btn  btn-primary dropdown-toggle"
              id="filtrosDropdown"
              onClick={() => {
                document.getElementById("buscador").value = "";
              }}
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-filter mr-3"></i>
              <span>Filtros</span>
            </button>
            <div
              className="dropdown-list dropdown-menu dropdown-menu-right rounded-lg bg-gradient-primary px-2 ml-3"
              aria-labelledby="filtrosDropdown"
            >
              <div className=" d-flex flex-column bg-gradient-primary">
                <button
                  className="btn btn-light shadow-lg collapse-item mt-2"
                  onClick={() => {
                    setTipoFiltro(0);

                    setActivosTabla(activos);
                  }}
                >
                  <i className="fas fa-search mr-3"></i>
                  Buscador
                </button>

                <button
                  className="btn btn-light mt-2"
                  onClick={() => {
                    setTipoFiltro(1);
                    setActivosTabla(activos);
                  }}
                >
                  <i className="fas fa-random mr-3"></i>
                  <span className="text"> Aleatorio </span>
                </button>

                <button
                  className="btn btn-light collapse-item mt-2"
                  onClick={() => {
                    setTipoFiltro(2);
                    setActivosTabla(activos);
                  }}
                >
                  <i className="fas fa-coins mr-2"></i>
                  Valor en Libros
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Por buscador --> */}
        {tipoFiltro === 0 ? (
          <div className="col-md-4 col-lg-3 col-sm-8">
            <form className="form-inline">
              <input
                className="form-control w-75 mr-2"
                type="search"
                name="buscador"
                id="buscador"
                placeholder="Buscar..."
                onChange={obtenerDatos}
                value={filtros.buscador}
              />
              <label className="btn btn-secondary">
                <i className="fas fa-search"></i>
              </label>
            </form>
          </div>
        ) : null}

        {/* <!-- Por aleatorio --> */}
        {tipoFiltro === 1 ? (
          <div className="col-md-4 col-sm-6 mt-2 mt-md-0">
            <button
              className="btn btn-secondary shadow-sm btn-icon-split"
              onClick={filtrarBuscador}
            >
              <span className="icon text-white-50">
                <i className="fas fa-random"></i>
              </span>
              <span className="text"> Aleatorio </span>
            </button>
          </div>
        ) : null}

        {/* <!-- Por valor en libros --> */}
        {tipoFiltro === 2 ? (
          <div className="col-md-8 col-lg-5 col-sm-8 mt-2 mt-md-0">
            <form
              className="form-inline align-content-center"
              onSubmit={filtrarBuscador}
              type="submit"
            >
              <label htmlFor="nResultados w-25">Valor en Libros</label>
              <select
                className="mx-2 w-25 custom-select"
                onChange={obtenerDatos}
                name="operador"
                id="operador"
                value={filtros.operador}
                onClick={() => {
                  setActivosTabla(activos);
                }}
              >
                <option value={"igual"} className="text-center">
                  &#61;
                </option>
                <option value={"menor"} className="text-center">
                  &#60;
                </option>
                <option value={"mayor"} className="text-center">
                  &#62;
                </option>
              </select>

              <input
                className="form-control w-25 mr-1"
                type="number"
                name="valor"
                id="valor"
                placeholder="₡"
                onChange={obtenerDatos}
                value={filtros.valor}
              />

              <button type="submit" className="btn btn-secondary">
                <i className="fas fa-search-dollar"></i>
              </button>
            </form>
          </div>
        ) : null}
        {/* numero de resultados */}
        <div className="col-md-4 col-lg-3 col-sm-4 mt-2">
          <div className="form-inline">
            <label htmlFor="nResultados">N° Resultados</label>
            <select
              name="nResultados"
              id="nResultados"
              className="ml-2 custom-select w-25"
              onChange={obtenerDatos}
              value={filtros.nResultados}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>

        {/* imprimir un reporte con los resultdos */}
        <div className="col-md-4  col-lg-2 col-sm-4 mt-2">
          <button
            className="btn btn-success btn-icon-split"
            onClick={generarReporte}
          >
            <span className="icon text-white-50">
              <i className="fas fa-file-excel"></i>
            </span>
            <span className="text">Generar Reporte</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltrosReportes;
