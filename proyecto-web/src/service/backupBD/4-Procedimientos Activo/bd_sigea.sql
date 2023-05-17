-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-11-2022 a las 22:49:41
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_sigea`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_actualizar` (IN `_n_etiqueta` VARCHAR(50), IN `_marca` VARCHAR(50), IN `_modelo` VARCHAR(50), IN `_serie` VARCHAR(50), IN `_descripcion` VARCHAR(250), IN `_id_ubicacion` INT(11), IN `_valor_libro` FLOAT(11), IN `_condicion` VARCHAR(50), IN `_clase_activo` VARCHAR(50), IN `_id_funcionario` INT(11))   BEGIN
UPDATE `tb_activo` SET `marca`=_marca,`modelo`=_modelo,`serie`=_serie,`descripcion`=_descripcion,`id_ubicacion`= _id_ubicacion,`valor_libro`=_valor_libro,`condicion`=_condicion,`clase_activo`=_clase_activo,`id_funcionario`= _id_funcionario WHERE `n_etiqueta` =_n_etiqueta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_eliminar` (IN `_n_etiqueta` VARCHAR(50))   BEGIN
UPDATE `tb_activo` SET `estado`= 0  WHERE `n_etiqueta`= _n_etiqueta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_insertar` (IN `_n_etiqueta` VARCHAR(50), IN `_marca` VARCHAR(50), IN `_modelo` VARCHAR(50), IN `_serie` VARCHAR(50), IN `_descripcion` VARCHAR(250), IN `_id_ubicacion` INT(11), IN `_valor_libro` FLOAT, IN `_condicion` VARCHAR(50), IN `_clase_activo` VARCHAR(50), IN `_id_funcionario` INT(11))   BEGIN
INSERT INTO `tb_activo`(`n_etiqueta`, `marca`, `modelo`, `serie`, `descripcion`, `id_ubicacion`, `valor_libro`, `condicion`, `clase_activo`, `id_funcionario`, `estado`) VALUES (_n_etiqueta,_marca,_modelo,_serie,_descripcion,_id_ubicacion,_valor_libro,_condicion,_clase_activo,_id_funcionario,1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_listar` ()   BEGIN
SELECT tb_activo.n_etiqueta,tb_activo.marca,tb_activo.modelo,tb_activo.serie,tb_activo.descripcion,tb_activo.id_ubicacion,tb_activo.valor_libro,tb_activo.condicion,tb_activo.clase_activo,tb_activo.id_funcionario, tb_funcionario.nombre_funcionario, tb_ubicacion.nombre_ubicacion FROM `tb_activo` INNER JOIN tb_funcionario ON tb_activo.id_funcionario = tb_funcionario.id_funcionario INNER JOIN tb_ubicacion ON tb_activo.id_ubicacion = tb_ubicacion.id_ubicacion WHERE tb_activo.estado = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_funcionario_actualizar` (IN `_id_funcionario` INT(11), IN `_dni_funcionario` VARCHAR(50) CHARSET utf8, IN `_nombre_funcionario` VARCHAR(50) CHARSET utf8)   BEGIN
UPDATE `tb_funcionario` SET `dni_funcionario`=_dni_funcionario,`nombre_funcionario`=_nombre_funcionario WHERE `id_funcionario`=_id_funcionario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_funcionario_eliminar` (IN `_id_funcionario` INT(11))   BEGIN
UPDATE `tb_funcionario` SET `estado_funcionario`=0 WHERE `id_funcionario`=_id_funcionario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_funcionario_insertar` (IN `_dni_funcionario` VARCHAR(50) CHARSET utf8, IN `_nombre_funcionario` VARCHAR(50) CHARSET utf8)   BEGIN
INSERT INTO `tb_funcionario`(`dni_funcionario`, `nombre_funcionario`, `estado_funcionario`) VALUES (_dni_funcionario,_nombre_funcionario,1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_funcionario_listar` ()   BEGIN
SELECT * FROM `tb_funcionario` WHERE `estado_funcionario`=1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_ubicacion_actualizar` (IN `_id_ubicacion` INT(11), IN `_nombre_ubicacion` VARCHAR(50) CHARSET utf8, IN `_descripcion_ubicacion` VARCHAR(250) CHARSET utf8)   BEGIN
UPDATE `tb_ubicacion` SET `nombre_ubicacion`=_nombre_ubicacion,`descripcion_ubicacion`=_descripcion_ubicacion WHERE `id_ubicacion`= _id_ubicacion;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_ubicacion_eliminar` (IN `_id_ubicacion` INT)   BEGIN
UPDATE `tb_ubicacion` SET `estado_ubicacion`= 0 WHERE `id_ubicacion`= _id_ubicacion;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_ubicacion_insertar` (IN `_nombre_ubicacion` VARCHAR(50) CHARSET utf8, IN `_descripcion_ubicacion` VARCHAR(250) CHARSET utf8)   BEGIN
INSERT INTO `tb_ubicacion`(`nombre_ubicacion`, `descripcion_ubicacion`, `estado_ubicacion`) 
VALUES (_nombre_ubicacion, _descripcion_ubicacion, 1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_ubicacion_listar` ()   BEGIN
SELECT * FROM `tb_ubicacion` WHERE `estado_ubicacion` = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_actualizar` (IN `_id_usuario` INT(11), IN `_dni_usuario` VARCHAR(50), IN `_nombre_usuario` VARCHAR(50) CHARSET utf8, IN `_email_usuario` VARCHAR(50) CHARSET utf8, IN `_clave_usuario` VARCHAR(50) CHARSET utf8)   BEGIN
UPDATE `tb_usuario` SET `dni_usuario`=_dni_usuario,`nombre_usuario`=_nombre_usuario,`email_usuario`=_email_usuario,`clave_usuario`=_clave_usuario WHERE  `id_usuario`=_id_usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_eliminar` (IN `_id_usuario` INT(11))   BEGIN
UPDATE `tb_usuario` SET `estado_usuario`=0 WHERE `id_usuario`= _id_usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_insertar` (IN `_dni_usuario` INT(11), IN `_nombre_usuario` VARCHAR(50), IN `_email_usuario` VARCHAR(50), IN `_clave_usuario` VARCHAR(50))   BEGIN
INSERT INTO `tb_usuario`(`dni_usuario`, `nombre_usuario`, `email_usuario`, `clave_usuario`,`estado_usuario`) 
VALUES (_dni_usuario,_nombre_usuario,_email_usuario,_clave_usuario,1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_listar` ()   BEGIN
SELECT * FROM `tb_usuario` WHERE `estado_usuario`=1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_logear` (IN `_dni_usuario` VARCHAR(50), IN `_clave_usuario` VARCHAR(50))   BEGIN
SELECT * FROM `tb_usuario` WHERE `estado_usuario`=1 AND `dni_usuario`=_dni_usuario AND `clave_usuario`=_clave_usuario LIMIT 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_activo`
--

CREATE TABLE `tb_activo` (
  `n_etiqueta` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `modelo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `serie` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `id_ubicacion` int(11) NOT NULL,
  `valor_libro` float NOT NULL,
  `condicion` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clase_activo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `id_funcionario` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_activo`
--

INSERT INTO `tb_activo` (`n_etiqueta`, `marca`, `modelo`, `serie`, `descripcion`, `id_ubicacion`, `valor_libro`, `condicion`, `clase_activo`, `id_funcionario`, `estado`) VALUES
('N09971', 'Bonaldo', 'A4D0', 'N/A', 'Escritorio gris, con cajones', 1, 300, 'En uso', 'Mesa y escritorios', 1, 0),
('N09978', 'Bonaldo_1', 'A4D0_1', 'N/A', 'Escritorio gris, con cajones', 1, 300, 'En uso', 'Mesa y escritorios', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_funcionario`
--

CREATE TABLE `tb_funcionario` (
  `id_funcionario` int(11) NOT NULL,
  `dni_funcionario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_funcionario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `estado_funcionario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_funcionario`
--

INSERT INTO `tb_funcionario` (`id_funcionario`, `dni_funcionario`, `nombre_funcionario`, `estado_funcionario`) VALUES
(1, '203598078', 'Aniceto Esquivel Sánchez', 0),
(2, '180808546', 'Juan Rafael Mora Porras', 0),
(4, '280228546', 'José María Montealegre Fernández', 1),
(5, '607722800', 'María Montealegre Fernández', 1),
(6, '307722800', 'Marín Mora Fernández', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ubicacion`
--

CREATE TABLE `tb_ubicacion` (
  `id_ubicacion` int(11) NOT NULL,
  `nombre_ubicacion` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion_ubicacion` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado_ubicacion` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_ubicacion`
--

INSERT INTO `tb_ubicacion` (`id_ubicacion`, `nombre_ubicacion`, `descripcion_ubicacion`, `estado_ubicacion`) VALUES
(1, 'Aula 01', 'Infraestructura para impartir clases', 0),
(2, 'Aula 02', 'Infraestructura para impartir clases', 0),
(3, 'Aula 03', 'Infraestructura para impartir clases', 0),
(4, 'Aula 04', 'Infraestructura para impartir clases', 0),
(5, 'Oficinas', 'Oficinas segunda planta, administrativas', 1),
(6, 'Oficinas', 'Oficinas segunda planta, administrativas', 1),
(7, 'Oficinas', 'Oficinas segunda planta, administrativas', 1),
(8, 'Aula 8', 'Infraestructura para impartir clases', 1),
(9, '', 'Infraestructura para impartir clases', 0),
(10, '', 'Infraestructura para impartir clases', 1),
(11, 'NUL', 'Infraestructura para impartir clases', 1),
(12, 'Aula 8', 'Infraestructura para impartir clases', 1),
(13, 'Aula 8', 'Infraestructura para impartir clases', 1),
(14, 'Aula 8', 'Infraestructura para impartir clases', 1),
(15, 'Aula 8', 'Infraestructura para impartir clases', 1),
(16, 'Aula 8', 'Infraestructura para impartir clases', 1),
(17, 'Aula 15', 'Infraestructura para impartir clases', 1),
(18, 'Aula 55', 'Infraestructura para impartir clases', 1),
(19, 'Aula 65', 'Infraestructura para impartir clases', 1),
(20, 'Aula 68', 'Infraestructura para impartir clases', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id_usuario` int(11) NOT NULL,
  `dni_usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `email_usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clave_usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `estado_usuario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_usuario`
--

INSERT INTO `tb_usuario` (`id_usuario`, `dni_usuario`, `nombre_usuario`, `email_usuario`, `clave_usuario`, `estado_usuario`) VALUES
(1, '330228546', 'Cleto González Víquez', 'correo@correo.com', '12345678', 0),
(2, '110211546', 'Abel Pacheco de la Espriella', 'correo@correo.com', '12345678', 1),
(3, '110333543', 'Teodoro Picado Michalski', 'correo@correo.com', '12345678', 1),
(5, '440333500', 'Mario Echandi Jiménez', 'correo@correo.com', '12345678', 1),
(6, '60011350', 'José María Figueres Olsen', 'correo@correo.com', '12345678', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_activo`
--
ALTER TABLE `tb_activo`
  ADD PRIMARY KEY (`n_etiqueta`);

--
-- Indices de la tabla `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  ADD PRIMARY KEY (`id_funcionario`) USING BTREE,
  ADD UNIQUE KEY `dni` (`dni_funcionario`);

--
-- Indices de la tabla `tb_ubicacion`
--
ALTER TABLE `tb_ubicacion`
  ADD PRIMARY KEY (`id_ubicacion`);

--
-- Indices de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `dni_usuario` (`dni_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  MODIFY `id_funcionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_ubicacion`
--
ALTER TABLE `tb_ubicacion`
  MODIFY `id_ubicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
