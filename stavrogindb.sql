-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2019 at 07:15 AM
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
-- Table structure for table `aspects`
--

CREATE TABLE `aspects` (
  `asp_id` tinyint(3) UNSIGNED NOT NULL,
  `asp_title` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `aspects`
--

INSERT INTO `aspects` (`asp_id`, `asp_title`) VALUES
(2, 'Μη τετελεσμένη'),
(1, 'Τετελεσμένη');

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `cas_id` tinyint(3) UNSIGNED NOT NULL,
  `cas_langid` tinyint(3) UNSIGNED NOT NULL,
  `cas_title` varchar(15) NOT NULL,
  `cas_comments` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`cas_id`, `cas_langid`, `cas_title`, `cas_comments`) VALUES
(1, 4, 'Имени́тельный', 'Nominative Кто? Что?'),
(2, 4, 'Роди́тельный', 'Genitive Кого́? Чего́'),
(3, 4, 'Да́тельный', 'Dative Кому́? Чему́?'),
(4, 4, 'Вини́тельный', 'Accusative Кого́? Что?'),
(5, 4, 'Твори́тельный', 'Instrumental Кем? Чем? '),
(6, 4, 'Предло́жный', 'Prepositional О ком? О чём?');

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
(5, 'Deutsch'),
(2, 'English'),
(3, 'Francais'),
(1, 'Ελληνικά'),
(4, 'русский');

-- --------------------------------------------------------

--
-- Table structure for table `moods`
--

CREATE TABLE `moods` (
  `moo_id` tinyint(3) UNSIGNED NOT NULL,
  `moo_title` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `moods`
--

INSERT INTO `moods` (`moo_id`, `moo_title`) VALUES
(1, 'Οριστική'),
(2, 'Υποτακτική');

-- --------------------------------------------------------

--
-- Table structure for table `ndeclensions`
--

CREATE TABLE `ndeclensions` (
  `ndc_id` int(10) UNSIGNED NOT NULL,
  `ndc_noun_id` int(10) UNSIGNED NOT NULL,
  `ndc_case_id` tinyint(3) UNSIGNED NOT NULL,
  `ndc_number` varchar(2) NOT NULL DEFAULT '' COMMENT 'singular plular',
  `ndc_form` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ndeclensions`
--

INSERT INTO `ndeclensions` (`ndc_id`, `ndc_noun_id`, `ndc_case_id`, `ndc_number`, `ndc_form`) VALUES
(1, 1, 1, 'S', 'Я'),
(2, 1, 2, 'S', 'Меня'),
(5, 1, 6, 'S', 'Мне'),
(6, 1, 5, 'S', 'Мной');

-- --------------------------------------------------------

--
-- Table structure for table `pos`
--

CREATE TABLE `pos` (
  `pos_id` tinyint(3) UNSIGNED NOT NULL,
  `pos_title` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='part of speech';

--
-- Dumping data for table `pos`
--

INSERT INTO `pos` (`pos_id`, `pos_title`) VALUES
(2, 'Noun'),
(3, 'Preposition'),
(4, 'Pronoun'),
(1, 'Verb');

-- --------------------------------------------------------

--
-- Table structure for table `pronouns`
--

CREATE TABLE `pronouns` (
  `pri_id` smallint(10) UNSIGNED NOT NULL,
  `pri_langid` tinyint(3) UNSIGNED NOT NULL DEFAULT '4',
  `pri_type` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `pri_word` varchar(8) NOT NULL,
  `pri_comment` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pronouns`
--

INSERT INTO `pronouns` (`pri_id`, `pri_langid`, `pri_type`, `pri_word`, `pri_comment`) VALUES
(1, 4, 1, 'я', 'εγώ'),
(2, 4, 1, 'ты', 'εσύ'),
(3, 4, 1, 'он', 'αυτός'),
(4, 4, 1, 'онá', 'αυτή'),
(5, 4, 1, 'онó', 'αυτό'),
(6, 4, 1, 'мы', 'εμείς'),
(7, 4, 1, 'ты', 'εσείς'),
(8, 4, 1, 'Они', 'αυτοί');

-- --------------------------------------------------------

--
-- Table structure for table `pronoun_types`
--

CREATE TABLE `pronoun_types` (
  `prn_id` tinyint(3) UNSIGNED NOT NULL,
  `prn_title` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pronoun_types`
--

INSERT INTO `pronoun_types` (`prn_id`, `prn_title`) VALUES
(1, 'Personal'),
(2, 'Pocessive');

-- --------------------------------------------------------

--
-- Table structure for table `tenses`
--

CREATE TABLE `tenses` (
  `ten_id` tinyint(3) UNSIGNED NOT NULL,
  `ten_langid` tinyint(3) UNSIGNED NOT NULL,
  `ten_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tenses`
--

INSERT INTO `tenses` (`ten_id`, `ten_langid`, `ten_name`) VALUES
(1, 4, 'Present'),
(2, 4, 'Past'),
(3, 4, 'Future');

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
(2, 4, 1, 'υπερπέραν');

-- --------------------------------------------------------

--
-- Table structure for table `vdeclensions`
--

CREATE TABLE `vdeclensions` (
  `vdc_id` int(10) UNSIGNED NOT NULL,
  `vdc_verb_id` int(10) UNSIGNED NOT NULL,
  `vdc_tense_id` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `vdc_aspect_id` tinyint(3) UNSIGNED NOT NULL,
  `vdc_voice_id` tinyint(3) UNSIGNED NOT NULL DEFAULT '1',
  `vdc_person_id` smallint(5) UNSIGNED NOT NULL,
  `vdc_form` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `vdeclensions`
--

INSERT INTO `vdeclensions` (`vdc_id`, `vdc_verb_id`, `vdc_tense_id`, `vdc_aspect_id`, `vdc_voice_id`, `vdc_person_id`, `vdc_form`) VALUES
(1, 1, 1, 1, 1, 7, 'люблю́'),
(2, 2, 1, 1, 1, 2, 'лю́бишь'),
(3, 2, 1, 1, 1, 3, 'лю́бит'),
(4, 2, 1, 1, 1, 6, 'лю́бим'),
(5, 2, 1, 1, 1, 7, 'лю́бите'),
(6, 2, 1, 1, 1, 8, 'лю́бят');

-- --------------------------------------------------------

--
-- Table structure for table `voices`
--

CREATE TABLE `voices` (
  `voi_id` tinyint(3) UNSIGNED NOT NULL,
  `voi_title` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `voices`
--

INSERT INTO `voices` (`voi_id`, `voi_title`) VALUES
(1, 'Ενεργητική'),
(2, 'Παθητική');

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `wor_id` int(10) UNSIGNED NOT NULL,
  `wor_langid` tinyint(3) UNSIGNED NOT NULL,
  `wor_posid` tinyint(3) UNSIGNED NOT NULL,
  `wor_word` varchar(45) NOT NULL,
  `wor_pronounce` varchar(45) NOT NULL,
  `wor_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`wor_id`, `wor_langid`, `wor_posid`, `wor_word`, `wor_pronounce`, `wor_added`) VALUES
(1, 4, 4, 'Я', '', '2019-06-01'),
(2, 4, 1, 'любить', '', '2019-06-01'),
(3, 4, 2, 'пассажир', '', '2019-06-02'),
(4, 5, 2, 'Jenseits', '', '2019-06-02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aspects`
--
ALTER TABLE `aspects`
  ADD PRIMARY KEY (`asp_id`),
  ADD UNIQUE KEY `asp_title` (`asp_title`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`cas_id`),
  ADD KEY `cas_langid` (`cas_langid`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`lan_id`),
  ADD UNIQUE KEY `lan_title` (`lan_title`);

--
-- Indexes for table `moods`
--
ALTER TABLE `moods`
  ADD PRIMARY KEY (`moo_id`);

--
-- Indexes for table `ndeclensions`
--
ALTER TABLE `ndeclensions`
  ADD PRIMARY KEY (`ndc_id`),
  ADD KEY `ndc_noun_id` (`ndc_noun_id`),
  ADD KEY `ndc_case_id` (`ndc_case_id`);

--
-- Indexes for table `pos`
--
ALTER TABLE `pos`
  ADD PRIMARY KEY (`pos_id`),
  ADD UNIQUE KEY `pos_title` (`pos_title`);

--
-- Indexes for table `pronouns`
--
ALTER TABLE `pronouns`
  ADD PRIMARY KEY (`pri_id`),
  ADD KEY `pri_langid` (`pri_langid`),
  ADD KEY `pri_langid_2` (`pri_langid`),
  ADD KEY `pri_type` (`pri_type`);

--
-- Indexes for table `pronoun_types`
--
ALTER TABLE `pronoun_types`
  ADD PRIMARY KEY (`prn_id`);

--
-- Indexes for table `tenses`
--
ALTER TABLE `tenses`
  ADD PRIMARY KEY (`ten_id`),
  ADD KEY `ten_langid` (`ten_langid`);

--
-- Indexes for table `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`tra_id`),
  ADD KEY `tra_wordid` (`tra_wordid`),
  ADD KEY `tra_langid` (`tra_langid`);

--
-- Indexes for table `vdeclensions`
--
ALTER TABLE `vdeclensions`
  ADD PRIMARY KEY (`vdc_id`),
  ADD KEY `vdc_verb_id` (`vdc_verb_id`),
  ADD KEY `vdc_tense_id` (`vdc_tense_id`),
  ADD KEY `vdc_voice_id` (`vdc_voice_id`),
  ADD KEY `vdc_person_id` (`vdc_person_id`),
  ADD KEY `vdc_aspect_id` (`vdc_aspect_id`);

--
-- Indexes for table `voices`
--
ALTER TABLE `voices`
  ADD PRIMARY KEY (`voi_id`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`wor_id`),
  ADD KEY `wor_langid` (`wor_langid`),
  ADD KEY `wor_posid` (`wor_posid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aspects`
--
ALTER TABLE `aspects`
  MODIFY `asp_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `cas_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `lan_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `moods`
--
ALTER TABLE `moods`
  MODIFY `moo_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ndeclensions`
--
ALTER TABLE `ndeclensions`
  MODIFY `ndc_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pos`
--
ALTER TABLE `pos`
  MODIFY `pos_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pronouns`
--
ALTER TABLE `pronouns`
  MODIFY `pri_id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pronoun_types`
--
ALTER TABLE `pronoun_types`
  MODIFY `prn_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tenses`
--
ALTER TABLE `tenses`
  MODIFY `ten_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `translations`
--
ALTER TABLE `translations`
  MODIFY `tra_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vdeclensions`
--
ALTER TABLE `vdeclensions`
  MODIFY `vdc_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `voices`
--
ALTER TABLE `voices`
  MODIFY `voi_id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `wor_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`cas_langid`) REFERENCES `languages` (`lan_id`);

--
-- Constraints for table `ndeclensions`
--
ALTER TABLE `ndeclensions`
  ADD CONSTRAINT `ndeclensions_ibfk_1` FOREIGN KEY (`ndc_case_id`) REFERENCES `cases` (`cas_id`),
  ADD CONSTRAINT `ndeclensions_ibfk_2` FOREIGN KEY (`ndc_noun_id`) REFERENCES `words` (`wor_id`);

--
-- Constraints for table `pronouns`
--
ALTER TABLE `pronouns`
  ADD CONSTRAINT `pronouns_ibfk_1` FOREIGN KEY (`pri_langid`) REFERENCES `languages` (`lan_id`),
  ADD CONSTRAINT `pronouns_ibfk_2` FOREIGN KEY (`pri_type`) REFERENCES `pronoun_types` (`prn_id`);

--
-- Constraints for table `tenses`
--
ALTER TABLE `tenses`
  ADD CONSTRAINT `tenses_ibfk_1` FOREIGN KEY (`ten_langid`) REFERENCES `languages` (`lan_id`);

--
-- Constraints for table `translations`
--
ALTER TABLE `translations`
  ADD CONSTRAINT `translations_ibfk_1` FOREIGN KEY (`tra_langid`) REFERENCES `languages` (`lan_id`),
  ADD CONSTRAINT `translations_ibfk_2` FOREIGN KEY (`tra_wordid`) REFERENCES `words` (`wor_id`);

--
-- Constraints for table `vdeclensions`
--
ALTER TABLE `vdeclensions`
  ADD CONSTRAINT `vdeclensions_ibfk_1` FOREIGN KEY (`vdc_person_id`) REFERENCES `pronouns` (`pri_id`),
  ADD CONSTRAINT `vdeclensions_ibfk_2` FOREIGN KEY (`vdc_tense_id`) REFERENCES `tenses` (`ten_id`),
  ADD CONSTRAINT `vdeclensions_ibfk_3` FOREIGN KEY (`vdc_verb_id`) REFERENCES `words` (`wor_id`),
  ADD CONSTRAINT `vdeclensions_ibfk_4` FOREIGN KEY (`vdc_voice_id`) REFERENCES `voices` (`voi_id`),
  ADD CONSTRAINT `vdeclensions_ibfk_5` FOREIGN KEY (`vdc_aspect_id`) REFERENCES `aspects` (`asp_id`);

--
-- Constraints for table `words`
--
ALTER TABLE `words`
  ADD CONSTRAINT `words_ibfk_1` FOREIGN KEY (`wor_langid`) REFERENCES `languages` (`lan_id`),
  ADD CONSTRAINT `words_ibfk_2` FOREIGN KEY (`wor_posid`) REFERENCES `pos` (`pos_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
