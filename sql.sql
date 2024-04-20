CREATE TABLE `brummybd`.`Clientes` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `nombre` VARCHAR(20), 
    `apellidoP` VARCHAR(20), 
    `apellidoM` VARCHAR(20), 
    `telefono` VARCHAR(20), 
    `correo` VARCHAR(100), 
    `fechaCreacion`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `fechaUlmitoMovimiento` DATETIME, 
    `motivoMovimiento` VARCHAR(50), 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    `nota` VARCHAR(500),
    PRIMARY KEY (`ID`)
)

CREATE TABLE `brummybd`.`Mascotas` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `nombre` VARCHAR(50), 
    `fechaNacimiento` DATE, 
    `FK_especie` INT, 
    `especie` VARCHAR(50), 
    `raza` VARCHAR(50), 
    `FK_raza` INT,
    `sexo` VARCHAR(20), 
    `color` VARCHAR(20), 
    `rasgosParticulares` VARCHAR(255), 
    `nota` VARCHAR(500), 
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `fechaUlmitoMovimiento` DATETIME, 
    `motivoMovimiento` VARCHAR(50), 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
)

CREATE TABLE `brummybd`.`Especies` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `nombreEspecie` VARCHAR(50), 
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);

CREATE TABLE `brummybd`.`Razas` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `nombreRaza` VARCHAR(50), 
    `FK_especie` INT,
    `especie` VARCHAR(50),
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);

CREATE TABLE `brummybd`.`inventario` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `codigo` VARCHAR(255), 
    `nombre` INT,
    `descripcion` VARCHAR(500), 
    `tipo` VARCHAR(50),
    `Flagtipo` VARCHAR(50),
    `precioCompra` DECIMAL(10, 2),
    `precioVenta` DECIMAL(10, 2),
    `stockMinimo` INT,
    `stockReal` INT,
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);
