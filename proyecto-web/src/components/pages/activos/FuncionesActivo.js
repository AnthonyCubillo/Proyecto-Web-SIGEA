import React, { useState, useEffect, useContext, useRef } from "react";
//dependencias
import Swal from "sweetalert2";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";

//context
import ActivosContext from "../../../context/activos/activosContext";
import AlertaContext from "../../../context/alertas/alertaContext";

const FuncionesActivo = ({ listaActivosFiltados }) => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //importar los valores del context de activos
  const activosContext = useContext(ActivosContext);
  const {
    registrarActivo,
    editarActivo,
    eliminarActivo,
    activos,
    setCargando,
  } = activosContext;

  //nombre de archivo exportar excel
  const [nombreArchivo, setNombreArchivo] = useState("");

  //nombre de archivo excel importado - placeholder
  const [entradaTexto, setEntradaTexto] = useState("Seleccionar Archivo");

  //state almacena el archivo excel importado
  const [archivoExcel, setArchivoExcel] = useState(null);

  //input del archivo
  const inputFileRef = useRef(null);

  //carga un nombre basado en la fecha y milisegundos
  useEffect(() => {
    const fecha = new Date();
    const nuevoNombreArchivo = `Lista de activos-${fecha.getDate()}-${
      fecha.getMonth() + 1
    }-${fecha.getFullYear()}-${fecha.getMilliseconds()}`;

    setNombreArchivo(nuevoNombreArchivo);

    // eslint-disable-next-line
  }, [entradaTexto, archivoExcel]);

  const cambiarTextoInput = (e) => {

    if (e.target.value) {
      //obtener nombre archivo
      let nombreArchivoFull = e.target.value; //ruta del archivo
      //console.log(nombreArchivoFull);
      let posicionUltimaBarra = nombreArchivoFull.lastIndexOf("\\"); //numero indice de la ultimo \

      let nombreArchivo = nombreArchivoFull.substring(
        posicionUltimaBarra + "\\".length,
        nombreArchivoFull.length
      );

      //almacenar valores en state
      setEntradaTexto(nombreArchivo);
      setArchivoExcel(e.target.files[0]);
    } else {
      setEntradaTexto("Seleccionar Archivo");
    }
  };

  const subirArchivo = async (e) => {
    e.preventDefault();

    if (!archivoExcel) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debe ingresar un archivo!",
        showConfirmButton: false,
        timer: 1000,
      });

      return;
    }

    const datos = await archivoExcel.arrayBuffer();
    const workbook = XLSX.read(datos);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const datos_json = XLSX.utils.sheet_to_json(worksheet);

    // eliminar ultimo elemento fecha del archivo sigea
    if (
      datos_json[datos_json.length - 1]["Número de Etiqueta"].includes(
        "descarga - Fecha de emisión:"
      )
    ) {
      //.pop(),elimina el ultimo elemento, la fecha y el encabezado inferior de la tabla
      datos_json.pop();
      datos_json.pop();
    }

    const activosImportados = datos_json.map((activo) => {
      return {
        n_etiqueta: activo["Número de Etiqueta"],
        descripcion: activo["Descripción"],
        marca: activo["Marca"],
        modelo: activo["Modelo"],
        nombre_ubicacion: "",
        serie: activo["Serie"],
        valor_libro: activo["Valor en Libros"],
        condicion: activo["Condición"],
        clase_activo: activo["Clase Activo"],
        dni_funcionario: activo["Identificación Funcionario"],
        nombre_funcionario: activo["Nombre Funcionario"],
      };
    });

    //comparar lista de activos con los que se van a importar
    //lista nuevos activos
    const activosNuevos = [];
    //lista de activos nuevos filtrados
    activosImportados.forEach((activoImportado) => {
      const encontrado = activos.find(
        (activo) => activo.n_etiqueta === activoImportado.n_etiqueta
      );
      if (!encontrado) {
        activosNuevos.push(activoImportado);
      }
    });

    if (activosNuevos.length) {
      //si hay activos nuevos, se insertan en bd
      registrarActivo(activosNuevos, mostrarAlerta);
      setCargando();
    }

    //lista de activos editados
    const activosEditados = [];

    activosImportados.forEach((activoImportado) => {
      const encontrado = activos.find(
        (activo) => activo.n_etiqueta === activoImportado.n_etiqueta
      );

      if (encontrado) {
        if (
          encontrado.descripcion !== activoImportado.descripcion ||
          encontrado.marca !== activoImportado.marca ||
          encontrado.modelo !== activoImportado.modelo ||
          encontrado.serie !== activoImportado.serie ||
          encontrado.valor_libro !== activoImportado.valor_libro ||
          encontrado.condicion !== activoImportado.condicion ||
          encontrado.clase_activo !== activoImportado.clase_activo ||
          encontrado.dni_funcionario !== activoImportado.dni_funcionario ||
          encontrado.nombre_funcionario !== activoImportado.nombre_funcionario
        ) {
          activosEditados.push(activoImportado);
        }
      }
    });

    if (activosEditados.length) {
      //si hay activos nuevos, se insertan en bd
      //llamando al metodo que edita activos
      editarActivo(activosEditados, mostrarAlerta);
      setCargando();
    }

    //Creamos un array vacío llamado activosEliminados para almacenar los activos que se han eliminado.
    const activosEliminados = [];
    //Iteramos sobre cada elemento en el array activos usando el método forEach.
    //Para cada elemento, verificamos si existe un elemento correspondiente en el
    //array activosImportados utilizando el método find.
    activos.forEach((activo) => {
      const encontrado = activosImportados.find(
        (activoImportado) => activo.n_etiqueta === activoImportado.n_etiqueta
      );
      //Si no encontramos un elemento correspondiente en el array activosImportados,
      //esto significa que el elemento fue eliminado,
      //por lo que lo agregamos al array activosEliminados.
      if (!encontrado) {
        activosEliminados.push(activo);
      }
    });

    if (activosEliminados.length) {
      //si hay activos eliminados, se borran de la bd
      //llamando al metodo que elimina activos
      eliminarActivo(activosEliminados, mostrarAlerta);
      setCargando();
    }

    //reseteo
    setEntradaTexto("Seleccionar Archivo");
    setNombreArchivo("");
    setArchivoExcel(null);

    // resetear el valor del input file
    inputFileRef.current.value = "";
  };

  // funcion para exportar arreglo a excel
  const exportToCSV = (activos, listaActivosFiltados, nombreArchivo) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Activos");
    setNombreArchivo("Seleccionar Archivo");
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

    let datos =
      listaActivosFiltados.length > 0
        ? [...listaActivosFiltados]
        : [...activos];

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
      FileSaver.saveAs(data, nombreArchivo + fileExtension);
    });
  };

  return (
    <div className="row justify-content-md-between">
      {/* <!-- buscador generar excel --> */}
      <div className="col-md-4 col-sm-12">
        <button
          className="btn btn-success btn-icon-split mt-3"
          onClick={() =>
            exportToCSV(activos, listaActivosFiltados, nombreArchivo)
          }
        >
          <span className="icon text-white-50">
            <i className="fas fa-file-invoice"></i>
          </span>
          <span className="text">Generar Excel </span>
        </button>
      </div>

      {/* <!-- subir excel --> */}
      <div className="col-md-4 col-sm-12 mt-2 mt-md-0">
        <form encType="multipart/form-data" onSubmit={subirArchivo}>
          <div className="input-group">
            <div className="form-group rounded-lg custom-file mt-3">
              <input
                type="file"
                accept=".xlsx,.xls, .xlsm, .xlsb, .xltx"
                className="custom-file-input"
                id="subirExcel"
                name="subirExcel"
                onChange={cambiarTextoInput}
                ref={inputFileRef}
              />
              <label
                className="custom-file-label"
                htmlFor="subirExcel"
                data-toggle="tooltip"
                data-placement="top"
                title={entradaTexto}
              >
                <i className="fas fa-file-excel mr-2"></i>
                <span id="entrada_archivo">{entradaTexto}</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-danger btn-user font-weight-bold ml-2 mt-3"
            >
              <i className="fas fa-file-upload mr-2"></i> Subir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuncionesActivo;
