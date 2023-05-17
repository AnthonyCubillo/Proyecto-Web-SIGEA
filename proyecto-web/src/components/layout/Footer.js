import React from "react";

const Footer = ({ styleFooter, color, textColor }) => {

  const year = new Date().getFullYear();

  return (
    <footer className={`sticky-footer bg-gradient-light shadow-lg ${styleFooter}`} style={{background: color, color: textColor}}>
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>
            Copyright &copy; SIGEA 2022~ {year} &nbsp; Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
