<?php
namespace encuestas\encuestasModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class encuestasModel{

        function guardarPregunta($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $pregunta = $data['pregunta'];
            $tipoPregunta = $data['tipoPregunta'];
            $tipoPregunta == 1 ? $flagTipoPregunta = 'Opciones' : $flagTipoPregunta = 'Abierta';
            $FKUserMovimiento = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1 ;
            $FlaguserMov = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "INSERT INTO encuestapreguntas (Pregunta, tipoPregunta, flagTipoPregunta, FKUserMovimiento, FlaguserMov, MotivoMov)
            VALUES ('$pregunta', '$tipoPregunta', '$flagTipoPregunta', '$FKUserMovimiento', '$FlaguserMov', 'Nueva Pregunta Creada')";
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
        
        function obtenerEncuestas(){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT * FROM encuestapreguntas WHERE estatus = 1";
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

        function eliminarPregunta($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $IDpregunta = $data['ID'];
            $FKUserMovimiento = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1 ;
            $FlaguserMov = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "UPDATE encuestapreguntas SET estatus = 0, FKUserMovimiento = $FKUserMovimiento, FlaguserMov = '$FlaguserMov', MotivoMov = 'Eliminacion Pregunta', fechaMov = CURRENT_TIMESTAMP() WHERE ID = $IDpregunta";
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

        function obtenerDataEncuesta($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $IDpregunta = $data['ID'];

            $sql = "SELECT * FROM encuestapreguntas WHERE ID = $IDpregunta";
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

        function actualizarPregunta($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $pregunta = $data['pregunta'];
            $tipoPregunta = $data['tipoPregunta'];
            $IDpregunta = $data['ID'];
            $tipoPregunta == 1 ? $flagTipoPregunta = 'Opciones' : $flagTipoPregunta = 'Abierta';
            $FKUserMovimiento = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : 1 ;
            $FlaguserMov = isset($_SESSION['nombre']) ? $_SESSION['nombre'].' '.$_SESSION['apellidoPaterno'].' '.$_SESSION['apellidoMaterno'] : 'app';

            $sql = "UPDATE encuestapreguntas SET fechaMov = CURRENT_TIMESTAMP(), Pregunta = '$pregunta', tipoPregunta = $tipoPregunta, 
            flagTipoPregunta = '$flagTipoPregunta', FKUserMovimiento = $FKUserMovimiento, FlaguserMov = '$FlaguserMov', MotivoMov = 'Edición Pregunta' 
            WHERE ID = $IDpregunta";
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

        function validaEncuesta($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $IDpregunta = $data['ID'];

            $sql = "SELECT ID FROM encuestaheader WHERE FKCita = $IDpregunta AND fechaContestacion IS NOT NULL";
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

        function guardarHeaderEncuesta($IDCita, $valorEncuesta, $comentario_sugerencia){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "UPDATE encuestaheader SET comentariosEncuesta = '$comentario_sugerencia', stars = $valorEncuesta, fechaContestacion = CURRENT_TIMESTAMP() WHERE FKCita = $IDCita";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $sql = "SELECT ID FROM encuestaheader WHERE FKCita = $IDCita";
                    try{
                        $stmt = mysqli_query($conexion, $sql);
                        if($stmt){
                            $rowcount=mysqli_num_rows($stmt);   
                            if ( $rowcount ) {
                                while($row = mysqli_fetch_assoc($stmt)) {
                                    $array[] =$row;
                                    $IDReg = $row['ID'];
                                }
                                
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
            return $IDReg;
        }

        function guardarDetailsEncuesta($FKHeader, $FKPregunta, $respuesta){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "INSERT INTO encuestadetail (FKHeader, FKPregunta, respuesta, fechaCreacion)
            VALUES ($FKHeader, $FKPregunta, $respuesta, CURRENT_TIMESTAMP())";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $IDDetail = 200;
                } else {
                    $IDDetail = 500;
                }
            } catch (mysqli_sql_exception $e) {
                $IDDetail = 550;
            }
            
            mysqli_close( $conexion );
            return $IDDetail;
        }

        function guardarEncuesta($data){
            $IDCita = $data['IDCita'];
            $valorEncuesta = $data['valorEncuesta'];
            $comentario_sugerencia = $data['comentario_sugerencia'];
            $ids = $data['ids'];
            $valores = $data['valores'];

            $FKHeader = $this->guardarHeaderEncuesta($IDCita, $valorEncuesta, $comentario_sugerencia);

            foreach ($ids as $key=>$value) {
                if($value != 'comentario_sugerencia'){
                    $FKPregunta = str_replace("pregunta_","",$value);
                    $respuesta = $valores[$key];
                    $response = $this->guardarDetailsEncuesta($FKHeader, $FKPregunta, $respuesta);
                }
            }

            $result = array('success' => true, 'result' => 'Sin Datos');
            $resultJson = json_encode( $result );
            return $resultJson;
        }
    }
?>