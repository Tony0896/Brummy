<?php
namespace login\loginModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class loginModel{ 

        function validarLogin($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $usuario = $data['usuario'];
            $pass = $data['contrasena'];

            $sql = "SELECT usuario_usua,contrasena_usua FROM usuariosbrummy WHERE usuario_usua = '$usuario'";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $pw = $row['contrasena_usua'];
                            $pwd = md5($pass);
                            if($pwd == $pw){
                                $result = array('success' => true, 'result' => 'OK', 'code' => 200 );
                            } else{
                                $result = array('success' => true, 'result' => 'Contraseña Incorrecta', 'code' => 202 );
                            }
                        }
                    } else {
                        $result = array('success' => true, 'result' => 'Usuario No encontrado', 'code' => 202 );
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

        function creaSession($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $usuario = $data['usuario'];
            
            $sql = "SELECT ID, correo_usua, contacto_usua, usuario_usua, tipo_usua, estatus_usua, flag_visible_usua, fecha_vencimiento, nombre, apellidoPaterno, apellidoMaterno, empresa FROM usuariosbrummy WHERE usuario_usua = '$usuario'";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        @session_start();
                        while($row = mysqli_fetch_assoc($stmt)) {
                            $_SESSION['ID_usuario'] = $row['ID'];
                            $_SESSION['correo_usua'] = $row['correo_usua'];
                            $_SESSION['contacto_usua'] = $row['contacto_usua'];
                            $_SESSION['usuario_usua'] = $row['usuario_usua'];
                            $_SESSION['tipo_usua'] = $row['tipo_usua'];
                            $_SESSION['estatus_usua'] = $row['estatus_usua'];
                            $_SESSION['flag_visible_usua'] = $row['flag_visible_usua'];
                            $_SESSION['fecha_vencimiento'] = $row['fecha_vencimiento'];
                            $_SESSION['nombre'] = $row['nombre'];
                            $_SESSION['apellidoPaterno'] = $row['apellidoPaterno'];
                            $_SESSION['apellidoMaterno'] = $row['apellidoMaterno'];
                            $_SESSION["token"] = base64_encode($row['ID'].strtotime("now").rand(0,100).$row['usuario_usua']);
                            $_SESSION["empresa"] = $row['empresa'];
                            $result = array('success' => true, 'result' => 'OK', 'code' => 200 );
                        }
                    } else {
                        $result = array('success' => true, 'result' => 'Usuario No encontrado', 'code' => 202 );
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

        function cargaPermisos($ID_usuario){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT * FROM vw_usuariosmodulo WHERE estatus = 1 AND FK_usuario = $ID_usuario AND FK_aplicativo = 1";
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

        function dataHeader(){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $success = 200;
            $errores = '';
            
            $sql = "SELECT COUNT(ID) as cuentaAgenda,fechaCita FROM citas WHERE fechaCita = CURRENT_DATE();";
            try{
                $stmt = mysqli_query($conexion, $sql);
                if($stmt){
                    $rowcount=mysqli_num_rows($stmt);   
                    if ( $rowcount ) {
                        $row = mysqli_fetch_assoc($stmt);
                    } else{
                        $result = array('success' => true, 'result' => 'Sin Datos');
                    }
                }
            } catch (mysqli_sql_exception $e) {
                $success = 500;
                $errores = $errores.$e->getMessage();
            }

            $sql1 = "SELECT COUNT(ID) as cuentaAtendidas,fechaCita FROM citas WHERE estatus = 2 AND fechaCita = CURRENT_DATE();";
            try{
                $stmt1 = mysqli_query($conexion, $sql1);
                if($stmt1){
                    $rowcount1=mysqli_num_rows($stmt1);   
                    if ( $rowcount1 ) {
                        $row1 = mysqli_fetch_assoc($stmt1);
                    }
                } 
            } catch (mysqli_sql_exception $e) {
                $success = 500;
                $errores = $errores.$e->getMessage();
            }

            $sql2 = "SELECT SUM(price - devuelto) as cuenta FROM ventaheader WHERE DATE(fechaCreacion) = CURRENT_DATE();";
            try{
                $stmt2 = mysqli_query($conexion, $sql2);
                if($stmt2){
                    $rowcount2=mysqli_num_rows($stmt2);
                    if ( $rowcount2 ) {
                        $row2 = mysqli_fetch_assoc($stmt2);
                    } 
                }
            } catch (mysqli_sql_exception $e) {
                $success = 500;
                $errores = $errores.$e->getMessage();
            }

            $array[] = array(
                'cuentaAgenda' => $row['cuentaAgenda'],
                'cuentaAtendidas' => $row1['cuentaAtendidas'],
                'cuenta' => $row2['cuenta'],
                'fechaCita' => $row['fechaCita'],
            );

            $result = array('success' => true, 'result' => $array);
            
            mysqli_close( $conexion );
            $resultJson = json_encode( $result );
            return $resultJson;
        }

        function getProximasCitas(){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT nombreCita, FKnombreMascota, nombreMascota FROM citas WHERE fechaCita = CURRENT_DATE() AND estatus = 1 LIMIT 5;";
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

        function getLastVentas(){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);

            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT ID, FlagProducto, FKProducto, total FROM ventadetalle WHERE YEAR(fechaCreacion) = YEAR(CURRENT_DATE()) AND MONTH(fechaCreacion) = MONTH(CURRENT_DATE()) GROUP BY FKProducto ORDER BY ID DESC LIMIT 5;";
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
             
        function topProductos(){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT SUM(cantidad) as suma, FlagProducto, FKProducto FROM ventadetalle WHERE YEAR(fechaCreacion) = YEAR(CURRENT_DATE()) AND MONTH(fechaCreacion) = MONTH(CURRENT_DATE()) GROUP BY FKProducto ORDER BY suma DESC LIMIT 5;";
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

        function getCitasPorConfirmar(){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT re.ID, re.FKNombreCliente, re.nombreCliente, re.tipoRecurrencia, re.fechaRecurrenca, re.ID_mov, re.estatus, re.agendada, ci.FKnombreMascota, ci.nombreMascota FROM recurrencia_clientes re 
            INNER JOIN citas ci ON re.ID_mov = ci.ID WHERE re.tipoRecurrencia = 1  AND re.estatus = 1  AND re.fechaRecurrenca > CURRENT_DATE ()  AND re.fechaRecurrenca <= DATE_ADD( CURRENT_DATE (), INTERVAL 5 DAY );";
            
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

        function getCitasPorConfirmarMes($data){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $fecha = $data['fecha'];

            // $sql = "SELECT re.ID, re.FKNombreCliente, re.nombreCliente, re.tipoRecurrencia, re.fechaRecurrenca, re.ID_mov, re.estatus, re.agendada, ci.FKnombreMascota, ci.nombreMascota,
            // TIMESTAMPDIFF( YEAR, re.fechaRecurrenca, ('$fecha')) AS Yrs,
            // TIMESTAMPDIFF( MONTH, re.fechaRecurrenca, ('$fecha'))% 12 AS Mth,
            // TIMESTAMPDIFF( DAY, ( re.fechaRecurrenca + INTERVAL TIMESTAMPDIFF( YEAR, re.fechaRecurrenca, ('$fecha')) YEAR + INTERVAL TIMESTAMPDIFF( MONTH, re.fechaRecurrenca, '$fecha')% 12 MONTH  ), '$fecha') AS Dayss
            // FROM recurrencia_clientes re INNER JOIN citas ci ON re.ID_mov = ci.ID  WHERE re.tipoRecurrencia = 30 AND re.estatus = 1";

            $sql = "SELECT re.ID, re.FKNombreCliente, re.nombreCliente, re.tipoRecurrencia, re.fechaRecurrenca, re.ID_mov, re.estatus, re.agendada, ci.FKnombreMascota, ci.nombreMascota FROM recurrencia_clientes re 
            INNER JOIN citas ci ON re.ID_mov = ci.ID WHERE re.tipoRecurrencia IN (7,14,30) AND re.estatus = 1";
            
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

        function getProductosAgotar(){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT (stockReal - stockMinimo) as resta, codigo, nombre,	descripcion, stockMinimo, stockReal FROM inventario WHERE tipo = 'Producto' AND estatus = 1 ORDER BY resta;";
            
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

        function cargarMascotasResguardo(){
            // $request_body = file_get_contents('php://input');
            // $data = json_decode($request_body, true);
            
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $sql = "SELECT ID, FK_mascota,nombre, FKCita, fechaEntrada, fechaFinCita,fechaSalida,estatus,nameEstatus, getDiferenciaTiempo(fechaEntrada, fechaFinCita) tiempoEnCita, getDiferenciaTiempo(fechaFinCita, fechaSalida) as tiempoEnResguardo FROM mascotas_resguardo WHERE estatus <> 3;";
            
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

        function guardaDocs($ARR_DATOS_PACKAGE){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $ARR_DATA_FORM = $ARR_DATOS_PACKAGE['DATA_USERS_INFO'][0];
            $DATOS_PACKAGE_SESSION = $ARR_DATOS_PACKAGE['DATOS_SESSION'];

            $val_arr_files = intval($ARR_DATA_FORM['data_post']['NoDocs']);
            $IDAccion = $ARR_DATA_FORM['data_post']['IDAccion'];
            $IDModulo = $ARR_DATA_FORM['data_post']['IDModulo'];
            $FKPertenece = $ARR_DATA_FORM['data_post']['FKPertenece'];
            $NombreModulo = $ARR_DATA_FORM['data_post']['NombreModulo'];
            $estatus = 1;
            $msj_exist_directory = '';

            if ($val_arr_files > 0) {
                if($IDAccion == 1){
                    $ruta_mov_file = 'Brummy/images/HPS/Mascotas/Perfil';
                    $motivoMovimiento = 'Foto mascota agregada';
                    $sql = "UPDATE multimedia SET estatus = 0, motivoMovimiento = 'Foto actualizada' WHERE FKPertenece = $FKPertenece AND IDModulo = $IDModulo AND IDAccion = $IDAccion;";
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

                for ($i=0; $i < $val_arr_files ; $i++) {
                    $name_inique = "/". uniqid()."_".$ARR_DATA_FORM['data_files'][$i]['name'];
                    if ( move_uploaded_file( $ARR_DATA_FORM['data_files'][$i]['tmp_name'],$_SERVER["DOCUMENT_ROOT"].'/'.$ruta_mov_file.$name_inique) ) {
                        $ruta_anexo = $ruta_mov_file.$name_inique;
                        $movi_status = 200;
                        
                        $FKUsuarioCrea = isset($_SESSION['ID_usuario']) ? $_SESSION['ID_usuario'] : '1';
                        $nombre = isset($_SESSION['nombre']) ? $_SESSION['nombre'] : 'app';
                        $apellidop = isset($_SESSION['apellidoPaterno']) ? $_SESSION['apellidoPaterno'] : 'app';
                        $apellidom = isset($_SESSION['apellidoMaterno']) ? $_SESSION['apellidoMaterno'] : 'app';
                        $FlagUsuarioCrea = $nombre.' '.$apellidop.' '.$apellidom;

                        $sql = "INSERT INTO multimedia (urlAnexo, FKPertenece, IDModulo, IDAccion, NombreModulo, motivoMovimiento, estatus, FKUsuarioCrea, FlagUsuarioCrea)
                        VALUES('$ruta_anexo', $FKPertenece, $IDModulo, $IDAccion, '$NombreModulo', '$motivoMovimiento', $estatus, $FKUsuarioCrea, '$FlagUsuarioCrea')";

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

                    } else {
                        $movi_status = 500;
                    }
                }

            } else {
                $movi_status = 200;
            }

            mysqli_close( $conexion );
            $resultJson = json_encode( $movi_status );
            return $resultJson;
        }
    }
?>