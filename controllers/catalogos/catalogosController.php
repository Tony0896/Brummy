<?php
    namespace catalogos\catalogosController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use catalogos\catalogosModel AS ClaseCatalogosModelo;
    require_once __DIR__ . '/../../models/catalogos/catalogosModel.php';
    
    class catalogosController {
        function getConexionModelClass(){
            return $model_class = new ClaseCatalogosModelo\catalogosModel();
        }

        function obtenerEspecies(){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->obtenerEspecies();
            return $result_model;
        }

        function guardarEspecie($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->guardarEspecie($data);
            return $result_model;
        }

        function obtenerRazas(){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->obtenerRazas();
            return $result_model;
        }

        function guardarRaza($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->guardarRaza($data);
            return $result_model;
        }
        
        function deleteEspecie($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->deleteEspecie($data);
            return $result_model;
        }

        function deleteRaza($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->deleteRaza($data);
            return $result_model;
        }

        function obtenerMotivos(){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->obtenerMotivos();
            return $result_model;
        }

        function guardarMotivoCita($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->guardarMotivoCita($data);
            return $result_model;
        }

        function deleteMotivoCita($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->deleteMotivoCita($data);
            return $result_model;
        }

        function obtenerMotivosRechazo(){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->obtenerMotivosRechazo();
            return $result_model;
        }

        function guardarMotivoRechazo($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->guardarMotivoRechazo($data);
            return $result_model;
        }

        function deleteMotivoRechazo($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->deleteMotivoRechazo($data);
            return $result_model;
        }
        
        function guardarCategoria($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->guardarCategoria($data);
            return $result_model;
        }
        
        function obtenerCategorias(){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->obtenerCategorias();
            return $result_model;
        }

        function deleteCategoria($data){
            $model_catalogos = $this->getConexionModelClass();
            $result_model = $model_catalogos->deleteCategoria($data);
            return $result_model;
        }
    }
?>