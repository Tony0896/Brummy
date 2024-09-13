<?php
namespace inventario\inventarioModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class inventarioModel{ 

        function obtenerInventario(){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT *, getMultimedia(ID, 8, 1) as urlImg FROM inventario WHERE estatus = 1";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $array[] =$row;
                        }
                        $result = array('success' => true, 'result' => $array);
                    } else{
                        $result = array('success' => true, 'result' => 'Sin Datos');
                    }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function obtenerInventario2(){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT i.*, p.porcentaje, p.fechaInicio ,p.fechaFin FROM inventario i LEFT JOIN promos p ON i.categoria = p.categoria WHERE i.estatus = 1 ORDER BY ID";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $array[] =$row;
                        }
                        $result = array('success' => true, 'result' => $array);
                    } else{
                        $result = array('success' => true, 'result' => 'Sin Datos');
                    }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function guardarProducto($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $tipoProducto = $data['tipoProducto'];
            $nombre = $data['nombre'];
            $codigo = $data['codigo'];
            $descripcion = $data['descripcion'];
            $precioCompra = $data['precioCompra'];
            $precioVenta = $data['precioVenta'];
            $stockMinimo = $data['stockMinimo'];
            $stockReal = $data['stockReal'];
            $categoria = $data['categoria'];
            $nameCategoria = $data['nameCategoria'];

            $sql = "INSERT INTO inventario (codigo, nombre, descripcion, tipo, Flagtipo, precioCompra, precioVenta, stockMinimo, stockReal, fechaCreacion, categoria, nameCategoria)
            VALUES ('$codigo', '$nombre', '$descripcion', '$tipoProducto', '$tipoProducto', '$precioCompra', '$precioVenta', '$stockMinimo', '$stockReal', current_timestamp(), $categoria, '$nameCategoria')";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $sql = "SELECT ID FROM inventario ORDER BY ID DESC LIMIT 1";
                    try{
                        $stmt = mysqli_query($conexion, $sql);
                        if($stmt){
                            $rowcount=mysqli_num_rows($stmt);   
                            if ( $rowcount ) {
                                while($row = mysqli_fetch_assoc($stmt)) {
                                    $FK_product = $row['ID'];
                                }
                                $result = array('success' => true, 'result' => 'Sin Datos', 'result2' => $FK_product);
                            }
                        }
                    } catch (mysqli_sql_exception $e) { }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }

            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function obtenerProducto($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $sql = "SELECT * FROM inventario WHERE ID = $ID";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $array[] =$row;
                        }
                        $result = array('success' => true, 'result' => $array);
                    } else{
                        $result = array('success' => true, 'result' => 'Sin Datos');
                    }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function actualizaProducto($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $descripcion = $data['descripcion'];
            $precioCompra = $data['precioCompra'];
            $precioVenta = $data['precioVenta'];
            $stockMinimo = $data['stockMinimo'];
            $stockReal = $data['stockReal'];
            $ID = $data['ID'];

            $sql = "UPDATE inventario SET descripcion = '$descripcion', precioCompra = '$precioCompra', 
            precioVenta = '$precioVenta', stockMinimo = '$stockMinimo', stockReal = '$stockReal' WHERE ID = $ID";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }

            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }
        
        function eliminarProdcuto($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "UPDATE inventario SET estatus = 0 WHERE ID = $ID";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }

            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function generarReporteInventario($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $fechaReporteInicio = $data['fechaReporteInicio'];
            $fechaReporteFin = $data['fechaReporteFin'];

            $sql = "SELECT SUM(cantidad) as suma, FlagProducto, FKProducto FROM ventadetalle WHERE DATE(fechaCreacion) BETWEEN '$fechaReporteInicio' AND '$fechaReporteFin' GROUP BY FKProducto ORDER BY suma DESC;";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $array[] =$row;
                        }
                        $result = array('success' => true, 'result' => $array);
                    } else{
                        $result = array('success' => true, 'result' => 'Sin Datos');
                    }
                } else {
                    $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }
        
    }
?>