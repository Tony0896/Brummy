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
                        let temperamento = "";
                        let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
                        result.forEach((data, index) => {
                            if (data.indicadorCliente == "verde") {
                                temperamento = `#27AE60`;
                            } else if (data.indicadorCliente == "amarilo") {
                                temperamento = `#ffb02e`;
                            } else if (data.indicadorCliente == "rojo") {
                                temperamento = `#ff0300`;
                            } else {
                                temperamento = `#FFFFFF`;
                            }
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td>BRUHPSCTE${data.ID}</td>
                                <td> <span class="material-icons" style="font-size: 18px;color: ${temperamento}"> fiber_manual_record </span> </td>
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

                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Membresía" onclick="memberCliente(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> portrait </i></span>
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

            <div class="coolinput">
                <label for="indicadorCliente" class="text">Indicadr Cliente</label>
                <select class="input capitalize obligatorio" name="Indicadr Cliente" id="indicadorCliente" style="background-color: rgb(255, 255, 255);width:100%;">
                    <option value="">Selecciona una opción</option>
                    <option value="verde">&#129001;</option>
                    <option value="amarilo">&#129000;</option>
                    <option value="rojo">&#128997;</option>
                </select>
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
                            let indicadorClienteModal = data.indicadorCliente;

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

                                    <div class="coolinput">
                                        <label for="indicadorCliente" class="text">Indicadr Cliente</label>
                                        <select class="input capitalize obligatorio" name="Indicadr Cliente" id="indicadorClienteModal" style="background-color: rgb(255, 255, 255);width:100%;">
                                            <option value="">Selecciona una opción</option>
                                            <option value="verde">&#129001;</option>
                                            <option value="amarilo">&#129000;</option>
                                            <option value="rojo">&#128997;</option>
                                        </select>
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

                            $("#indicadorClienteModal").val(indicadorClienteModal);
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
        let indicadorCliente = $("#indicadorCliente").val();

        let arr_data_form = {
            arr_components: ["nombre", "apellidoP", "apellidoM", "telefono", "correo"],
            arr_max_components: [10, 10, 10, 15, 50],
            arr_min_components: [5, 5, 5, 10, 10],
            arr_tipo_val: ["str", "str", "str", "number", "email"],
            arr_required: [1, 1, 0, 1, 0],
        };

        let resp_val_form = validarCaracteresForm(arr_data_form);

        if (!resp_val_form) {
            console.log("No paso filtro validacion formulario");
            return false;
        }

        // console.log(resp_val_form);

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
            data: { nombre, apellidoP, apellidoM, telefono, correo, indicadorCliente },
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
        let indicadorCliente = $("#indicadorClienteModal").val();

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
            data: { nombre, apellidoP, apellidoM, telefono, correo, ID, indicadorCliente },
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
                            if (data.FK_modulo == 4) {
                                html += `
                                <li class="rb-item" ng-repeat="itembx">
                                    <div class="timestamp">${volteaFecha(data.fecha, 1)} </div>
                                    <div class="item-title">${data.motivo_movimiento}</div>
                                    <div class="item-title">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Detalle" 
                                        onclick="verDetalleVentaCliente(${data.FK_registro_accion}, ${data.cambioVenta})">
                                            <span class="text-sm mb-0"><i class="material-icons"> visibility </i></span>
                                        </div>
                                    </div>
                                </li> `;
                            } else {
                                html += `
                                <li class="rb-item" ng-repeat="itembx">
                                    <div class="timestamp">${volteaFecha(data.fecha, 1)} </div>
                                    <div class="item-title">${data.motivo_movimiento}</div>
                                </li> `;
                            }
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

function verDetalleVentaCliente(ID, cambioVenta) {
    preloader.show();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/ventas/obtenerVenta.php",
        data: { ID, cambioVenta },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "",
                nombreCliente,
                cambio,
                efectivo,
                price,
                Fecha;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            let random = genRandom();
                            nombreCliente = data.nombreCliente;
                            Fecha = obtenerFechaLarga(data.Fecha + " 00:00:00");
                            cambio = data.cambio;
                            if (Number(cambio) <= 0) {
                                efectivo = data.price;
                            } else {
                                efectivo = data.efectivo;
                            }
                            price = data.price;
                            html += `
                            <div id="${random}_product">
                                <div class="product" style="grid-template-columns: 1fr 80px 1fr 100px;">
                                    <div>
                                        <span class="capitalize" id="${random}_FlagProducto">${data.FlagProducto}</span>
                                        <p class="capitalize">${data.tipo}</p>
                                    </div>
                                    <div class="quantity">
                                        <label style="color: #009071;" id="${random}_label">${data.cantidad}</label>
                                    </div>
                                    <label class="price small my-auto" id="${random}_totals">$${data.precioVenta} c/u</label>
                                    <label class="price small my-auto" id="${random}_total">$${data.total}</label>
                                </div>
                                <hr>
                            </div>`;
                        });
                        $("#labelModalPop").html(`Detalle Venta`);

                        $("#body_modalPop").html(`<br>
                            <div>
                                <div style="display: flex;flex-direction: row;">
                                    <h4 class="card-title me-3" style="font-weight: 400;">Cliente:</h4>
                                    <h4 class="card-title subtitle">${nombreCliente}</h4>
                                </div>
                                <div style="display: flex;flex-direction: row;">
                                    <h4 class="card-title me-3" style="font-weight: 400;">Fecha:</h4>
                                    <h4 class="card-title subtitle">${Fecha}</h4>
                                </div>
                                <hr>
                                <h4 class="card-title mt-2">Carrito</h4>
                                <div class="row">
                                    <div class="col-md-12 mb-2">
                                        <div class="master-container">
                                            <div class="cart">
                                                <div class="products">
                                                    ${html}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 mb-2">
                                        <div class="checkout">
                                            <div class="details">
                                                <span>Subtotal:</span>
                                                <span id="totalSubtotal">$${price}</span>
                                            </div>
                                            <div class="details">
                                                <span>Descuentos de productos:</span>
                                                <span id="totalDescuentos">$0.00</span>
                                            </div>
                                            <hr>
                                            <div class="checkout--footer">
                                                <label class="price" id="priceTotal_text"><sup>$</sup>${price}</label>
                                            </div>
                                            <hr>
                                            <div class="details">
                                                <span>Efectivo:</span>
                                                <span>$${efectivo}</span>
                                            </div>
                                            <div class="details">
                                                <span>Cambio:</span>
                                                <span id="totalDescuentos">$${cambio}</span>
                                            </div>
                                            <hr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `);

                        $("#modalTemplate").css("z-index", "1040");
                        $("#modalPop").modal({
                            backdrop: "static",
                            keyboard: false,
                        });
                        $("#modalPop").modal("show");
                        $("#btnClosePop").on("click", () => {
                            $("#modalPop").modal("hide");
                            $("#btnClosePop").off("click");
                            $("#modalTemplate").css("z-index", "1051");
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

function memberCliente(ID) {
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/clientes/obtenerCliente.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                        Swal.fire({
                            icon: "warning",
                            title: "",
                            text: "No se encontro información.",
                        });
                    } else {
                        // console.log(result);
                        preloader.hide();
                        result.forEach((data, index) => {
                            // console.log(data);
                            data.apellidoM ? localStorage.setItem("apellidoM", data.apellidoM) : localStorage.setItem("apellidoM", "");
                            data.apellidoP ? localStorage.setItem("apellidoP", data.apellidoP) : localStorage.setItem("apellidoP", "");
                            data.correo ? localStorage.setItem("correo", data.correo) : localStorage.setItem("correo", "");
                            data.nombre ? localStorage.setItem("nombre", data.nombre) : localStorage.setItem("nombre", "");
                            data.telefono ? localStorage.setItem("telefono", data.telefono) : localStorage.setItem("telefono", "");
                            localStorage.setItem("IDCte", ID);
                        });

                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: "./views/store/obtenerDataVeterinaria.php",
                            data: { ID },
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;
                                switch (success) {
                                    case true:
                                        if (result == "Sin Datos") {
                                            preloader.hide();
                                            Swal.fire({
                                                icon: "warning",
                                                title: "",
                                                text: "No se encontro información.",
                                            });
                                        } else {
                                            // console.log(result);
                                            preloader.hide();
                                            result.forEach((data, index) => {
                                                // console.log(data);
                                                localStorage.setItem("nameVete", data.nombreVete ? data.nombreVete : "");
                                                localStorage.setItem("telcredentialvete", data.nombreVete ? data.nombreVete : "");
                                                localStorage.setItem(
                                                    "Direccion1credential",
                                                    data.calle ? data.calle + " " + data.numero + ", " + data.cp : ""
                                                );
                                                localStorage.setItem("Direccion1credentia2", data.calle ? data.col + " " + data.municipio : "");
                                            });

                                            $.ajax({
                                                method: "POST",
                                                dataType: "JSON",
                                                url: "./views/store/obtenerHorariosVete.php",
                                                data: { ID },
                                            })
                                                .done(function (results) {
                                                    let success = results.success;
                                                    let result = results.result;
                                                    switch (success) {
                                                        case true:
                                                            if (result == "Sin Datos") {
                                                                preloader.hide();
                                                                Swal.fire({
                                                                    icon: "warning",
                                                                    title: "",
                                                                    text: "No se encontro información.",
                                                                });
                                                            } else {
                                                                // console.log(result);
                                                                preloader.hide();
                                                                result.forEach((data, index) => {
                                                                    let horario = "";
                                                                    if (data.FlagEstatusTienda == "Cerrado") {
                                                                        if (data.numerodia1 == data.numerodia2) {
                                                                            horario = `${data.abreviacion1}: Cerrado`;
                                                                        } else {
                                                                            $("#horariosVete_span").append(
                                                                                (horario = `${data.abreviacion1} - ${data.abreviacion2}: Cerrado`)
                                                                            );
                                                                        }
                                                                    } else {
                                                                        let horario1 =
                                                                            String(data.horario1).split(":")[0] +
                                                                            ":" +
                                                                            String(data.horario1).split(":")[1];
                                                                        let horario2 =
                                                                            String(data.horario2).split(":")[0] +
                                                                            ":" +
                                                                            String(data.horario2).split(":")[1];
                                                                        if (data.numerodia1 == data.numerodia2) {
                                                                            horario = `${data.abreviacion1}: De ${horario1} a ${horario2}`;
                                                                        } else {
                                                                            horario = `${data.abreviacion1} - ${data.abreviacion2}: De ${horario1} a ${horario2}`;
                                                                        }
                                                                    }
                                                                    if (index == 2) {
                                                                        localStorage.setItem("horario3credential", horario);
                                                                    } else if (index == 0) {
                                                                        localStorage.setItem("horario1credential", horario);
                                                                    } else if (index == 1) {
                                                                        localStorage.setItem("horario2credential", horario);
                                                                    }
                                                                });
                                                                $.ajax({
                                                                    method: "POST",
                                                                    dataType: "JSON",
                                                                    url: "./views/store/obtenerContactosVete.php",
                                                                    data: { ID },
                                                                })
                                                                    .done(function (results) {
                                                                        let success = results.success;
                                                                        let result = results.result;
                                                                        switch (success) {
                                                                            case true:
                                                                                if (result == "Sin Datos") {
                                                                                    preloader.hide();
                                                                                    Swal.fire({
                                                                                        icon: "warning",
                                                                                        title: "",
                                                                                        text: "No se encontro información.",
                                                                                    });
                                                                                } else {
                                                                                    // console.log(result);
                                                                                    preloader.hide();
                                                                                    result.forEach((data, index) => {
                                                                                        if (index == 0) {
                                                                                            localStorage.setItem("telcredentialvete", data.numero);
                                                                                        }
                                                                                    });

                                                                                    $("#contenido").load(
                                                                                        "templates/clientes/generarMembresia.php",
                                                                                        function (responseTxt, statusTxt, xhr) {
                                                                                            if (statusTxt != "error") {
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                }
                                                                                break;

                                                                            case false:
                                                                                preloader.hide();
                                                                                Swal.fire({
                                                                                    icon: "warning",
                                                                                    title: "Opps..",
                                                                                    text: "Algo salio mal vuelve a intentarlo.",
                                                                                });
                                                                                break;
                                                                        }
                                                                    })
                                                                    .fail(function (jqXHR, textStatus, errorThrown) {
                                                                        preloader.hide();
                                                                        console.log(
                                                                            "adminCapacitacion: " +
                                                                                jqXHR.responseText +
                                                                                "\nEstatus: " +
                                                                                textStatus +
                                                                                "\nError: " +
                                                                                errorThrown
                                                                        );
                                                                    });
                                                            }
                                                            break;

                                                        case false:
                                                            preloader.hide();
                                                            Swal.fire({
                                                                icon: "warning",
                                                                title: "Opps..",
                                                                text: "Algo salio mal vuelve a intentarlo.",
                                                            });
                                                            break;
                                                    }
                                                })
                                                .fail(function (jqXHR, textStatus, errorThrown) {
                                                    preloader.hide();
                                                    console.log(
                                                        "adminCapacitacion: " +
                                                            jqXHR.responseText +
                                                            "\nEstatus: " +
                                                            textStatus +
                                                            "\nError: " +
                                                            errorThrown
                                                    );
                                                });
                                        }
                                        break;

                                    case false:
                                        preloader.hide();
                                        Swal.fire({
                                            icon: "warning",
                                            title: "Opps..",
                                            text: "Algo salio mal vuelve a intentarlo.",
                                        });
                                        break;
                                }
                            })
                            .fail(function (jqXHR, textStatus, errorThrown) {
                                preloader.hide();
                                console.log("adminCapacitacion: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                            });
                    }
                    break;

                case false:
                    preloader.hide();
                    Swal.fire({
                        icon: "warning",
                        title: "Opps..",
                        text: "Algo salio mal vuelve a intentarlo.",
                    });
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            preloader.hide();
            console.log("adminCapacitacion: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}
