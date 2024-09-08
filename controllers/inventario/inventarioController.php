<?php
    namespace inventario\inventarioController;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    session_start();

    use inventario\inventarioModel AS ClaseInventarioModelo;
    require_once __DIR__ . '/../../models/inventario/inventarioModel.php';
    
    class inventarioController {
        function getConexionModelClass(){
            return $model_class = new ClaseInventarioModelo\inventarioModel();
        }

        function obtenerInventario(){
            $model_inventario = $this->getConexionModelClass();
            $result_model = $model_inventario->obtenerInventario();
            return $result_model;
        }

        function obtenerInventario2(){
            $model_inventario = $this->getConexionModelClass();
            $result_model = $model_inventario->obtenerInventario2();
            return $result_model;
        }

        function guardarProducto($data){
            $model_inventario = $this->getConexionModelClass();
            $result_model = $model_inventario->guardarProducto($data);
            return $result_model;
        }

        function obtenerProducto($data){
            $model_inventario = $this->getConexionModelClass();
            $result_model = $model_inventario->obtenerProducto($data);
            return $result_model;
        }
        
        function actualizaProducto($data){
            $model_inventario = $this->getConexionModelClass();
            $result_model = $model_inventario->actualizaProducto($data);
            return $result_model;
        }
  
        function eliminarProdcuto($data){
            $model_inventario = $this->getConexionModelClass();
            $result_model = $model_inventario->eliminarProdcuto($data);
            return $result_model;
        }

        function generarReporteInventario($data){
            $model_inventario = $this->getConexionModelClass();
            $result_model = $model_inventario->generarReporteInventario($data);
            return $result_model;
        }
        
    }
?>