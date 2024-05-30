<?php

function dbconnect_pdo(){
    global $_username, $_host, $_dbname, $_password;
    require_once('../environnement/config.php'); 
    try {
        $pdo = new PDO("mysql:host=$_host;dbname=$_dbname", $_username, $_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $pdo->exec("set names utf8");
        return $pdo;
    } catch(PDOException $e) {
        echo "Erreur de connexion : " . $e->getMessage();
        return null;
    }
}

function get_clients(){
    $pdo = dbconnect_pdo();
    if (!$pdo) {
        return false; 
    }
    
    $query = "SELECT * FROM client";
    try {
        $stmt = $pdo->query($query);
        $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $clients;
    } catch(PDOException $e) {
        echo "Erreur lors de la récupération des clients : " . $e->getMessage();
        return false;
    }
}

?>