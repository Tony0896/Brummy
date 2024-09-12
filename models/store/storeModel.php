<?php
namespace store\storeModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class storeModel{ 

        function obtenerDataVeterinaria($empresa){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT *, getMultimedia(ID, 13, 1) as urlImg FROM perfil_veterinaria WHERE estatus = 1 AND ID = {$empresa}";
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

        function guardarNombreVete($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $nombre = $data['nombreVete'];
            $empresa = isset($_SESSION['empresa']) ? $_SESSION['empresa'] : 1;

            $sql = "UPDATE perfil_veterinaria SET nombreVete = '{$nombre}' WHERE ID = {$empresa}";

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
        
        function guardaresloganVete($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $eslogan = $data['esloganVete'];
            $empresa = isset($_SESSION['empresa']) ? $_SESSION['empresa'] : 1;

            $sql = "UPDATE perfil_veterinaria SET eslogan = '{$eslogan}' WHERE ID = {$empresa}";

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

        function guardardescripcionVete($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $descripcion = $data['descripcionVete'];
            $empresa = isset($_SESSION['empresa']) ? $_SESSION['empresa'] : 1;

            $sql = "UPDATE perfil_veterinaria SET descripcion = '{$descripcion}' WHERE ID = {$empresa}";

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

        function guardardireccionVete($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $empresa = isset($_SESSION['empresa']) ? $_SESSION['empresa'] : 1;
  
            $calle =  $data['calleVete'];
            $col =  $data['colVete'];
            $cp =  $data['cpVete'];
            $estado =  $data['estadoVete'];
            $municipio =  $data['municipioVete'];
            $numero =  $data['numeroVete'];
            $pais = 'México';

            $sql = "UPDATE perfil_veterinaria SET calle = '{$calle}', col = '{$col}', cp = '{$cp}', estado = '{$estado}', municipio = '{$municipio}', numero = '{$numero}', pais = '{$pais}' WHERE ID = {$empresa}";

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
        
        function guardarredesVete($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $empresa = isset($_SESSION['empresa']) ? $_SESSION['empresa'] : 1;

            $tipoRed = $data['redSocial_input'];
            $url_nombre = $data['urlRedSocial_input'];
            $estatus = 1;
            $FKUsuarioCrea = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
            $FlagUsuarioCrea = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "INSERT INTO redes_veterinaria (FKEmpresa, tipoRed, url_nombre, estatus, FKUsuarioCrea, FlagUsuarioCrea) 
            VALUES ({$empresa}, '{$tipoRed}', '{$url_nombre}', '{$estatus}', '{$FKUsuarioCrea}', '{$FlagUsuarioCrea}')";

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

        function obtenerRedesSocialesVete($empresa){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT ID, tipoRed, url_nombre FROM redes_veterinaria WHERE FKEmpresa = {$empresa} AND estatus = 1";
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

        function guardarcontactosVete($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $empresa = isset($_SESSION['empresa']) ? $_SESSION['empresa'] : 1;

            $nombre = $data['nombreVeteContacto'];
            $numero = $data['numeroVeteContacto'];
            $estatus = 1;
            $FKUsuarioCrea = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;;
            $FlagUsuarioCrea = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "INSERT INTO contactos_veterinaria (FKEmpresa, nombre, numero, estatus, FKUsuarioCrea, FlagUsuarioCrea) 
            VALUES ({$empresa}, '{$nombre}', '{$numero}', '{$estatus}', '{$FKUsuarioCrea}', '{$FlagUsuarioCrea}')";

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
        
        function obtenerContactosVete($empresa){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT ID, nombre, numero FROM contactos_veterinaria WHERE FKEmpresa = {$empresa} AND estatus = 1";
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

        function guardarHorariosBD($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $empresa = isset($_SESSION['empresa']) ? $_SESSION['empresa'] : 1;

            $horario_1 = $data['horario_1'];
            $horario_2 = $data['horario_2'];
            $abreviacion1 = $data['dia'];
            $abreviacion2 = $data['dia2'];
            $diaCompleto = $data['diaCompleto'];
            $diaCompleto2 = $data['diaCompleto2'];
            $diaVete_cerrado = $data['diaVete_cerrado'];
            $estatusTienda = $diaVete_cerrado == 'Cerrado' ? 0 : 1;
            $numerodia1 = $data['diaNumero1'];
            $numerodia2 = $data['diaNumero2'];
            $estatus = 1;
            $FKUsuarioCrea = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;;
            $FlagUsuarioCrea = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "INSERT INTO horarios_veterinaria (FKEmpresa, numerodia1, numerodia2, dia1, dia2, abreviacion1, abreviacion2, estatusTienda, FlagEstatusTienda, horario1, horario2, estatus, FKUsuarioCrea, FlagUsuarioCrea) 
            VALUES ({$empresa}, {$numerodia1}, {$numerodia2}, '{$diaCompleto}', '{$diaCompleto2}', '{$abreviacion1}', '{$abreviacion2}', '{$estatusTienda}', '{$diaVete_cerrado}', '{$horario_1}', '{$horario_2}', '{$estatus}', '{$FKUsuarioCrea}', '{$FlagUsuarioCrea}')";

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
        
        function obtenerHorariosVete($empresa){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT ID, numerodia1, numerodia2, abreviacion1, abreviacion2, FlagEstatusTienda, horario1, horario2 FROM horarios_veterinaria WHERE FKEmpresa = {$empresa} AND estatus = 1";
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

        function deleteHorariosVete($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "UPDATE horarios_veterinaria SET estatus = 0 WHERE ID = {$ID}";

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

        function deleteContactosVete($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "UPDATE contactos_veterinaria SET estatus = 0 WHERE ID = {$ID}";

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
        
        function deleteRedesSocialesVete($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "UPDATE redes_veterinaria SET estatus = 0 WHERE ID = {$ID}";

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