CREATE DATABASE  IF NOT EXISTS `domo_dsr_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `domo_dsr_db`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: domo_dsr_db
-- ------------------------------------------------------
-- Server version	5.5.34
CREATE DATABASE  IF NOT EXISTS `domo_dsr_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `domo_dsr_db`;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `domo_dsr_token`
--

DROP TABLE IF EXISTS `domo_dsr_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domo_dsr_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(300) DEFAULT NULL,
  `expiryTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='to store tokens';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domo_dsr_token`
--

LOCK TABLES `domo_dsr_token` WRITE;
/*!40000 ALTER TABLE `domo_dsr_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `domo_dsr_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domo_dsr_userlog`
--

DROP TABLE IF EXISTS `domo_dsr_userlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domo_dsr_userlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empId` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `date` date NOT NULL,
  `loginTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `expiryTime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `token` varchar(300) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userlog_role_idx` (`role`),
  CONSTRAINT `fk_userlog_role` FOREIGN KEY (`role`) REFERENCES `domo_dsr_userroles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='To maintain user history.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domo_dsr_userlog`
--

LOCK TABLES `domo_dsr_userlog` WRITE;
/*!40000 ALTER TABLE `domo_dsr_userlog` DISABLE KEYS */;
/*!40000 ALTER TABLE `domo_dsr_userlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domo_dsr_userroles`
--

DROP TABLE IF EXISTS `domo_dsr_userroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domo_dsr_userroles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userName_UNIQUE` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='To store user role information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domo_dsr_userroles`
--

LOCK TABLES `domo_dsr_userroles` WRITE;
/*!40000 ALTER TABLE `domo_dsr_userroles` DISABLE KEYS */;
INSERT INTO `domo_dsr_userroles` VALUES (2,'admin'),(1,'user');
/*!40000 ALTER TABLE `domo_dsr_userroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domo_dsr_users`
--

DROP TABLE IF EXISTS `domo_dsr_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `domo_dsr_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empId` int(11) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `emailId` varchar(50) NOT NULL,
  `role` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `empId_UNIQUE` (`empId`),
  UNIQUE KEY `emailId_UNIQUE` (`emailId`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_users_role_idx` (`role`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role`) REFERENCES `domo_dsr_userroles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='To store user information.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domo_dsr_users`
--

LOCK TABLES `domo_dsr_users` WRITE;
/*!40000 ALTER TABLE `domo_dsr_users` DISABLE KEYS */;
INSERT INTO `domo_dsr_users` VALUES (1,16766,'amalroyt','#!Yorlama10','amalroyt@cybage.com',1,1),(2,16793,'sanjivanig','changePass@28','sanjivanig@cybage.com',1,1),(3,16438,'rutujas','chocoCake@2504','rutujas@cybage.com',2,1),(4,16773,'dhaneshc','amarJyothi@143','dhaneshc@cybage.com',1,1);
/*!40000 ALTER TABLE `domo_dsr_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'domo_dsr_db'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
DROP EVENT IF EXISTS `tokenTableCLeanup`;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = cp850 */ ;;
/*!50003 SET character_set_results = cp850 */ ;;
/*!50003 SET collation_connection  = cp850_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
CREATE EVENT `tokenTableCLeanup` ON SCHEDULE EVERY '30:0' MINUTE_SECOND STARTS '2017-01-10 15:38:22' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Clears out token table every 30 minutes.' DO DELETE FROM domo_dsr_db.domo_dsr_token WHERE UNIX_TIMESTAMP(CURRENT_TIMESTAMP()) >  UNIX_TIMESTAMP(expiryTime);
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-10 19:39:01
