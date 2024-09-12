<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<style>
    .card{
        box-shadow: none;
        background-color: transparent;
    }
</style>
<script type="text/javascript" src="./functions/mascotas/perfilMascota.js"></script>
    <div class="row" style="margin-bottom: 0.7em;">
        <div class="col-md-12 mb-2" style="display: flex;align-items: center;">
            <p class="backButton" onclick="regresaMascotas()"><span class='material-icons'>arrow_back_ios_new</span> <span>REGRESAR</span> </p>
        </div>
    </div>
    
    <div class="forms-sample">
        <div class="row" style="margin-bottom: 0.7em;">
            <div class="col-md-8 mb-2" style="display: flex;align-items: center;">
                <div class="card2">
                    <div class="card-body">
                        <h4 class="card-title">Datos Mascota</h4>
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <div class="card__avatar" style="width: fit-content;"> 
                                    <img src="./../../Brummy/images/default.png" id="fotoMascotaPerfil" onclick="verFotoMultimedia(this.src)">
                                </div>
                            </div>
                            <div class="col-md-6 mb-2" style="margin-top: auto;margin-bottom: auto !important;">
                                <div class="buttom-green buttom" onclick="editarFotoMascota(localStorage.getItem('IDMascota'));">
                                    <span class="text-sm mb-0 span-buttom"> 
                                        Cambiar Foto
                                        <i class="material-icons"> crop_original </i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <div class="cointainer-info">
                                    <h4> Nombre </h4>
                                    <span class="capitalize" style="padding: 10px;" id="nombreMascota_perf"></span>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="cointainer-info">
                                    <h4> Fecha Nacimiento </h4>
                                    <span class="capitalize" style="padding: 10px;" id="fechaMascota_perf"></span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <div class="cointainer-info">
                                    <h4> Relación Especie </h4>
                                    <span class="capitalize" style="padding: 10px;" id="relacionEspecie_perf"></span>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="cointainer-info">
                                    <h4> Sexo </h4>
                                    <span class="capitalize" style="padding: 10px;" id="sexoMascota_perf"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <div class="cointainer-info">
                                    <h4> Color </h4>
                                    <span class="capitalize" style="padding: 10px;" id="colorMascota_perf"></span>
                                </div>
                            </div>
                            <div class="col-md-6 mb-2">
                                <div class="cointainer-info">
                                    <h4> Rasgos Particulares </h4>
                                    <span class="capitalize" style="padding: 10px;" id="rasgosMascota_perf"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-4 mb-2">
                                <div class="cointainer-info">
                                    <h4> Dueño </h4>
                                    <span class="capitalize" style="padding: 10px;" id="FK_dueno_perf"></span>
                                </div>
                            </div>
                            <div class="col-md-4 mb-2">
                                <div class="buttom-red buttom" onclick="eliminarMascota(localStorage.getItem('IDMascota'));">
                                    <span class="text-sm mb-0 span-buttom"> 
                                        Eliminar
                                        <i class="material-icons"> delete </i>
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-4 mb-2" id="btn_editar_mascota">
                                <!-- <div class="buttom-blue buttom" onclick="editarMascota(localStorage.getItem('IDMascota'));">
                                    <span class="text-sm mb-0 span-buttom"> 
                                        Editar
                                        <i class="material-icons"> edit </i>
                                    </span>
                                </div> -->
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-2" style="display: flex;">
                <div class="card2">
                    <div class="card-body">
                        <div class="divNotas">
                            <h4 class="card-title">Comentarios</h4>
                            <div class="buttom-green buttom" onclick="crearComentarioMascota()">
                                <span class="text-sm mb-0">Crear <i class="material-icons"> add_circle </i></span>
                            </div>
                        </div>
                        <div id = "content_comentario">
                            <!-- <h4><small class="text-muted"> Sin comentarios adicionales </small> </h4> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" style="margin-bottom: 0.7em;">
            <div class="col-md-2 mb-2" style="display: flex;align-items: center;"></div>
            <div class="col-md-8 mb-2" style="display: flex;align-items: center;">
                <div class="card2">
                    <div class="card-body">
                        <div class="divNotas">
                            <h4 class="card-title">Historial</h4>
                            <div class="buttom-green buttom" onclick="crearHistoriaManual()" style="margin:0; height: fit-content;margin-right: 15px;">
                                <span class="text-sm mb-0">Crear <i class="material-icons"> add_circle </i></span>
                            </div>
                        </div>
                        
                        <div class="rb-container" style="max-height: 500px; overflow-y: scroll;padding-top: 15px;pointer-events: all;padding-left: 15px; text-align: center;">
                            <ul class="rb" style="margin: 0;" id="historialMascotaSpace">
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 mb-2" style="display: flex;align-items: center;"></div>
        </div>
    </div>


    <!-- <div class="col-lg-2" style="display: flex; justify-content: end;">
        <div class="btn-group dropup" role="group">
            <div class="buttom-blue buttom  style="margin:0; height: fit-content;margin-right: 15px;">
                <span class="text-sm mb-0 span_nowrap">Filtrar <i class="material-icons"> filter_alt </i></span>
            </div>
            
        </div>
    </div> -->
<?php 
    require_once('./../components/modal.php');
?>