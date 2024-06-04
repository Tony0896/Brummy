$(document).ready(() => {
    // preloader.hide();
    dataTableCreate();
    obtenerClientes();
});

function obtenerClientes() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/clientes/obtenerClientes.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#clientesBody").html(html);
                        dataTableCreate();
                    } else {
                        dataTableDestroy();
                        let html;
                        let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.nombre} ${data.apellidoP} ${data.apellidoM}</td>
                                <td ${data.telefono ? "" : 'style="text-align: center;"'}>${data.telefono ? data.telefono : tdSinData}</td>
                                <td ${data.correo ? "" : 'style="text-align: center;"'}>${data.correo ? data.correo : tdSinData}</td>
                                <td><div> <div>${volteaFecha(String(data.fechaUlmitoMovimiento).split(" ")[0], 1)} ${
                                String(String(data.fechaUlmitoMovimiento).split(" ")[1]).split(":")[0]
                            }:${String(String(data.fechaUlmitoMovimiento).split(" ")[1]).split(":")[1]}</div> <div>${
                                data.motivoMovimiento
                            }</div> </div></td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Perfil" onclick="verPerfilCliente(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> person </i></span>
                                        </div>

                                        <div class="buttom-green buttom button-sinText mx-1" title="Ver Historial" onclick="HistorialCliente(${
                                            data.ID
                                        })">
                                            <span class="text-sm mb-0"><i class="material-icons"> timeline </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#clientesBody").html(html);
                        dataTableCreate();
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

function crearCliente() {
    $("#labelModal").html(`Crear Nuevo Cliente`);

    $("#body_modal").html(`<br>
        <div id="formClientes">
            <div class="coolinput">
                <label name="Nombre" for="nombre" class="text">Nombre</label>
                <input name="Nombre" type="text" class="input capitalize obligatorio" id="nombre" autocomplete="off" maxlength"20"/>
                <span><strong class="msj_validacion" id="nombre_error" ></strong></span>
            </div>

            <div class="coolinput">
                <label name="Apellido Paterno" for="apellidoP" class="text">Apellido Paterno</label>
                <input name="Apellido Paterno" type="text" class="input capitalize obligatorio" id="apellidoP" autocomplete="off" maxlength"20"/>
                <span><strong class="msj_validacion" id="apellidoP_error" ></strong></span>
            </div>

            <div class="coolinput">
                <label name="Apellido Materno" for="apellidoM" class="text">Apellido Materno</label>
                <input name="Apellido Materno" type="text" class="input capitalize" id="apellidoM" autocomplete="off" maxlength"20"/>
                <span><strong class="msj_validacion" id="apellidoM_error" ></strong></span>
            </div>

            <div class="coolinput">
                <label name="Teléfono" for="telefono" class="text">Teléfono</label>
                <input name="Teléfono" type="text" class="input capitalize" id="telefono" autocomplete="off" maxlength"20"/>
                <span><strong class="msj_validacion" id="telefono_error" ></strong></span>
            </div>
            
            <div class="coolinput">
                <label name="Correo" for="correo" class="text">Correo</label>
                <input name="Correo" type="text" class="input" id="correo" autocomplete="off" maxlength"100"/>
                <span><strong class="msj_validacion" id="correo_error" ></strong></span>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarCliente();">
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
}

function verPerfilCliente(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/clientes/obtenerCliente.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        Swal.fire({ icon: "warning", title: "Sin datos.", text: "" });
                    } else {
                        result.forEach((data, index) => {
                            let nombreModal = data.nombre;
                            let apellidoPModal = data.apellidoP;
                            let apellidoMModal = data.apellidoM;
                            let telefonoModal = data.telefono;
                            let correoModal = data.correo;
                            let motivoMovimientoModal = data.motivoMovimiento;
                            let fechaUlmitoMovimientoModal = data.fechaUlmitoMovimiento;
                            let IDModal = data.ID;

                            $("#labelModal").html(`Actualizar Cliente`);

                            $("#body_modal").html(`<br>
                                <div id="formClientes">
                                    <div class="coolinput">
                                        <label name="Nombre" for="nombre" class="text">Nombre</label>
                                        <input name="Nombre" type="text" class="capitalize obligatorio input" id="nombre" autocomplete="off" maxlength"20" value="${nombreModal}"/>
                                    </div>

                                    <div class="coolinput">
                                        <label name="Apellido Paterno" for="apellidoP" class="text">Apellido Paterno</label>
                                        <input name="Apellido Paterno" type="text" class="input capitalize obligatorio" id="apellidoP" autocomplete="off" maxlength"20" value="${apellidoPModal}"/>
                                    </div>

                                    <div class="coolinput">
                                        <label name="Apellido Materno" for="apellidoM" class="text">Apellido Materno</label>    
                                        <input type="text" class="input capitalize" id="apellidoM" autocomplete="off" maxlength"20" value="${apellidoMModal}"/>
                                    </div>

                                    <div class="coolinput">
                                        <label name="Teléfono" for="telefono" class="text">Teléfono</label>    
                                        <input type="text" class="input capitalize" id="telefono" autocomplete="off" maxlength"20" value="${telefonoModal}"/>
                                    </div>
                                    
                                    <div class="coolinput">
                                        <label name="Correo" for="correo" class="text">Correo</label>    
                                        <input type="text" class="input" id="correo" autocomplete="off" maxlength"100" value="${correoModal}"/>
                                    </div>
                                </div>

                                <div class="center-fitcomponent" style="width: 100%;">
                                    <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="actualizarCliente(${IDModal});">
                                        <span class="text-sm mb-0 span-buttom"> 
                                            Actualizar
                                            <i class="material-icons"> save </i>
                                        </span>
                                    </div>
                                </div>

                                <div class="center-fitcomponent" style="width: 100%;">
                                    <div class="buttom-red buttom" style="margin-left: auto;margin-right: auto;" onclick="eliminarCliente(${IDModal});">
                                        <span class="text-sm mb-0 span-buttom"> 
                                            Eliminar
                                            <i class="material-icons"> delete </i>
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

function guardarCliente() {
    let values = get_datos_completos("formClientes");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombre").val()).trim();
        let apellidoP = String($("#apellidoP").val()).trim();
        let apellidoM = String($("#apellidoM").val()).trim();
        let telefono = String($("#telefono").val()).trim();
        let correo = String($("#correo").val()).trim();

        let arr_data_form = {
            'arr_components' : ['nombre' , 'apellidoP' , 'apellidoM' , 'telefono' , 'correo'],
            'arr_max_components' : [10 , 10 , 10 , 15 , 50],
            'arr_min_components' : [5 , 5 , 5 , 10 , 10],
            'arr_tipo_val' : ['str' , 'str' , 'str' , 'number' , 'email'],
            'arr_required' : [1 , 1 , 0 ,1 , 0],
        }

        let resp_val_form = validarCaracteresForm(arr_data_form);

        if(!resp_val_form){ console.log("No paso filtro validacion formulario"); return false; }

        console.log(resp_val_form);

        nombre.replaceAll("'", '"');
        apellidoP.replaceAll("'", '"');
        apellidoM.replaceAll("'", '"');
        telefono.replaceAll("'", '"');
        correo.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/clientes/guardaCliente.php",
            data: { nombre, apellidoP, apellidoM, telefono, correo },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerClientes();
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

function actualizarCliente(ID) {
    let values = get_datos_completos("formClientes");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombre").val()).trim();
        let apellidoP = String($("#apellidoP").val()).trim();
        let apellidoM = String($("#apellidoM").val()).trim();
        let telefono = String($("#telefono").val()).trim();
        let correo = String($("#correo").val()).trim();

        nombre.replaceAll("'", '"');
        apellidoP.replaceAll("'", '"');
        apellidoM.replaceAll("'", '"');
        telefono.replaceAll("'", '"');
        correo.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/clientes/actualizaCliente.php",
            data: { nombre, apellidoP, apellidoM, telefono, correo, ID },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Actualizado correctamente", [{ text1: "OK" }]);
                        obtenerClientes();
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

function eliminarCliente(ID) {
    Swal.fire({
        title: "",
        text: "¿Estás seguro de querer eliminar el registro?",
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
                url: "./views/clientes/eliminarCliente.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerClientes();
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
    });
}

function HistorialCliente(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/clientes/traerHistorialCliente.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                    } else {
                        result.forEach((data, index) => {
                            html += `
                            <li class="rb-item" ng-repeat="itembx">
                                <div class="timestamp">${volteaFecha(data.fecha, 1)} </div>
                                <div class="item-title">${data.motivo_movimiento}</div>
                            </li> `;
                        });
                        $("#labelModal").html(`Historial Cliente`);

                        $("#body_modal").html(`<br>
                            <div>
                                <div class="rb-container" style="max-height: 500px; overflow-y: scroll;padding-top: 15px;pointer-events: all;padding-left: 15px; text-align: center;">
                                    <ul class="rb" style="margin: 0;">
                                       ${html}  
                                    </ul>
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
