-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 08 juin 2024 à 18:51
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ticketing_angular`
--

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `message_contenu` text COLLATE utf8mb4_general_ci NOT NULL,
  `utilisateur_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `fk_message_utilisateur` (`utilisateur_id`),
  KEY `fk_message_ticket` (`ticket_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`message_id`, `message_contenu`, `utilisateur_id`, `ticket_id`) VALUES
(32, 'Je rencontre un problème pour accéder au portail étudiant. Chaque fois que j\'essaie de me connecter, un message d\'erreur s\'affiche indiquant que mes identifiants sont incorrects, bien que je sois certain de les avoir saisis correctement. Pourriez-vous m\'aider à résoudre ce problème?', 3, 7),
(33, 'Merci de nous avoir contactés. Nous allons faire de notre mieux pour vous aider à résoudre ce problème.\n\nPouvez-vous confirmer les points suivants :\n\nVous utilisez bien l\'adresse email alex.smith@example.com pour vous connecter ?\nVous avez vérifié que la touche Majuscule n\'est pas activée lorsque vous saisissez votre mot de passe ?\nAvez-vous essayé de réinitialiser votre mot de passe via le lien \"Mot de passe oublié\" sur la page de connexion ?', 2, 7),
(34, 'Merci pour votre réponse rapide. Oui, j\'utilise bien l\'adresse email alex.smith@example.com. J\'ai vérifié la touche Majuscule et tenté de réinitialiser mon mot de passe, mais je n\'ai toujours pas accès au portail.\n\nQue puis-je faire d\'autre ?', 3, 7),
(35, 'Merci pour ces informations. Nous allons vérifier votre compte dans notre système.\n\nEn attendant, pourriez-vous essayer les étapes suivantes :\n\nEffacez les cookies et le cache de votre navigateur.\nEssayez de vous connecter avec un autre navigateur ou depuis un autre appareil.\nAssurez-vous que votre connexion Internet est stable.\nSi le problème persiste, nous pourrions planifier un appel pour résoudre cela ensemble.', 2, 7),
(36, 'Bonjour,\n\nJe rencontre un problème avec mon PC. Il ne s\'allume plus du tout, même après plusieurs tentatives. Cela m\'empêche de suivre mes cours en ligne et de soumettre mes devoirs. Pourriez-vous m\'aider à résoudre ce problème?', 70, 8),
(37, 'Pourriez-vous vérifier les points suivants :\n\nLe câble d\'alimentation est bien branché et fonctionne correctement ?\nAvez-vous essayé de brancher votre PC sur une autre prise électrique ?\nY a-t-il des signaux lumineux ou des bruits lorsque vous appuyez sur le bouton d\'alimentation ?\nMerci de nous fournir ces informations pour que nous puissions mieux comprendre la situation.', 2, 8),
(38, 'Merci pour votre réponse rapide. J\'ai vérifié que le câble d\'alimentation est bien branché et j\'ai essayé une autre prise électrique, mais le PC ne s\'allume toujours pas. Il n\'y a ni signaux lumineux ni bruits quand j\'appuie sur le bouton d\'alimentation.', 70, 8),
(39, 'Pour aller plus loin :\n\nAvez-vous un autre câble d\'alimentation compatible que vous pourriez essayer ?\nPouvez-vous retirer la batterie (si votre PC en possède une amovible) et tenter de le démarrer uniquement sur secteur ?\nAvez-vous récemment effectué des mises à jour ou installé de nouveaux logiciels avant que ce problème ne survienne ?\nEn fonction de ces réponses, nous pourrons envisager la meilleure solution, comme un dépannage sur place ou l\'envoi de votre PC au service de réparation.', 2, 8),
(40, 'Je n\'arrive pas à me connecter au Wi-Fi du campus. Pouvez-vous m\'aider ?', 76, 9),
(41, 'Pouvez-vous vérifier si d\'autres appareils peuvent se connecter au même réseau Wi-Fi ? Avez-vous essayé de redémarrer votre appareil ?', 2, 9),
(42, 'Oui, d\'autres appareils se connectent sans problème. J\'ai redémarré mon appareil, mais cela n\'a pas aidé.', 76, 9),
(43, 'Merci pour la confirmation, Michael. Essayez de supprimer le réseau Wi-Fi de votre appareil et de le reconnecter en entrant à nouveau les identifiants.', 2, 9),
(44, 'Cela a fonctionné ! Merci beaucoup pour votre aide.', 76, 9);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'Etudiant'),
(2, 'Gestionnaire'),
(3, 'Administrateur');

-- --------------------------------------------------------

--
-- Structure de la table `statut`
--

DROP TABLE IF EXISTS `statut`;
CREATE TABLE IF NOT EXISTS `statut` (
  `statut_id` int NOT NULL AUTO_INCREMENT,
  `statut_nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`statut_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `statut`
--

INSERT INTO `statut` (`statut_id`, `statut_nom`) VALUES
(1, 'En cours'),
(2, 'Resolu');

-- --------------------------------------------------------

--
-- Structure de la table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `ticket_nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `ticket_date_creation` date NOT NULL,
  `ticket_date_resolution` date DEFAULT NULL,
  `utilisateur_id` int NOT NULL,
  `statut_id` int NOT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `fk_ticket_utilisateur` (`utilisateur_id`),
  KEY `fk_ticket_statut` (`statut_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ticket`
--

INSERT INTO `ticket` (`ticket_id`, `ticket_nom`, `ticket_date_creation`, `ticket_date_resolution`, `utilisateur_id`, `statut_id`) VALUES
(7, 'Problème d\'accès au portail étudiant', '2024-06-08', NULL, 3, 1),
(8, 'Problème de fonctionnement du PC', '2024-06-08', NULL, 70, 1),
(9, 'Problème de connexion au Wi-Fi', '2024-06-08', '2024-06-08', 76, 2);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `utilisateur_id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `utilisateur_password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `utilisateur_firstname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `utilisateur_lastname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`utilisateur_id`),
  KEY `fk_role_utilisateur` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateur_id`, `utilisateur_email`, `utilisateur_password`, `utilisateur_firstname`, `utilisateur_lastname`, `role_id`) VALUES
(1, 'alex.smith@example.com', '$2y$10$mIZTlCnyOk4JvLHedGpbOuEaB.8EFEmsOH8oPAIcDKZpJf9PVop6S', 'Alex', 'Smith', 3),
(2, 'jessica.jones@example.org', '$2y$10$mIZTlCnyOk4JvLHedGpbOuEaB.8EFEmsOH8oPAIcDKZpJf9PVop6S', 'Jessica', 'Jones', 2),
(3, 'mark.taylor@example.net', '$2y$10$mIZTlCnyOk4JvLHedGpbOuEaB.8EFEmsOH8oPAIcDKZpJf9PVop6S', 'Mark', 'Taylor', 1),
(70, 'emily.davis@example.co', '$2y$10$mIZTlCnyOk4JvLHedGpbOuEaB.8EFEmsOH8oPAIcDKZpJf9PVop6S', 'Emily', 'Davis', 1),
(76, 'michael.brown@example.info', '$2y$10$mIZTlCnyOk4JvLHedGpbOuEaB.8EFEmsOH8oPAIcDKZpJf9PVop6S', 'Michael', 'Brown', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_message_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `ticket` (`ticket_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_message_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `fk_ticket_statut` FOREIGN KEY (`statut_id`) REFERENCES `statut` (`statut_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_ticket_utilisateur` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`utilisateur_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `fk_role_utilisateur` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
