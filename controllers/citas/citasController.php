<?php
    namespace citas\citasController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use citas\citasModel AS ClaseCitasModelo;
    require_once __DIR__ . '/../../models/citas/citasModel.php';
    
    class citasController {
        function getConexionModelClass(){
            return $model_class = new ClaseCitasModelo\citasModel();
        }

        function obtenerEventosMes($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->obtenerEventosMes($data);
            return $result_model;
        }

        function guardarCita($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->guardarCita($data);
            return $result_model;
        }
        
        function obtenerEventos($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->obtenerEventos($data);
            return $result_model;
        }

        function guardarEstausCita($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->guardarEstausCita($data);
            return $result_model;
        }

        function validaCita($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->validaCita($data);
            return $result_model;
        }

        function generarLinkEncuesta($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->generarLinkEncuesta($data);
            return $result_model;
        }

        function generarCitaPropuesta($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->generarCitaPropuesta($data);
            return $result_model;
        }  

        function cambiaEstatusCitaRecurente($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->cambiaEstatusCitaRecurente($data);
            return $result_model;
        }
        
        function liberarMascota($data){
            $model_citas = $this->getConexionModelClass();
            $result_model = $model_citas->liberarMascota($data);
            return $result_model;
        }
    }
?>