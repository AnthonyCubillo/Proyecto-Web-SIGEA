import React from "react";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      {/* <!-- container-fluid --> */}
      <div className="text-center mt-5">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <h2 className="text-gray-800 mb-5">Página no encontrada</h2>
        <p className="text-gray-500 mb-0 h3">
          Parece que encontraste una falla en el sistema...
        </p>

        <Link to={"/"} className="btn btn-danger btn-icon-split mt-5">
          <span className="icon text-white-50">
            <i className="fas fa-arrow-left"></i>
          </span>
          <span className="text"> Regresar a Inicio </span>
        </Link>
      </div>

      {/*  <!-- Footer --> */}
      <Footer styleFooter="footer" />
    </>
  );
}

export default NotFound;
