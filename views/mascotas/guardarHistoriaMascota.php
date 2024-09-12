<?php
    use mascotas\mascotasController as ClassControllerMascotas;
    require_once  __DIR__ ."/../../controllers/mascotas/mascotasController.php";

    $data = $_POST;
    $controller = new ClassControllerMascotas\mascotasController();
    $result = $controller->guardarHistoriaMascota($data);
    echo $result;
?>