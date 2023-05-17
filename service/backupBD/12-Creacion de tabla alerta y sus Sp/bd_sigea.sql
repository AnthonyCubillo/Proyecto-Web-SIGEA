-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20230329.d5c6b427ba
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2023 at 10:31 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bd_sigea`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_activo_por_etiqueta` (IN `p_etiqueta` VARCHAR(20))   BEGIN
SELECT n_etiqueta, descripcion, valor_libro, condicion ,clase_activo, id_funcionario
FROM `tb_activo` 
WHERE estado = 1 
AND n_etiqueta = p_etiqueta;
  

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_funcionario_por_cedula` (IN `p_cedula` VARCHAR(20))   BEGIN
  SELECT * FROM `tb_funcionario` WHERE `estado_funcionario`=1 AND `dni_funcionario` = p_cedula;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actualizar_alerta` (IN `n_etiqueta` VARCHAR(50), IN `marca` VARCHAR(50), IN `modelo` VARCHAR(50), IN `serie` VARCHAR(50), IN `descripcion` VARCHAR(250), IN `id_ubicacion` INT, IN `valor_libro` VARCHAR(50), IN `condicion` VARCHAR(50), IN `clase_activo` VARCHAR(50), IN `id_funcionario` INT, IN `estado` TINYINT(1))   BEGIN
    UPDATE tb_alerta
    SET marca = marca,
        modelo = modelo,
        serie = serie,
        descripcion = descripcion,
        id_ubicacion = id_ubicacion,
        valor_libro = valor_libro,
        condicion = condicion,
        clase_activo = clase_activo,
        id_funcionario = id_funcionario,
        estado = estado
    WHERE n_etiqueta = n_etiqueta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_alerta` (IN `n_etiqueta` VARCHAR(50))   BEGIN
    UPDATE tb_alerta
    SET estado = 0
    WHERE tb_alerta.n_etiqueta = n_etiqueta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insertar_alerta` (IN `n_etiqueta` VARCHAR(50), IN `marca` VARCHAR(50), IN `modelo` VARCHAR(50), IN `serie` VARCHAR(50), IN `descripcion` VARCHAR(250), IN `id_ubicacion` INT, IN `valor_libro` VARCHAR(50), IN `condicion` VARCHAR(50), IN `clase_activo` VARCHAR(50), IN `id_funcionario` INT, IN `estado` TINYINT(1))   BEGIN
    INSERT INTO tb_alerta (
        n_etiqueta,
        marca,
        modelo,
        serie,
        descripcion,
        id_ubicacion,
        valor_libro,
        condicion,
        clase_activo,
        id_funcionario,
        estado
    )
    VALUES (
        n_etiqueta,
        marca,
        modelo,
        serie,
        descripcion,
        id_ubicacion,
        valor_libro,
        condicion,
        clase_activo,
        id_funcionario,
        estado
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_alerta_completa` (IN `n_etiqueta` VARCHAR(50))   BEGIN
    SELECT 
        a.n_etiqueta, 
        a.marca, 
        a.modelo, 
        a.serie, 
        a.descripcion, 
        a.valor_libro, 
        a.condicion, 
        a.clase_activo, 
        a.estado, 
        u.nombre_ubicacion, 
        f.id_funcionario, 
        f.dni_funcionario
    FROM tb_alerta AS a
    INNER JOIN tb_ubicacion AS u ON a.id_ubicacion = u.id_ubicacion
    INNER JOIN tb_funcionario AS f ON a.id_funcionario = f.id_funcionario
    WHERE a.n_etiqueta = n_etiqueta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_actualizar` (IN `_n_etiqueta` VARCHAR(50), IN `_marca` VARCHAR(50), IN `_modelo` VARCHAR(50), IN `_serie` VARCHAR(50), IN `_descripcion` VARCHAR(250), IN `_id_ubicacion` INT(11), IN `_valor_libro` VARCHAR(50), IN `_condicion` VARCHAR(50), IN `_clase_activo` VARCHAR(50), IN `_id_funcionario` INT(11))   BEGIN
UPDATE `tb_activo` SET `marca`=_marca,`modelo`=_modelo,`serie`=_serie,`descripcion`=_descripcion,`id_ubicacion`= _id_ubicacion,`valor_libro`=_valor_libro,`condicion`=_condicion,`clase_activo`=_clase_activo,`id_funcionario`= _id_funcionario WHERE `n_etiqueta` =_n_etiqueta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_eliminar` (IN `_n_etiqueta` VARCHAR(50))   BEGIN
UPDATE `tb_activo` SET `estado`= 0  WHERE `n_etiqueta`= _n_etiqueta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_insertar` (IN `_n_etiqueta` VARCHAR(50), IN `_marca` VARCHAR(50), IN `_modelo` VARCHAR(50), IN `_serie` VARCHAR(50), IN `_descripcion` VARCHAR(250), IN `_id_ubicacion` INT(11), IN `_valor_libro` VARCHAR(50), IN `_condicion` VARCHAR(50), IN `_clase_activo` VARCHAR(50), IN `_id_funcionario` INT(11))   BEGIN
INSERT INTO `tb_activo`(`n_etiqueta`, `marca`, `modelo`, `serie`, `descripcion`, `id_ubicacion`, `valor_libro`, `condicion`, `clase_activo`, `id_funcionario`, `estado`) VALUES (_n_etiqueta,_marca,_modelo,_serie,_descripcion,_id_ubicacion,_valor_libro,_condicion,_clase_activo,_id_funcionario,1);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_listar` ()   BEGIN
SELECT tb_activo.n_etiqueta,tb_activo.marca,tb_activo.modelo,tb_activo.serie,tb_activo.descripcion,tb_activo.id_ubicacion,tb_activo.valor_libro,tb_activo.condicion,tb_activo.clase_activo,tb_activo.id_funcionario, tb_funcionario.nombre_funcionario, tb_ubicacion.nombre_ubicacion,tb_funcionario.dni_funcionario  FROM `tb_activo` INNER JOIN tb_funcionario ON tb_activo.id_funcionario = tb_funcionario.id_funcionario INNER JOIN tb_ubicacion ON tb_activo.id_ubicacion = tb_ubicacion.id_ubicacion WHERE tb_activo.estado = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_funcionario_actualizar` (IN `_id_funcionario` INT(11), IN `_dni_funcionario` VARCHAR(50) CHARSET utf8, IN `_nombre_funcionario` VARCHAR(50) CHARSET utf8)   BEGIN
UPDATE `tb_funcionario` SET `dni_funcionario`=_dni_funcionario,`nombre_funcionario`=_nombre_funcionario WHERE `id_funcionario`=_id_funcionario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_funcionario_eliminar` (IN `_id_funcionario` INT(11))   BEGIN
UPDATE `tb_funcionario` SET `estado_funcionario`=0 WHERE `id_funcionario`=_id_funcionario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_funcionario_insertar` (IN `_dni_funcionario` VARCHAR(50) CHARSET utf8, IN `_nombre_funcionario` VARCHAR(50) CHARSET utf8)   BEGIN
INSERT INTO `tb_funcionario`(`dni_funcionario`, `nombre_funcionario`, `estado_funcionario`) VALUES (_dni_funcionario,_nombre_funcionario,1);
SELECT LAST_INSERT_ID();
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
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_ubicacion_listar` ()   BEGIN
SELECT * FROM `tb_ubicacion` WHERE `estado_ubicacion` = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_actualizar` (IN `_id_usuario` INT(11), IN `_dni_usuario` VARCHAR(50), IN `_nombre_usuario` VARCHAR(50) CHARSET utf8, IN `_email_usuario` VARCHAR(50) CHARSET utf8)   BEGIN
UPDATE `tb_usuario` SET `dni_usuario`=_dni_usuario,`nombre_usuario`=_nombre_usuario,`email_usuario`=_email_usuario WHERE 
`id_usuario`=_id_usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_cambiar_clave` (IN `_id_usuario` VARCHAR(11), IN `_clave_usuario` VARCHAR(255))   BEGIN
UPDATE `tb_usuario` SET `clave_usuario`=_clave_usuario WHERE `id_usuario`=_id_usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_consultar` (IN `_id_usuario` INT(11))   BEGIN
SELECT `id_usuario`,`dni_usuario`, `nombre_usuario`,`email_usuario` FROM `tb_usuario` WHERE `estado_usuario`= 1 AND `id_usuario`=_id_usuario LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_eliminar` (IN `_id_usuario` INT(11))   BEGIN
UPDATE `tb_usuario` SET `estado_usuario`=0 WHERE `id_usuario`= _id_usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_insertar` (IN `_dni_usuario` INT(11), IN `_nombre_usuario` VARCHAR(50), IN `_email_usuario` VARCHAR(50), IN `_clave_usuario` VARCHAR(255))   BEGIN
INSERT INTO `tb_usuario`(`dni_usuario`, `nombre_usuario`, `email_usuario`, `clave_usuario`,`estado_usuario`) 
VALUES (_dni_usuario,_nombre_usuario,_email_usuario,_clave_usuario,1);
SELECT LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_listar` ()   BEGIN
SELECT `id_usuario`,`dni_usuario`, `nombre_usuario`,`email_usuario` FROM `tb_usuario` WHERE `estado_usuario`=1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_logear` (IN `_dni_usuario` VARCHAR(50))   BEGIN
SELECT `id_usuario`,`dni_usuario`, `nombre_usuario`,`email_usuario`,`clave_usuario`  FROM `tb_usuario` WHERE `estado_usuario`=1 AND `dni_usuario`=_dni_usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_usuario_recuperar_clave` (IN `_email_usuario` VARCHAR(50))   BEGIN
SELECT `id_usuario`,`dni_usuario`, `nombre_usuario`,`email_usuario`,`clave_usuario`  FROM `tb_usuario` WHERE `estado_usuario`=1 AND `email_usuario`=_email_usuario;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `actualizar_datos` (`json_param` JSON) RETURNS VARCHAR(255) CHARSET utf8mb4  BEGIN
    DECLARE n_etiqueta_var VARCHAR(255);
    DECLARE id_ubicacion_json INT;
    DECLARE valor_libro_json FLOAT;
    DECLARE condicion_json VARCHAR(255);
    DECLARE id_funcionario_json INT;
    DECLARE lista VARCHAR(255) DEFAULT '';
    DECLARE i INT DEFAULT 0;
    DECLARE n_etiqueta_json VARCHAR(255);

    DROP TEMPORARY TABLE IF EXISTS temp_vars;
    CREATE TEMPORARY TABLE temp_vars (
        n_etiqueta VARCHAR(255),
        id_ubicacion INT,
        valor_libro FLOAT,
        condicion VARCHAR(255),
        id_funcionario INT
    );

    WHILE i < JSON_LENGTH(json_param) DO
        SET n_etiqueta_json = JSON_EXTRACT(json_param, CONCAT('$[', i, '].n_etiqueta'));
        SET id_ubicacion_json = JSON_EXTRACT(json_param, CONCAT('$[', i, '].id_ubicacion'));
        SET valor_libro_json = JSON_EXTRACT(json_param, CONCAT('$[', i, '].valor_libro'));
        SET condicion_json = JSON_EXTRACT(json_param, CONCAT('$[', i, '].condicion'));
        SET id_funcionario_json = JSON_EXTRACT(json_param, CONCAT('$[', i, '].id_funcionario'));

        INSERT INTO temp_vars (n_etiqueta, id_ubicacion, valor_libro, condicion, id_funcionario)
        VALUES (n_etiqueta_json, id_ubicacion_json, valor_libro_json, condicion_json, id_funcionario_json);

        SET i = i + 1;
    END WHILE;

    SELECT GROUP_CONCAT(n_etiqueta) INTO lista FROM tb_activo
WHERE JSON_CONTAINS((SELECT JSON_ARRAYAGG(JSON_OBJECT('n_etiqueta', n_etiqueta, 'id_ubicacion', id_ubicacion, 'valor_libro', valor_libro, 'condicion', condicion, 'id_funcionario', id_funcionario)) 
FROM temp_vars), JSON_OBJECT('n_etiqueta', tb_activo.n_etiqueta, 'id_ubicacion', tb_activo.id_ubicacion, 'valor_libro', tb_activo.valor_libro, 'condicion', tb_activo.condicion, 'id_funcionario', tb_activo.id_funcionario));



    RETURN lista;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `buscar_activos_borrados` (`json_activos` VARCHAR(255)) RETURNS VARCHAR(255) CHARSET utf8mb4 DETERMINISTIC BEGIN
    DECLARE numeros_etiqueta VARCHAR(255);
    DECLARE json_etiquetas VARCHAR(255);
    DECLARE numeros_borrados VARCHAR(255);
    DECLARE current_pos INT;
    DECLARE comma_pos INT;
    DECLARE current_num VARCHAR(255);
    
    -- Crear tabla temporal para almacenar los números de etiqueta
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_numeros_etiqueta (
        numero_etiqueta VARCHAR(255)
    );
    
    -- Decodificar el JSON y obtener los números de etiqueta
    SET json_etiquetas = json_extract(json_activos, '$.n_etiqueta');
    SET numeros_etiqueta = REPLACE(json_etiquetas, '"', '');
    
    -- Separar los números de etiqueta en una lista
    SET current_pos = 1;
    SET numeros_etiqueta = CONCAT(numeros_etiqueta, ',');
    WHILE current_pos <= LENGTH(numeros_etiqueta) DO
        SET comma_pos = LOCATE(',', numeros_etiqueta, current_pos);
        SET current_num = SUBSTRING(numeros_etiqueta, current_pos, comma_pos - current_pos);
        IF current_num != '' THEN
            INSERT INTO temp_numeros_etiqueta (numero_etiqueta) VALUES (current_num);
        END IF;
        SET current_pos = comma_pos + 1;
    END WHILE;
    
    -- Buscar los números de etiqueta que no están presentes en el JSON
    SELECT GROUP_CONCAT(n_etiqueta SEPARATOR ',') INTO numeros_borrados
    FROM tb_activo
    WHERE n_etiqueta NOT IN (
        SELECT numero_etiqueta 
        FROM temp_numeros_etiqueta
    );
    
    -- Devolver la lista de números de etiqueta que no están presentes en el archivo JSON
    RETURN numeros_borrados;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `buscar_nuevos_activos` (`json_string` TEXT) RETURNS VARCHAR(1024) CHARSET utf8mb4  BEGIN
  DECLARE num_new_assets INT DEFAULT 0;
  DECLARE asset_tag VARCHAR(255);
  DECLARE asset_data JSON;
  DECLARE result VARCHAR(1024) DEFAULT ''; -- Define la variable de resultado como un VARCHAR vacío

  -- Analiza la cadena JSON y almacena los activos en la variable "asset_data"
  SET asset_data = JSON_EXTRACT(json_string, '$');

  -- Busca los activos que existen en la base de datos pero no en el objeto JSON
  SELECT n_etiqueta INTO asset_tag FROM tb_activo
  WHERE n_etiqueta NOT IN (SELECT JSON_EXTRACT(json_data, '$.n_etiqueta') FROM (SELECT JSON_ARRAY_ELEMENTS(json_string) as json_data FROM (SELECT json_string FROM tb_json ORDER BY id DESC LIMIT 1) as tb_json) as json_table)
  ORDER BY n_etiqueta ASC;

  -- Si no se encuentran nuevos activos, devuelve nulo
  IF asset_tag IS NULL THEN
    RETURN NULL;
  ELSE
    -- Devuelve la lista de etiquetas de activos nuevos como un VARCHAR separado por comas
    RETURN asset_tag;
  END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_activo`
--

CREATE TABLE `tb_activo` (
  `n_etiqueta` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `modelo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `serie` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `id_ubicacion` int(11) DEFAULT NULL,
  `valor_libro` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `condicion` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clase_activo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `id_funcionario` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tb_activo`
--

INSERT INTO `tb_activo` (`n_etiqueta`, `marca`, `modelo`, `serie`, `descripcion`, `id_ubicacion`, `valor_libro`, `condicion`, `clase_activo`, `id_funcionario`, `estado`) VALUES
('N00114280', 'HEWLETT PACKARD', 'DC5750', 'MXJ80807XG', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En desuso', 'Computadoras', 1, 0),
('N00116179', 'SONY', 'CFD-RS60CP', 'S01-1085335-B', 'RADIOGRABADORA', 1, '0,00', 'En uso', 'Equipos de audio y video', 1, 0),
('N00117441', 'EUROMOBILIA', 'BS', 'NO TIENE', 'ESTACION DE TRABAJO SECRETARIAL', 1, '0,00', 'En uso', 'Mesas y escritorios', 1, 0),
('N00117750', 'EUROMOBILIA', 'D', 'NO TIENE', 'BIBLIOTECA BAJA', 1, '0,00', 'En uso', 'Archivadores, bibliotecas y armarios', 1, 0),
('N00123877', 'H.P.', '3005', 'MXLO1207HQ', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En uso', 'Computadoras', 1, 0),
('N00127613', 'GENERAL ELECTRIC', 'TA-04', '1107A213972', 'REFRIGERADORA', 1, '0,21', 'En uso', 'Equipos y mobiliario doméstico', 1, 0),
('N00135492', 'CISCO', '6921', 'SPUC17220TDQ', 'TELEFONO', 1, '19.811,32', 'En uso', 'Equipos de telefonía', 1, 0),
('N00135505', 'CISCO', '6921', 'SPUC17220U5A', 'TELEFONO', 1, '19.811,32', 'En uso', 'Equipos de telefonía', 1, 0),
('N00147795', 'HP', 'PRODESK 600 G2 SFF', 'MXL7031HTN', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En uso', 'Computadoras', 1, 0),
('N00167174', 'HP ', 'ProBook 430 G7 ', '5CD1119HWK', 'COMPUTADORA PORTATIL (ESTANDAR I)', 1, '343.666,72', 'En uso', 'Computadoras', 1, 0),
('N00167175', 'HP ', 'ProBook 430 G7 ', '5CD1119HXP', 'COMPUTADORA PORTATIL (ESTANDAR I)', 1, '343.666,72', 'En uso', 'Computadoras', 1, 0),
('N00169760', 'FANTINI', 'N/A', '1', 'actualizado', 1, '225.393,83', 'En uso', 'Mesas y escritorios', 1, 1),
('N00169761', 'FANTINI-ACTUALIZADO', 'N/A', '1', 'MESA RECTANGULAR PARA SALA DE REUNIONES TIPO C2M (PARA FUERA DE LA GRAN AREA METROPOLITANA)', 1, '245.366,79', 'En uso', 'Mesas y escritorios', 2, 1),
('N00617754', 'EUROMOBILIA', 'D', 'NO TIENE', 'BIBLIOTECA BAJA', 1, '0,00', 'En uso', 'Archivadores, bibliotecas y armarios', 1, 0),
('N11111111', 'EUROMOBILIA', 'BS', 'NO TIENE', 'ESTACION DE TRABAJO SECRETARIAL', 1, '0,01', 'En uso', 'Mesas y escritorios', 2, 0),
('N22202227', 'EUROMOBILIA', 'BS', 'NO TIENE', '1', 1, '0,02', 'En uso', 'Mesas y escritorios', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_alerta`
--

CREATE TABLE `tb_alerta` (
  `n_etiqueta` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `marca` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `modelo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `serie` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `id_ubicacion` int(11) DEFAULT NULL,
  `valor_libro` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `condicion` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clase_activo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `id_funcionario` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tb_alerta`
--

INSERT INTO `tb_alerta` (`n_etiqueta`, `marca`, `modelo`, `serie`, `descripcion`, `id_ubicacion`, `valor_libro`, `condicion`, `clase_activo`, `id_funcionario`, `estado`) VALUES
('N00169761', 'nueva marca', 'nuevo modelo', 'nuevo serie', 'nueva descripcion', 1, 'nuevo valor libro', 'nueva condicion', 'nueva clase activo', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_funcionario`
--

CREATE TABLE `tb_funcionario` (
  `id_funcionario` int(11) NOT NULL,
  `dni_funcionario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_funcionario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `estado_funcionario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tb_funcionario`
--

INSERT INTO `tb_funcionario` (`id_funcionario`, `dni_funcionario`, `nombre_funcionario`, `estado_funcionario`) VALUES
(1, '402050851', 'ESQUIVEL RAMIREZ EMILY DANIELA', 1),
(2, '402050852', 'ESQUIVEL RAMIREZ EMILY DANIELA', 1),
(3, '402050853', 'ESQUIVEL RAMIREZ EMILY DANIELA', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_ubicacion`
--

CREATE TABLE `tb_ubicacion` (
  `id_ubicacion` int(11) NOT NULL,
  `nombre_ubicacion` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion_ubicacion` varchar(250) COLLATE utf8_spanish_ci DEFAULT NULL,
  `estado_ubicacion` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tb_ubicacion`
--

INSERT INTO `tb_ubicacion` (`id_ubicacion`, `nombre_ubicacion`, `descripcion_ubicacion`, `estado_ubicacion`) VALUES
(1, 'CAMPUS SARAPIQUÍ', 'Ubicacion global de campus', 1),
(2, 'Aula 1', '', 1),
(3, 'Bodega Principal 2', 'Bodega de funcionarios de mantenimiento', 1),
(4, 'Laboratorio Computo', 'Laboratorio para clases de Ingenieria en sistemas', 1),
(5, 'Laboratorio de idiomas', 'Laboratorio para clases de Ingles', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id_usuario` int(11) NOT NULL,
  `dni_usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `email_usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clave_usuario` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `estado_usuario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Dumping data for table `tb_usuario`
--

INSERT INTO `tb_usuario` (`id_usuario`, `dni_usuario`, `nombre_usuario`, `email_usuario`, `clave_usuario`, `estado_usuario`) VALUES
(1, '123456789', 'José María Figueres Olsen', 'gamaro968@gmail.com', '$2y$10$HaJ7Wtfm1g/g/lKES6pZfuxB6bTek2WgWlfDw//Jxen9RwJvstrkW', 1),
(2, '707770777', 'Gamaliel Rodriguez Baez', 'gama@correo.com', '707770777', 1),
(3, '101110111', 'Abel Pacheco de la Espriella', 'abelpacheco0234@correo.com', '101110111', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_activo`
--
ALTER TABLE `tb_activo`
  ADD PRIMARY KEY (`n_etiqueta`);

--
-- Indexes for table `tb_alerta`
--
ALTER TABLE `tb_alerta`
  ADD PRIMARY KEY (`n_etiqueta`);

--
-- Indexes for table `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  ADD PRIMARY KEY (`id_funcionario`) USING BTREE,
  ADD UNIQUE KEY `dni` (`dni_funcionario`);

--
-- Indexes for table `tb_ubicacion`
--
ALTER TABLE `tb_ubicacion`
  ADD PRIMARY KEY (`id_ubicacion`);

--
-- Indexes for table `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `dni_usuario` (`dni_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  MODIFY `id_funcionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_ubicacion`
--
ALTER TABLE `tb_ubicacion`
  MODIFY `id_ubicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
