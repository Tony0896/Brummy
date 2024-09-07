<?php
namespace ventas\ventasModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class ventasModel{

        function InsertHistoriaCliente($FK_Cliente, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "CALL InsertHistoriaCliente(CURRENT_DATE(), $FK_Cliente, '$nombre', $FK_modulo, '$nombreModulo', '$motivo', $FK_Usuario, '$nameUsuario', $ID_mov)";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){

                }
            } catch (mysqli_sql_exception $e) { }
            mysqli_close( $conexion );
        }
        
        function guardarHeaderVenta($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $cliente = $data['cliente'];
            $price = $data['price'];
            $FlagExacto = $data['FlagExacto'];
            $efectivo = $data['efectivo'];
            $cambio = $data['cambio'];

            $sql = "INSERT INTO ventaHeader (cliente, price, FlagExacto, efectivo, cambio, fechaCreacion)
            VALUES ($cliente, '$price', '$FlagExacto', '$efectivo', '$cambio', current_timestamp())";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $sql = "SELECT ID as IDHeader FROM ventaHeader ORDER BY ID DESC LIMIT 1";
                    try{
                        $stmt = mysqli_query($conexion, $sql);
                        if($stmt){
                            $rowcount=mysqli_num_rows($stmt);   
                            if ( $rowcount ) {
                                while($row = mysqli_fetch_assoc($stmt)) {
                                    $array[] =$row;

                                    $FK_Cliente = $data['cliente'];
                                    $nombre = $data['nameCliente'];
                                    $FK_modulo = 4;
                                    $nombreModulo = 'Ventas';
                                    $motivo = 'Compra por : $'.$price ;
                                    $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1 ;
                                    $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';
                                    $ID_mov = $row['IDHeader'];
                                }
                                $this->InsertHistoriaCliente($FK_Cliente, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov);
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
        
        function guardarDetalleVenta($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $dataID = $data['dataID'];
            $FlagProducto = $data['FlagProducto'];
            $FKProducto = $data['FKProducto'];
            $label = $data['label'];
            $total = $data['total'];
            $newStock = $data['newStock'];

            $sql = "INSERT INTO ventaDetalle (FKVenta, FlagProducto, FKProducto, cantidad, total)
            VALUES ( '$dataID', '$FlagProducto', '$FKProducto', '$label', '$total' )";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');

                    $sql = "UPDATE inventario SET stockReal = '$newStock' WHERE ID = $FKProducto";

                    try{
                        $stmt = mysqli_query($conexion, $sql);
                        if($stmt){
                            
                        } else {
                            $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                        }
                    } catch (mysqli_sql_exception $e) {
                        $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
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
        
        function obtenerVentas($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $mes = $data['mes'];
            $anio = $data['anio'];

            $sql = "SELECT * FROM vwventasgeneral WHERE YEAR(Fecha) = '$anio' AND MONTH(Fecha) = '$mes' ORDER BY ID DESC";
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

        function obtenerVenta($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $cambioVenta = $data['cambioVenta'];

            if($cambioVenta == 1){
                $tb = 'vwventadetailscambios';
            } else {
                $tb = 'vwventadetails';
            }

            $sql = "SELECT * FROM $tb WHERE ID = $ID";

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

        function guardarHeaderVentaCambio($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $price = $data['price'];
            $efectivo = $data['efectivo'];

            $sql = "INSERT INTO ventaheadercambios (FKVentaOriginal, cliente, price, FlagExacto, efectivo)
            SELECT '$ID', cliente, price, FlagExacto, efectivo FROM ventaheader WHERE ID = $ID ;";

            $sql1 = "UPDATE ventaheader SET cambioVenta = 1, devuelto = '$price' WHERE ID = $ID ;";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    try{
                        $stmt = mysqli_query($conexion, $sql1);
                        if($stmt){
                            $sql = "SELECT ID as IDHeader, cliente FROM ventaheadercambios WHERE FKVentaOriginal = $ID;";
                            try{
                                $stmt = mysqli_query($conexion, $sql);
                                if($stmt){
                                    $rowcount=mysqli_num_rows($stmt);   
                                    if ( $rowcount ) {
                                        while($row = mysqli_fetch_assoc($stmt)) {
                                            $array[] =$row;
        
                                            $FK_Cliente = $row['cliente'];
                                            $nombre = 'FALTA CREAR GETNAME'; //! FALTA
                                            $FK_modulo = 4;
                                            $nombreModulo = 'Ventas';
                                            $motivo = 'Cancelación compra, Devuelto : $'.$price ;
                                            $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1 ;
                                            $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';
                                            $ID_mov = $row['IDHeader'];
                                        }
                                        $this->InsertHistoriaCliente($FK_Cliente, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov);
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
                        } else {
                            $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                        }
                    } catch (mysqli_sql_exception $e) {
                        $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
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

        function guardarDetalleVentaCambio($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $IDorigin = $data['ID'];
            $dataID = $data['dataID'];
            $FlagProducto = $data['FlagProducto'];
            $FKProducto = $data['FKProducto'];
            $label = $data['label'];
            $total = $data['total'];
            $newStock = $data['newStock'];
            $devuelveStock = $data['devuelveStock'];
            $comentariosAdicionales = $data['comentariosAdicionales'];

            $sql = "INSERT INTO ventadetallecambios (FKVentaOrigin, FKVenta, FlagProducto, FKProducto, cantidad, total, newStock, devulveStock, comentarios)
            VALUES ( '$IDorigin', '$dataID', '$FlagProducto', '$FKProducto', '$label', '$total', '$newStock', $devuelveStock, '$comentariosAdicionales' )";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                    if($devuelveStock == 1){
                        $sql = "UPDATE inventario SET stockReal = (SELECT SUM(stockReal + $newStock) FROM inventario WHERE ID = $FKProducto) WHERE ID = $FKProducto";
                        try{
                            $stmt = mysqli_query($conexion, $sql);
                            if($stmt){
                            } else {
                                $result = array('success' => false, 'result' => false, "result_query_sql_error"=>"Error no conocido" );
                            }
                        } catch (mysqli_sql_exception $e) {
                            $result = array('success' => false, 'result' => false, "result_query_sql_error"=>$e->getMessage() );
                        }
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