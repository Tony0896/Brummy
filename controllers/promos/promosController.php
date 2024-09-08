<?php
    namespace promos\promosController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use promos\promosModel AS ClasePromosModelo;
    require_once __DIR__ . '/../../models/promos/promosModel.php';
    
    class promosController {
        function getConexionModelClass(){
            return $model_class = new ClasePromosModelo\promosModel();
        }

        function obtenerPromos(){
            $model_promos = $this->getConexionModelClass();
            $result_model = $model_promos->obtenerPromos();
            return $result_model;
        }
        
        function guardarPromo($data){
            $model_promos = $this->getConexionModelClass();
            $result_model = $model_promos->guardarPromo($data);
            return $result_model;
        }

        function obtenerPromo($data){
            $model_promos = $this->getConexionModelClass();
            $result_model = $model_promos->obtenerPromo($data);
            return $result_model;
        }

        function actualizaPromo($data){
            $model_promos = $this->getConexionModelClass();
            $result_model = $model_promos->actualizaPromo($data);
            return $result_model;
        }

        function eliminarPromo($data){
            $model_promos = $this->getConexionModelClass();
            $result_model = $model_promos->eliminarPromo($data);
            return $result_model;
        }
    }
?>
