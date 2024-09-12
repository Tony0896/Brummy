<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<script type="text/javascript" src="./functions/mascotas/mascotas.js"></script>
    <div class="row" style="margin-bottom: 0.7em;">
        <div class="col-md-9 mb-2" style="display: flex;align-items: center;">
            <h4 class="card-title mb-0">Mascotas</h4>
        </div>
        <div class="col-md-3 mb-2" style="display: flex;justify-content: end;">
            <div class="buttom-green buttom" onclick="crearMascota()">
                <span class="text-sm mb-0">Agregar <i class="material-icons"> add_circle </i></span>
            </div>
        </div>
    </div>
    
    <div class="card2">
        <div class="card-body">
            <div class="forms-sample">
                <table class="mdl-data-table table responsive table-bordered table-striped datatable" style="width:100%">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th></th>
                            <th>Mascota</th>
                            <th>Dueño</th>
                            <th>Fecha N.</th>
                            <th>Sexo</th>
                            <th>Color</th>
                            <th>Última actividad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="mascotasBody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

<?php 
    require_once('./../components/modal.php');
?>