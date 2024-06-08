<?php
  include('header-init.php');
  include('extraction-jwt.php');

  /** @var object $connexion
   * @var object $utilisateur*/

  $sql = "SELECT *, COUNT(message_id) AS message_count FROM ticket 
      LEFT JOIN statut ON ticket.statut_id = statut.statut_id 
      LEFT JOIN message ON ticket.ticket_id = message.ticket_id";

  if ($utilisateur->role == 'Administrateur' or $utilisateur->role == 'Gestionnaire') {
    $sql .= " GROUP BY ticket.ticket_id, statut.statut_id
              ORDER BY ticket.ticket_id DESC";
    $stmt = $connexion->prepare($sql);
    $stmt->execute();
    $tickets = $stmt->fetchAll();

    echo json_encode($tickets);
    exit;
  }

  if ($utilisateur->role == 'Etudiant') {
    $sql .= " WHERE ticket.utilisateur_id = :utilisateur_id
              GROUP BY ticket.ticket_id, statut.statut_id
              ORDER BY ticket.ticket_id DESC";
    $stmt = $connexion->prepare($sql);
    $stmt->execute([":utilisateur_id" => $utilisateur->id]);
    $tickets = $stmt->fetchAll();

    echo json_encode($tickets);
    exit;
  }

