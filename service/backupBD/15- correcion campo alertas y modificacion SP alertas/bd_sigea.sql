-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2023 a las 04:00:05
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_activo_por_etiqueta` (IN `p_etiqueta` VARCHAR(20))   BEGIN
SELECT n_etiqueta, descripcion, valor_libro, condicion ,clase_activo, id_funcionario
FROM `tb_activo` 
WHERE estado = 1 
AND n_etiqueta = p_etiqueta;
  

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_funcionario_por_cedula` (IN `p_cedula` VARCHAR(20))   BEGIN
  SELECT * FROM `tb_funcionario` WHERE `estado_funcionario`=1 AND `dni_funcionario` = p_cedula;
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_activo_obtener_by_n_etiqueta` (IN `_n_etiqueta` VARCHAR(50))   BEGIN
SELECT tb_activo.n_etiqueta,tb_activo.marca,tb_activo.modelo,tb_activo.serie,tb_activo.descripcion,tb_activo.id_ubicacion,tb_activo.valor_libro,tb_activo.condicion,tb_activo.clase_activo,tb_activo.id_funcionario, tb_funcionario.nombre_funcionario, tb_ubicacion.nombre_ubicacion,tb_funcionario.dni_funcionario  FROM `tb_activo` INNER JOIN tb_funcionario ON tb_activo.id_funcionario = tb_funcionario.id_funcionario INNER JOIN tb_ubicacion ON tb_activo.id_ubicacion = tb_ubicacion.id_ubicacion WHERE tb_activo.estado = 1 AND tb_activo.n_etiqueta= _n_etiqueta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_alerta_actualizar_alerta` (IN `alerta_id` INT, IN `alerta_marca` VARCHAR(50), IN `alerta_modelo` VARCHAR(50), IN `alerta_serie` VARCHAR(50), IN `alerta_activo_descripcion` VARCHAR(250), IN `alerta_ubicacion` INT, IN `alerta_valor_libro` VARCHAR(50), IN `alerta_condicion` VARCHAR(50), IN `alerta_clase_activo` VARCHAR(50), IN `alerta_id_funcionario` INT)   BEGIN
    UPDATE tb_alerta
    SET 
        tb_alerta_marca = alerta_marca,
        tb_alerta_modelo = alerta_modelo,
        tb_alerta_serie = alerta_serie,
        tb_alerta_activo_descripcion = alerta_activo_descripcion,
        tb_alerta_ubicacion = alerta_ubicacion,
        tb_alerta_valor_libro = alerta_valor_libro,
        tb_alerta_condicion = alerta_condicion,
        tb_alerta_clase_activo = alerta_clase_activo,
        tb_alerta_id_funcionario = alerta_id_funcionario
    WHERE tb_alerta_id = alerta_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_alerta_eliminar_por_id` (IN `alerta_id` INT)   BEGIN
    DELETE FROM tb_alerta WHERE tb_alerta_id = alerta_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_alerta_ingresar_alerta` (IN `alerta_n_etiqueta` VARCHAR(50), IN `alerta_marca` VARCHAR(50), IN `alerta_modelo` VARCHAR(50), IN `alerta_serie` VARCHAR(50), IN `alerta_activo_descripcion` VARCHAR(250), IN `alerta_ubicacion` INT, IN `alerta_valor_libro` VARCHAR(50), IN `alerta_condicion` VARCHAR(50), IN `alerta_clase_activo` VARCHAR(50), IN `alerta_id_funcionario` INT, IN `alerta_activo_estado` TINYINT(1), IN `alerta_fecha` DATETIME(3), IN `alerta_tipo_alerta` VARCHAR(50), IN `alerta_accion` VARCHAR(50))   BEGIN
    INSERT INTO tb_alerta(tb_alerta_n_etiqueta, tb_alerta_marca, tb_alerta_modelo, tb_alerta_serie,
                          tb_alerta_activo_descripcion, tb_alerta_ubicacion, tb_alerta_valor_libro,
                          tb_alerta_condicion, tb_alerta_clase_activo, tb_alerta_id_funcionario,
                          tb_alerta_activo_estado, tb_alerta_fecha, tb_alerta_tipo_alerta, 
                          tb_alerta_accion)
    VALUES (alerta_n_etiqueta, alerta_marca, alerta_modelo, alerta_serie, alerta_activo_descripcion,
            alerta_ubicacion, alerta_valor_libro, alerta_condicion, alerta_clase_activo,
            alerta_id_funcionario, alerta_activo_estado, alerta_fecha, alerta_tipo_alerta, alerta_accion);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `tb_alerta_mostrar_alertas` ()   BEGIN
    SELECT tb_alerta_id, tb_alerta_n_etiqueta, tb_alerta_marca, tb_alerta_modelo, tb_alerta_serie,
           tb_alerta_activo_descripcion, tb_alerta_ubicacion, tb_alerta_valor_libro, tb_alerta_condicion,
           tb_alerta_clase_activo, tb_alerta_id_funcionario, tb_alerta_activo_estado, tb_alerta_fecha,
           tb_alerta_tipo_alerta, tb_alerta_accion
    FROM tb_alerta
    ORDER BY tb_alerta_id;
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
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `actualizar_datos` (`json_param` JSON) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
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

CREATE DEFINER=`root`@`localhost` FUNCTION `buscar_activos_borrados` (`json_activos` VARCHAR(255)) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci DETERMINISTIC BEGIN
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

CREATE DEFINER=`root`@`localhost` FUNCTION `buscar_nuevos_activos` (`json_string` TEXT) RETURNS VARCHAR(1024) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
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
-- Estructura de tabla para la tabla `tb_activo`
--

CREATE TABLE `tb_activo` (
  `n_etiqueta` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `serie` varchar(50) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `id_ubicacion` int(11) DEFAULT NULL,
  `valor_libro` varchar(50) NOT NULL,
  `condicion` varchar(50) NOT NULL,
  `clase_activo` varchar(50) NOT NULL,
  `id_funcionario` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_activo`
--

INSERT INTO `tb_activo` (`n_etiqueta`, `marca`, `modelo`, `serie`, `descripcion`, `id_ubicacion`, `valor_libro`, `condicion`, `clase_activo`, `id_funcionario`, `estado`) VALUES
('N00114280', 'HEWLETT PACKARD', 'DC5750', 'MXJ80807XG', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En desuso', 'Computadoras', 1, 0),
('N00114281', 'HEWLETT PACKARD', 'DC5750', 'MXJ80807XG', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En desuso', 'Computadoras', 1, 0),
('N00114283', 'HEWLETT PACKARD', 'DC5750', 'MXJ80807XG', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En desuso', 'Computadoras', 1, 0),
('N00114284', 'HEWLETT PACKARD', 'DC5750', 'MXJ80807XG', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En desuso', 'Computadoras', 1, 0),
('N00114285', 'HEWLETT PACKARD', 'DC5750', 'MXJ80807XG', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En desuso', 'Computadoras', 1, 1),
('N00116179', 'SONY', 'CFD-RS60CP', 'S01-1085335-B', 'RADIOGRABADORA', 1, '0,00', 'En uso', 'Equipos de audio y video', 1, 1),
('N00117441', 'EUROMOBILIA', 'BS', 'NO TIENE', 'ESTACION DE TRABAJO SECRETARIAL', 1, '0,00', 'En uso', 'Mesas y escritorios', 1, 1),
('N00117750', 'EUROMOBILIA', 'D', 'NO TIENE', 'BIBLIOTECA BAJA', 1, '0,00', 'En uso', 'Archivadores, bibliotecas y armarios', 1, 0),
('N00123877', 'H.P.', '3005', 'MXLO1207HQ', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En uso', 'Computadoras', 1, 1),
('N00127613', 'HP ', 'ProBook 430 G7 ', '5CD1119HXP', 'COMPUTADORA PORTATIL (ESTANDAR I)', 4, '343.666,72', 'En uso', 'Computadoras', 1, 1),
('N001276130', 'HP ', 'ProBook 430 G7 ', '5CD1119HWK', 'COMPUTADORA PORTATIL (ESTANDAR I)', 1, '343.666,72', 'En uso', 'Computadoras', 1, 1),
('N00135505', 'CISCO', '6921', 'SPUC17220U5A', 'TELEFONO', 1, '19.811,32', 'En uso', 'Equipos de telefonía', 1, 1),
('N00147795', 'HP', 'PRODESK 600 G2 SFF', 'MXL7031HTN', 'COMPUTADORA DE ESCRITORIO', 1, '0,00', 'En uso', 'Computadoras', 1, 1),
('N00169760', 'FANTINI', 'N/A', '1', 'MESA RECTANGULAR PARA SALA DE REUNIONES TIPO C1M (PARA FUERA DE LA GRAN AREA METROPOLITANA)', 1, '225.393,83', 'En uso', 'Mesas y escritorios', 1, 1),
('N00169761', 'FANTINI', 'N/A', '1', 'MESA RECTANGULAR PARA SALA DE REUNIONES TIPO C2M (PARA FUERA DE LA GRAN AREA METROPOLITANA)', 1, '245.366,79', 'En uso', 'Mesas y escritorios', 1, 1),
('N00187610', 'N00127613', 'N00127613', 'N00127613', 'N00127613', 1, 'N00127613', 'N00127613', 'N00127613', 0, 1),
('N00617754', 'EUROMOBILIA', 'D', 'NO TIENE', 'BIBLIOTECA BAJA', 1, '0,00', 'En uso', 'Archivadores, bibliotecas y armarios', 1, 0),
('N11111111', 'EUROMOBILIA', 'BS', 'NO TIENE', 'ESTACION DE TRABAJO SECRETARIAL', 1, '0,01', 'En uso', 'Mesas y escritorios', 2, 0),
('N22202227', 'EUROMOBILIA', 'BS', 'NO TIENE', '1', 1, '0,02', 'En uso', 'Mesas y escritorios', 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_alerta`
--

CREATE TABLE `tb_alerta` (
  `tb_alerta_id` int(11) NOT NULL,
  `tb_alerta_n_etiqueta` varchar(50) NOT NULL,
  `tb_alerta_marca` varchar(50) NOT NULL,
  `tb_alerta_modelo` varchar(50) NOT NULL,
  `tb_alerta_serie` varchar(50) NOT NULL,
  `tb_alerta_activo_descripcion` varchar(250) NOT NULL,
  `tb_alerta_ubicacion` int(11) DEFAULT NULL,
  `tb_alerta_valor_libro` varchar(50) NOT NULL,
  `tb_alerta_condicion` varchar(50) NOT NULL,
  `tb_alerta_clase_activo` varchar(50) NOT NULL,
  `tb_alerta_id_funcionario` int(11) NOT NULL,
  `tb_alerta_activo_estado` tinyint(1) NOT NULL,
  `tb_alerta_fecha` date NOT NULL,
  `tb_alerta_tipo_alerta` varchar(50) NOT NULL,
  `tb_alerta_accion` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_alerta`
--

INSERT INTO `tb_alerta` (`tb_alerta_id`, `tb_alerta_n_etiqueta`, `tb_alerta_marca`, `tb_alerta_modelo`, `tb_alerta_serie`, `tb_alerta_activo_descripcion`, `tb_alerta_ubicacion`, `tb_alerta_valor_libro`, `tb_alerta_condicion`, `tb_alerta_clase_activo`, `tb_alerta_id_funcionario`, `tb_alerta_activo_estado`, `tb_alerta_fecha`, `tb_alerta_tipo_alerta`, `tb_alerta_accion`) VALUES
(1, 'N00114280', 'HEWLETT PACKARD', 'DC5750', 'MXJ80807XG', 'COMPUTADORA DE ESCRITORIO', 1, '0.00', 'En desuso', 'computadoras', 1, 1, '2023-04-19', 'activo borrado', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_funcionario`
--

CREATE TABLE `tb_funcionario` (
  `id_funcionario` int(11) NOT NULL,
  `dni_funcionario` varchar(50) NOT NULL,
  `nombre_funcionario` varchar(50) NOT NULL,
  `estado_funcionario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_funcionario`
--

INSERT INTO `tb_funcionario` (`id_funcionario`, `dni_funcionario`, `nombre_funcionario`, `estado_funcionario`) VALUES
(1, '402050851', 'ESQUIVEL RAMIREZ EMILY DANIELA', 1),
(2, '402050852', 'ESQUIVEL RAMIREZ EMILY DANIELA', 1),
(3, '402050853', 'ESQUIVEL RAMIREZ EMILY DANIELA', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ubicacion`
--

CREATE TABLE `tb_ubicacion` (
  `id_ubicacion` int(11) NOT NULL,
  `nombre_ubicacion` varchar(50) NOT NULL,
  `descripcion_ubicacion` varchar(250) DEFAULT NULL,
  `estado_ubicacion` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_ubicacion`
--

INSERT INTO `tb_ubicacion` (`id_ubicacion`, `nombre_ubicacion`, `descripcion_ubicacion`, `estado_ubicacion`) VALUES
(1, 'CAMPUS SARAPIQUÍ', '', 1),
(2, 'Aula 1', '', 1),
(3, 'Bodega Principal 2', 'Bodega de funcionarios de mantenimiento', 1),
(4, 'Laboratorio Computo', 'Laboratorio para clases de Ingenieria en sistemas', 1),
(5, 'Laboratorio de idiomas', 'Laboratorio para clases de Ingles', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id_usuario` int(11) NOT NULL,
  `dni_usuario` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `email_usuario` varchar(50) NOT NULL,
  `clave_usuario` varchar(255) NOT NULL,
  `estado_usuario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tb_usuario`
--

INSERT INTO `tb_usuario` (`id_usuario`, `dni_usuario`, `nombre_usuario`, `email_usuario`, `clave_usuario`, `estado_usuario`) VALUES
(1, '123456789', 'José María Figueres Olsen', 'wilfredobarqueroherrera@gmail.com', '$2y$10$VRD1gjLwro6WR6XzcapfeOacqbiAXb1L7TZkY1qmvvuRM2rI/PQcS', 1),
(4, '702050830', 'Wilfredo Barquero Herrera', 'wilfredobarqueroherrera@gmail.com', '$2y$10$BN1KhwEqX1pKhNvFvAAE7O.tZbMUWIhNXVuG3dSqEKCJlMO0k0.fS', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_activo`
--
ALTER TABLE `tb_activo`
  ADD PRIMARY KEY (`n_etiqueta`);

--
-- Indices de la tabla `tb_alerta`
--
ALTER TABLE `tb_alerta`
  ADD PRIMARY KEY (`tb_alerta_id`);

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
-- AUTO_INCREMENT de la tabla `tb_alerta`
--
ALTER TABLE `tb_alerta`
  MODIFY `tb_alerta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_funcionario`
--
ALTER TABLE `tb_funcionario`
  MODIFY `id_funcionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_ubicacion`
--
ALTER TABLE `tb_ubicacion`
  MODIFY `id_ubicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
