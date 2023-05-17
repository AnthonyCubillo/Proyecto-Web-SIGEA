import React, { useContext, useEffect,useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
//context
import ConfigDesingContext from "../../context/configDesing/configDesingContext";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autentificacion/authContext";

const Layout = ({ children, pageName }) => {
  //importar los valores del context de config
  const configDesingContext = useContext(ConfigDesingContext);
  const { fontFamily, fontSize, colors, getConfigDesingUsuario, updateConfig } =
    configDesingContext;
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const [colorText, setColorText] = useState("white");

  const changeColor = () => {
    // Convirtiendo String Hexadecimal a RGB
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colors);
    var rgb = result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;

    //Formula que determinara el color blanco o negro de las letras
    var colorText = contrast(rgb);

    //Aplicando los nuevos colores
    setColorText(colorText);
  };

  const contrast = (rgb) => {
    let colorRBG= [rgb.r / 255, rgb.g / 255, rgb.b / 255];

    for (var i = 0; i < colorRBG.length; ++i) {
      if (colorRBG[i] <= 0.03928) {
        colorRBG[i] = colorRBG[i] / 12.92;
      } else {
        colorRBG[i] = Math.pow((colorRBG[i] + 0.055) / 1.055, 2.4);
      }
    }
   let glow = 0.2126 * colorRBG[0] + 0.7152 * colorRBG[1] + 0.0722 * colorRBG[2];

    if (glow > 0.179) {
      return "black";
    } else {
      return "white";
    }
  };

  useEffect(() => {
    if (usuario) {
      getConfigDesingUsuario(usuario.id_usuario, mostrarAlerta);
    }
    // eslint-disable-next-line
  }, [usuario, updateConfig]);

  useEffect(()=>{
    changeColor();
    // eslint-disable-next-line
  },[colors]);

  return (
    <div
      id="wrapper"
      className="min-vh-100"
      style={{ fontFamily: fontFamily, fontSize: fontSize }}
    >
      {/* <!-- Sidebar --> */}
      <Sidebar />
      {/*  <!-- Content Wrapper -->    */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* <!-- Main Content --> */}
        <div id="content">
          {/* <!-- Topbar --> */}
          <Navbar pageName={pageName} color={colors} textColor={colorText} />
          {/* <!-- Contenido de la pagina --> */}
          <div className="container-fluid">
            {/* <!-- Contenido segun pagina --> */}
            {children}
          </div>
        </div>

        <Footer color={colors} textColor={colorText} />
      </div>
    </div>
  );
};

export default Layout;
