<?php
namespace frecuentes\frecuentesModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class frecuentesModel{ 

        function obtenerCitasFrecuentes($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $TOP = $data['filtroCitas'];
            $filtroMesCitas = $data['filtroMesCitas'];
            $filtroAnioCitas = $data['filtroAnioCitas'];
            if($filtroMesCitas == 'TODOS'){
                if($TOP == 'TODOS'){
                    // $sql = "SELECT FKnombreCita, nombreCita,COUNT(FKnombreCita) as citas FROM citas WHERE estatus = 2 GROUP BY FKnombreCita ORDER BY citas DESC";
                    $sql = "SELECT FKnombreCita, nombreCita,COUNT(FKnombreCita) as citas, getIndicadorCliente(FKnombreCita) as indicadorCliente FROM citas 
                    WHERE YEAR(fechaCita) = $filtroAnioCitas GROUP BY FKnombreCita ORDER BY citas DESC";
                } else {
                    // $sql = "SELECT FKnombreCita, nombreCita,COUNT(FKnombreCita) as citas FROM citas WHERE estatus = 2 GROUP BY FKnombreCita ORDER BY citas DESC LIMIT $TOP";
                    $sql = "SELECT FKnombreCita, nombreCita,COUNT(FKnombreCita) as citas, getIndicadorCliente(FKnombreCita) as indicadorCliente FROM citas 
                    WHERE YEAR(fechaCita) = $filtroAnioCitas GROUP BY FKnombreCita ORDER BY citas DESC LIMIT $TOP";
                }
            } else {
                if($TOP == 'TODOS'){
                    // $sql = "SELECT FKnombreCita, nombreCita,COUNT(FKnombreCita) as citas FROM citas WHERE estatus = 2 GROUP BY FKnombreCita ORDER BY citas DESC";
                    $sql = "SELECT FKnombreCita, nombreCita,COUNT(FKnombreCita) as citas, getIndicadorCliente(FKnombreCita) as indicadorCliente FROM citas 
                    WHERE YEAR(fechaCita) = $filtroAnioCitas AND MONTH(fechaCita) = $filtroMesCitas GROUP BY FKnombreCita ORDER BY citas DESC";
                } else {
                    // $sql = "SELECT FKnombreCita, nombreCita,COUNT(FKnombreCita) as citas FROM citas WHERE estatus = 2 GROUP BY FKnombreCita ORDER BY citas DESC LIMIT $TOP";
                    $sql = "SELECT FKnombreCita, nombreCita,COUNT(FKnombreCita) as citas, getIndicadorCliente(FKnombreCita) as indicadorCliente FROM citas 
                    WHERE YEAR(fechaCita) = $filtroAnioCitas AND MONTH(fechaCita) = $filtroMesCitas GROUP BY FKnombreCita ORDER BY citas DESC LIMIT $TOP";
                }
            }
            
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

        function obtenerComprasFrecuentes($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $TOP = $data['filtroCompras'];
            $filtroAnioCompras = $data['filtroAnioCompras'];
            $filtroMesCompras = $data['filtroMesCompras'];

            if($filtroMesCompras == 'TODOS'){
                if($TOP == 'TODOS'){
                    $sql = "SELECT cliente,nombreCompleto, SUM(price) as sumaPrice, SUM(cantidad) as sumaPiezas, COUNT(ID) as compras, getIndicadorCliente(cliente) as indicadorCliente FROM vwventasgeneral 
                    WHERE YEAR(Fecha) = $filtroAnioCompras GROUP BY cliente ORDER BY sumaPrice DESC ";
                } else { 
                    $sql = "SELECT cliente,nombreCompleto, SUM(price) as sumaPrice, SUM(cantidad) as sumaPiezas, COUNT(ID) as compras, getIndicadorCliente(cliente) as indicadorCliente FROM vwventasgeneral 
                    WHERE YEAR(Fecha) = $filtroAnioCompras GROUP BY cliente ORDER BY sumaPrice DESC LIMIT $TOP";
                }
            } else {
                if($TOP == 'TODOS'){
                    $sql = "SELECT cliente,nombreCompleto, SUM(price) as sumaPrice, SUM(cantidad) as sumaPiezas, COUNT(ID) as compras, getIndicadorCliente(cliente) as indicadorCliente FROM vwventasgeneral 
                    WHERE YEAR(Fecha) = $filtroAnioCompras AND MONTH(Fecha) = $filtroMesCompras GROUP BY cliente ORDER BY sumaPrice DESC ";
                } else { 
                    $sql = "SELECT cliente,nombreCompleto, SUM(price) as sumaPrice, SUM(cantidad) as sumaPiezas, COUNT(ID) as compras, getIndicadorCliente(cliente) as indicadorCliente FROM vwventasgeneral 
                    WHERE YEAR(Fecha) = $filtroAnioCompras AND MONTH(Fecha) = $filtroMesCompras GROUP BY cliente ORDER BY sumaPrice DESC LIMIT $TOP";
                }
            }
            
            
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