<?php
  include('header-init.php');
  include('extraction-jwt.php');

  /** @var object $connexion
   * @var object $utilisateur */

  $userId = $utilisateur->id;

  if (!$utilisateur->id) {
    http_response_code(403);
    echo '{"message":"Vous n\'avez pas les droits necessaire"}';
    exit;
  }

  $json = file_get_contents('php://input');
  $data = json_decode($json);

  if (strlen($data->ticket_title) < 1 || strlen($data->ticket_text) < 1) {
    http_response_code(400);
    echo '{"message":"Le texte du message est trop court"}';
    exit;
  }

  $sql = "INSERT INTO ticket (ticket_nom, ticket_date_creation, ticket_date_resolution, utilisateur_id, statut_id) VALUES (:ticket_nom, :ticket_date_creation, :ticket_date_resolution, :utilisateur_id, :statut_id)";

  $stmt = $connexion->prepare($sql);
  $stmt->execute([
    'ticket_nom' => $data->ticket_title,
    'ticket_date_creation' => date("Y-m-d"),
    'ticket_date_resolution' => null,
    'utilisateur_id' => $utilisateur->id,
    'statut_id' => 1
  ]);

  $ticket_id = $connexion->lastInsertId();

  $sql = "INSERT INTO message (message_contenu, ticket_id, utilisateur_id) VALUES (:message_contenu, :ticket_id, :utilisateur_id)";
  $stmt = $connexion->prepare($sql);
  $stmt->execute([
    'message_contenu' => $data->ticket_text,
    'ticket_id' => $ticket_id,
    'utilisateur_id' => $utilisateur->id,
  ]);

  echo '{"message" : "Le ticket a bien été ajouté"}';
  exit;