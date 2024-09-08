// function documentReadyPrincipalController() {
//     $(document).ready(function () {
//         $("#apps_menu").click(function () {
//             preloader.show();
//             // activeSubmenu(this.id);
//             // let clave_menu_n2 = $("#" + this.id).attr("data-clave-menu-n2");
//             cargarTemplateVacantes();
//         });
//     });

//     apps_menu;
//     paid_menu;
//     people_menu;
//     pets_menu;
//     event_menu;
//     inventory_menu;
// }

{
    /* <li class="nav-item" id="apps_menu_li">
    <a class="nav-link" href="#" id="apps_menu" onclick="cargaTemplate(this.id)">
        <span class="material-icons me-2"> apps </span>
        <span class="menu-title">Cátalogos</span>
    </a>
</li>
<li class="nav-item" id="paid_menu_li">
    <a class="nav-link tagAMenu" href="#" id="paid_menu" onclick="cargaTemplate(this.id)">
        <span class="material-icons me-2"> paid </span>
        <span class="menu-title">Venta</span>
    </a>
</li>
<li class="nav-item" id="people_menu_li">
    <a class="nav-link tagAMenu" href="#" id="people_menu" onclick="cargaTemplate(this.id)">
        <span class="material-icons me-2"> people </span>
        <span class="menu-title">Clientes</span>
    </a>
</li>
<li class="nav-item" id="pets_menu_li">
    <a class="nav-link tagAMenu" href="#" id="pets_menu" onclick="cargaTemplate(this.id)">
        <span class="material-icons me-2"> pets </span>
        <span class="menu-title">Mascotas</span>
    </a>
</li>
<li class="nav-item" id="event_menu_li">
    <a class="nav-link tagAMenu" href="#" id="event_menu" onclick="cargaTemplate(this.id)">
        <span class="material-icons me-2"> event </span>
        <span class="menu-title">Citas</span>
    </a>
</li>
<li class="nav-item" id="inventory_menu_li">
    <a class="nav-link tagAMenu" href="#" id="inventory_menu" onclick="cargaTemplate(this.id)">
        <span class="material-icons me-2"> inventory_2 </span>
        <span class="menu-title">Inventario</span>
    </a>
</li>
<li class="nav-item nav-category" style="padding-top: 0px"><hr style="margin: 5px 0px" /></li>
<li class="nav-item">
    <a class="nav-link" data-bs-toggle="collapse" href="#userOptions" aria-expanded="false" aria-controls="userOptions">
        <span class="material-icons" style="margin-right: 10px;"> account_circle </span>
        <span class="menu-title"><?php echo $_SESSION['nombre']." ".$_SESSION['apellidoPaterno']; ?></span>
    </a>
    <div class="collapse" id="userOptions">
        <ul class="nav flex-column sub-menu">
            <li class="nav-item tagAMenu"><a class="nav-link" href="#">My Profile</a></li>
            <!-- <li class="nav-item tagAMenu"><a class="nav-link" href="#">FAQ</a></li> -->
            <li class="nav-item tagAMenu"><a class="nav-link" href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
        </ul>
    </div>
</li> */
}

$(document).ready(() => {
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/cargaPermisos.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            switch (success) {
                case true:
                    results.forEach((data, index) => {
                        if (data.ID_modulo == 1) {
                            $(".dahsboardContenido").css("display", "flex");
                            cargarMascotasResguardo();
                        } else {
                            preloader.hide();
                        }

                        if (data.ID_modulo != 1 && data.ID_modulo != 2) {
                            preloader.hide();
                            $("#navSide").append(`
                                <li class="nav-item nav_item2" id="${data.id_element}_li">
                                    <a class="nav-link tagAMenu" href="#" id="${data.id_element}" onclick="cargaTemplate(this.id, '${data.permiso}')">
                                        <span class="material-icons me-2"> ${data.icono} </span>
                                        <span class="menu-title">${data.titulo}</span>
                                    </a>
                                </li>
                            `);
                        }
                    });
                    let name = $(".welcome-text span").text();

                    $("#navSide").append(`
                        <li class="nav-item nav-category" style="padding-top: 0px"><hr style="margin: 5px 0px" /></li>
                        <li class="nav-item">
                            <a class="nav-link" data-bs-toggle="collapse" href="#userOptions" aria-expanded="false" aria-controls="userOptions">
                                <span class="material-icons" style="margin-right: 10px;"> account_circle </span>
                                <span class="menu-title">${name}</span>
                            </a>
                            <div class="collapse" id="userOptions">
                                <ul class="nav flex-column sub-menu">
                                    <li class="nav-item tagAMenu"><a class="nav-link" href="#">My Profile</a></li>
                                    <!-- <li class="nav-item tagAMenu"><a class="nav-link" href="#">FAQ</a></li> -->
                                    <li class="nav-item tagAMenu"><a class="nav-link" href="#" onclick="cerrarSesion()">Cerrar sesión</a></li>
                                </ul>
                            </div>
                        </li>
                    `);

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
});

function cargarMascotasResguardo() {
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/cargarMascotasResguardo.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        $("#bodyResguardoMascotasDashbora").html(html);
                    } else {
                        let btn = "";
                        results.forEach((data, index) => {
                            if (data.estatus == 2) {
                                btn = `<div class="buttom-blue buttom" 
                                onclick="liberarMascota(${data.ID}, ${data.estatus})" style="margin-right: 10px;">
                                    <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0;"> door_back </i></span>
                                </div>`;
                            } else {
                                btn = "";
                            }
                            html += `
                                <tr>
                                    <td>${Number(index + 1)}</td>
                                    <td>${data.nombre}</td>
                                    <td>${data.nameEstatus}</td>
                                    <td>${data.tiempoEnCita}</td>
                                    <td>${data.tiempoEnResguardo}</td>
                                    <td>${btn}</td>
                                </tr>
                            `;
                        });
                        $("#bodyResguardoMascotasDashbora").html(html);
                    }
                    cargaDataDash();
                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function cargaDataDash() {
    cargaDataMarquee();

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/dataHeader.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            switch (success) {
                case true:
                    results.forEach((data, index) => {
                        $("#gananciasDia").html(`$ ${CantidadConCommas(Number(data.cuenta).toFixed(2))}`);
                        $("#citasAgendadasCita").html(`${Number(data.cuentaAgenda)}`);
                        $("#citasAtendidasDia").html(`${Number(data.cuentaAtendidas)}`);
                    });

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/getProximasCitas.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        $("#bodyCitasDashbora").html(html);
                    } else {
                        results.forEach((data, index) => {
                            html += `
                                <tr>
                                    <td>${Number(index + 1)}</td>
                                    <td>${data.nombreCita}</td>
                                    <td>${data.nombreMascota}</td>
                                </tr>
                            `;
                        });

                        $("#bodyCitasDashbora").html(html);
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/getLastVentas.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        $("#bodyVentasDashbora").html(html);
                    } else {
                        results.forEach((data, index) => {
                            html += `
                            <tr>
                                <td>${Number(index + 1)}</td>
                                <td>${data.FlagProducto}</td>
                                <td>$ ${CantidadConCommas(Number(data.total).toFixed(2))}</td>
                            </tr>
                        `;
                        });
                        $("#bodyVentasDashbora").html(html);
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });

    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/topProductos.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let colores = [];
            let sumasProductos = [];
            let productos = [];
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                    } else {
                        results.forEach((data, index) => {
                            colores = [...colores, "#009071"];
                            productos = [...productos, data.FlagProducto];
                            sumasProductos = [...sumasProductos, Number(data.suma)];
                        });
                        new Chart(document.getElementById("bar-chart2"), {
                            type: "horizontalBar",
                            data: {
                                labels: productos,
                                datasets: [
                                    {
                                        label: "Vendidos",
                                        backgroundColor: colores,
                                        data: sumasProductos,
                                    },
                                ],
                            },
                            options: {
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "",
                                },
                                scales: {
                                    xAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                            },
                                        },
                                    ],
                                },
                            },
                        });
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });

    new Chart(document.getElementById("bar-chart"), {
        type: "bar",
        data: {
            labels: ["1 estrellas", "2 estrellas", "3 estrellas", "4 estrellas", "5 estrellas"],
            datasets: [
                {
                    label: "Calificaciones",
                    backgroundColor: ["#009071", "#009071", "#009071", "#009071", "#009071"],
                    data: [0, 0, 0, 2, 3, 5],
                },
            ],
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "",
            },
        },
    });

    getCitasPorConfirmar();
    getProductosAgotar();
}

function getProductosAgotar() {
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/getProductosAgotar.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        dataTableDestroyClass("datableDash");
                        $("#bodyProductosTerminar").html(html);
                        dataTableCreateClass("datableDash");
                    } else {
                        results.forEach((data, index) => {
                            html += `
                                <tr>
                                    <td>${Number(index + 1)}</td>
                                    <td>${data.codigo}</td>
                                    <td>${data.nombre} <br> ${data.descripcion}</td>
                                    <td>${data.stockReal}</td>
                                </tr>
                            `;
                        });
                        dataTableDestroyClass("datableDash");
                        $("#bodyProductosTerminar").html(html);
                        dataTableCreateClass("datableDash");
                    }
                    preloader.hide();
                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function cargaDataMarquee() {
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/avisos/obtenerAvisosToday.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let htmlAviso = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        $("#texttMarquee").html(
                            `<marquee class="card2"><p class="p_marquee" style="padding-top: 15px;padding-bottom: 15px;margin-bottom: 0;">&nbsp;</p></marquee>`
                        );
                    } else {
                        results.forEach((data, index) => {
                            htmlAviso += data.aviso + `&emsp;- -&emsp;`;
                        });

                        htmlAviso = String(htmlAviso).slice(0, -9);
                        $("#texttMarquee").html(
                            `<marquee class="card2"><p class="p_marquee" style="padding-top: 15px;padding-bottom: 15px;margin-bottom: 0;">${htmlAviso}</p></marquee>`
                        );
                    }
                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function reporteProductosVendidos() {
    $("#labelModal").html(`Reporte Productos más vendidos`);

    $("#body_modal").html(`<br>
        <div>
            <div class="coolinput">
                <label for="fechaReporteInicio" class="text">Fecha Inicio:</label>
                <input name="Fecha" type="text" class="input obligatorio" id="fechaReporteInicio" autocomplete="off" />
            </div>

            <div class="coolinput">
                <label for="fechaReporteFin" class="text">Fecha Fin:</label>
                <input name="Fecha" type="text" class="input obligatorio" id="fechaReporteFin" autocomplete="off" />
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="generarReporteInventario();">
                <span class="text-sm mb-0 span-buttom"> 
                    Generar
                    <i class="material-icons"> file_download </i>
                </span>
            </div>
        </div>
    `);

    $("#fechaReporteInicio").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });
    $("#fechaReporteFin").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });

    $("#modalTemplate").modal({
        backdrop: "static",
        keyboard: false,
    });

    $("#modalTemplate").modal("show");

    $("#btnClose").on("click", () => {
        $("#modalTemplate").modal("hide");
        $("#btnClose").off("click");
    });
}

function generarReporteInventario() {
    if (!$("#fechaReporteInicio").val() || !$("#fechaReporteInicio").val()) {
        // msj.show("Aviso", ".", [{ text1: "OK" }]);
        Swal.fire({
            icon: "warning",
            title: "Aviso",
            text: "Debes indicar una Fecha Inicio y una Fecha Fin a buscar.",
        });
        return false;
    }

    let fechaReporteInicio = volteaFecha($("#fechaReporteInicio").val(), 2);
    let fechaReporteFin = volteaFecha($("#fechaReporteFin").val(), 2);
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/inventario/generarReporteInventario.php",
        data: { fechaReporteInicio, fechaReporteFin },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "No se encontró información en este rango de fechas.", [{ text1: "OK" }]);
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${Number(index + 1)}</td>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${data.FlagProducto}</td>
                                <td data-b-b-s="thin" data-b-l-s="thin" data-b-r-s="thin" data-a-wrap="true">${data.suma}</td>
                            </tr>`;
                        });

                        $("#tbodyExportInventario").html(html);
                        let table = document.getElementsByClassName("tableExport");
                        let now = String(Date.now());
                        let lastFive = now.substr(now.length - 8);
                        TableToExcel.convert(table[0], {
                            name: `Reporte_${lastFive}.xlsx`,
                            sheet: {
                                name: "Ventas",
                            },
                        });
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        preloader.hide();
                    }
                    break;
                case false:
                    preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function muestraDomicilio1() {
    if ($("#cbx-46").prop("checked")) {
        $("#div_servicioDomicilio").css("display", "block");
        getDireecionCliente($("#nombreCita").val());
    } else {
        $("#div_servicioDomicilio").css("display", "none");
    }
}

function getDireecionCliente(FK_dueno) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/clientes/getDireecionCliente.php",
        data: { FK_dueno },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html2 = "<option value=''> Selecciona una opción </option>";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                        $("#calleDomi_input").val("");
                        $("#numeroDomi_input").val("");
                        $("#cpDomi_input").val("");
                        $("#colDomi_input").val("");
                        $("#municipioDomi_input").val("");
                        $("#estadoDomi_input").val("");
                    } else {
                        result.forEach((data, index) => {
                            $("#calleDomi_input").val(data.calle);
                            $("#numeroDomi_input").val(data.numero);
                            $("#cpDomi_input").val(data.cp);
                            $("#colDomi_input").val(data.col);
                            $("#municipioDomi_input").val(data.municipio);
                            $("#estadoDomi_input").val(data.estado);
                        });

                        preloader.hide();
                    }
                    break;
                case false:
                    preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function generarCitaPropuesta(ID, fechaPropuesta, fechaRecurrenca, tipoRecurrencia, IDRec) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/personal/obtenerPersonal.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html4 = "<option value=''> Selecciona una opción </option>";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                        msj.show("Aviso", "No tienes personal registrado aún.", [{ text1: "OK" }]);
                    } else {
                        result.forEach((data, index) => {
                            html4 += `<option value='${data.ID}'> ${data.nombre} ${data.apellidoP} ${data.apellidoM} </option>`;
                        });

                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: "./views/citas/generarCitaPropuesta.php",
                            data: { ID },
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;
                                let html = "";
                                switch (success) {
                                    case true:
                                        if (result == "Sin Datos") {
                                            msj.show("Aviso", "No se encontró información para generar la cita.", [{ text1: "OK" }]);
                                            preloader.hide();
                                        } else {
                                            let nombreCita = "",
                                                nombreMascota = "",
                                                motivoCita = "",
                                                domicilio = "",
                                                FKnombreCita = "",
                                                FKMascota = "",
                                                FKMotivoCita = "";
                                            result.forEach((data, index) => {
                                                // console.log(data);
                                                nombreCita = data.nombreCita;
                                                nombreMascota = data.nombreMascota;
                                                motivoCita = data.motivoCita;
                                                domicilio = data.Flagdomicilio;
                                                FKnombreCita = data.FKnombreCita;
                                                FKMascota = data.FKnombreMascota;
                                                FKMotivoCita = data.FKMotivo;
                                            });

                                            $("#labelModal").html(`Crear Nueva Cita`);

                                            $("#body_modal").html(`<br>
                                                <div id="nuevaCita">
                                                    <div class="coolinput">
                                                        <label for="nombreCitainput" class="text">Cliente: </label>
                                                        <input name="Cliente" type="text" class="input obligatorio" id="nombreCitainput" autocomplete="off" readonly/>
                                                        <input type="hidden" id="nombreCita">
                                                    </div>
                    
                                                    <div class="coolinput">
                                                        <label for="nombreMascota" class="text">Mascota: </label>
                                                        <input name="Mascota" type="text" class="input obligatorio" id="nombreMascotaInput" autocomplete="off" readonly/>
                                                        <input type="hidden" id="nombreMascota">
                                                    </div>
                    
                                                    <div class="coolinput">
                                                        <label for="fechaCita" class="text">Fecha:</label>
                                                        <!-- <input name="Fecha" type="date" class="input obligatorio" id="fechaCita" autocomplete="off" maxlength"50"/> -->
                                                        <input name="Fecha" type="text" class="input obligatorio" id="fechaCita" autocomplete="off" />
                                                    </div>
                    
                                                    <div class="coolinput">
                                                        <label for="horaCita" class="text">Hora:</label>
                                                        <!-- <input name="Hora" type="time" class="input obligatorio" id="horaCita" autocomplete="off" maxlength"50"/> -->
                                                        <input type="text" name="Hora" class="input obligatorio" id="horaCita" autocomplete="off"/>
                                                    </div>
                    
                                                    <div class="coolinput">
                                                        <label for="motivoCita" class="text">Motivo de Cita:</label>
                                                        <input name="Motivo Cita" type="text" class="input obligatorio" id="motivoCitaInput" autocomplete="off" readonly/>
                                                        <input type="hidden" id="motivoCita">
                                                    </div>
                    
                                                    <div class="coolinput">
                                                        <label for="comentariosCita" class="text">Comentarios:</label>
                                                        <input name="Comentarios" type="text" class="input capitalize" id="comentariosCita" autocomplete="off" maxlength"50"/>
                                                    </div>
                    
                                                    <div class="coolinput">
                                                        <label for="nombreAtiende" class="text">Atiende: </label>
                                                        <select class="input capitalize obligatorio" name="Atiende" id="nombreAtiende" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            ${html4}
                                                        </select>
                                                    </div>
                    
                                                    <div class="checkbox-wrapper-46" style="margin: 22px 0px 12px 8px;">
                                                        <input type="checkbox" id="cbx-46" class="inp-cbx" onchange="muestraDomicilio1()"/>
                                                        <label for="cbx-46" class="cbx">
                                                            <span style="transform: scale(1.3);">
                                                                <svg viewBox="0 0 12 10" height="10px" width="12px">
                                                                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                                </svg>
                                                            </span>
                                                            <span>¿Es Servicio a domicilio?</span>
                                                        </label>
                                                    </div>
                    
                                                    <div id="div_servicioDomicilio" style="display: none;padding: 15px 10px 25px;margin: 10px 0px;" class="card2">
                                                        <div class="coolinput">
                                                            <label name="Calle" for="direccionVete" class="text">Calle</label>
                                                            <input name="Calle" type="text" class="input capitalize" id="calleDomi_input" autocomplete="off" />
                                                        </div>
                                                        <div style="display:flex; flex-direction: row;">
                                                            <div class="coolinput">
                                                                <label name="Número" for="direccionVete" class="text">Número</label>
                                                                <input name="Número" type="text" class="input capitalize" id="numeroDomi_input" autocomplete="off" />
                                                            </div>
                                                            <div class="coolinput" style="margin-left: 20px;">
                                                                <label name="C.P." for="direccionVete" class="text">C.P.</label>
                                                                <input name="C.P." type="text" class="input capitalize" id="cpDomi_input" autocomplete="off" />
                                                            </div>
                                                        </div>
                                                        <div class="coolinput">
                                                            <label name="Col." for="direccionVete" class="text">Col.</label>
                                                            <input name="Col." type="text" class="input capitalize" id="colDomi_input" autocomplete="off" />
                                                        </div>
                                                        <div class="coolinput">
                                                            <label name="Municipio" for="direccionVete" class="text">Municipio/Alcaldía</label>
                                                            <input name="Municipio" type="text" class="input capitalize" id="municipioDomi_input" autocomplete="off" />
                                                        </div>
                                                        <div class="coolinput">
                                                            <label name="Estado" for="direccionVete" class="text">Estado</label>
                                                            <input name="Estado" type="text" class="input capitalize" id="estadoDomi_input" autocomplete="off" />
                                                        </div>
                                                    </div>
                    
                                                    <input type="hidden" id="fechaRecurrenca">
                                                    <input type="hidden" id="eachRecurrencia">
                                                </div>
                    
                                                <div class="center-fitcomponent" style="width: 100%;">
                                                    <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" id="btnGuardarCita">
                                                        <span class="text-sm mb-0 span-buttom"> 
                                                            Guardar
                                                            <i class="material-icons"> save </i>
                                                        </span>
                                                    </div>
                                                </div>
                                            `);

                                            $("#modalTemplate").modal({
                                                backdrop: "static",
                                                keyboard: false,
                                            });

                                            $("#modalTemplate").modal("show");

                                            $("#btnClose").on("click", () => {
                                                $("#modalTemplate").modal("hide");
                                                $("#btnClose").off("click");
                                            });

                                            $("#nombreCitainput").val(nombreCita);
                                            $("#nombreMascota").val(FKMascota);
                                            $("#nombreMascotaInput").val(nombreMascota);
                                            $("#motivoCitaInput").val(motivoCita);
                                            $("#motivoCita").val(FKMotivoCita);
                                            $("#nombreCita").val(FKnombreCita);
                                            $("#fechaRecurrenca").val(fechaRecurrenca);
                                            $("#eachRecurrencia").val(tipoRecurrencia);

                                            $("#nombreAtiende").select2({
                                                dropdownParent: $("#modalTemplate"),
                                            });

                                            if (domicilio == 1) {
                                                $("#cbx-46").prop("checked", true);
                                                muestraDomicilio1();
                                            }

                                            $("#horaCita").mdtimepicker({
                                                timeFormat: "hh:mm:ss", // format of the time value (data-time attribute)
                                                format: "hh:mm", // format of the input value
                                                theme: "blue", // theme of the timepicker
                                                clearBtn: true, // determines if clear button is visible
                                                is24hour: true, // determines if the clock will use 24-hour format in the UI; format config will be forced to `hh:mm` if not specified
                                            });

                                            $("#fechaCita").val(fechaPropuesta);
                                            $("#fechaCita").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });

                                            $("#btnGuardarCita").click(() => {
                                                validacioesCita1(IDRec);
                                            });

                                            preloader.hide();
                                        }
                                        break;
                                    case false:
                                        preloader.hide();
                                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                        break;
                                }
                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                                preloader.hide();
                                msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                            });
                    }
                    break;
                case false:
                    preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function activeSubmenu(id_element_submenu) {
    $(".nav-item.nav_item2").attr("class", "nav-item nav_item2");
    $("#" + id_element_submenu + "_li").attr("class", "nav-item nav_item2 active");
}

function cargaTemplate(id, permiso) {
    preloader.show();
    cargaDataMarquee();
    switch (id) {
        case "apps_menu":
            cargarTemplateCatalogos();
            activeSubmenu(id);
            break;

        case "paid_menu":
            cargaTemplateVentas();
            activeSubmenu(id);
            break;

        case "people_menu":
            cargaTemplateClientes();
            activeSubmenu(id);
            break;

        case "pets_menu":
            cargaTemplateMascotas();
            activeSubmenu(id);
            break;

        case "event_menu":
            cargaTemplateCitas();
            activeSubmenu(id);
            break;

        case "inventory_menu":
            cargaTemplateInventario();
            activeSubmenu(id);
            break;

        case "grade_menu":
            cargaTemplateEncuestas();
            activeSubmenu(id);
            break;

        case "bar_chart_menu":
            cargaTemplateKPI();
            activeSubmenu(id);
            break;

        case "campaign_menu":
            cargaTemplateAvisos();
            activeSubmenu(id);
            break;

        case "store_menu":
            cargaTemplatePerfilStore();
            activeSubmenu(id);
            break;

        case "person_menu":
            cargaTemplateFrecuentes();
            activeSubmenu(id);
            break;

        case "supervised_menu":
            cargaTemplatePersonal();
            activeSubmenu(id);
            break;

        case "redeem_menu":
            cargaTemplatePromos();
            activeSubmenu(id);
            break;

        default:
            preloader.hide();
            console.log("sin menu");
            // Swal.fire({ icon: "warning", title: "", text: "Algo salio mal vuelve a intentarlo." })
            break;
    }
}

function cargarTemplateCatalogos() {
    $("#contenido").load("templates/catalogos/catalogos.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateVentas() {
    $("#contenido").load("templates/ventas/ventas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}
function cargaTemplateClientes() {
    $("#contenido").load("templates/clientes/clientes.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}
function cargaTemplateMascotas() {
    $("#contenido").load("templates/mascotas/mascotas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateCitas() {
    $("#contenido").load("templates/citas/citas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateInventario() {
    $("#contenido").load("templates/inventario/inventario.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateEncuestas() {
    $("#contenido").load("templates/encuestas/encuestas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateKPI() {
    $("#contenido").load("templates/satisfaccion/satisfaccion.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateAvisos() {
    $("#contenido").load("templates/avisos/avisos.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplatePerfilStore() {
    $("#contenido").load("templates/store/store.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplateFrecuentes() {
    $("#contenido").load("templates/frecuentes/frecuentes.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplatePersonal() {
    $("#contenido").load("templates/personal/personal.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function cargaTemplatePromos() {
    $("#contenido").load("templates/promos/promos.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            changeViewMenuIcon();
            // documentReadyVacantes();
        }
    });
}

function validacioesCita1(IDRec) {
    let valido = true;
    let fecha_actual_val = new Date();

    const year = fecha_actual_val.getFullYear();
    const month = String(fecha_actual_val.getMonth() + 1).padStart(2, "0");
    const day = String(fecha_actual_val.getDate()).padStart(2, "0");

    let fecha_actual_format = `${year}-${month}-${day}`;

    if (valido) {
        preloader.show();
        let fechaCita = volteaFecha($("#fechaCita").val(), 2);
        let horaCita = $("#horaCita").val();

        if (fechaCita < fecha_actual_format) {
            console.log("La fecha seleccionada es menor a la actual");
            msj.show("Aviso", "La fecha de la cita no puede ser menor a la actual", [{ text1: "OK" }]);
            preloader.hide();
            return false;
        }

        if (!horaCita) {
            msj.show("Aviso", "Debes indicar la hora de la cita", [{ text1: "OK" }]);
            preloader.hide();
            return false;
        }

        if ($("#cbx-46").prop("checked")) {
            let calleDomi = String($("#calleDomi_input").val()).trim();
            let numeroDomi = String($("#numeroDomi_input").val()).trim();
            let cpDomi = String($("#cpDomi_input").val()).trim();
            let colDomi = String($("#colDomi_input").val()).trim();
            let municipioDomi = String($("#municipioDomi_input").val()).trim();
            let estadoDomi = String($("#estadoDomi_input").val()).trim();

            calleDomi.replaceAll("'", '"');
            numeroDomi.replaceAll("'", '"');
            cpDomi.replaceAll("'", '"');
            colDomi.replaceAll("'", '"');
            municipioDomi.replaceAll("'", '"');
            estadoDomi.replaceAll("'", '"');

            if (!calleDomi || !numeroDomi || !cpDomi || !colDomi || !municipioDomi || !estadoDomi) {
                preloader.hide();
                msj.show("Aviso", "El domicilio esta incompleto", [{ text1: "OK" }]);
                return false;
            }
        }

        if (!$("#nombreAtiende").val()) {
            preloader.hide();
            msj.show("Aviso", "Debes indicar quien va a atender la cita.", [{ text1: "OK" }]);
            return false;
        }

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/citas/validaCita.php",
            data: { fechaCita, horaCita },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                let disponible = true;
                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                            guardarCita1(IDRec);
                        } else {
                            disponible = false;
                            let Texto = "";
                            result.forEach((data, index) => {
                                Texto += ` ${data.nombreCita} y ${data.nombreMascota} que podria empalmarse. ¿Deseas continuar?`;
                            });
                            Swal.fire({
                                title: "Hay una cita ya agendada de:",
                                text: Texto,
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonColor: "#7066e0",
                                cancelButtonColor: "#FF0037",
                                confirmButtonText: "OK",
                                cancelButtonText: "Cancelar",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    guardarCita1(IDRec);
                                }
                            });
                            preloader.hide();
                        }

                        break;
                    case false:
                        preloader.hide();
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        break;
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                preloader.hide();
                msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            });
    } else {
        let html =
            '<span style="font-weight: 900;">Debes llenar estos campos para poder guardar:</span> <br> <ul style="text-align: left; margin-left: 15px; font-style: italic;"> ';
        response.forEach((data) => {
            html += `<li style="list-style: disc;">${data}.</li> `;
        });
        html += `</ul>`;
        Swal.fire({ icon: "warning", title: "", html: html });
    }
}

function guardarCita1(IDRec) {
    let FKnombreCita = $("#nombreCita").val();
    let nombreCita = String($("#nombreCitainput").val());
    let FKnombreMascota = $("#nombreMascota").val();
    let nombreMascota = String($("#nombreMascotaInput").val());
    let fechaCita = volteaFecha($("#fechaCita").val(), 2);
    let horaCita = $("#horaCita").val();
    let motivoCita = $("#motivoCitaInput").val();
    let comentariosCita = String($("#comentariosCita").val());
    let FKMotivo = $("#motivoCita").val();
    let FKAtiende = $("#nombreAtiende").val();
    let nombreAtiende = String($("#nombreAtiende").find("option:selected").text());

    let calleDomi = "";
    let numeroDomi = "";
    let cpDomi = "";
    let colDomi = "";
    let municipioDomi = "";
    let estadoDomi = "";
    let domicilio = 0;

    let Recurrencia = 0;
    let tipoRecurrencia = 0;
    let fechaRecurrenca = "";

    if ($("#cbx-46").prop("checked")) {
        domicilio = 1;
        calleDomi = String($("#calleDomi_input").val()).trim();
        numeroDomi = String($("#numeroDomi_input").val()).trim();
        cpDomi = String($("#cpDomi_input").val()).trim();
        colDomi = String($("#colDomi_input").val()).trim();
        municipioDomi = String($("#municipioDomi_input").val()).trim();
        estadoDomi = String($("#estadoDomi_input").val()).trim();

        calleDomi.replaceAll("'", '"');
        numeroDomi.replaceAll("'", '"');
        cpDomi.replaceAll("'", '"');
        colDomi.replaceAll("'", '"');
        municipioDomi.replaceAll("'", '"');
        estadoDomi.replaceAll("'", '"');
    }

    tipoRecurrencia = $("#eachRecurrencia").val();
    if (tipoRecurrencia == 1) {
        Recurrencia = 0;
    } else {
        Recurrencia = 1;
        fechaRecurrenca = volteaFecha($("#fechaCita").val(), 2);
        if (tipoRecurrencia == 7 || tipoRecurrencia == 14) {
            fechaRecurrenca = moment(fechaRecurrenca).add(Number(tipoRecurrencia), "days").format("YYYY-MM-DD");
        } else if (tipoRecurrencia == 30) {
            fechaRecurrenca = moment(fechaRecurrenca).add(Number(1), "month").format("YYYY-MM-DD");
        }
    }

    nombreCita.replaceAll("'", '"');
    nombreMascota.replaceAll("'", '"');
    motivoCita.replaceAll("'", '"');
    comentariosCita.replaceAll("'", '"');

    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/citas/guardarCita.php",
        data: {
            FKnombreCita,
            nombreCita,
            FKnombreMascota,
            nombreMascota,
            fechaCita,
            horaCita,
            motivoCita,
            comentariosCita,
            FKMotivo,
            calleDomi,
            numeroDomi,
            cpDomi,
            colDomi,
            municipioDomi,
            estadoDomi,
            domicilio,
            Recurrencia,
            tipoRecurrencia,
            fechaRecurrenca,
            FKAtiende,
            nombreAtiende,
        },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    $("#modalTemplate").modal("hide");
                    $("#btnClose").off("click");
                    msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                    preloader.hide();
                    // validaEventos(fechaCita);
                    cambiaEstatusCitaRecurente(IDRec, 1, tipoRecurrencia);
                    break;
                case false:
                    preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function cambiaEstatusCitaRecurente(IDRec, agendada, tipoRecurrencia) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/citas/cambiaEstatusCitaRecurente.php",
        data: {
            IDRec,
            agendada,
            tipoRecurrencia,
        },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    preloader.hide();
                    getCitasPorConfirmar();
                    break;
                case false:
                    preloader.hide();
                    // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function EliminarCitaPropuesta(IDRec) {
    Swal.fire({
        title: "",
        text: "¿Estás seguro de querer eliminar las propuestas de citas recurrentes definitivamente de este ciiente?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            preloader.show();
            cambiaEstatusCitaRecurente(IDRec, 0, 0);
        }
    });
}

function getCitasPorConfirmar() {
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/getCitasPorConfirmar.php",
        data: {},
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        dataTableDestroyClass("datableDash");
                        $("#bodyCitasConfirmarDashbora").html(html);
                        getCitasPorConfirmarMes();
                    } else {
                        results.forEach((data, index) => {
                            // console.log(data);
                            html += `
                                <tr>
                                    <td>${data.nombreCliente}</td>
                                    <td>${data.nombreMascota}</td>
                                    <td>${volteaFecha(data.fechaRecurrenca, 1)}</td>
                                    <td>
                                        <div class="my-0" style="display: flex;"> 
                                            <div class="buttom-blue buttom" 
                                            onclick="generarCitaPropuesta(${data.ID_mov}, 
                                                '${volteaFecha(data.fechaRecurrenca, 1)}', 
                                                '${data.fechaRecurrenca}', 
                                                '${data.tipoRecurrencia}',
                                                ${data.ID})" 
                                            style="margin-right: 10px;">
                                                <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0;"> date_range </i></span>
                                            </div>
                                            <div class="buttom-red buttom" onclick="EliminarCitaPropuesta(${data.ID})" style="margin-right: 10px;">
                                                <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0;"> delete </i></span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        });
                        dataTableDestroyClass("datableDash");
                        $("#bodyCitasConfirmarDashbora").html(html);
                        getCitasPorConfirmarMes();
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function getCitasPorConfirmarMes() {
    let fecha = getDateActual();
    fecha = moment(fecha).add(Number(5), "days").format("YYYY-MM-DD");
    $.ajax({
        method: "POST",
        dataType: "json",
        url: "views/login/getCitasPorConfirmarMes.php",
        data: { fecha },
    })
        .done(function (result) {
            let success = result.success;
            let results = result.result;
            let html = "";
            switch (success) {
                case true:
                    if (results == "Sin Datos") {
                        // $("#bodyCitasConfirmarDashbora").html(html);
                        dataTableDestroyClass("datableDash");
                        dataTableCreateClass("datableDash");
                    } else {
                        results.forEach((data, index) => {
                            let fecha = data.fechaRecurrenca;
                            let nombreCliente = data.nombreCliente;
                            let nombreMascota = data.nombreMascota;
                            let ID_mov = data.ID_mov;
                            let fechaRecurrenca = data.fechaRecurrenca;
                            let tipoRecurrencia = data.tipoRecurrencia;
                            let ID = data.ID;

                            validaFechasConfirmar(fecha, nombreCliente, nombreMascota, ID_mov, fechaRecurrenca, tipoRecurrencia, ID);
                        });
                        // $("#bodyCitasConfirmarDashbora").append(html);
                    }

                    break;
                case false:
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Algo salió mal.",
                    });

                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function validaFechasConfirmar(fecha, nombreCliente, nombreMascota, ID_mov, fechaRecurrenca, tipoRecurrencia, ID) {
    let html = "";
    // console.log(moment(fecha).format("YYYY-MM-DD"), nombreCliente, nombreMascota, ID_mov, fechaRecurrenca, tipoRecurrencia, ID);
    // console.log(tipoRecurrencia);
    if (tipoRecurrencia == 30) {
        // fecha = moment(fecha).add(Number(1), "months").format("YYYY-MM-DD");
        fecha = moment(fecha).format("YYYY-MM-DD");
    } else if (tipoRecurrencia == 14) {
        // fecha = moment(fecha).add(Number(2), "weeks").format("YYYY-MM-DD");
        fecha = moment(fecha).format("YYYY-MM-DD");
    } else if (tipoRecurrencia == 7) {
        // fecha = moment(fecha).add(Number(1), "weeks").format("YYYY-MM-DD");
        fecha = moment(fecha).format("YYYY-MM-DD");
    } else {
        fecha = moment(fecha).add(Number(1), "years").format("YYYY-MM-DD");
    }

    // console.log(fecha);
    if (fecha >= getDateActual()) {
        // console.log("gg1");
        let start = moment(getDateActual(), "YYYY-MM-DD");
        let end = moment(fecha, "YYYY-MM-DD");

        //Difference in number of days
        let days = moment.duration(end.diff(start)).asDays();
        // console.log(days);
        if (days >= 0 && days <= 3) {
            // console.log("mostrar");
            html = `
                <tr>
                    <td>${nombreCliente}</td>
                    <td>${nombreMascota}</td>
                    <td>${volteaFecha(fecha, 1)}</td>
                    <td>
                        <div class="my-0" style="display: flex;">
                            <div class="buttom-blue buttom"
                            onclick="generarCitaPropuesta(${ID_mov},
                                '${volteaFecha(fecha, 1)}',
                                '${fecha}',
                                '${tipoRecurrencia}',
                                ${ID})"
                            style="margin-right: 10px;">
                                <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0;"> date_range </i></span>
                            </div>
                            <div class="buttom-red buttom" onclick="EliminarCitaPropuesta(${ID})" style="margin-right: 10px;">
                                <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0;"> delete </i></span>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
            dataTableDestroyClass("datableDash");
            $("#bodyCitasConfirmarDashbora").append(html);
            dataTableCreateClass("datableDash");
        } else {
            // console.log("no mostrar");
        }
    } else {
        if (tipoRecurrencia == 30) {
            fecha = moment(fecha).add(Number(1), "months").format("YYYY-MM-DD");
        } else if (tipoRecurrencia == 14) {
            fecha = moment(fecha).add(Number(2), "weeks").format("YYYY-MM-DD");
        } else if (tipoRecurrencia == 7) {
            fecha = moment(fecha).add(Number(1), "weeks").format("YYYY-MM-DD");
        } else {
            fecha = moment(fecha).add(Number(1), "years").format("YYYY-MM-DD");
        }
        // console.log("gg2", ID_mov, tipoRecurrencia);
        let start = moment(getDateActual(), "YYYY-MM-DD");
        let end = moment(fecha, "YYYY-MM-DD");

        // console.log(start, end);
        //Difference in number of days
        let days = moment.duration(end.diff(start)).asDays();
        // console.log(days);

        if (days >= 5) {
        } else {
            validaFechasConfirmar(end, nombreCliente, nombreMascota, ID_mov, fechaRecurrenca, tipoRecurrencia, ID);
        }
    }
}

function liberarMascota(ID) {
    Swal.fire({
        title: "",
        text: "¿Estás seguro de quererle dar salida a esta mascota?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            preloader.show();
            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "./views/citas/liberarMascota.php",
                data: {
                    ID,
                },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $.ajax({
                                method: "POST",
                                dataType: "json",
                                url: "views/login/cargarMascotasResguardo.php",
                                data: {},
                            })
                                .done(function (result) {
                                    let success = result.success;
                                    let results = result.result;
                                    let html = "";
                                    switch (success) {
                                        case true:
                                            if (results == "Sin Datos") {
                                                dataTableDestroyClass("datableDash");
                                                $("#bodyResguardoMascotasDashbora").html(html);
                                                dataTableCreateClass("datableDash");
                                            } else {
                                                let btn = "";
                                                results.forEach((data, index) => {
                                                    if (data.estatus == 2) {
                                                        btn = `<div class="buttom-blue buttom" 
                                                        onclick="liberarMascota(${data.ID}, ${data.estatus})" style="margin-right: 10px;">
                                                            <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0;"> door_back </i></span>
                                                        </div>`;
                                                    } else {
                                                        btn = "";
                                                    }
                                                    html += `
                                                        <tr>
                                                            <td>${Number(index + 1)}</td>
                                                            <td>${data.nombre}</td>
                                                            <td>${data.nameEstatus}</td>
                                                            <td>${data.tiempoEnCita}</td>
                                                            <td>${data.tiempoEnResguardo}</td>
                                                            <td>${btn}</td>
                                                        </tr>
                                                    `;
                                                });
                                                dataTableDestroyClass("datableDash");
                                                $("#bodyResguardoMascotasDashbora").html(html);
                                                dataTableCreateClass("datableDash");
                                            }
                                            preloader.hide();
                                            break;
                                        case false:
                                            Swal.fire({
                                                icon: "warning",
                                                title: "Aviso",
                                                text: "Algo salió mal.",
                                            });
                                            preloader.hide();
                                            break;
                                    }
                                })
                                .fail(function (jqXHR, textStatus, errorThrown) {
                                    preloader.hide();
                                    console.log(
                                        "accesoUsuarioView  - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown
                                    );
                                });

                            break;
                        case false:
                            preloader.hide();
                            // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                            break;
                    }
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    preloader.hide();
                    // msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                });
        }
    });
}
