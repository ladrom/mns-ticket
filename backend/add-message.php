<?php
  include('header-init.php');
  include('extraction-jwt.php');

  /** @var object $connexion
   * @var object $utilisateur */

  $userId = $utilisateur->id;
  $json = file_get_contents('php://input');
  $data = json_decode($json);


  $sql = "SELECT * FROM ticket WHERE utilisateur_id = :utilisateur_id AND ticket_id = :ticket_id AND statut_id = 1";
  $stmt = $connexion->prepare($sql);
  $stmt->execute([':utilisateur_id' => $utilisateur->id, ':ticket_id' => $data->ticket_id]);
  $result = $stmt->fetchAll();

  if($utilisateur->role !== "Administrateur" && $utilisateur->role !== "Gestionnaire" && empty($result)) {
    http_response_code(403);
    echo '{"message":"Vous n\'avez pas le droits necessaire"}';
    exit;
  }

  $sql = "INSERT INTO message (utilisateur_id, ticket_id, message_contenu) VALUES(:utilisateur_id, :ticket_id, :message_contenu)";
  $stmt = $connexion->prepare($sql);
  $stmt->execute([":utilisateur_id" => $utilisateur->id, ":ticket_id" => $data->ticket_id, ":message_contenu" => $data->text]);

  echo '{"message" : "Le message a bien été ajoute"}';
  exit;







