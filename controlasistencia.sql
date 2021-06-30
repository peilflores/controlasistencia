-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: controlasistencia
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asistencia_asistencia`
--

DROP TABLE IF EXISTS `asistencia_asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistencia_asistencia` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_asistencia` date NOT NULL,
  `estado` varchar(1) NOT NULL,
  `personal_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `asistencia_asistencia_personal_id_d2aa69a9_fk_rrhh_personal_id` (`personal_id`),
  CONSTRAINT `asistencia_asistencia_personal_id_d2aa69a9_fk_rrhh_personal_id` FOREIGN KEY (`personal_id`) REFERENCES `rrhh_personal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencia_asistencia`
--

LOCK TABLES `asistencia_asistencia` WRITE;
/*!40000 ALTER TABLE `asistencia_asistencia` DISABLE KEYS */;
INSERT INTO `asistencia_asistencia` VALUES (1,'2021-06-27','2',1),(2,'2021-06-27','2',1),(4,'2021-06-27','1',1);
/*!40000 ALTER TABLE `asistencia_asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencia_detalleasistencia`
--

DROP TABLE IF EXISTS `asistencia_detalleasistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistencia_detalleasistencia` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `hora` time(6) NOT NULL,
  `tipo_marcacion` varchar(1) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `asistencia_id` bigint(20) NOT NULL,
  `detallerolpersonal_id` bigint(20) DEFAULT NULL,
  `turno_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `asistencia_detalleas_asistencia_id_5c703807_fk_asistenci` (`asistencia_id`),
  KEY `asistencia_detalleas_detallerolpersonal_i_2520baf9_fk_rrhh_deta` (`detallerolpersonal_id`),
  KEY `asistencia_detalleas_turno_id_51f5a5a5_fk_maestro_t` (`turno_id`),
  CONSTRAINT `asistencia_detalleas_asistencia_id_5c703807_fk_asistenci` FOREIGN KEY (`asistencia_id`) REFERENCES `asistencia_asistencia` (`id`),
  CONSTRAINT `asistencia_detalleas_detallerolpersonal_i_2520baf9_fk_rrhh_deta` FOREIGN KEY (`detallerolpersonal_id`) REFERENCES `rrhh_detallerolpersonal` (`id`),
  CONSTRAINT `asistencia_detalleas_turno_id_51f5a5a5_fk_maestro_t` FOREIGN KEY (`turno_id`) REFERENCES `maestro_turno` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencia_detalleasistencia`
--

LOCK TABLES `asistencia_detalleasistencia` WRITE;
/*!40000 ALTER TABLE `asistencia_detalleasistencia` DISABLE KEYS */;
INSERT INTO `asistencia_detalleasistencia` VALUES (1,'18:05:34.000000','1','photography_attached/temp_rw0SmT7.jpeg',1,62,2),(2,'18:10:08.000000','2','photography_attached/temp_Nu2gncS.jpeg',1,62,2),(3,'18:11:45.000000','1','photography_attached/temp_0iE66Au.jpeg',2,62,2),(4,'18:12:19.000000','2','photography_attached/temp_eMGx0As.jpeg',2,62,2),(6,'23:43:22.000000','1','photography_attached/temp_xBmOH13.jpeg',4,62,2);
/*!40000 ALTER TABLE `asistencia_detalleasistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (4,'Acceso'),(1,'Asistencia'),(3,'Maestro'),(2,'rrhh');
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add areas',7,'add_areas'),(26,'Can change areas',7,'change_areas'),(27,'Can delete areas',7,'delete_areas'),(28,'Can view areas',7,'view_areas'),(29,'Can add cargo',8,'add_cargo'),(30,'Can change cargo',8,'change_cargo'),(31,'Can delete cargo',8,'delete_cargo'),(32,'Can view cargo',8,'view_cargo'),(33,'Can add empresa',9,'add_empresa'),(34,'Can change empresa',9,'change_empresa'),(35,'Can delete empresa',9,'delete_empresa'),(36,'Can view empresa',9,'view_empresa'),(37,'Can add tipo documento',10,'add_tipodocumento'),(38,'Can change tipo documento',10,'change_tipodocumento'),(39,'Can delete tipo documento',10,'delete_tipodocumento'),(40,'Can view tipo documento',10,'view_tipodocumento'),(41,'Can add turno',11,'add_turno'),(42,'Can change turno',11,'change_turno'),(43,'Can delete turno',11,'delete_turno'),(44,'Can view turno',11,'view_turno'),(45,'Can add detalle rol',12,'add_detallerol'),(46,'Can change detalle rol',12,'change_detallerol'),(47,'Can delete detalle rol',12,'delete_detallerol'),(48,'Can view detalle rol',12,'view_detallerol'),(49,'Can add estado civil',13,'add_estadocivil'),(50,'Can change estado civil',13,'change_estadocivil'),(51,'Can delete estado civil',13,'delete_estadocivil'),(52,'Can view estado civil',13,'view_estadocivil'),(53,'Can add personal',14,'add_personal'),(54,'Can change personal',14,'change_personal'),(55,'Can delete personal',14,'delete_personal'),(56,'Can view personal',14,'view_personal'),(57,'Can add tipo permiso',15,'add_tipopermiso'),(58,'Can change tipo permiso',15,'change_tipopermiso'),(59,'Can delete tipo permiso',15,'delete_tipopermiso'),(60,'Can view tipo permiso',15,'view_tipopermiso'),(61,'Can add tipo sistema pesiones',16,'add_tiposistemapesiones'),(62,'Can change tipo sistema pesiones',16,'change_tiposistemapesiones'),(63,'Can delete tipo sistema pesiones',16,'delete_tiposistemapesiones'),(64,'Can view tipo sistema pesiones',16,'view_tiposistemapesiones'),(65,'Can add rol personal',17,'add_rolpersonal'),(66,'Can change rol personal',17,'change_rolpersonal'),(67,'Can delete rol personal',17,'delete_rolpersonal'),(68,'Can view rol personal',17,'view_rolpersonal'),(69,'Can add remuneracion',18,'add_remuneracion'),(70,'Can change remuneracion',18,'change_remuneracion'),(71,'Can delete remuneracion',18,'delete_remuneracion'),(72,'Can view remuneracion',18,'view_remuneracion'),(73,'Can add permiso',19,'add_permiso'),(74,'Can change permiso',19,'change_permiso'),(75,'Can delete permiso',19,'delete_permiso'),(76,'Can view permiso',19,'view_permiso'),(77,'Can add detalle rol personal',20,'add_detallerolpersonal'),(78,'Can change detalle rol personal',20,'change_detallerolpersonal'),(79,'Can delete detalle rol personal',20,'delete_detallerolpersonal'),(80,'Can view detalle rol personal',20,'view_detallerolpersonal'),(81,'Can add detalle remuneracion',21,'add_detalleremuneracion'),(82,'Can change detalle remuneracion',21,'change_detalleremuneracion'),(83,'Can delete detalle remuneracion',21,'delete_detalleremuneracion'),(84,'Can view detalle remuneracion',21,'view_detalleremuneracion'),(85,'Can add detalle permiso',22,'add_detallepermiso'),(86,'Can change detalle permiso',22,'change_detallepermiso'),(87,'Can delete detalle permiso',22,'delete_detallepermiso'),(88,'Can view detalle permiso',22,'view_detallepermiso'),(89,'Can add descuentox permiso',23,'add_descuentoxpermiso'),(90,'Can change descuentox permiso',23,'change_descuentoxpermiso'),(91,'Can delete descuentox permiso',23,'delete_descuentoxpermiso'),(92,'Can view descuentox permiso',23,'view_descuentoxpermiso'),(93,'Can add estado civil',24,'add_estadocivil'),(94,'Can change estado civil',24,'change_estadocivil'),(95,'Can delete estado civil',24,'delete_estadocivil'),(96,'Can view estado civil',24,'view_estadocivil'),(97,'Can add detalle asistencia',25,'add_detalleasistencia'),(98,'Can change detalle asistencia',25,'change_detalleasistencia'),(99,'Can delete detalle asistencia',25,'delete_detalleasistencia'),(100,'Can view detalle asistencia',25,'view_detalleasistencia'),(101,'Can add asistencia',26,'add_asistencia'),(102,'Can change asistencia',26,'change_asistencia'),(103,'Can delete asistencia',26,'delete_asistencia'),(104,'Can view asistencia',26,'view_asistencia'),(105,'Can add grupo permiso',27,'add_grupopermiso'),(106,'Can change grupo permiso',27,'change_grupopermiso'),(107,'Can delete grupo permiso',27,'delete_grupopermiso'),(108,'Can view grupo permiso',27,'view_grupopermiso'),(109,'Can add grupo user',28,'add_grupouser'),(110,'Can change grupo user',28,'change_grupouser'),(111,'Can delete grupo user',28,'delete_grupouser'),(112,'Can view grupo user',28,'view_grupouser'),(113,'Can add usuario permiso',29,'add_usuariopermiso'),(114,'Can change usuario permiso',29,'change_usuariopermiso'),(115,'Can delete usuario permiso',29,'delete_usuariopermiso'),(116,'Can view usuario permiso',29,'view_usuariopermiso');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$260000$JpSpJ0ib87EJxYEM8itYTD$30EoTxglyNrV4MoHX3a0Q/UFavPXUecE4rMfhIIk3AE=','2021-06-30 05:11:21.215554',1,'giomar','','','',0,1,'2021-06-28 06:54:18.365125'),(10,'pbkdf2_sha256$260000$1eaqjYW2xMA2mfVovL9gVG$JVCzCW4/NJ/kvwRGvK7zWvWNQ5NaB6g0bphAp/Ce+Xw=','2021-06-29 22:40:58.676692',0,'a','','','',0,1,'2021-06-29 20:31:32.902340'),(17,'pbkdf2_sha256$260000$1lMnOuy5qemRYnveqV85Xo$W8Et5R0bQGaMEXWUXo/19xrbabE8knlp1e+fR4Lo08w=','2021-06-30 04:47:58.903600',0,'sara','','','',0,1,'2021-06-30 04:31:52.703256');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
INSERT INTO `auth_user_groups` VALUES (9,1,1),(11,1,2),(10,1,3),(8,1,4),(12,17,1),(13,17,2);
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=158 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
INSERT INTO `auth_user_user_permissions` VALUES (63,1,25),(64,1,26),(65,1,27),(66,1,28),(67,1,29),(68,1,30),(69,1,31),(70,1,32),(71,1,33),(72,1,34),(73,1,35),(74,1,36),(79,1,37),(80,1,38),(81,1,39),(82,1,40),(83,1,41),(84,1,42),(85,1,43),(86,1,44),(99,1,45),(100,1,46),(101,1,47),(102,1,48),(107,1,49),(108,1,50),(109,1,51),(110,1,52),(115,1,53),(116,1,54),(117,1,55),(118,1,56),(127,1,57),(128,1,58),(129,1,59),(130,1,60),(131,1,61),(132,1,62),(133,1,63),(134,1,64),(123,1,65),(124,1,66),(125,1,67),(126,1,68),(119,1,69),(120,1,70),(121,1,71),(122,1,72),(111,1,73),(112,1,74),(113,1,75),(114,1,76),(103,1,77),(104,1,78),(105,1,79),(106,1,80),(95,1,81),(96,1,82),(97,1,83),(98,1,84),(91,1,85),(92,1,86),(93,1,87),(94,1,88),(87,1,89),(88,1,90),(89,1,91),(90,1,92),(75,1,93),(76,1,94),(77,1,95),(78,1,96),(59,1,97),(60,1,98),(61,1,99),(62,1,100),(55,1,101),(56,1,102),(57,1,103),(58,1,104),(153,17,57),(154,17,61),(155,17,62),(156,17,63),(157,17,64),(151,17,81),(152,17,82),(147,17,85),(148,17,86),(149,17,87),(150,17,88),(143,17,89),(144,17,90),(145,17,91),(146,17,92),(139,17,97),(140,17,98),(141,17,99),(142,17,100),(135,17,101),(136,17,102),(137,17,103),(138,17,104);
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (27,'acceso','grupopermiso'),(28,'acceso','grupouser'),(29,'acceso','usuariopermiso'),(1,'admin','logentry'),(26,'asistencia','asistencia'),(25,'asistencia','detalleasistencia'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'maestro','areas'),(8,'maestro','cargo'),(9,'maestro','empresa'),(24,'maestro','estadocivil'),(10,'maestro','tipodocumento'),(11,'maestro','turno'),(23,'rrhh','descuentoxpermiso'),(22,'rrhh','detallepermiso'),(21,'rrhh','detalleremuneracion'),(12,'rrhh','detallerol'),(20,'rrhh','detallerolpersonal'),(13,'rrhh','estadocivil'),(19,'rrhh','permiso'),(14,'rrhh','personal'),(18,'rrhh','remuneracion'),(17,'rrhh','rolpersonal'),(15,'rrhh','tipopermiso'),(16,'rrhh','tiposistemapesiones'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2021-06-17 03:09:20.021560'),(2,'auth','0001_initial','2021-06-17 03:09:29.294875'),(3,'admin','0001_initial','2021-06-17 03:09:31.518500'),(4,'admin','0002_logentry_remove_auto_add','2021-06-17 03:09:31.584386'),(5,'admin','0003_logentry_add_action_flag_choices','2021-06-17 03:09:31.638689'),(6,'contenttypes','0002_remove_content_type_name','2021-06-17 03:09:32.692606'),(7,'auth','0002_alter_permission_name_max_length','2021-06-17 03:09:33.519305'),(8,'auth','0003_alter_user_email_max_length','2021-06-17 03:09:34.325113'),(9,'auth','0004_alter_user_username_opts','2021-06-17 03:09:34.384764'),(10,'auth','0005_alter_user_last_login_null','2021-06-17 03:09:34.928300'),(11,'auth','0006_require_contenttypes_0002','2021-06-17 03:09:34.983726'),(12,'auth','0007_alter_validators_add_error_messages','2021-06-17 03:09:35.043095'),(13,'auth','0008_alter_user_username_max_length','2021-06-17 03:09:35.899648'),(14,'auth','0009_alter_user_last_name_max_length','2021-06-17 03:09:36.716464'),(15,'auth','0010_alter_group_name_max_length','2021-06-17 03:09:37.531708'),(16,'auth','0011_update_proxy_permissions','2021-06-17 03:09:37.586257'),(17,'auth','0012_alter_user_first_name_max_length','2021-06-17 03:09:38.391727'),(18,'maestro','0001_initial','2021-06-17 03:09:40.148792'),(19,'rrhh','0001_initial','2021-06-17 03:10:26.814170'),(20,'sessions','0001_initial','2021-06-17 03:10:28.318418'),(21,'maestro','0002_alter_tipodocumento_descripcion','2021-06-17 04:14:20.452527'),(22,'maestro','0003_cargo_estado','2021-06-17 04:47:18.271021'),(23,'maestro','0004_estadocivil','2021-06-17 05:15:26.299006'),(24,'rrhh','0002_auto_20210617_0515','2021-06-17 05:15:27.581127'),(25,'rrhh','0003_auto_20210617_0717','2021-06-17 07:17:12.241850'),(26,'rrhh','0004_alter_detallerol_rol','2021-06-21 02:56:00.106642'),(27,'rrhh','0005_alter_detallerolpersonal_options','2021-06-21 04:51:49.469303'),(28,'rrhh','0006_auto_20210621_1332','2021-06-21 13:32:28.843255'),(29,'rrhh','0007_alter_detallerol_personal','2021-06-21 15:27:41.224182'),(30,'rrhh','0008_alter_detallerol_rol','2021-06-21 15:55:18.003022'),(32,'maestro','0005_turno_abreviado','2021-06-23 06:47:30.533778'),(35,'rrhh','0009_permiso_total_permiso','2021-06-27 00:06:08.242776'),(36,'rrhh','0010_permiso_rol','2021-06-27 00:33:05.708472'),(37,'rrhh','0011_auto_20210626_2127','2021-06-27 02:27:27.113502'),(38,'rrhh','0012_auto_20210626_2211','2021-06-27 03:11:22.429351'),(39,'rrhh','0013_auto_20210626_2239','2021-06-27 03:39:16.902783'),(40,'rrhh','0014_alter_detallepermiso_fecha_permiso','2021-06-27 05:02:17.590340'),(45,'asistencia','0001_initial','2021-06-27 23:00:16.441169'),(46,'rrhh','0015_alter_permiso_mes','2021-06-28 04:32:26.861170'),(47,'acceso','0001_initial','2021-06-28 07:03:23.975843');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('6rwixtp6jypleu3g3feofzs7varbylpo','.eJxVjEEOwiAQRe_C2hAQGdCle89AZjpTqRpISrsy3t2SdKHb_977b5VwXXJam8xpYnVRVh1-N8LhKaUDfmC5Vz3UsswT6a7onTZ9qyyv6-7-HWRsudebytahAQ4CEC16MATxRIai94gizp0jEQOPBiV4h0dLo8cttCGqzxcDKDjZ:1lySVN:H8XaG24OwT9UUwx-jAEr80bLbj67kx1Vo6FhlwaV9ks','2021-07-14 05:11:21.383465'),('yl6c80orkvi5gbfnjhoccymc8s4njzks','e30:1lxlym:R9-_iZjBc6pFhrGzH9qlOgoZZqYSNRYCCznYe2EQOIc','2021-07-12 07:46:52.764077');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maestro_areas`
--

DROP TABLE IF EXISTS `maestro_areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maestro_areas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  `estado` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maestro_areas`
--

LOCK TABLES `maestro_areas` WRITE;
/*!40000 ALTER TABLE `maestro_areas` DISABLE KEYS */;
INSERT INTO `maestro_areas` VALUES (1,'CONTABILIDAD','1'),(2,'ALMACEN','1'),(3,'LOGISTICA','1'),(4,'RECURSO HUMANO','1');
/*!40000 ALTER TABLE `maestro_areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maestro_cargo`
--

DROP TABLE IF EXISTS `maestro_cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maestro_cargo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  `estado` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maestro_cargo`
--

LOCK TABLES `maestro_cargo` WRITE;
/*!40000 ALTER TABLE `maestro_cargo` DISABLE KEYS */;
INSERT INTO `maestro_cargo` VALUES (1,'ADMINISTRADOR','1'),(2,'INGENIERO','1'),(3,'CONTADOR','1');
/*!40000 ALTER TABLE `maestro_cargo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maestro_empresa`
--

DROP TABLE IF EXISTS `maestro_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maestro_empresa` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(150) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maestro_empresa`
--

LOCK TABLES `maestro_empresa` WRITE;
/*!40000 ALTER TABLE `maestro_empresa` DISABLE KEYS */;
/*!40000 ALTER TABLE `maestro_empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maestro_estadocivil`
--

DROP TABLE IF EXISTS `maestro_estadocivil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maestro_estadocivil` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(30) NOT NULL,
  `abreviado` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maestro_estadocivil`
--

LOCK TABLES `maestro_estadocivil` WRITE;
/*!40000 ALTER TABLE `maestro_estadocivil` DISABLE KEYS */;
INSERT INTO `maestro_estadocivil` VALUES (1,'SOLTERO','SOLT.');
/*!40000 ALTER TABLE `maestro_estadocivil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maestro_tipodocumento`
--

DROP TABLE IF EXISTS `maestro_tipodocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maestro_tipodocumento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `abreviado` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maestro_tipodocumento`
--

LOCK TABLES `maestro_tipodocumento` WRITE;
/*!40000 ALTER TABLE `maestro_tipodocumento` DISABLE KEYS */;
INSERT INTO `maestro_tipodocumento` VALUES (1,'DOCUMENTO NACIONAL DE IDENTIDAD','D.N.I'),(2,'CARNET DE EXTRRANJERIA','C.E');
/*!40000 ALTER TABLE `maestro_tipodocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maestro_turno`
--

DROP TABLE IF EXISTS `maestro_turno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maestro_turno` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(20) NOT NULL,
  `hora_inicio` time(6) NOT NULL,
  `hora_fin` time(6) NOT NULL,
  `abreviado` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maestro_turno`
--

LOCK TABLES `maestro_turno` WRITE;
/*!40000 ALTER TABLE `maestro_turno` DISABLE KEYS */;
INSERT INTO `maestro_turno` VALUES (1,'MAÑANA','08:00:00.000000','14:00:00.000000','AM'),(2,'TARDE','14:00:00.000000','19:00:00.000000','PM');
/*!40000 ALTER TABLE `maestro_turno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_descuentoxpermiso`
--

DROP TABLE IF EXISTS `rrhh_descuentoxpermiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_descuentoxpermiso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descuento` decimal(9,2) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `tipo_permiso_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rrhh_descuentoxpermi_tipo_permiso_id_05e3c245_fk_rrhh_tipo` (`tipo_permiso_id`),
  CONSTRAINT `rrhh_descuentoxpermi_tipo_permiso_id_05e3c245_fk_rrhh_tipo` FOREIGN KEY (`tipo_permiso_id`) REFERENCES `rrhh_tipopermiso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_descuentoxpermiso`
--

LOCK TABLES `rrhh_descuentoxpermiso` WRITE;
/*!40000 ALTER TABLE `rrhh_descuentoxpermiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `rrhh_descuentoxpermiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_detallepermiso`
--

DROP TABLE IF EXISTS `rrhh_detallepermiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_detallepermiso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` longtext,
  `fecha_permiso` date NOT NULL,
  `fechahora_registro` datetime(6) NOT NULL,
  `permiso_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rrhh_detallepermiso_permiso_id_0beddea8_fk_rrhh_permiso_id` (`permiso_id`),
  CONSTRAINT `rrhh_detallepermiso_permiso_id_0beddea8_fk_rrhh_permiso_id` FOREIGN KEY (`permiso_id`) REFERENCES `rrhh_permiso` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_detallepermiso`
--

LOCK TABLES `rrhh_detallepermiso` WRITE;
/*!40000 ALTER TABLE `rrhh_detallepermiso` DISABLE KEYS */;
INSERT INTO `rrhh_detallepermiso` VALUES (1,'dsd','2021-06-02','2021-06-27 04:15:50.091101',1),(2,'prueba2','2021-06-08','2021-06-27 04:19:04.214743',1),(3,'sdss','2021-06-10','2021-06-27 04:19:56.734158',1),(4,'ds','2021-06-08','2021-06-27 04:20:23.616754',1),(5,'permiso por favor','2021-06-08','2021-06-27 04:32:31.053197',1),(6,'ddsd','2021-06-08','2021-06-27 04:33:15.281145',1),(7,'dd','2021-06-10','2021-06-27 04:33:38.795236',1),(8,'dd','2021-06-09','2021-06-27 04:34:02.987477',1),(9,'dddf','2021-06-10','2021-06-27 04:38:24.974048',1),(10,'SSSD','2021-06-27','2021-06-27 18:08:50.476829',1),(11,'kmkmk','2021-06-29','2021-06-30 04:42:58.568302',2);
/*!40000 ALTER TABLE `rrhh_detallepermiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_detalleremuneracion`
--

DROP TABLE IF EXISTS `rrhh_detalleremuneracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_detalleremuneracion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tipo_sistema_pension_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rrhh_detalleremunera_tipo_sistema_pension_a7a0cd0f_fk_rrhh_tipo` (`tipo_sistema_pension_id`),
  CONSTRAINT `rrhh_detalleremunera_tipo_sistema_pension_a7a0cd0f_fk_rrhh_tipo` FOREIGN KEY (`tipo_sistema_pension_id`) REFERENCES `rrhh_tiposistemapesiones` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_detalleremuneracion`
--

LOCK TABLES `rrhh_detalleremuneracion` WRITE;
/*!40000 ALTER TABLE `rrhh_detalleremuneracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `rrhh_detalleremuneracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_detallerol`
--

DROP TABLE IF EXISTS `rrhh_detallerol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_detallerol` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `estado` varchar(2) NOT NULL,
  `observaciones` longtext,
  `personal_id` bigint(20) DEFAULT NULL,
  `rol_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rrhh_detallerol_rol_id_49479879_fk_rrhh_rolpersonal_id` (`rol_id`),
  KEY `rrhh_detallerol_personal_id_5776804e_fk_rrhh_personal_id` (`personal_id`),
  CONSTRAINT `rrhh_detallerol_personal_id_5776804e_fk_rrhh_personal_id` FOREIGN KEY (`personal_id`) REFERENCES `rrhh_personal` (`id`),
  CONSTRAINT `rrhh_detallerol_rol_id_49479879_fk_rrhh_rolpersonal_id` FOREIGN KEY (`rol_id`) REFERENCES `rrhh_rolpersonal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_detallerol`
--

LOCK TABLES `rrhh_detallerol` WRITE;
/*!40000 ALTER TABLE `rrhh_detallerol` DISABLE KEYS */;
INSERT INTO `rrhh_detallerol` VALUES (17,'1',NULL,1,1),(18,'1',NULL,2,1),(19,'1',NULL,3,2);
/*!40000 ALTER TABLE `rrhh_detallerol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_detallerolpersonal`
--

DROP TABLE IF EXISTS `rrhh_detallerolpersonal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_detallerolpersonal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `hora_inicio` time(6) NOT NULL,
  `hora_fin` time(6) NOT NULL,
  `check` tinyint(1) NOT NULL,
  `detallerol_id` bigint(20) NOT NULL,
  `personal_id` bigint(20) DEFAULT NULL,
  `turno_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rrhh_detallerolperso_detallerol_id_baddd24d_fk_rrhh_deta` (`detallerol_id`),
  KEY `rrhh_detallerolpersonal_personal_id_eee4546d_fk_rrhh_personal_id` (`personal_id`),
  KEY `rrhh_detallerolpersonal_turno_id_8012e22e_fk_maestro_turno_id` (`turno_id`),
  CONSTRAINT `rrhh_detallerolperso_detallerol_id_baddd24d_fk_rrhh_deta` FOREIGN KEY (`detallerol_id`) REFERENCES `rrhh_detallerol` (`id`),
  CONSTRAINT `rrhh_detallerolpersonal_personal_id_eee4546d_fk_rrhh_personal_id` FOREIGN KEY (`personal_id`) REFERENCES `rrhh_personal` (`id`),
  CONSTRAINT `rrhh_detallerolpersonal_turno_id_8012e22e_fk_maestro_turno_id` FOREIGN KEY (`turno_id`) REFERENCES `maestro_turno` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_detallerolpersonal`
--

LOCK TABLES `rrhh_detallerolpersonal` WRITE;
/*!40000 ALTER TABLE `rrhh_detallerolpersonal` DISABLE KEYS */;
INSERT INTO `rrhh_detallerolpersonal` VALUES (54,'2021-06-01','2021-06-01','08:00:00.000000','13:00:00.000000',0,17,1,1),(55,'2021-06-02','2021-06-02','08:00:00.000000','13:00:00.000000',0,17,1,1),(56,'2021-06-03','2021-06-03','08:00:00.000000','13:00:00.000000',0,17,1,1),(57,'2021-06-04','2021-06-04','08:00:00.000000','13:00:00.000000',0,17,1,1),(58,'2021-06-05','2021-06-05','08:00:00.000000','13:00:00.000000',0,17,1,1),(59,'2021-06-06','2021-06-06','08:00:00.000000','13:00:00.000000',0,17,1,1),(60,'2021-06-07','2021-06-07','08:00:00.000000','13:00:00.000000',0,17,1,1),(61,'2021-06-08','2021-06-08','08:00:00.000000','13:00:00.000000',0,17,1,1),(62,'2021-06-27','2021-06-10','23:59:00.000000','18:08:00.000000',1,17,1,2),(63,'2021-06-23','2021-06-11','10:35:00.000000','13:00:00.000000',0,17,1,1),(64,'2021-06-09','2021-06-09','08:00:00.000000','14:00:00.000000',0,17,1,1),(65,'2021-06-10','2021-06-10','08:00:00.000000','14:00:00.000000',0,17,1,1),(66,'2021-06-01','2021-06-01','08:00:00.000000','14:00:00.000000',0,18,2,1),(67,'2021-06-02','2021-06-02','08:00:00.000000','14:00:00.000000',0,18,2,1),(68,'2021-06-03','2021-06-03','08:00:00.000000','14:00:00.000000',0,18,2,1),(69,'2021-06-04','2021-06-04','08:00:00.000000','14:00:00.000000',0,18,2,1),(70,'2021-06-29','2021-06-29','08:00:00.000000','14:00:00.000000',0,19,3,1),(71,'2021-06-30','2021-06-30','08:00:00.000000','14:00:00.000000',0,19,3,1),(72,'2021-06-28','2021-06-28','14:00:00.000000','19:00:00.000000',0,19,3,2),(73,'2021-06-27','2021-06-27','14:00:00.000000','19:00:00.000000',0,19,3,2);
/*!40000 ALTER TABLE `rrhh_detallerolpersonal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_permiso`
--

DROP TABLE IF EXISTS `rrhh_permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_permiso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `estado` varchar(1) NOT NULL,
  `mes` varchar(2) NOT NULL,
  `anio` int(11) NOT NULL,
  `personal_id` bigint(20) NOT NULL,
  `total_permiso` int(11) NOT NULL,
  `rol_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rrhh_permiso_personal_id_729def60_fk_rrhh_personal_id` (`personal_id`),
  KEY `rrhh_permiso_rol_id_bfa28015_fk_rrhh_rolpersonal_id` (`rol_id`),
  CONSTRAINT `rrhh_permiso_personal_id_729def60_fk_rrhh_personal_id` FOREIGN KEY (`personal_id`) REFERENCES `rrhh_personal` (`id`),
  CONSTRAINT `rrhh_permiso_rol_id_bfa28015_fk_rrhh_rolpersonal_id` FOREIGN KEY (`rol_id`) REFERENCES `rrhh_rolpersonal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_permiso`
--

LOCK TABLES `rrhh_permiso` WRITE;
/*!40000 ALTER TABLE `rrhh_permiso` DISABLE KEYS */;
INSERT INTO `rrhh_permiso` VALUES (1,'1','06',2021,1,8,1),(2,'1','06',2021,3,1,2);
/*!40000 ALTER TABLE `rrhh_permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_personal`
--

DROP TABLE IF EXISTS `rrhh_personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_personal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellido_paterno` varchar(150) NOT NULL,
  `apellido_materno` varchar(150) NOT NULL,
  `numero_documento` varchar(11) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `sexo` varchar(1) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `cargo_id` bigint(20) NOT NULL,
  `estadocivil_id` bigint(20) DEFAULT NULL,
  `tipo_documento_id` bigint(20) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `area_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id` (`usuario_id`),
  KEY `rrhh_personal_cargo_id_aa74e490_fk_maestro_cargo_id` (`cargo_id`),
  KEY `rrhh_personal_tipo_documento_id_a9158bcb_fk_maestro_t` (`tipo_documento_id`),
  KEY `rrhh_personal_estadocivil_id_33acd617_fk_maestro_estadocivil_id` (`estadocivil_id`),
  KEY `rrhh_personal_area_id_624008aa_fk_maestro_areas_id` (`area_id`),
  CONSTRAINT `rrhh_personal_area_id_624008aa_fk_maestro_areas_id` FOREIGN KEY (`area_id`) REFERENCES `maestro_areas` (`id`),
  CONSTRAINT `rrhh_personal_cargo_id_aa74e490_fk_maestro_cargo_id` FOREIGN KEY (`cargo_id`) REFERENCES `maestro_cargo` (`id`),
  CONSTRAINT `rrhh_personal_estadocivil_id_33acd617_fk_maestro_estadocivil_id` FOREIGN KEY (`estadocivil_id`) REFERENCES `maestro_estadocivil` (`id`),
  CONSTRAINT `rrhh_personal_tipo_documento_id_a9158bcb_fk_maestro_t` FOREIGN KEY (`tipo_documento_id`) REFERENCES `maestro_tipodocumento` (`id`),
  CONSTRAINT `rrhh_personal_usuario_id_1d33b4a3_fk_auth_user_id` FOREIGN KEY (`usuario_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_personal`
--

LOCK TABLES `rrhh_personal` WRITE;
/*!40000 ALTER TABLE `rrhh_personal` DISABLE KEYS */;
INSERT INTO `rrhh_personal` VALUES (1,'GIOMAR','DEMO','DEMO','12345678','1','1','1994-07-27','2222222',1,1,1,1,1),(2,'JUAN','BENITEZ','PEREZ','12345679','1','1','2021-02-02','54455454',2,1,1,NULL,1),(3,'SARA','BENITO','SANCHEZ','77777777','1','2','1994-04-02','512444',3,1,1,17,3);
/*!40000 ALTER TABLE `rrhh_personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_remuneracion`
--

DROP TABLE IF EXISTS `rrhh_remuneracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_remuneracion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sueldo_bruto` decimal(9,3) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL,
  `estado` varchar(1) NOT NULL,
  `fecha_registro` date NOT NULL,
  `personal_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rrhh_remuneracion_personal_id_b0f621cf_fk_rrhh_personal_id` (`personal_id`),
  CONSTRAINT `rrhh_remuneracion_personal_id_b0f621cf_fk_rrhh_personal_id` FOREIGN KEY (`personal_id`) REFERENCES `rrhh_personal` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_remuneracion`
--

LOCK TABLES `rrhh_remuneracion` WRITE;
/*!40000 ALTER TABLE `rrhh_remuneracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `rrhh_remuneracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_rolpersonal`
--

DROP TABLE IF EXISTS `rrhh_rolpersonal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_rolpersonal` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `anio` smallint(6) NOT NULL,
  `mes` varchar(2) NOT NULL,
  `estado` varchar(1) NOT NULL,
  `area_id` bigint(20) NOT NULL,
  `responsable_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `rrhh_rolpersonal_area_id_7ebacf97_fk_maestro_areas_id` (`area_id`),
  KEY `rrhh_rolpersonal_responsable_id_7c1d4c1a_fk_rrhh_personal_id` (`responsable_id`),
  CONSTRAINT `rrhh_rolpersonal_area_id_7ebacf97_fk_maestro_areas_id` FOREIGN KEY (`area_id`) REFERENCES `maestro_areas` (`id`),
  CONSTRAINT `rrhh_rolpersonal_responsable_id_7c1d4c1a_fk_rrhh_personal_id` FOREIGN KEY (`responsable_id`) REFERENCES `rrhh_personal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_rolpersonal`
--

LOCK TABLES `rrhh_rolpersonal` WRITE;
/*!40000 ALTER TABLE `rrhh_rolpersonal` DISABLE KEYS */;
INSERT INTO `rrhh_rolpersonal` VALUES (1,'2021-06-18',2021,'06','1',1,1),(2,'2021-06-29',2021,'06','1',3,1);
/*!40000 ALTER TABLE `rrhh_rolpersonal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_tipopermiso`
--

DROP TABLE IF EXISTS `rrhh_tipopermiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_tipopermiso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(120) NOT NULL,
  `estado` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_tipopermiso`
--

LOCK TABLES `rrhh_tipopermiso` WRITE;
/*!40000 ALTER TABLE `rrhh_tipopermiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `rrhh_tipopermiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rrhh_tiposistemapesiones`
--

DROP TABLE IF EXISTS `rrhh_tiposistemapesiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rrhh_tiposistemapesiones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(120) NOT NULL,
  `abreviado` varchar(6) NOT NULL,
  `porcentaje` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rrhh_tiposistemapesiones`
--

LOCK TABLES `rrhh_tiposistemapesiones` WRITE;
/*!40000 ALTER TABLE `rrhh_tiposistemapesiones` DISABLE KEYS */;
/*!40000 ALTER TABLE `rrhh_tiposistemapesiones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-30  1:08:24
