<?php
    use catalogos\catalogosController as ClassControllerCatalogos;
    require_once  __DIR__ ."/../../controllers/catalogos/catalogosController.php";

    $data = $_POST;
    $controller = new ClassControllerCatalogos\catalogosController();
    $result = $controller->guardarCategoria($data);
    echo $result;
?>