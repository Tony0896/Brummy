<?php
namespace satisfaccion\satisfaccionModel;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    use conexionDB\Code AS ClaseConexionDB;
    require_once ( __DIR__ . '/../../conexion/dataBase.php' );
    class satisfaccionModel{

        function obtenerDataSatisfaccion($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $anio = $data['anio'];
            $mes = $data['mes'];

            $sql = "SELECT 
                (SELECT COUNT(ID) FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes}) as encuestasGeneradas,
                (SELECT COUNT(ID) FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND fechaContestacion IS NOT NULL) as encuestasContestadas,
                (SELECT COUNT(ID) FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND fechaContestacion IS NULL) as encuestasPorContestar,
                (SELECT COUNT(ID) FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND stars = 5) as estrellas_5,
                (SELECT COUNT(ID) FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND stars = 4) as estrellas_4,
                (SELECT COUNT(ID) FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND stars = 3) as estrellas_3,
                (SELECT COUNT(ID) FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND stars = 2) as estrellas_2,
                (SELECT COUNT(ID) FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND stars = 1) as estrellas_1";
                
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

        function obtenerDataPreguntas($data){
            $db = new ClaseConexionDB\ConexionDB();
            $conexion = $db->getConectaDB();

            $anio = $data['anio'];
            $mes = $data['mes'];
            $IDPregunta = $data['IDPregunta'];

            $sql = "SELECT
            (SELECT COUNT(ID) FROM encuestadetail WHERE respuesta = 1 AND FKPregunta = {$IDPregunta} AND FKHeader IN (SELECT ID FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND fechaContestacion IS NOT NULL)) as respuesta1,
            ('Necesita mejorar') as opcion1,
            (SELECT COUNT(ID) FROM encuestadetail WHERE respuesta = 2 AND FKPregunta = {$IDPregunta} AND FKHeader IN (SELECT ID FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND fechaContestacion IS NOT NULL)) as respuesta2,
            ('Normal') as opcion2,
            (SELECT COUNT(ID) FROM encuestadetail WHERE respuesta = 3 AND FKPregunta = {$IDPregunta} AND FKHeader IN (SELECT ID FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND fechaContestacion IS NOT NULL)) as respuesta3,
            ('Satisfactoria') as opcion3,
            (SELECT COUNT(ID) FROM encuestadetail WHERE respuesta = 4 AND FKPregunta = {$IDPregunta} AND FKHeader IN (SELECT ID FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND fechaContestacion IS NOT NULL)) as respuesta4,
            ('Buena') as opcion4,
            (SELECT COUNT(ID) FROM encuestadetail WHERE respuesta = 5 AND FKPregunta = {$IDPregunta} AND FKHeader IN (SELECT ID FROM encuestaheader WHERE YEAR(fechaCreacion) = {$anio} AND MONTH(fechaCreacion) = {$mes} AND fechaContestacion IS NOT NULL)) as respuesta5,
            ('Exelente') as opcion5,
            ({$IDPregunta}) as FKPregunta";
                
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