<?php
    use login\loginController as ClassControllerLogin;
    require_once  __DIR__ ."/../../controllers/login/loginController.php";

    $DATA_USERS_INFO = [];
    $NoDocs = $_POST['NoDocs'];
    $arr_files = [];

    if ($NoDocs > 0) {
        for ($i=0; $i < $NoDocs; $i++) { 
            array_push($arr_files , $_FILES['Adjunto_'.$i]);
        }
    }

    $DATA_USERS_INFO['data_post'] = $_POST;
    $DATA_USERS_INFO['data_files'] = $arr_files;

    $controller = new ClassControllerLogin\loginController();
    $result = $controller->guardaDocs( $DATA_USERS_INFO );
    echo $result;
?>