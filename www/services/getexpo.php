<?php
  include 'config.php';
  $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
  
  try {
    $sql = "SELECT id, name, start, end, logo AS logo FROM app_messe.expo WHERE id=:id;";
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $stmt = $conn->prepare($sql);
    $stmt->execute( array(":id" => $id) );
    
    $expos = $stmt->fetch(PDO::FETCH_OBJ);
    foreach($expos as &$expo) {
	    $expo->logo = base64_encode($expo->logo);
    }
    
    echo '{"item":'. json_encode($expos) .'}'; 
    $conn = NULL;
    
  } catch(PDOException $e) {
    echo '{"error":{"text":'. $e->getMessage() .'}}'; 
  }
  
?>