
<?php
    use avisos\avisosController as ClassControllerAvisos;
    require_once  __DIR__ ."/../../controllers/avisos/avisosController.php";

    $data = $_POST;
    $controller = new ClassControllerAvisos\avisosController();
    $result = $controller->guardarEdicionAviso($data);
    echo $result;
?>