<?php
require_once('Controller/signup.php');

$action = isset($_GET['action']) ? $_GET['action'] : null;
switch ($action) {
    case 'register':
        $userController = new SignupController();
        $userController->registerUser($_POST);
        break;
    
    default:
        
        break;
}
?>