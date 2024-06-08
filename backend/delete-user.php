<?php

  /** @var mixed $utilisateur */

  include('header-init.php');
  include('extraction-jwt.php');

  if ($utilisateur->role != "Administratuer") {
    http_response_code(403);
    echo '{"message":"Vous n\'avez pas le droits necessaire"}';
    exit;
  }

  $idUtilisateur = $_GET['id'];

  $requete = $connexion->prepare("DELETE FROM utilisateur WHERE utilisateur_id = :id");

  $requete->bindValue('id', $idUtilisateur);

  $requete->execute();

  echo '{"message" : "L\'article a bien été supprimé"}';