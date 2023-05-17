import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//dependencias
import Swal from "sweetalert2";
import $ from "jquery";
//Autenticacion
import AuthContext from "../../context/autentificacion/authContext";
import ItemNavbarAlerta from "../pages/alertas/ItemNavbarAlerta";
import AlertaActivoContext from "../../context/alertaActivos/alertaActivoContext";
import alertaContext from "../../context/alertas/alertaContext";

const Navbar = ({ pageName , color, textColor}) => {
  //importar los valores del context de autentificacion
  const authContext = useContext(AuthContext);
  const { cerrarSesion, usuario, autenticado, cargando, usuarioAutenticado } =
    authContext;

  //Aqui logica Alertas Pendiente
  const alertasContext = useContext(alertaContext); //context de alertas
  const {mostrarAlerta} = alertasContext; //funcion para mostrar alertas

  const activoAlertaContex = useContext(AlertaActivoContext); //*context de alertas de activos
  const {obtenerAlertas, alertas} = activoAlertaContex; //*funcion para obtener alertas de activos

  //obtener alertas de activos
  useEffect(() => {
    obtenerAlertas(mostrarAlerta);
    // eslint-disable-next-line
  }, []);

  //redireccionar
  const navigate = useNavigate();

  //proteger rutas sensibles
  useEffect(() => {
    
    usuarioAutenticado();
    if (!autenticado && !cargando) {
      navigate("/");
    }

    // eslint-disable-next-line
  }, [autenticado, cargando]);

  //ocultar o mostrar sidebar
  const [verSidebar, setVerSidebar] = useState(true);

  const handleMostrarSidebar = () => {
    setVerSidebar(!verSidebar);

    if($(window).width() < 767){
      $("#espaciado-sidebar").removeClass("ocultar"); 
      $("#accordionSidebar").removeClass("ocultar"); 
    }else{
      $("#espaciado-sidebar").addClass("ocultar"); 
      $("#accordionSidebar").addClass("ocultar"); 
    }

    if (verSidebar) {
      $("#espaciado-sidebar").addClass("espaciado-sidebar"); 
      $("#accordionSidebar").show(100);
      $("#accordionSidebar").show("fast");
    } else {
      $("#espaciado-sidebar").removeClass("espaciado-sidebar"); 
      $("#accordionSidebar").hide(100);
      $("#accordionSidebar").hide("fast");
    }

  };

  const handleCloseSession = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cerrando sesión de usuario",
      showConfirmButton: false,
      timer: 1490,
    });

    setTimeout(function () {
      cerrarSesion();
      navigate("/");
    }, 1500);
  };

  return (
    <nav className={`navbar navbar-expand navbar-light topbar mb-4 static-top shadow`} style={{background: color, color: textColor}}>
      <button
        onClick={handleMostrarSidebar}
        onMouseEnter={handleMostrarSidebar}
        className="btn btn-link  rounded-circle mr-3"
      >
        <i className="fa fa-bars" style={{ color: textColor}}></i>
      </button>

      {/* <!-- Navbar pagina actual --> */}
      <div className="navbar-nav ml-5">
        <div className="nav-link animate__animated animate__bounce" style={{ color: textColor}}>
          {pageName}
        </div>
      </div>

      {/* <!-- Navbar --> */}
      <ul className="navbar-nav ml-auto">

        {/* <!-- Nav Item - Alerts --> */}
        <li className="nav-item dropdown no-arrow mx-1">
          <div
            className="nav-link dropdown-toggle"
            id="alertsDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-bell fa-fw" style={{ color: textColor}}></i>
            {/*  <!-- Counter - Alerts --> */}
            <span className="badge badge-danger badge-counter">{alertas.length}</span>
          </div>
          {/* <!-- Dropdown - Alerts --> */}
          <div
            className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="alertsDropdown"
          >
            <h6 className="dropdown-header bg-gradient-dark border border-dark">
              Alertas Activas
            </h6>

            <div  style={{ maxHeight: "200px", overflow: "auto" }} >

            {
              alertas.map( (item) => (
                <ItemNavbarAlerta key={item.tb_alerta_id}  alerta={item}/>
              ))
            }
          </div>
            {/* <!-- Enlace a pagina de Alertas --> */}

            <Link
              to={"/alertas"}
              className="dropdown-item text-center small text-gray-500"
            >
              Mostrar todas las alertas
            </Link>
          </div>
        </li>

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* <!-- Nav Item - User Information --> */}
        <li className="nav-item dropdown no-arrow">
          <div
            className="nav-link dropdown-toggle"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-user mr-3" style={{ color: textColor}}></i>
            <span className="mr-2 d-none d-lg-inline small" style={{ color: textColor}}>
              {usuario && usuario.nombre_usuario}
            </span>
          </div>
          {/* <!-- Dropdown - User Information --> */}
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link to={"/perfil"} className="dropdown-item">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Perfil
            </Link>

            {/* <!-- configuracion para cambiar color, pendiente --> */}
            <Link className="dropdown-item" to={"/configuracion"}>
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Configuración
            </Link>

            <div className="dropdown-divider"></div>
            <div className="dropdown-item logout" onClick={handleCloseSession}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Cerrar sesión
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
