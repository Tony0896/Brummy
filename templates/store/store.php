<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<script type="text/javascript" src="./functions/store/store.js"></script>
    <div class="row" style="margin-bottom: 0.7em;">
        <div class="col-md-9 mb-2" style="display: flex;align-items: center;">
            <h4 class="card-title mb-0">Perfil Veterinaria</h4>
        </div>
    </div>

    <div class="card2">
        <div class="card-body">
            <div class="forms-sample">
                <h4 class="card-title">Datos de la Veterinaria</h4>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div style="display: flex;align-items: center;margin-bottom: 0px;" class="cointainer-info">
                                <h4 style="margin-right: 5px;margin-bottom: 0;"> Nombre </h4>
                                <div style="display: flex;justify-content: end;">
                                    <div class="buttom-green buttom" onclick="editaInfoVete(this.id)" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_nombre">
                                        <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> edit </i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="coolinput" style="width: 80%;display:none;" id="nombreVete_div">
                                <label name="Nombre" for="nombreVete" class="text">Nombre</label>
                                <input name="Nombre" type="text" class="input capitalize obligatorio" id="nombreVete_input" autocomplete="off" />
                            </div>
                            <span class="capitalize" style="padding: 10px;" id="nombreVete_span"></span>

                            <div id="nombreVete_btn" style="display:none;" >
                                <div class="buttom-blue buttom" onclick="guardarNombreVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>

                            <div id="Cancel_nombreVete_btn" style="display:none;" >
                                <div class="buttom-red buttom" onclick="cancelarNombreVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Cancelar
                                        <i class="material-icons"> cancel </i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-6 mb-2" style="display: flex;">
                        <div class="cointainer-info">
                            <h4> Logo </h4>
                            <div class="coolinput" style="margin-top: 12px;">
                                <div class="card__avatar" style="width: fit-content;"> 
                                    <img src="./../../Brummy/images/default.png" id="logoVeterinaria" onclick="verFotoMultimedia(this.src)" style="width: 130px !important;height: 130px !important;">
                                </div>
                            </div>
                        </div>
                        <div style="margin: auto;display:none;">
                            <div class="buttom-green buttom" onclick="editarLogoEmpresa(1);">
                                <span class="text-sm mb-0 span-buttom"> 
                                    Cambiar Logo
                                    <i class="material-icons"> crop_original </i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div style="display: flex;align-items: center;margin-bottom: 0px;" class="cointainer-info">
                                <h4 style="margin-right: 5px;margin-bottom: 0;"> Eslogan </h4>
                                <div style="display: flex;justify-content: end;">
                                    <div class="buttom-green buttom" onclick="editaInfoVete(this.id)" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_eslogan">
                                        <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> edit </i></span>
                                    </div>
                                </div>
                            </div>

                            <div class="coolinput" style="width: 80%;display:none;" id="esloganVete_div">
                                <label name="Eslogan" for="esloganVete" class="text">Eslogan</label>
                                <input name="Eslogan" type="text" class="input capitalize obligatorio" id="esloganVete_input" autocomplete="off" />
                            </div>
                            <span class="capitalize" style="padding: 10px;" id="esloganVete_span"></span>

                            <div id="esloganVete_btn" style="display:none;" >
                                <div class="buttom-blue buttom" onclick="guardaresloganVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>

                            <div id="Cancel_esloganVete_btn" style="display:none;" >
                                <div class="buttom-red buttom" onclick="cancelaresloganVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Cancelar
                                        <i class="material-icons"> cancel </i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div style="display: flex;align-items: center;margin-bottom: 0px;" class="cointainer-info">
                                <h4 style="margin-right: 5px;margin-bottom: 0;"> Descripción </h4>
                                <div style="display: flex;justify-content: end;">
                                    <div class="buttom-green buttom" onclick="editaInfoVete(this.id)" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_descripcion">
                                        <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> edit </i></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="coolinput" style="width: 80%;display:none;" id="descripcionVete_div">
                                <label name="Descripción" for="descripcionVete" class="text">Descripción</label>
                                <input name="Descripción" type="text" class="input capitalize obligatorio" id="descripcionVete_input" autocomplete="off" />
                            </div>
                            <span class="capitalize" style="padding: 10px;" id="descripcionVete_span"></span>

                            <div id="descripcionVete_btn" style="display:none;" >
                                <div class="buttom-blue buttom" onclick="guardardescripcionVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>

                            <div id="Cancel_descripcionVete_btn" style="display:none;" >
                                <div class="buttom-red buttom" onclick="cancelardescripcionVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Cancelar
                                        <i class="material-icons"> cancel </i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>

                <div class="row">
                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div style="display: flex;align-items: center;margin-bottom: 0px;" class="cointainer-info">
                                <h4 style="margin-right: 5px;margin-bottom: 0;"> Dirección </h4>
                                <div style="display: flex;justify-content: end;">
                                    <div class="buttom-green buttom" onclick="editaInfoVete(this.id)" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_direccion">
                                        <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> edit </i></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="direccionVete_div" style="width: 80%;display:none;">
                                <div class="coolinput">
                                    <label name="Calle" for="direccionVete" class="text">Calle</label>
                                    <input name="Calle" type="text" class="input capitalize obligatorio" id="calleVete_input" autocomplete="off" />
                                </div>
                                <div class="coolinput">
                                    <label name="Número" for="direccionVete" class="text">Número</label>
                                    <input name="Número" type="text" class="input capitalize obligatorio" id="numeroVete_input" autocomplete="off" />
                                </div>
                                <div class="coolinput">
                                    <label name="C.P." for="direccionVete" class="text">C.P.</label>
                                    <input name="C.P." type="text" class="input capitalize obligatorio" id="cpVete_input" autocomplete="off" />
                                </div>
                                <div class="coolinput">
                                    <label name="Col." for="direccionVete" class="text">Col.</label>
                                    <input name="Col." type="text" class="input capitalize obligatorio" id="colVete_input" autocomplete="off" />
                                </div>
                                <div class="coolinput">
                                    <label name="Municipio" for="direccionVete" class="text">Municipio/Alcaldía</label>
                                    <input name="Municipio" type="text" class="input capitalize obligatorio" id="municipioVete_input" autocomplete="off" />
                                </div>
                                <div class="coolinput">
                                    <label name="Estado" for="direccionVete" class="text">Estado</label>
                                    <input name="Estado" type="text" class="input capitalize obligatorio" id="estadoVete_input" autocomplete="off" />
                                </div>
                            </div>
                            
                            <span class="capitalize" style="padding: 10px;" id="direccionVete_span"></span>

                            <div id="direccionVete_btn" style="display:none;" >
                                <div class="buttom-blue buttom" onclick="guardardireccionVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>

                            <div id="Cancel_direccionVete_btn" style="display:none;" >
                                <div class="buttom-red buttom" onclick="cancelardireccionVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Cancelar
                                        <i class="material-icons"> cancel </i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div style="display: flex;align-items: center;margin-bottom: 0px;" class="cointainer-info">
                                <h4 style="margin-right: 5px;margin-bottom: 0;"> Horarios </h4>
                                <div style="display: flex;justify-content: end;">
                                    <div class="buttom-green buttom" onclick="editaInfoVete(this.id)" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_horarios">
                                        <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> edit </i></span>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="horariosVete_span" style="display: flex;flex-direction: column;font-weight: 600;">

                            </div>

                            <div id="horariosVete_div" style="width: 80%;display:none;">
                                <div class="coolinput">
                                    <label name="Día 1" for="diaVete_1" class="text">Día 1</label>
                                    <select name="Día 1" type="text" class="input capitalize obligatorio" id="diaVete_1" autocomplete="off">
                                        <option value="">Selecciona una opción</option>
                                        <option value="1" abreviacion ="Lu">Lunes</option>
                                        <option value="2" abreviacion ="Ma">Martes</option>
                                        <option value="3" abreviacion ="Mi">Miércoles</option>
                                        <option value="4" abreviacion ="Ju">Jueves</option>
                                        <option value="5" abreviacion ="Vi">Viernes</option>
                                        <option value="6" abreviacion ="Sá">Sábado</option>
                                        <option value="7" abreviacion ="Do">Domingo</option>
                                    </select>
                                </div>
                                
                                <div class="coolinput">
                                    <label name="" for="diaVete_2" class="text">Día 2</label>
                                    <select name="Día 2" type="text" class="input capitalize obligatorio" id="diaVete_2" autocomplete="off">
                                        <option value="">Selecciona una opción</option>
                                        <option value="1" abreviacion ="Lu">Lunes</option>
                                        <option value="2" abreviacion ="Ma">Martes</option>
                                        <option value="3" abreviacion ="Mi">Miércoles</option>
                                        <option value="4" abreviacion ="Ju">Jueves</option>
                                        <option value="5" abreviacion ="Vi">Viernes</option>
                                        <option value="6" abreviacion ="Sá">Sábado</option>
                                        <option value="7" abreviacion ="Do">Domingo</option>
                                    </select>
                                </div>

                                <div class="coolinput">
                                    <label name="" for="diaVete_cerrado" class="text">Abierto/Cerrado</label>
                                    <select name="Abierto/Cerrado" type="text" class="input capitalize obligatorio" id="diaVete_cerrado" autocomplete="off" onchange="cambioDeDia()">
                                        <option value="Abierto" selected>Abierto</option>
                                        <option value="Cerrado">Cerrado</option>
                                    </select>
                                </div>

                                <div class="coolinput" id="div_horario1">
                                    <label name="" for="horario_1" class="text">Horario Apertura</label>
                                    <input name="Horario Inicio" type="time" class="input capitalize obligatorio" id="horario_1" autocomplete="off" />
                                </div>

                                <div class="coolinput" id="div_horario2">
                                    <label name="" for="horario_2" class="text">Horario Cierre</label>
                                    <input name="Horario Fin" type="time" class="input capitalize obligatorio" id="horario_2" autocomplete="off" />
                                </div>
                            </div>

                            <div id="horariosVete_btn" style="display:none;" >
                                <div class="buttom-blue buttom" onclick="guardarhorariosVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>

                            <div id="Cancel_horariosVete_btn" style="display:none;" >
                                <div class="buttom-red buttom" onclick="cancelarhorariosVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Cancelar
                                        <i class="material-icons"> cancel </i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div style="display: flex;align-items: center;margin-bottom: 0px;" class="cointainer-info">
                                <h4 style="margin-right: 5px;margin-bottom: 0;"> Número de contacto </h4>
                                <div style="display: flex;justify-content: end;">
                                    <div class="buttom-green buttom" onclick="editaInfoVete(this.id)" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_contactos">
                                        <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> add_circle </i></span>
                                    </div>
                                </div>
                            </div>

                            <div id="contactosVete_span" style="display: flex;flex-direction: column;font-weight: 600;">
                                <!-- <span class="capitalize" style="padding: 10px;" id="nombreMascota">Hola</span> -->
                            </div>

                            <div id="contactosVete_div" style="width: 80%;display:none;flex-direction: column;">
                                <div class="coolinput">
                                    <label name="Nombre Contacto" for="nombreVeteContacto_input" class="text">Nombre Contacto</label>
                                    <input name="Nombre Contacto" type="text" class="input capitalize obligatorio" id="nombreVeteContacto_input" autocomplete="off" />
                                </div>
                                <div class="coolinput">
                                    <label name="Número" for="numeroVeteContacto_input" class="text">Número</label>
                                    <input name="Número" type="text" class="input capitalize obligatorio" id="numeroVeteContacto_input" autocomplete="off" />
                                </div>
                            </div>                        

                            <div id="contactosVete_btn" style="display:none;" >
                                <div class="buttom-blue buttom" onclick="guardarcontactosVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>

                            <div id="Cancel_contactosVete_btn" style="display:none;" >
                                <div class="buttom-red buttom" onclick="cancelarcontactosVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Cancelar
                                        <i class="material-icons"> cancel </i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div style="display: flex;align-items: center;margin-bottom: 0px;" class="cointainer-info">
                                <h4 style="margin-right: 5px;margin-bottom: 0;"> Redes sociales </h4>
                                <div style="display: flex;justify-content: end;">
                                    <div class="buttom-green buttom" onclick="editaInfoVete(this.id)" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_redes">
                                        <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> add_circle </i></span>
                                    </div>
                                </div>
                            </div>

                            <div id="redesVete_span" style="display: flex;flex-direction: column;font-weight: 600;">
                                <!-- <span class="capitalize" style="padding: 10px;" id="nombreMascota">Hola</span> -->
                            </div>

                            <div id="redesVete_div" style="width: 80%;display:none;flex-direction: column;">
                                <div class="coolinput">
                                    <label name="Red Social" for="redSocial_input" class="text">Red Social</label>
                                    <select name="Red Social" type="text" class="input capitalize obligatorio" id="redSocial_input" autocomplete="off">
                                        <option value="Facebook">Facebook</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="X (antes Twitter)">X (antes Twitter)</option>
                                        <option value="YouTube">YouTube</option>
                                    </select>
                                </div>
                                <div class="coolinput">
                                    <label name="URL" for="urlRedSocial_input" class="text">URL/Nombre</label>
                                    <input name="URL" type="text" class="input capitalize obligatorio" id="urlRedSocial_input" autocomplete="off" />
                                </div>
                            </div>  
                            
                            <div id="redesVete_btn" style="display:none;" >
                                <div class="buttom-blue buttom" onclick="guardarredesVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>

                            <div id="Cancel_redesVete_btn" style="display:none;" >
                                <div class="buttom-red buttom" onclick="cancelarredesVete();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Cancelar
                                        <i class="material-icons"> cancel </i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>  

<?php 
    require_once('./../components/modal.php');
?>