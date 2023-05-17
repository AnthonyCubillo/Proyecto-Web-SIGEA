//funcion que desactiva una alerta

function desactivarAlerta(id) {
  Swal.fire({
    title: `¿Esta seguro que desea desactivar la alerta ${id}?`,
    text: "¡Las alertas desactivadas no se pueden revertir!",
    icon: "warning",
    iconColor: "#E74C3C",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, desactivar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui codigo de peticion al backend ....

      //si la respuesta del backend true
      if (true) {
        Swal.fire({
          position: "center",
          title: `Alerta ${id} desativada!`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          position: "center",
          title: "Ocurrio un error!",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  });
}

//funcion para alerta registrar un usuario
function registrarUsuario(usuario) {
  //aqui codigo de peticion al backend ....

  //si la respuesta del backend true
  if (true) {
    Swal.fire({
      position: "center",
      title: `Usuario registrado con exito!`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      position: "center",
      title: "Ocurrio un error!",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}

//funcion para alerta modificar un usuario
function editarUsuario(usuario) {
  //aqui codigo de peticion al backend ....

  //si la respuesta del backend true
  if (true) {
    Swal.fire({
      position: "center",
      title: `Usuario actualizado con exito!`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      position: "center",
      title: "Ocurrio un error!",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}

//funcion para alerta eliminar un usuario
function eliminarUsuario(id) {
  Swal.fire({
    title: `¿Esta seguro que desea eliminar al usuario n° ${id}?`,
    text: "¡Los usuarios eliminados no se pueden revertir!",
    icon: "warning",
    iconColor: "#E74C3C",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui codigo de peticion al backend ....

      //si la respuesta del backend true
      if (true) {
        Swal.fire({
          position: "center",
          title: `Usuario n° ${id} Eliminado!`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          position: "center",
          title: "Ocurrio un error!",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  });
}


//funcion para alerta eliminar ubicacion 
function eliminarUbicacion(id) {
  Swal.fire({
    title: `¿Esta seguro que desea eliminar la Ubicacion n° ${id}?`,
    text: "¡Las ubicaciones eliminadas no se pueden revertir!",
    icon: "warning",
    iconColor: "#E74C3C",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui codigo de peticion al backend ....

      //si la respuesta del backend true
      if (true) {
        Swal.fire({
          position: "center",
          title: `Ubicacion n° ${id} Eliminada!`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          position: "center",
          title: "Ocurrio un error!",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  });
}

//funcion para alerta eliminar activo 
function eliminarActivo(id) {
  Swal.fire({
    title: `¿Esta seguro que desea eliminar el activo n° ${id}?`,
    text: "¡Los activos eliminados no se pueden revertir!",
    icon: "warning",
    iconColor: "#E74C3C",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui codigo de peticion al backend ....

      //si la respuesta del backend true
      if (true) {
        Swal.fire({
          position: "center",
          title: `Activo n° ${id} Eliminado!`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          position: "center",
          title: "Ocurrio un error!",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  });
}


//funcion para alerta sbir excel un activos
function subirArchivoExcel( file ) {
  //aqui codigo de peticion al backend ....

  //si la respuesta del backend true
  if (true) {
    Swal.fire({
      position: "center",
      title: `Archivo subido con exito!`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    Swal.fire({
      position: "center",
      title: "Ocurrio un error!",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
  }
}


(function ($) {
  "use strict"; // Start of use strict


  /* identificar si hay cambios en un formulario */
/*   let modificado = false;

  $(document).ready(function () {
    $("input, select, textarea").change(function () {
      modificado = true;
    });
  }); */

  /* evitar salir de pagina si modifico un formulario */
/*   $(window).on("beforeunload", function (e) {            
    if (modificado) {
      return 'Hay cambios no enviados en un formulario!';
    }
  }); */


  //mensaje de cierre de sesion
/*   $(".logout").on("click", function (e) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cerrando sesión de usuario",
      showConfirmButton: false,
      timer: 1490,
    });

    setTimeout(function () {
      $(location).attr("href", "login.html");
    }, 1500);
  }); */

  //cargue por defecto el sidebar minimizado
 /*  $(".sidebar").toggleClass("toggled"); */

  //Alternar la navegación lateral
/*   $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
    $("body").toggleClass("sidebar-toggled");

    //agregue o elimine la clase toggled a los elementos con las clase sidebar
    $(".sidebar").toggleClass("toggled"); //aca

    //si el elemento con la clase tiene otra clase llamada toggled
    if ($(".sidebar").hasClass("toggled")) {
      //si esta maximido el sidebar
      $(".sidebar .collapse").collapse("hide");
      //alert("click");
    }
  }); */

  //funcion que oculta el sidebar al presionar el btn de menu
/*   let seeSidebar = true;

  $("#sidebarToggleTopMd").on("click", function (e) {
    seeSidebar = !seeSidebar;

    if (seeSidebar) {
      $("#accordionSidebar").show(100);
      $("#accordionSidebar").show("fast");
      $("footer").removeClass("footer");
    } else {
      $("#accordionSidebar").hide(100);
      $("#accordionSidebar").hide("fast");
      $("footer").addClass("footer");
    }
  }); */

  //funcion que oculta el sidebar al aproximar mouse
/*   $("#sidebarToggleTopMd").mouseenter(function () {
    seeSidebar = !seeSidebar;

    if (seeSidebar) {
      $("#accordionSidebar").show(100);
      $("#accordionSidebar").show("fast");
      $("footer").removeClass("footer");
    } else {
      $("#accordionSidebar").hide(100);
      $("#accordionSidebar").hide("fast");
      $("footer").addClass("footer");
    } 
  });
*/

  //Cierre cualquier acordeón de menú abierto cuando la ventana se redimensione por debajo de 768px
/*   $(window).resize(function () {
    //ocultar sidebar ventana menor a 768
    if ($(window).width() < 768) {
      $(".sidebar .collapse").collapse("hide");
    }
    

    let sidebarMinimizado =  $(".sidebar").hasClass("toggled");

    // Alternar el sidebar cuando la ventana se redimensiona por debajo de 480px
    if ($(window).width() < 480 && sidebarMinimizado === true) {
      console.log( $(".sidebar").hasClass("toggled") )
     
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $(".sidebar .collapse").collapse("hide");
    }
  }); */

  // Evite que el envoltorio de contenido se desplace cuando la navegación lateral fija se cernía
/*   $("body.fixed-nav .sidebar").on(
    "mousewheel DOMMouseScroll wheel",
    function (e) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    }
  ); */

  // btn Desplácese hasta la parte superior de la pagina
/*   $(document).on("scroll", function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  }); */

  // Desplazamiento suave usando la aceleración de jQuery
/*   $(document).on("click", "a.scroll-to-top", function (e) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    e.preventDefault();
  }) */;


})(jQuery); // End of use strict
