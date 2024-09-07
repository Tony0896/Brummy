<?php
    use personal\personalController as ClassControllerPersonal;
    require_once  __DIR__ ."/../../controllers/personal/personalController.php";

    $controller = new ClassControllerPersonal\personalController();
    $result = $controller->obtenerPersonal();
    echo $result;
?>