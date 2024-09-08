<?php
    use inventario\inventarioController as ClassControllerInventario;
    require_once  __DIR__ ."/../../controllers/inventario/inventarioController.php";

    $controller = new ClassControllerInventario\inventarioController();
    $result = $controller->obtenerInventario2();
    echo $result;
?>