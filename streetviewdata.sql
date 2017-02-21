-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2017 at 10:42 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mydata`
--

-- --------------------------------------------------------

--
-- Table structure for table `streetviewdata`
--

CREATE TABLE IF NOT EXISTS `streetviewdata` (
  `ID` int(11) NOT NULL,
  `ImgLocation` text CHARACTER SET utf8 NOT NULL,
  `ImagePath` varchar(512) CHARACTER SET utf8 NOT NULL,
  `Latitude` double NOT NULL,
  `Longitude` double NOT NULL,
  `CardinalDir_Lat` text CHARACTER SET utf8 NOT NULL,
  `CardinalDir_Lng` text CHARACTER SET utf8 NOT NULL,
  `Vertlimit_min` float NOT NULL,
  `Vertlimit_max` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `streetviewdata`
--

INSERT INTO `streetviewdata` (`ID`, `ImgLocation`, `ImagePath`, `Latitude`, `Longitude`, `CardinalDir_Lat`, `CardinalDir_Lng`, `Vertlimit_min`, `Vertlimit_max`) VALUES
(1, 'JakobiKirchpl', '/AugmentedReality/sample Images/rbi00000001.jpg', 50.832786, 12.919078, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(2, 'STEKO Spielhaus', '/AugmentedReality/sample Images/rbi00000002.jpg', 50.834121, 12.917547, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(3, 'Innere Klosterstrasse', '/AugmentedReality/sample Images/rbi00000003.jpg', 50.833206, 12.918303, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(4, 'Innere Klosterstrasse', '/AugmentedReality/sample Images/rbi00000004.jpg', 50.832825, 12.918413, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(5, 'Am Alten Bad 9', '/AugmentedReality/sample Images/rbi00000005.jpg', 50.835749, 12.917716, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(6, 'Siegertsches Haus', '/AugmentedReality/sample Images/rbi00000007.jpg', 50.832675, 12.9194, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(7, 'Siegertsches Haus 2', '/AugmentedReality/sample Images/rbi00000008.jpg', 50.832695, 12.91947, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(8, 'Rosenhof Susser shop', '/AugmentedReality/sample Images/rbi00000012.jpg', 50.831118, 12.916574, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(9, 'Rosenhof', '/AugmentedReality/sample Images/rbi00000013.jpg', 50.831356, 12.917186, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(10, 'Nashville Print Factory', '/AugmentedReality/sample Images/rbi00000014.jpg', 50.831604, 12.917834, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(11, 'VDM Coiffeur Am Rosenhof', '/AugmentedReality/sample Images/rbi00000015.jpg', 50.831763, 12.918172, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(12, 'Zeeman textielSupers', '/AugmentedReality/sample Images/rbi00000016.jpg', 50.831916, 12.918603, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(13, 'Brucke', '/AugmentedReality/sample Images/rbi00000021.jpg', 50.836424, 12.915139, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(14, 'Stadthallenpark', '/AugmentedReality/sample Images/rbi00000022.jpg', 50.835048, 12.921952, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(15, 'Fabrikstrasse', '/AugmentedReality/sample Images/rbi00000023.jpg', 50.836209, 12.914992, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(16, 'Hedwighof', '/AugmentedReality/sample Images/rbi00000024.jpg', 50.835345, 12.917442, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(17, 'Hedwighof 2', '/AugmentedReality/Sample Images/rbi00000025.jpg', 50.835226, 12.917419, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(18, 'Hedwighof 3', '/AugmentedReality/Sample Images/rbi00000026.jpg', 50.835054, 12.917174, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(19, 'Neumarkt', '/AugmentedReality/Sample Images/rbi00000028.jpg', 50.832426, 12.919177, 'N(Deg)', 'E(Deg)', 1.047, 2.094),
(20, 'Neumarkt 2', '/AugmentedReality/Sample Images/rbi00000029.jpg', 50.832156, 12.919005, 'N(Deg)', 'E(Deg)', 1.047, 2.094);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `streetviewdata`
--
ALTER TABLE `streetviewdata`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `streetviewdata`
--
ALTER TABLE `streetviewdata`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
