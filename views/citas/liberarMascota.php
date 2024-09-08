<?php
    use citas\citasController as ClassControllerCitas;
    require_once  __DIR__ ."/../../controllers/citas/citasController.php";

    $data = $_POST;
    $controller = new ClassControllerCitas\citasController();
    $result = $controller->liberarMascota($data);
    echo $result;
?>