-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 27, 2019 at 03:44 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quick_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `sqtdb_test`
--

DROP TABLE IF EXISTS `sqtdb_test`;
CREATE TABLE IF NOT EXISTS `sqtdb_test` (
  `id` int(128) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `picture` varchar(128) NOT NULL,
  `default` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sqtdb_test`
--

INSERT INTO `sqtdb_test` (`id`, `name`, `email`, `password`, `picture`, `default`) VALUES
(1, 'iyanu akins', 'sundax4u2@gmail.com', '$2b$12$aaky0kpb7oL7zHKlbL.qrOU5K1pGsyu6cwb1C6mmV34/pxL8S0zIS', 'IMG_9639.JPG', ''),
(6, 'Akinleye Iyanuoluwa Ayo', 'iyanuakins@gmail.com', '$2b$12$qG1KqEH5BHJTzkRuSbo66.M316/YdH6EYlAdvUTliixO7n54D4Luq', 'IMG_9639.JPG', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
