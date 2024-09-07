<?php
session_start();
if(isset ( $_SESSION['ID_usuario'] ) ){
    $ID_usuario = $_SESSION['ID_usuario']; 
    if($ID_usuario == ''){
        $boolean_session = false;
    } else {
        $boolean_session = true;
    }
} else {
    $boolean_session = false;
}

if( !$boolean_session ){
    session_unset(); 
    session_destroy();
    header("Location: /Brummy/");
}
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Brummy</title>
        <!-- <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /> -->
        <link href="./css/CDN/Material_Icons.css" rel="stylesheet" />
        <link href="./css/CDN/sweetalert2.min.css" rel="stylesheet" />
        <link rel="stylesheet" media="all" href="./css/ispinner.prefixed.css" />
        <!-- plugins:css -->
        <link rel="stylesheet" href="./vendors/feather/feather.css" />
        <link rel="stylesheet" href="./vendors/ti-icons/css/themify-icons.css" />
        <link rel="stylesheet" href="./vendors/css/vendor.bundle.base.css" />
        <!-- endinject -->
        <!-- Plugin css for this page -->
        <link rel="stylesheet" href="./vendors/select2/select2.min.css" />
        <link rel="stylesheet" href="./vendors/select2-bootstrap-theme/select2-bootstrap.min.css" />
        <!-- End plugin css for this page -->
        <!-- inject:css -->
        <link rel="stylesheet" href="./css/vertical-layout-light/style.css" />
        <link rel="stylesheet" href="./css/brummy.css" />
        <!-- endinject -->
        <link rel="shortcut icon" href="./images/cuadrado_sin_fondo.png" />

        <link rel="stylesheet" href="./libraries/datatables-1.12.1/jquery.dataTables.min.css" />
        <link rel="stylesheet" href="./libraries/datatables-1.12.1/responsive/2.3.0/responsive.dataTables.min.css" />
        <link rel="stylesheet" href="./libraries/jsCalendar/jsCalendar.min.css" />
        <link rel="stylesheet" href="./libraries/mdtimepicker/mdtimepicker.css" />
        <link rel="stylesheet" href="./libraries/duDatepicker/duDatepicker.css" />
        <link rel="stylesheet" media="all" href="./css/CDN/cropper.css" />
    </head>

    <style>
        .card {
            box-shadow: none;
            background-color: transparent;
        }
        .table.dashTable thead > tr > th {
            background-color: #009071;
            color: #fff;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .p_marquee {
            color: #6c7383;
            margin-top: 0;
            font-weight: 500;
            line-height: 1;
            font-size: 1rem;
        }
    </style>
    <body>
        <div class="modal modals fade bd-example-modal-lg" data-backdrop="static" data-keyboard="false" tabindex="-1">
            <div class="modal-dialog modal-sm">
                <div class="modal-content" style="width: 48px">
                    <div class="ispinner ispinner-large">
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                        <div class="ispinner-blade"></div>
                    </div>
                </div>
            </div>
        </div>
        <?php include_once('./templates/components/modalAlert.php'); ?>
        <?php include_once('./templates/components/modal.php'); ?>
        <div class="container-scroller no_print">
            <nav class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row" style="user-select: none">
                <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                    <div class="me-3">
                        <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-bs-toggle="minimize">
                            <span class="material-icons"> menu </span>
                        </button>
                    </div>
                    <div>
                        <a class="navbar-brand brand-logo" href="./dashboard.php">
                            <img src="./images/large.png" alt="logo" />
                        </a>
                        <a class="navbar-brand brand-logo-mini" href="./dashboard.php">
                            <img src="./images/cuadrado_sin_fondo.png" alt="logo" />
                        </a>
                    </div>
                </div>
                <div class="navbar-menu-wrapper d-flex align-items-top">
                    <ul class="navbar-nav">
                        <li class="nav-item font-weight-semibold d-none d-lg-block ms-0">
                            <h1 class="welcome-text" style="margin-right: 15px; text-wrap: nowrap">
                                Hola!, <span class="text-black fw-bold"><?php echo $_SESSION['nombre']." ".$_SESSION['apellidoPaterno']; ?></span>
                            </h1>
                        </li>
                    </ul>
                    <div style="width: 100%" id="texttMarquee"></div>
                    <ul class="navbar-nav ms-auto"></ul>
                    <button
                        class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                        type="button"
                        data-bs-toggle="offcanvas"
                        id="btnHideDash"
                    >
                        <span class="material-icons"> menu </span>
                    </button>
                </div>
            </nav>
            <div class="container-fluid page-body-wrapper">
                <nav class="sidebar sidebar-offcanvas" id="sidebar" style="position: fixed; user-select: none">
                    <ul class="nav" id="navSide">
                        <li class="nav-item nav_item2">
                            <a class="nav-link" href="./dashboard.php">
                                <span class="material-icons me-2"> dashboard </span>
                                <span class="menu-title">Dashboard</span>
                            </a>
                        </li>
                        <li class="nav-item nav-category" style="padding-top: 0px"><hr style="margin: 5px 0px" /></li>
                    </ul>
                </nav>
                <!-- partial -->
                <div class="main-panel" style="margin-left: auto">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card p-0">
                                <div class="card">
                                    <div class="card-body" id="contenido" style="padding: 1rem">
                                        <div class="row dahsboardContenido" style="display: none">
                                            <div class="col-sm-12 mb-4">
                                                <div class="statistics-details d-flex align-items-center justify-content-between">
                                                    <div>
                                                        <p class="statistics-title">Ganancias del día</p>
                                                        <h3 class="rate-percentage" id="gananciasDia">$0.00</h3>
                                                    </div>
                                                    <div>
                                                        <p class="statistics-title">Citas agendadas(HOY)</p>
                                                        <h3 class="rate-percentage" id="citasAgendadasCita">0</h3>
                                                    </div>
                                                    <div>
                                                        <p class="statistics-title">Citas atendidas(HOY)</p>
                                                        <h3 class="rate-percentage" id="citasAtendidasDia">0</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row dahsboardContenido" style="display: none">
                                            <div class="col-md-6 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <h4 class="statistics-title">Próximas Citas (5)</h4>
                                                        <div id="div_citas">
                                                            <table
                                                                class="mdl-data-table table responsive table-bordered table-striped dashTable"
                                                                style="width: 100%"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Cliente</th>
                                                                        <th>Mascota</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="bodyCitasDashbora"></tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <h4 class="statistics-title">Últimas ventas (5)</h4>
                                                        <div id="div_citas">
                                                            <table
                                                                class="mdl-data-table table responsive table-bordered table-striped dashTable"
                                                                style="width: 100%"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Nombre</th>
                                                                        <th>Costo</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="bodyVentasDashbora"></tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row dahsboardContenido" style="display: none">
                                            <div class="col-md-6 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <div style="display: flex; flex-direction: row; align-items: center; width: 100%">
                                                            <h4 class="statistics-title">TOP 5 Productos más vendidos</h4>
                                                            <div class="mb-2" style="display: flex; justify-content: end; margin: auto">
                                                                <div class="buttom-green buttom" onclick="reporteProductosVendidos()">
                                                                    <span class="text-sm mb-0">
                                                                        Exportar <i class="material-icons"> file_download </i></span
                                                                    >
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div id="div_citas">
                                                            <canvas id="bar-chart2" width="470" height="255"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <h4 class="statistics-title">Satisfacción cliente</h4>
                                                        <div id="div_citas">
                                                            <canvas id="bar-chart" width="470" height="255"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row dahsboardContenido" style="display: none">
                                            <div class="col-md-12 grid-margin stretch-card">
                                                <div class="card2 mb-2">
                                                    <div class="card-body">
                                                        <h4 class="statistics-title">Citas por Confirmar</h4>
                                                        <div id="div_citas">
                                                            <table
                                                                class="mdl-data-table table responsive table-bordered table-striped dashTable"
                                                                style="width: 100%"
                                                            >
                                                                <thead>
                                                                    <tr>
                                                                        <th>Cliente</th>
                                                                        <th>Mascota</th>
                                                                        <th>Fecha Propuesta</th>
                                                                        <th>&nbsp;</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody id="bodyCitasConfirmarDashbora"></tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="dataToExport" style="display: none">
                        <table class="table table-bordered tableExport" data-cols-width="10,20,30">
                            <thead thead class="cabecerath">
                                <tr>
                                    <th data-f-bold="true" data-fill-color="ff91d2ff">#</th>
                                    <th data-f-bold="true" data-fill-color="ff91d2ff">Nombre producto</th>
                                    <th data-f-bold="true" data-fill-color="ff91d2ff">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyExportInventario"></tbody>
                        </table>
                    </div>
                    <!-- content-wrapper ends -->
                    <footer class="footer">
                        <div class="d-sm-flex justify-content-center justify-content-sm-between">
                            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block"> &nbsp; </span>
                            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Copyright © 2024. All rights reserved.</span>
                        </div>
                    </footer>
                    <!-- partial -->
                </div>
                <!-- main-panel ends -->
            </div>
            <!-- page-body-wrapper ends -->
        </div>
        <div class="print" id="div_MemberPrint" style="display: none; margin: 0">
            <div class="col-md-3 no_print"></div>
            <div
                class="col-md-2 print nobreak"
                style="
                    text-align: center;
                    border-radius: 10px;
                    padding: 0;
                    background-image: URL('./images/frontbr4.png');
                    background-repeat: no-repeat !important;
                    background-attachment: scroll !important;
                    background-position: center center !important;
                    z-index: auto;
                    background-size: cover !important;
                    -webkit-background-size: cover !important;
                    -moz-background-size: cover !important;
                    -o-background-size: cover !important;
                    margin: 0;
                    padding-bottom: 7px;
                    width: 215px;
                "
            >
                <div style="display: block" class="nobreak">
                    <div style="margin-bottom: 10px">
                        <img
                            style="max-height: 115px; min-width: 98px; min-height: 115px; max-width: 98px; margin-top: 19px"
                            src=""
                            id="fotoCuts1"
                        />
                    </div>

                    <div style="display: flex; flex-direction: column">
                        <span class="spanDataCredential" style="text-wrap: nowrap; color: #009071" id="claveCredential1"> &nbsp; </span>
                        <span class="spanDataCredential" style="text-wrap: nowrap; color: #009071" id="nameCredential1"> &nbsp; </span>
                        <span class="spanDataCredential" style="text-wrap: nowrap; color: #009071" id="telefonoCrendential1"> &nbsp; </span>
                        <span class="spanDataCredential" style="text-wrap: nowrap; color: #009071" id="correoCrendential"> &nbsp; </span>
                    </div>

                    <div style="display: flex; font-weight: bold; margin-top: 0px">
                        <div style="width: 50%; display: flex"></div>
                        <div style="width: 40%; display: flex; margin-top: 15px">
                            <img
                                style="max-height: 70px; margin: auto; margin-left: 25px"
                                src=""
                                id="qrCredential1"
                                height="70"
                                width="70"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 no_print"></div>
            <div
                class="col-md-2 print nobreak"
                style="
                    text-align: center;
                    border-radius: 10px;
                    padding: 0;
                    background-image: URL('./images/backtbr.png');
                    background-repeat: no-repeat !important;
                    background-attachment: scroll !important;
                    background-position: center center !important;
                    z-index: auto;
                    background-size: cover !important;
                    -webkit-background-size: cover !important;
                    -moz-background-size: cover !important;
                    -o-background-size: cover !important;
                    margin: 0;
                    width: 215px;
                "
            >
                <div style="display: block" class="nobreak"></div>
                <div style="margin-bottom: 10px; margin-top: 45px">
                    <div style="display: flex; flex-direction: column">
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap;margin-top: 13px;" id="nameVete"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap">Teléfono de atención: </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap" id="telcredentialvete"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap">Horarios de atención: </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap" id="horario1credential"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap" id="horario2credential"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap" id="horario3credential"> &nbsp; </span>
                    </div>

                    <div style="margin-top: 20px;display: flex;flex-direction: column;">
                        <span class="spanDataCredential spanDataCredentialxsm" style="text-wrap: nowrap" id="Direccion1credential"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialxsm" style="text-wrap: nowrap" id="Direccion1credentia2"> &nbsp; </span>
                        <br />
                        <br />
                        <span class="spanDataCredential spanDataCredentialxsm" style="font-size: 6px;text-transform: none;font-style: italic;padding: 0px 15px 40px 15px;text-align: justify;"
                            > Esta membresía NO es una credencial oficial. El uso es exclusivo para la veterina suscrita. Happy pets y Brummy no se
                            hace responsable por el mal uso de esta membresía. El cliente al aceptar la membresía acepta los terminos y condiciones
                            publicados en: 
                            https://brummy.stth.com.mx/terminosycondiciones/</span
                        >
                    </div>
                </div>
            </div>
            <div class="col-md-3 no_print"></div>
        </div>
        <!-- container-scroller -->
        <!-- plugins:js -->
        <script src="./vendors/js/vendor.bundle.base.js"></script>
        <!-- endinject -->
        <!-- Plugin js for this page -->
        <script src="./vendors/select2/select2.min.js"></script>
        <!-- End plugin js for this page -->
        <!-- inject:js -->
        <script src="./js/off-canvas.js"></script>
        <script src="./js/hoverable-collapse.js"></script>
        <script src="./js/template.js"></script>
        <script src="./js/settings.js"></script>
        <script src="./js/configGlobal.js"></script>
        <script src="./js/principal.js"></script>
        <script src="./js/imagesteplate.js"></script>
        <!-- endinject -->
        <!-- Custom js for this page-->
        <script src="./js/select2.js"></script>
        <!-- End custom js for this page-->
        <script type="text/javascript" src="./libraries/datatables-1.12.1/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="./libraries/datatables-1.12.1/responsive/2.3.0/dataTables.responsive.min.js"></script>
        <script src="./libraries/sweetalert2.all.min.js"></script>
        <script src="./libraries/jsCalendar/jsCalendar.lang.es.js"></script>
        <script src="./libraries/jsCalendar/jsCalendar.min.js"></script>
        <!-- <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="./libraries/ChartJS/Chart.min.js"></script>
        <script src="./libraries/clipboard/clipboard.min.js"></script>
        <script src="./libraries/mdtimepicker/mdtimepicker.js"></script>
        <script src="./libraries/duDatepicker/duDatepicker.js"></script>
        <script src="./libraries/exportExcel/tableToExcel.js"></script>
        <script src="./libraries/exportExcel/zip.js"></script>
        <script src="./libraries/exportExcel/xlsx.js"></script>
        <script src="./libraries/exportExcel/xlsx.min.js"></script>
        <script type="text/javascript" src="./libraries/moment/moment.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script type="text/javascript" src="./libraries/moment/moment-precise.min.js"></script>
        <script type="text/javascript" src="./libraries/qr/qrious.js"></script>
        <script type="text/javascript" src="./libraries/cropper/cropper.js"></script>
        <script type="text/javascript" src="./libraries/PDF/pdfmake.min.js"></script>
        <script type="text/javascript" src="./libraries/PDF/vfs_fonts.js"></script> 
    </body>
</html>
