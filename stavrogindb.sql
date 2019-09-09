-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2019 at 07:52 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stavrogindb`
--

-- --------------------------------------------------------

--
-- Table structure for table `examples`
--

CREATE TABLE `examples` (
  `ex_id` int(10) UNSIGNED NOT NULL,
  `ex_word_id` int(10) UNSIGNED NOT NULL,
  `ex_txt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `lan_id` tinyint(3) UNSIGNED NOT NULL,
  `lan_title` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`lan_id`, `lan_title`) VALUES
(6, 'Bokmål'),
(5, 'Deutsch'),
(2, 'English'),
(3, 'Francais'),
(1, 'Ελληνικά'),
(4, 'русский');

-- --------------------------------------------------------

--
-- Table structure for table `translations`
--

CREATE TABLE `translations` (
  `tra_id` int(10) UNSIGNED NOT NULL,
  `tra_wordid` int(10) UNSIGNED NOT NULL,
  `tra_langid` tinyint(3) UNSIGNED NOT NULL,
  `tra_meaning` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `translations`
--

INSERT INTO `translations` (`tra_id`, `tra_wordid`, `tra_langid`, `tra_meaning`) VALUES
(1, 3, 5, 'Passagier'),
(2, 4, 1, 'υπερπέραν'),
(5, 11, 1, 'σχολείο');

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `wor_id` int(10) UNSIGNED NOT NULL,
  `wor_langid` tinyint(3) UNSIGNED NOT NULL,
  `wor_word` varchar(45) NOT NULL,
  `wor_pronounce` varchar(45) NOT NULL,
  `wor_stem` varchar(45) DEFAULT NULL,
  `wor_added` date NOT NULL,
  `wor_due` date NOT NULL,
  `wor_avg_days_due` decimal(5,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `wor_comment` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`wor_id`, `wor_langid`, `wor_word`, `wor_pronounce`, `wor_stem`, `wor_added`, `wor_due`, `wor_avg_days_due`, `wor_comment`) VALUES
(1, 4, 'Я', '', NULL, '2019-09-09', '2019-04-09', '0.00', ''),
(2, 4, 'любить', '', NULL, '2019-09-09', '2019-09-29', '0.00', ''),
(3, 4, 'пассажир', '', NULL, '2019-09-09', '2019-09-09', '0.00', ''),
(4, 5, 'Jenseits', '', NULL, '2019-09-09', '2019-09-09', '0.00', ''),
(11, 4, 'школа', '', NULL, '2019-09-09', '2011-10-09', '4.00', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `examples`
--
ALTER TABLE `examples`
  ADD PRIMARY KEY (`ex_id`),
  ADD KEY `ex_word_id` (`ex_word_id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`lan_id`),
  ADD UNIQUE KEY `lan_title` (`lan_title`);

--
-- Indexes for table `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`tra_id`),
  ADD KEY `tra_wordid` (`tra_wordid`),
  ADD KEY `tra_langid` (`tra_langid`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`wor_id`),
  ADD KEY `wor_langid` (`wor_langid`),
  ADD KEY `wor_word` (`wor_word`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `examples`
--
ALTER TABLE `examples`
  MODIFY `ex_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `lan_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `translations`
--
ALTER TABLE `translations`
  MODIFY `tra_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `wor_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `examples`
--
ALTER TABLE `examples`
  ADD CONSTRAINT `examples_ibfk_1` FOREIGN KEY (`ex_word_id`) REFERENCES `words` (`wor_id`);

--
-- Constraints for table `translations`
--
ALTER TABLE `translations`
  ADD CONSTRAINT `translations_ibfk_1` FOREIGN KEY (`tra_langid`) REFERENCES `languages` (`lan_id`),
  ADD CONSTRAINT `translations_ibfk_2` FOREIGN KEY (`tra_wordid`) REFERENCES `words` (`wor_id`);

--
-- Constraints for table `words`
--
ALTER TABLE `words`
  ADD CONSTRAINT `words_ibfk_1` FOREIGN KEY (`wor_langid`) REFERENCES `languages` (`lan_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
