<?php
    namespace personal\personalController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use personal\personalModel AS ClasePersonalModelo;
    require_once __DIR__ . '/../../models/personal/personalModel.php';
    
    class personalController {
        function getConexionModelClass(){
            return $model_class = new ClasePersonalModelo\personalModel();
        }

        function obtenerPersonal(){
            $model_personal = $this->getConexionModelClass();
            $result_model = $model_personal->obtenerPersonal();
            return $result_model;
        }
        
        function guardarPersonal($data){
            $model_personal = $this->getConexionModelClass();
            $result_model = $model_personal->guardarPersonal($data);
            return $result_model;
        }

        function verPerfilPersonal($data){
            $model_personal = $this->getConexionModelClass();
            $result_model = $model_personal->verPerfilPersonal($data);
            return $result_model;
        }

        function actualizarPersonal($data){
            $model_personal = $this->getConexionModelClass();
            $result_model = $model_personal->actualizarPersonal($data);
            return $result_model;
        }
        
        function eliminarPersonal($data){
            $model_personal = $this->getConexionModelClass();
            $result_model = $model_personal->eliminarPersonal($data);
            return $result_model;
        }
    }
?>