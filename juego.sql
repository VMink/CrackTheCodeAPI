-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2023 at 09:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `juego`
--
CREATE Database juego;
use juego;
-- --------------------------------------------------------

--
-- Table structure for table `habilidad`
--

CREATE TABLE `habilidad` (
  `idHabilidad` int(11) NOT NULL,
  `idMinijuego` int(11) NOT NULL,
  `nombreHabilidad` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `minijuego`
--

CREATE TABLE `minijuego` (
  `idMinijuego` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `cantidadNiveles` int(11) NOT NULL,
  `puntajeMaximo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partida`
--

CREATE TABLE `partida` (
  `idUsuario` int(11) NOT NULL,
  `idPartida` int(11) NOT NULL,
  `fechaHoraInicio` datetime NOT NULL,
  `fechaHoraFinal` datetime NOT NULL,
  `puntuacionAcumulada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `partida-minijuego`
--

CREATE TABLE `partida-minijuego` (
  `idPartida` int(11) NOT NULL,
  `idMinijuego` int(11) NOT NULL,
  `nivelAlcanzado` int(11) NOT NULL,
  `scoreHabilidadAlcanzado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` varchar(30) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellido` varchar(30) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `Contraseña` varchar(30) NOT NULL,
  `correo` varchar(64) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `pais` varchar(30) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `habilidad`
--
ALTER TABLE `habilidad`
  ADD PRIMARY KEY (`idHabilidad`,`idMinijuego`),
  ADD KEY `idMinijuego` (`idMinijuego`);

--
-- Indexes for table `minijuego`
--
ALTER TABLE `minijuego`
  ADD PRIMARY KEY (`idMinijuego`);

--
-- Indexes for table `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`idPartida`,`idUsuario`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `partida-minijuego`
--
ALTER TABLE `partida-minijuego`
  ADD PRIMARY KEY (`idPartida`,`idMinijuego`),
  ADD KEY `idPartida` (`idPartida`,`idMinijuego`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `habilidad`
--
ALTER TABLE `habilidad`
  MODIFY `idHabilidad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `minijuego`
--
ALTER TABLE `minijuego`
  MODIFY `idMinijuego` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partida`
--
ALTER TABLE `partida`
  MODIFY `idPartida` int(11) NOT NULL AUTO_INCREMENT;


insert into `usuario` (`idUsuario`,`Nombre`,`Apellido`,
  `fechaNacimiento`,`Contraseña`,`correo`,`telefono`,`pais`) values ('AldeDios','Aldehil','Sánchez','2003-07-05','12345','sanheraldehil@outlook.com','+525585578513','México');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
