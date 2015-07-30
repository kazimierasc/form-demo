-- phpMyAdmin SQL Dump
-- version 4.2.6deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 30, 2015 at 07:48 PM
-- Server version: 5.5.44-0ubuntu0.14.10.1
-- PHP Version: 5.5.12-2ubuntu4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `form-demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `accommodation`
--

CREATE TABLE IF NOT EXISTS `accommodation` (
`id` int(11) NOT NULL,
  `propertyType` enum('room','appartment','house') COLLATE utf8_lithuanian_ci NOT NULL,
  `city` text COLLATE utf8_lithuanian_ci NOT NULL,
  `capacity` text COLLATE utf8_lithuanian_ci NOT NULL,
  `address` text COLLATE utf8_lithuanian_ci NOT NULL,
  `description` mediumtext COLLATE utf8_lithuanian_ci NOT NULL,
  `lat` text COLLATE utf8_lithuanian_ci NOT NULL,
  `lon` text COLLATE utf8_lithuanian_ci NOT NULL,
  `target` enum('all','local','foreign') COLLATE utf8_lithuanian_ci NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `accommodation`
--

INSERT INTO `accommodation` (`id`, `propertyType`, `city`, `capacity`, `address`, `description`, `lat`, `lon`, `target`, `timestamp`) VALUES
(1, 'room', 'Vilniuje', '1', 'Šimulionio g. 4, Vilnius', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '54.6946089', '25.221528000000035', 'all', '2015-07-30 16:46:53'),
(2, 'house', 'Kaune', '3-4', 'Žaliakalnio g. 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '54.69135199999999', '25.39690799999994', 'foreign', '2015-07-30 16:47:48'),
(3, 'appartment', 'Šiauliuose', '5-7', 'Vilniaus g. 3', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '55.9230629', '23.350171000000046', 'all', '2015-07-30 16:48:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accommodation`
--
ALTER TABLE `accommodation`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accommodation`
--
ALTER TABLE `accommodation`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
