<?php
namespace promos\promosModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class promosModel{
        
        function obtenerPromos(){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT * FROM promos WHERE estatus = 1";
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

        function guardarPromo($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $nombrePromo = $data['nombrePromo'];
            $categoria = $data['categoria'];
            $fechaInicio = $data['fechaInicio'];
            $fechaFin = $data['fechaFin'];
            $porcentaje = $data['porcentaje'];
            $nameCategoria = $data['nameCategoria'];
            $motivoMovimiento = 'Promos registrado';
            $estatus = 1;
            $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
            $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "INSERT INTO promos (nombrePromo, categoria, fechaInicio, fechaFin, porcentaje, nameCategoria, motivoMovimiento, estatus, FKUsuarioCrea, FlagUsuarioCrea)
            VALUES ('$nombrePromo', $categoria, '$fechaInicio', '$fechaFin', '$porcentaje', '$nameCategoria', '$motivoMovimiento', $estatus, $FK_Usuario, '$nameUsuario')";
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

        function obtenerPromo($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $sql = "SELECT * FROM promos WHERE estatus = 1 AND ID = $ID";
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

        function actualizaPromo($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $fechaInicio = $data['fechaInicio'];
            $fechaFin = $data['fechaFin'];
            $porcentaje = $data['porcentaje'];
            $motivoMovimiento = 'Registrado actualizado';
            $estatus = 1;
            $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
            $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "UPDATE promos SET 
                fechaInicio = '$fechaInicio', fechaFin = '$fechaFin', porcentaje = '$porcentaje', motivoMovimiento = '$motivoMovimiento', 
                FKUsuarioCrea = $FK_Usuario, FlagUsuarioCrea = '$nameUsuario', fechaCreacion = current_timestamp() WHERE ID = $ID";

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

        function eliminarPromo($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $motivoMovimiento = 'Registrado Eliminado';
            $estatus = 1;
            $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
            $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "UPDATE promos SET  estatus = 0, motivoMovimiento = '$motivoMovimiento', FKUsuarioCrea = $FK_Usuario, FlagUsuarioCrea = '$nameUsuario', fechaCreacion = current_timestamp() WHERE ID = $ID";

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
    }
?>
