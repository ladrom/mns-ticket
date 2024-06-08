<?php

  /** @var mixed $connexion */

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

  if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode('{"error" : "Il manque d\'identifiant de l\'utilisateur"}');
    exit;
  }

  $requete = $connexion->prepare("SELECT * FROM utilisateur WHERE utilisateur_id = :id");
  $requete->bindValue(':id', $_GET["id"]);
  $requete->execute();
  $utilisateurBdd = $requete->fetch();

  if (!$utilisateurBdd) {
    http_response_code(404);
    echo json_encode('{"error" : "L\'utilisateur n\'existe pas."}');
    exit;
  }

  if ($utilisateur->password == '') {
    $utilisateur->password = $utilisateurBdd['utilisateur_password'];
  } else {
    $utilisateur->password = password_hash($utilisateur->password, PASSWORD_DEFAULT);
  }

  $requete = $connexion->prepare("UPDATE utilisateur SET utilisateur_email = :email, utilisateur_password = :password, utilisateur_lastname = :lastname, utilisateur_firstname = :firstname, role_id = :role_id WHERE utilisateur_id = :id");

  $requete->bindValue("email", $utilisateur->email);
  $requete->bindValue("password", $utilisateur->password);
  $requete->bindValue("firstname", $utilisateur->firstname);
  $requete->bindValue("lastname", $utilisateur->lastname);
  $requete->bindValue("role_id", $role['role_id']);
  $requete->bindValue("id", $_GET["id"]);

  $requete->execute();

  echo '{"message" : "Modification réussie"}';