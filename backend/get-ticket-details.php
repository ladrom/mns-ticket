<?php
  include('header-init.php');
  include('extraction-jwt.php');

  /** @var object $connexion
   * @var object $utilisateur*/

  if(!isset($_GET['id'])) {
    http_response_code(400);
    echo '{"message" : "Il manque l\'identifiant dans l\'url"}';
    exit;
  }

  if ($utilisateur->role == "Administrateur" || $utilisateur->role == "Gestionnaire") {
    $sql = "SELECT * FROM ticket WHERE ticket_id = :ticket_id";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([':ticket_id' => $_GET['id']]);
    $result = $stmt->fetch();
  } else {
    $sql = "SELECT * FROM ticket WHERE utilisateur_id = :utilisateur_id AND ticket_id = :ticket_id";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([':utilisateur_id' => $utilisateur->id, ':ticket_id' => $_GET['id']]);
    $result = $stmt->fetch();
  }

  if (empty($result)) {
    http_response_code(403);
    echo '{"message":"Vous n\'avez pas les droits necessaire"}';
    exit;
  }

  $sql = "SELECT ticket_nom, message_contenu, utilisateur_firstname, utilisateur_lastname, message.utilisateur_id, statut.statut_id, statut_nom, role_name FROM message 
          INNER JOIN utilisateur ON message.utilisateur_id = utilisateur.utilisateur_id 
          INNER JOIN ticket ON message.ticket_id = ticket.ticket_id
          INNER JOIN statut ON ticket.statut_id = statut.statut_id
          INNER JOIN role ON utilisateur.role_id = role.role_id
          WHERE message.ticket_id = :ticket_id
          ORDER BY message.message_id";
  $stmt = $connexion->prepare($sql);
  $stmt->execute(['ticket_id' => $_GET['id']]);
  $message = $stmt->fetchAll();

  if (!$message) {
    http_response_code(404);
    echo '{"message" : "Ticket introuvable"}';
    exit;
  }

  echo json_encode($message);