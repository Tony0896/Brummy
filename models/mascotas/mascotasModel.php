<?php
namespace mascotas\mascotasModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class mascotasModel{ 

        function InsertHistoriaMascota($FK_mascota, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "CALL InsertHistoriaMascota(CURRENT_DATE(), $FK_mascota, '$nombre', $FK_modulo, '$nombreModulo', '$motivo', $FK_Usuario, '$nameUsuario', $ID_mov)";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){

                }
            } catch (mysqli_sql_exception $e) { }
            mysqli_close( $conexion );
        }

        function obtenerMascotas(){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT ms.*, CONCAT(cl.nombre, ' ' ,cl.apellidoP, ' ' ,cl.apellidoM) as NombreCliente FROM mascotas ms LEFT JOIN clientes cl ON cl.ID = ms.FK_dueno WHERE ms.estatus = 1";
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

        function guardarMascota($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $nombre = $data['nombre'];
            $fechaNacimiento = $data['fechaNacimiento'];
            $FK_especie = $data['FK_especie'];
            $especie = $data['especie'];
            $raza = $data['raza'];
            $FK_raza = $data['FK_raza'];
            $sexo = $data['sexo'];
            $color = $data['color'];
            $rasgosParticulares = $data['rasgosParticulares'];
            $FK_dueno = $data['FK_dueno'];
            $nota = '';
            $motivoMovimiento = 'Mascota registrada';
            $temperamentoMascota = $data['temperamentoMascota'];

            $sql = "INSERT INTO mascotas (nombre, fechaNacimiento, FK_especie, especie, raza, FK_raza, sexo, color, rasgosParticulares, nota, fechaCreacion, fechaUlmitoMovimiento, motivoMovimiento, FK_dueno, temperamentoMascota)
            VALUES ('$nombre', '$fechaNacimiento', '$FK_especie', '$especie', '$raza', '$FK_raza', '$sexo', '$color', '$rasgosParticulares', '$nota', current_timestamp(), current_timestamp(), '$motivoMovimiento', '$FK_dueno', '$temperamentoMascota')";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $sql = "SELECT * FROM mascotas ORDER BY ID DESC LIMIT 1";
                    try{
                        $stmt = mysqli_query($conexion, $sql);
                        if($stmt){
                            $rowcount=mysqli_num_rows($stmt);   
                            if ( $rowcount ) {
                                while($row = mysqli_fetch_assoc($stmt)) {
                                    $FK_mascota = $row['ID'];
                                    $nombre = $row['nombre'];
                                    $FK_modulo = 6;
                                    $nombreModulo = 'Mascotas';
                                    $motivo = 'Nueva Mascota Registrada';
                                    $FK_Usuario = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
                                    $nameUsuario = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';
                                    $ID_mov = $row['ID'];
                                }
                                $this->InsertHistoriaMascota($FK_mascota, $nombre, $FK_modulo, $nombreModulo, $motivo, $FK_Usuario, $nameUsuario, $ID_mov);
                                $result = array('success' => true, 'result' => 'Sin Datos', 'result2' => $FK_mascota);
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

        function obtenerMascota($data){

            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "SELECT ms.*, CONCAT(cl.nombre, ' ' ,cl.apellidoP, ' ' ,cl.apellidoM) as NombreCliente FROM mascotas ms LEFT JOIN clientes cl ON cl.ID = ms.FK_dueno WHERE ms.estatus = 1 AND ms.ID = $ID";
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

        function eliminarMascota($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];
            $motivoMovimiento = 'Mascota Eliminada';

            $sql = "UPDATE Mascotas SET estatus = 0, fechaUlmitoMovimiento = current_timestamp(), motivoMovimiento = '$motivoMovimiento' WHERE ID = $ID ";
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

        function obtenerMascotasDuenios($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['FK_dueno'];

            $sql = "SELECT * FROM mascotas WHERE estatus = 1 AND FK_dueno = $ID";
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

        function traerHistorialMascota($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ID = $data['ID'];

            $sql = "SELECT ID, fecha, FK_mascota, nombre, FK_modulo, nombre_modulo, motivo_movimiento FROM historial_mascota WHERE estatus = 1 AND FK_mascota = $ID ORDER BY ID DESC";
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
        
        function obtenerComentarios($data){

            $request_body = file_get_contents('php://input');

            $data = json_decode($request_body , true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();
    
            $ID = $data['ID'];
    
            $sql = "SELECT ID , redaccion , fecha_comentario_up , FK_usuario_up  , CONCAT( nombre_usa_mov_up , ' ', apellidop_usa_mov_up , ' ' , apellidom_usa_mov_up ) nombre_completo_up FROM comentarios_mascota WHERE estatus = 1 AND FK_mascota = $ID ORDER BY ID DESC";
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

        function guardarComentario($data) {
            $request_body = file_get_contents('php://input');

            $data = json_decode($request_body , true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $FK_usuario_up = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : '1';
            $nombre_usa_mov_up = isset($_SESSION['nombre']) ? $_SESSION['nombre'] : 'app';
            $apellidop_usa_mov_up = isset($_SESSION['apellidoPaterno']) ? $_SESSION['apellidoPaterno'] : 'app';
            $apellidom_usa_mov_up = isset($_SESSION['apellidoMaterno']) ? $_SESSION['apellidoMaterno'] : 'app';
            $redaccion = $data['arr_data']['contenido_comentario'];
            $FK_mascota = $data['arr_data']['ID_MASCOTA'];
            $estatus = 1;
            $FK_cliente = $data['arr_data']['FK_dueno'];

            $sql = "INSERT INTO comentarios_mascota(redaccion, estatus, FK_mascota, FK_cliente, FK_usuario_up, nombre_usa_mov_up, apellidop_usa_mov_up, apellidom_usa_mov_up, fecha_comentario_up) 
            VALUES ('$redaccion', '$estatus', '$FK_mascota', '$FK_cliente', '$FK_usuario_up', '$nombre_usa_mov_up', '$apellidop_usa_mov_up', '$apellidom_usa_mov_up', current_timestamp()) ";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => 'Sin Datos');
                    $sql = "SELECT * FROM comentarios_mascota ORDER BY ID DESC LIMIT 1";
                    try{
                        $stmt = mysqli_query($conexion, $sql);
                        if($stmt){
                            $result = array('success' => true, 'result' => true);
                        }
                    } catch (mysqli_sql_exception $e) { }
                } else {
                    $result = array('success' => false, 'result' => 'error_execute_query', "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => 'error_conection_sql', "result_query_sql_error"=>$e->getMessage() );
            }
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function eliminarComentarioMascota($data) {
            $request_body = file_get_contents('php://input');

            $data = json_decode($request_body , true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $FK_usuario_down = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : '1';
            $nombre_usa_mov_down = isset($_SESSION['nombre']) ? $_SESSION['nombre'] : 'app';
            $apellidop_usa_mov_down = isset($_SESSION['apellidoPaterno']) ? $_SESSION['apellidoPaterno'] : 'app';
            $apellidom_usa_mov_down = isset($_SESSION['apellidoMaterno']) ? $_SESSION['apellidoMaterno'] : 'app';
            $id_comentario = $data['arr_data']['id_comentario']; 
            $FK_dueno = $data['arr_data']['FK_dueno'];
            $estatus = 0;

            $sql = "UPDATE comentarios_mascota SET  estatus = $estatus , FK_usuario_down = $FK_usuario_down, nombre_usa_mov_down = '$nombre_usa_mov_down', apellidop_usa_mov_down = '$apellidop_usa_mov_down',
            apellidom_usa_mov_down = '$apellidom_usa_mov_down', fecha_comentario_down  = current_timestamp() WHERE ID = $id_comentario AND FK_cliente = $FK_dueno";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => true);
                } else {
                    $result = array('success' => false, 'result' => 'error_execute_query', "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => 'error_conection_sql', "result_query_sql_error"=>$e->getMessage() );
            }

            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function actualizarComentarioMascota(){
            $request_body = file_get_contents('php://input');

            $data = json_decode($request_body , true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $FK_usuario_up = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : '1';
            $nombre_usa_mov_up = isset($_SESSION['nombre']) ? $_SESSION['nombre'] : 'app';
            $apellidop_usa_mov_up = isset($_SESSION['apellidoPaterno']) ? $_SESSION['apellidoPaterno'] : 'app';
            $apellidom_usa_mov_up = isset($_SESSION['apellidoMaterno']) ? $_SESSION['apellidoMaterno'] : 'app';
            $id_comentario = $data['arr_data']['id_comentario']; 
            $redaccion = $data['arr_data']['comentario_act'];

            $sql = "UPDATE comentarios_mascota SET redaccion = '$redaccion' , FK_usuario_up = $FK_usuario_up, nombre_usa_mov_up = '$nombre_usa_mov_up', apellidop_usa_mov_up = '$apellidop_usa_mov_up',
            apellidom_usa_mov_up = '$apellidom_usa_mov_up', fecha_comentario_up  = current_timestamp() WHERE ID = $id_comentario";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => true);
                } else {
                    $result = array('success' => false, 'result' => 'error_execute_query', "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => 'error_conection_sql', "result_query_sql_error"=>$e->getMessage() );
            }

            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }


        function guardarEdicionMascota(){
            $request_body = file_get_contents('php://input');

            $data = json_decode($request_body , true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $FK_usuario_up = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1;
            $nombre_usa_mov_up = isset($_SESSION['nombre']) ? $_SESSION['nombre'] : 'app';
            $apellidop_usa_mov_up = isset($_SESSION['apellidoPaterno']) ? $_SESSION['apellidoPaterno'] : '';
            $apellidom_usa_mov_up = isset($_SESSION['apellidoMaterno']) ? $_SESSION['apellidoMaterno'] : '';

            $editNombreMascota =  $data['arr_data']['editNombreMascota'];
            $editFechaMascota =  $data['arr_data']['editFechaMascota'];

            $ID =  $data['arr_data']['ID'];
            $raza =  $data['arr_data']['raza'];
            $especie =  $data['arr_data']['especie'];
            $FK_especie =  $data['arr_data']['FK_especie'];
            $FK_raza =  $data['arr_data']['FK_raza'];

            $editSexoMascota =  $data['arr_data']['editSexoMascota'];
            $editColorMascota =  $data['arr_data']['editColorMascota'];
            $editRasgosMascota =  $data['arr_data']['editRasgosMascota'];
            $Edit_FK_dueno =  $data['arr_data']['Edit_FK_dueno'];

            $sql = "UPDATE mascotas SET nombre='$editNombreMascota',fechaNacimiento='$editFechaMascota',FK_especie=$FK_especie,especie='$especie',raza='$raza',FK_raza='$FK_raza',sexo='$editSexoMascota',color='$editColorMascota',
            rasgosParticulares='$editRasgosMascota', fechaUlmitoMovimiento = current_timestamp(),FK_dueno='$Edit_FK_dueno' WHERE ID = $ID";

            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $result = array('success' => true, 'result' => true);
                } else {
                    $result = array('success' => false, 'result' => 'error_execute_query', "result_query_sql_error"=>"Error no conocido" );
                }
            } catch (mysqli_sql_exception $e) {
                $result = array('success' => false, 'result' => 'error_conection_sql', "result_query_sql_error"=>$e->getMessage() );
            }

            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

    }

    
?>