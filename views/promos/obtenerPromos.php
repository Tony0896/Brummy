<?php
    use promos\promosController as ClassControllerPromos;
    require_once  __DIR__ ."/../../controllers/promos/promosController.php";

    $controller = new ClassControllerPromos\promosController();
    $result = $controller->obtenerPromos();
    echo $result;
?>
