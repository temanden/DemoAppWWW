<?php
  include 'config.php';

  try {
    $sql = "SELECT id, name, start, end, TO_BASE64(logo) AS logo FROM app_messe.expo WHERE expocenter_id=:id;";
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $stmt = $conn->prepare($sql);
    $stmt->execute( array(":id" => 1) );
    
    $expos = $stmt->fetchAll(PDO::FETCH_OBJ);
    
    echo '{"items":'. json_encode($expos) .'}'; 
    $conn = NULL;
    
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
  
?>