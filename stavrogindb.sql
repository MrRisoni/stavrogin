-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2019 at 09:41 AM
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
  `lan_title` varchar(15) NOT NULL,
  `lan_foreign` tinyint(3) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  MODIFY `tra_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `wor_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
