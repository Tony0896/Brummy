<?php
    use personal\personalController as ClassControllerPersonal;
    require_once  __DIR__ ."/../../controllers/personal/personalController.php";

    $data = $_POST;
    $controller = new ClassControllerPersonal\personalController();
    $result = $controller->actualizarPersonal($data);
    echo $result;
?>