<?php
    use login\loginController as ClassControllerLogin;
    require_once  __DIR__ ."/../../controllers/login/loginController.php";

    $controller = new ClassControllerLogin\loginController();
    $result = $controller->getProductosAgotar();
    echo $result;
?>