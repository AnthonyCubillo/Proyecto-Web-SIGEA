import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div id="espaciado-sidebar" className="espaciado-sidebar ocultar">

      </div>
      <ul
        className="navbar-nav bg-gradient-dark shadow-lg sidebar  sidebar-dark  toggled sticky-sidebar ocultar"
        id="accordionSidebar"
      >
        {/*  <!-- Sidebar - Brand --> */}

        <Link
          to={"/inicio"}
          className="sidebar-brand mt-3 pt-5 d-flex align-items-center justify-content-center"
        >
          <div className="sidebar-brand-icon text-center rotate-n-15">
            <img
              src="img/SIGEA-logo-1.png"
              width="75px"
              height="75px"
              className="bg-opacity-2 "
              alt="logo sistema"
            />
          </div>
          <div className="sidebar-brand-text mx-3 small font-italic font-weight-bold">
            Sistema Gestión Activos
          </div>
        </Link>

        {/* <!-- Nav Item - Activos --> */}
        <li className="nav-item mt-5">
          <Link to={"/activos"} className="nav-link">
            <i className="fa fa-box"></i>
            <span>Activos</span>
          </Link>
        </li>

        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Nav Item - Reportes --> */}
        <li className="nav-item">
          <Link to={"/reportes"} className="nav-link">
            <i className="fa fa-file-excel"></i>
            <span>Reportes</span>
          </Link>
        </li>

        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/*  <!-- Nav Item - Ubicaciones --> */}
        <li className="nav-item">
          <Link to={"/ubicaciones"} className="nav-link">
            <i className="fas fa-map-marker-alt"></i>
            <span>Ubicaciones</span>
          </Link>
        </li>

        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/* <!-- Nav Item - Alertas --> */}
        <li className="nav-item">
          <Link to={"/alertas"} className="nav-link">
            <i className="fas fa-bell"></i>
            <span>Alertas</span>
          </Link>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/*  <!-- Nav Item - Usuarios --> */}
        <li className="nav-item">
          <Link to={"/usuarios"} className="nav-link">
            <i className="fas fa-users"></i>
            <span>Usuarios</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
