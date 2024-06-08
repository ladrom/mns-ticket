<?php

  /** @var $connexion */

  include('header-init.php');
  include('extraction-jwt.php');

  $json = file_get_contents('php://input');

  $utilisateur = json_decode($json);

  $requete = $connexion->prepare("SELECT role_id FROM role WHERE role_name = :name");
  $requete->bindValue(':name', $utilisateur->role);
  $requete->execute();

  $role = $requete->fetch();

  if (!$role) {
    http_response_code(400);
    echo json_encode('{"error" : "Role incorrect"}');
    exit;
  }

  $passwordHash = password_hash($utilisateur->password, PASSWORD_DEFAULT);

  $requete = $connexion->prepare("INSERT INTO utilisateur (utilisateur_email, utilisateur_password, utilisateur_firstname, utilisateur_lastname, role_id) VALUES (:email, :password, :firstname, :lastname, :role_id)");

  $requete->bindValue("email", $utilisateur->email);
  $requete->bindValue("password", $passwordHash);
  $requete->bindValue("firstname", $utilisateur->firstname);
  $requete->bindValue("lastname", $utilisateur->lastname);
  $requete->bindValue("role_id", $role['role_id']);

  $requete->execute();

  echo '{"message" : "Inscription réussie"}';