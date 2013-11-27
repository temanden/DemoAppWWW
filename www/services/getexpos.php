<?php
  include 'config.php';

  try {
    $sql = "SELECT id, name, start, end, logo AS logo FROM app_messe.expo WHERE expocenter_id=:id;";
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $stmt = $conn->prepare($sql);
    $stmt->execute( array(":id" => 1) );
    
    $expos = $stmt->fetchAll(PDO::FETCH_OBJ);
    foreach($expos as $expo) {
	    $expo->logo = base64_encode($expo->logo);
    }
    
    echo '{"items":'. json_encode($expos) .'}'; 
    $conn = NULL;
    
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
  
?>