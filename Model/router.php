<?php

require_once('../Controller/signup.php');

// Routeur
$requestMethod = $_SERVER["REQUEST_METHOD"];
$request = json_decode(file_get_contents('php://input'), true);

switch ($requestMethod) {
    case 'POST':
        if ($_SERVER['REQUEST_URI'] === '/signup') {
            $signupController = new SignupController();
            echo $signupController->signup($request);
        } elseif ($_SERVER['REQUEST_URI'] === '/login') {
            // Votre logique de gestion de connexion
        }
        break;
    default:
        echo json_encode(array("error" => "Méthode non autorisée"));
        break;
}

?>