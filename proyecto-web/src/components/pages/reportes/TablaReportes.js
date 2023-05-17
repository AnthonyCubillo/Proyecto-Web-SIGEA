
import React, { useState } from "react";
import ItemTablaActivo from './ItemTablaReporte'



const TablaReportes = ({ activosTabla, setActivosTabla, nResultado }) => {


  //todos state de este componente
  const [paginaActual, setPaginaActual] = useState(1);



  return (
    <>

      <div className="card mt-4 shadow mb-5">
        <div className="card-header py-3 d-flex align-content-center justify-content-around">
          <h6 className="m-0 font-weight-bold text-secondary"
          >
            Activos Campus Sarapiquí
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover"
              id="dataTable"
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
                </tr>
              </thead>

              <tbody>
                {/* <!-- elementos de tabla --> */}
                {activosTabla.slice((paginaActual - 1) * nResultado, paginaActual * nResultado).map((item) => (
                  <ItemTablaActivo
                    key={item.n_etiqueta}
                    activo={item}
                  />
                ))}
              </tbody>

            </table>
            {activosTabla.length === 0 && (
              <div className="alert alert-warning" role="alert">
                No se encontraron resultados!
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center align-items-center my-3">
            {paginaActual > 1 &&
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
            }

            <div id="proxima" className="bg-dark text-white px-3 py-1">{paginaActual}</div>

            {paginaActual < Math.ceil(activosTabla.length / nResultado) &&
              <button
                type="button"
                className="btn btn-sm btn-outline-light text-secondary border-secondary mx-2"
                onClick={() => {
                  if (paginaActual < Math.ceil(activosTabla.length / nResultado)) {
                    setPaginaActual(paginaActual + 1);
                  }
                }}
              >
                Próxima
              </button>
            }
          </div>

        </div>
      </div>
    </>
  );
};


export default TablaReportes;