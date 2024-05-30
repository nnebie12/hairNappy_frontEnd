<?php

require_once('../Model/signup.php');

class SignupController {
    
    public function signup($request) {
        $nom = $request['nom']; 
        $prenom = $request['prenom'];
        $ville = $request['ville'];
        $pays = $request['pays']; 
        $codePostale = intval($request['codePostale']);
        $email = $request['email'];
        $motDePasse = password_hash($request['motDePasse'], PASSWORD_DEFAULT);
        $numeroDeTelephone = $request['numeroDeTelephone'];

        $userModel = new UserModel();
        $result = $userModel->createUser($nom, $prenom, $ville, $pays, $codePostale, $email, $motDePasse, $numeroDeTelephone);

        if ($result) {
            http_response_code(201); 
            echo json_encode(array("message" => "Utilisateur créé !"));
        } else {
            http_response_code(500); 
            echo json_encode(array("error" => "Erreur lors de la création de l'utilisateur"));
        }
    }

}