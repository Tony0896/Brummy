<?php
    namespace mascotas\mascotasController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use mascotas\mascotasModel AS ClaseMascotasModelo;
    require_once __DIR__ . '/../../models/mascotas/mascotasModel.php';
    
    class mascotasController {
        function getConexionModelClass(){
            return $model_class = new ClaseMascotasModelo\mascotasModel();
        }

        function guardarEdicionMascota( $data ){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->guardarEdicionMascota($data);
            return $result_model;
        }

        function actualizarComentarioMascota( $data ){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->actualizarComentarioMascota($data);
            return $result_model;
        }

        function eliminarComentarioMascota( $data ){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->eliminarComentarioMascota($data);
            return $result_model;
        }

        function guardarComentario( $data ){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->guardarComentario($data);
            return $result_model;
        }

        function obtenerComentarios( $data ){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->obtenerComentarios($data);
            return $result_model;
        }

        function obtenerMascotas(){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->obtenerMascotas();
            return $result_model;
        }

        function guardarMascota($data){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->guardarMascota($data);
            return $result_model;
        }

        function obtenerMascota($data){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->obtenerMascota($data);
            return $result_model;
        }

        function eliminarMascota($data){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->eliminarMascota($data);
            return $result_model;
        }

        function obtenerMascotasDuenios($data){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->obtenerMascotasDuenios($data);
            return $result_model;
        }
        
        function traerHistorialMascota($data){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->traerHistorialMascota($data);
            return $result_model;
        }

        function guardarHistoriaMascota( $data ){
            $model_mascotas = $this->getConexionModelClass();
            $result_model = $model_mascotas->guardarHistoriaMascota($data);
            return $result_model;
        }
    }
?>