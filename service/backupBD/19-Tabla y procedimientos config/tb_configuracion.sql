-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-04-2023 a las 05:41:25
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_configuracion`
--

CREATE TABLE `tb_configuracion` (
  `id_configuracion` int(11) NOT NULL,
  `color` varchar(30) NOT NULL,
  `font_family` varchar(30) NOT NULL,
  `font_size` varchar(30) NOT NULL,
  `id_usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_configuracion`
--

INSERT INTO `tb_configuracion` (`id_configuracion`, `color`, `font_family`, `font_size`, `id_usuario`) VALUES
(19, '#F8F9F9', 'Yantramanav', '16px', '110'),
(27, '#F8F9F9', 'Yantramanav', '16px', '121'),
(28, '#F8F9F9', 'Yantramanav', '16px', '122'),
(29, '#000000', 'Yantramanav', '16px', '123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_configuracion`
--
ALTER TABLE `tb_configuracion`
  ADD PRIMARY KEY (`id_configuracion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_configuracion`
--
ALTER TABLE `tb_configuracion`
  MODIFY `id_configuracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
