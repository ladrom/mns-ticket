<?php
  include('header-init.php');
  include('extraction-jwt.php');

  /** @var object $connexion
   * @var object $utilisateur*/

  if ($utilisateur->role != "Administrateur" && $utilisateur->role != "Gestionnaire") {
    http_response_code(403);
    echo '{"message":"Vous n\'avez pas les droits necessaire"}';
    exit;
  }

  $json = file_get_contents('php://input');
  $data = json_decode($json);

  if (!$data->ticket_id) {
    http_response_code(400);
    echo '{"message" : "Il manque l\'identifiant dans l\'url"}';
    exit;
  }

  $sql = "SELECT * FROM ticket WHERE ticket_id = :ticket_id";
  $stmt = $connexion->prepare($sql);
  $stmt->execute(["ticket_id" => $data->ticket_id]);
  $ticket = $stmt->fetch();
  $currentStatus = $ticket['statut_id'];
  $newStatus = $currentStatus == 1 ? 2 : 1;
  $newDateResolution = $newStatus == 1 ? null : date('Y-m-d');

  $sql = "UPDATE ticket SET statut_id = :statut_id, ticket_date_resolution = :ticket_date_resolution WHERE ticket_id = :ticket_id";
  $stmt = $connexion->prepare($sql);
  $stmt->execute([
    "ticket_id" => $data->ticket_id,
    "statut_id" => $newStatus,
    "ticket_date_resolution" => $newDateResolution
  ]);

  echo '{"message" : "Le statut a bien été corrigé"}';
  exit;



