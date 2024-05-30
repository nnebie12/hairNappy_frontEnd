<?php

require_once('dbconnect.php');

class SignupModel {

    public function createUser($nom, $prenom, $ville, $pays, $codePostale, $email, $motDePasse, $numeroDeTelephone) {
        $conn = dbconnect_pdo();

        $sql = "INSERT INTO client (nom, prenom, ville, pays, codePostale, email, motDePasse, numeroDeTelephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nom, $prenom, $ville, $pays, $codePostale, $email, $motDePasse, $numeroDeTelephone]);

        return $stmt->rowCount() > 0;
    }
}

?>