<?php
  include('header-init.php');
  include('extraction-jwt.php');

/** @var object $utilisateur */

  if ($utilisateur->role != 'Administrateur' && $utilisateur->role != 'Gestionnaire') {
    http_response_code(403);
    echo '{"message":"Vous n\'avez pas le droits necessaire"}';
    exit;
  }

  $requete = $connexion->query('SELECT utilisateur_id as id, utilisateur_email as email, utilisateur_firstname as firstname, utilisateur_lastname as lastname, role.role_name as role FROM utilisateur LEFT JOIN role ON utilisateur.role_id = role.role_id');

  $utilisateurs = $requete->fetchAll();

  echo json_encode($utilisateurs);