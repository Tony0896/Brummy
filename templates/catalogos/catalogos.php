<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<script type="text/javascript" src="./functions/catalogos/catalogos.js"></script>
    <div class="card2">
        <div class="card-body">
            <div class="forms-sample">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
                            Especies
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
                            Razas
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="motivosCita-tab" data-bs-toggle="tab" data-bs-target="#motivosCita" type="button" role="tab" aria-controls="motivosCita" aria-selected="false" style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
                            Motivos
                        </button>
                    </li>
                    <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link" id="rechazosCita-tab" data-bs-toggle="tab" data-bs-target="#rechazosCita" type="button" role="tab" aria-controls="rechazosCita" aria-selected="false" style="border-top-left-radius: 10px;border-top-right-radius: 10px;">
                            Rechazos
                        </button>
                    </li> -->
                    <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">
                            Contact
                        </button>
                    </li> -->
                </ul>
                <div class="tab-content px-0 pt-0 pb-0" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">  
                        <div class="row" style="margin-bottom: 0.7em;">
                            <div class="col-md-12 mb-2" style="display: flex;justify-content: end;">
                                <div class="buttom-green buttom" onclick="crearNuevaEspecie()">
                                    <span class="text-sm mb-0">Crear <i class="material-icons"> add_circle </i></span>
                                </div>
                            </div>
                        </div>
                        <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Especie</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="especiesBody">
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"> 
                        <div class="row" style="margin-bottom: 0.7em;">
                            <div class="col-md-12 mb-2" style="display: flex;justify-content: end;">
                                <div class="buttom-green buttom" onclick="crearNuevaRaza()">
                                    <span class="text-sm mb-0">Crear <i class="material-icons"> add_circle </i></span>
                                </div>
                            </div>
                        </div>
                        <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Especie</th>
                                    <th>Raza</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="razasBody">
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="motivosCita" role="tabpanel" aria-labelledby="motivosCita-tab"> 
                        <div class="row" style="margin-bottom: 0.7em;">
                            <div class="col-md-12 mb-2" style="display: flex;justify-content: end;">
                                <div class="buttom-green buttom" onclick="crearNuevoMotivo()">
                                    <span class="text-sm mb-0">Crear <i class="material-icons"> add_circle </i></span>
                                </div>
                            </div>
                        </div>
                        <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Motivo</th>
                                    <th>Tiempo <br> Estimado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="motivosCitaBody">
                            </tbody>
                        </table>
                    </div>
                    <!-- <div class="tab-pane fade" id="rechazosCita" role="tabpanel" aria-labelledby="rechazosCita-tab"> 
                        <div class="row" style="margin-bottom: 0.7em;">
                            <div class="col-md-12 mb-2" style="display: flex;justify-content: end;">
                                <div class="buttom-green buttom" onclick="crearNuevoMotivoRechazo()">
                                    <span class="text-sm mb-0">Crear <i class="material-icons"> add_circle </i></span>
                                </div>
                            </div>
                        </div>
                        <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Motivo Rechazo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="rechazosCitaBody">
                            </tbody>
                        </table>
                    </div> -->
                    
                    <!-- <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"> data => contact-tab </div> -->
                </div>
            </div>        
        </div>
    </div>

<?php 
    require_once('./../components/modal.php');
?>