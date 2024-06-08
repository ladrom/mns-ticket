<?php

  include('header-init.php');
  include('extraction-jwt.php');

  if(!isset($_GET['id'])) {
    http_response_code(400);
    echo '{"message" : "Il manque l\'identifiant dans l\'url"}';
    exit();
  }

  $idUser = $_GET['id'];

  $requete = $connexion->prepare('SELECT utilisateur_email as email, utilisateur_firstname as firstname, utilisateur_lastname as lastname, role_name as role, utilisateur_id as id FROM utilisateur LEFT JOIN role ON utilisateur.role_id = role.role_id WHERE utilisateur_id = :id');

  $requete->bindValue('id', $idUser);

  $requete->execute();

  $utilisateur = $requete->fetch();

  if (!$utilisateur) {
    http_response_code(404);
    echo '{"message" : "Utilisateur introuvable"}';
    exit();
  }

  echo json_encode($utilisateur);