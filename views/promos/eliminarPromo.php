<?php
    use promos\promosController as ClassControllerPromos;
    require_once  __DIR__ ."/../../controllers/promos/promosController.php";

    $data = $_POST;
    $controller = new ClassControllerPromos\promosController();
    $result = $controller->eliminarPromo($data);
    echo $result;
?>