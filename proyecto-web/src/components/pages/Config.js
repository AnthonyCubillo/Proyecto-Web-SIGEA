import React, { useContext, useState } from "react";
import Values from "values.js";
import Layout from "../layout/Layout";
import DisplayColors from "../Color/DisplayColors";
import FormColor from "../Color/FormColor";
//context
import AlertaContext from "../../context/alertas/alertaContext";
import ConfigDesingContext from "../../context/configDesing/configDesingContext";

const Config = () => {
  //importar los valores del context de alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;

  //importar los valores del context de config
  const configDesingContext = useContext(ConfigDesingContext);
  const {
    fontFamily,
    fontSize,
    colors,
    updateFontFamily,
    updateFontSize,
    updateColors,
  } = configDesingContext;

  const [list, setList] = useState(new Values(colors).all(5));

  const handleFontFamily = (e) => {
    //console.log(e.target.value);
    updateFontFamily(e.target.value, mostrarAlerta);
  };

  const handleFontSize = (e) => {
    //console.log(e.target.value);
    updateFontSize(e.target.value, mostrarAlerta);
  };

  const handleColor = (color) => {
    //console.log(e.target.value);
    updateColors(color, mostrarAlerta);
  };

  return (
    <>
      <Layout pageName={"Configuración"}>
        <div className="container mt-5">
          {/* Fuente */}
          <div className="card shadow-1">
            <div className="card-body">
              <h4 className="card-title">
                Fuente <i className="fas fa-font"></i>
              </h4>

              <div className="mt-5 row">
                <div className="col-12 col-md-6">
                  <h5 className="text-center">Tipo</h5>
                </div>

                <div className="col-12 col-md-6 mt-2 mt-md-0 d-flex justify-content-center align-content-center">
                  <select
                    className="w-75 custom-select"
                    name="fontFamily"
                    id="fontFamily"
                    value={fontFamily}
                    onChange={handleFontFamily}
                  >
                    <option value={"Arial"} className="text-center">
                      Arial
                    </option>
                    <option value={"Helvetica"} className="text-center">
                      Helvetica
                    </option>
                    <option value={"Times New Roman"} className="text-center">
                      Times New Roman
                    </option>
                    <option value={"Yantramanav"} className="text-center">
                      Yantramanav
                    </option>
                    <option value={"Courier"} className="text-center">
                      Courier
                    </option>
                    <option value={"Georgia"} className="text-center">
                      Georgia
                    </option>
                    <option value={"Verdana"} className="text-center">
                      Verdana
                    </option>
                    <option value={"Tahoma"} className="text-center">
                      Tahoma
                    </option>
                    <option value={"Palatino Linotype"} className="text-center">
                      Palatino Linotype
                    </option>
                    <option value={"Roboto"} className="text-center">
                      Roboto
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <div className="mt-5 row">
                  <div className="col-12 col-md-6">
                    <h5 className="text-center">Tamaño</h5>
                  </div>

                  <div className="col-12 col-md-6 mt-2 mt-md-0 d-flex justify-content-center align-content-center">
                    <select
                      className="w-75 custom-select"
                      name="fontSize"
                      id="fontSize"
                      value={fontSize}
                      onChange={handleFontSize}
                    >
                      <option value={"12px"} className="text-center">
                        12
                      </option>
                      <option value={"14px"} className="text-center">
                        14
                      </option>
                      <option value={"16px"} className="text-center">
                        16
                      </option>
                      <option value={"18px"} className="text-center">
                        18
                      </option>
                      <option value={"24px"} className="text-center">
                        24
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tema */}
          <div className="card mt-5 shadow-1">
            <div className="card-body">
              <h4 className="card-title">
                Diseño <i className="fas fa-palette"></i>
              </h4>

              <div className="mt-5">
                <div className="mt-5 row">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <h5 className="text-center">Colores</h5>
                  </div>
                  <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <FormColor setList={setList} colors={colors}/>
                  </div>

                  <div className="mt-5">
                    <DisplayColors list={list} handleColor={handleColor} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diseño */}
          <div className="card my-5 shadow-1">
            <div className="card-body">
              <h4 className="card-title">
                Descargas <i className="fas fa-download"></i>
              </h4>

              <div className="mt-5">
                <h5>App Móvil</h5>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Config;
