$(document).ready(() => {
    // preloader.hide();
    dataVenta();
});

function dataVenta() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/clientes/obtenerClientes.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "<option value=''> Selecciona un cliente </option>";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            html += `<option value="${data.ID}">${data.nombre} ${data.apellidoP} ${data.apellidoM}</option>`;
                        });
                    }
                    $.ajax({
                        method: "POST",
                        dataType: "JSON",
                        url: "./views/inventario/obtenerInventario2.php",
                        data: {},
                    })
                        .done(function (results) {
                            let success = results.success;
                            let result = results.result;
                            let html2 = "<option value=''> Selecciona una opción </option>";
                            switch (success) {
                                case true:
                                    if (result == "Sin Datos") {
                                        preloader.hide();
                                    } else {
                                        result.forEach((data, index) => {
                                            let descuento = 0;
                                            if (data.fechaInicio <= getDateActual() && data.fechaFin >= getDateActual()) {
                                                descuento = (Number(data.porcentaje) * data.precioVenta) / 100;
                                            }
                                            html2 += `<option value="${data.ID}" 
                                            data_descuento="${descuento}" 
                                            data_Flagtipo = "${data.Flagtipo}" 
                                            data_codigo = "${data.codigo}" 
                                            data_descripcion = "${data.descripcion}" 
                                            data_nombre = "${data.nombre}" 
                                            data_precioVenta = "${data.precioVenta}" 
                                            data_stockReal = "${data.stockReal}" 
                                            data_urlImg="${data.urlImg ? data.urlImg : ""}">
                                                ${data.codigo} - ${data.nombre} (${data.descripcion})
                                            </option>`;
                                        });

                                        preloader.hide();
                                        $("#clientes").html(html);
                                        $("#productos").html(html2);

                                        $("#clientes").select2({});
                                        $("#productos").select2({});
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

function regresaVentas() {
    preloader.show();
    $("#contenido").load("templates/ventas/ventas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            // documentReadyVacantes();
        }
    });
}

function confirmarAgregarProducto() {
    let IDproducto = $("#productos").val();
    if (IDproducto) {
        let Flagtipo = String($("#productos").find(":selected").attr("data_Flagtipo"));
        let codigo = String($("#productos").find(":selected").attr("data_codigo"));
        let descripcion = String($("#productos").find(":selected").attr("data_descripcion"));
        let nombre = String($("#productos").find(":selected").attr("data_nombre"));
        let precioVenta = String($("#productos").find(":selected").attr("data_precioVenta"));
        let stockReal = String($("#productos").find(":selected").attr("data_stockReal"));
        let descuento = Number($("#productos").find(":selected").attr("data_descuento"));
        let urlImg = String($("#productos").find(":selected").attr("data_urlImg"));

        Swal.fire({
            title: "",
            // text: `¿Estás seguro de querer agregar ${capitalizeLetras(nombre)} a la venta?`,
            html: `¿Estás seguro de querer agregar <strong>${nombre}</strong> 
            <text style="font-style: italic;">(${descripcion})</text> a la venta? 
            ${
                urlImg
                    ? `<div style=" margin: auto;width: fit-content; padding: 20px 0px 0px 0px;"> <div class="card__avatar"> <img src="./../../${urlImg}" alt=""></div> </div>`
                    : ``
            }`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#7066e0",
            cancelButtonColor: "#FF0037",
            confirmButtonText: "OK",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                let random = genRandom();
                $(".products").append(`
                    <div id="${random}_product" class="productoD">
                        <div class="product">
                            <input type="hidden" id="${random}_stock" value="${stockReal}">
                            <input type="hidden" id="${random}_costo" value="${Number(precioVenta).toFixed(2)}">
                            <input type="hidden" id="${random}_FKProducto" value="${IDproducto}">
                            <input type="hidden" id="${random}_Flagtipo" value="${Flagtipo}">
                            <input type="hidden" id="${random}_descuento" value="${descuento}">

                            <div>
                                <span class="capitalize" id="${random}_FlagProducto"><strong>${nombre}</strong></span>
                                <p class="capitalize">${Flagtipo} <text style="font-style: italic;">(${descripcion})</text></p>
                                <p>$${Number(precioVenta).toFixed(2)}</p>
                            </div>
                            <div class="quantity">
                                <button id="${random}_remove" onclick="removeACuenta(this.id)">
                                    <span class="text-sm mb-0"> <i class="material-icons" style="border: 2px solid #009071; color: #009071; border-top-left-radius: 10px; border-bottom-left-radius: 10px;"> remove </i></span>
                                </button>
                                <label style="color: #009071;" id="${random}_label">0</label>
                                <button id="${random}_add" onclick="addACuenta(this.id)">
                                    <span class="text-sm mb-0"> <i class="material-icons" style="border: 2px solid #009071;color: #009071;border-top-right-radius: 10px;border-bottom-right-radius: 10px;"> add </i></span>
                                </button>
                            </div>
                            <label class="price small my-auto" id="${random}_total">$0.00</label>
                            <div class="buttom-red buttom" onclick="deleteProducto(${random})" style="margin: auto;">
                                <span class="text-sm mb-0" style="color: inherit;"> <i class="material-icons" style="margin-left: 0px;"> delete </i></span>
                            </div>
                        </div>
                        <div id="${random}_productDescuento">
                        </div>
                        <hr>
                    </div>
                `);
            }
            $("#productos").val("");
            $("#productos").trigger("change");
        });
    }
}

function guardarVenta() {
    preloader.show();
    let cliente = $("#clientes").val();
    let price = $("#priceTotal").val();
    let subTotal = $("#subTotalText").val();
    let totalDescuentos = $("#totalDescuentosText").val();
    let FlagExacto = 1;
    let efectivo = 0;
    let cambio = 0;

    let cboxCambio = $("#cboxCambio").prop("checked");
    if (!cboxCambio) {
        FlagExacto = 0;
        efectivo = Number($("#efectivo").val());
        cambio = Number($("#cambio").val());
    }
    let nameCliente = $("#clientes").find("option:selected").text();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/ventas/guardarHeaderVenta.php",
        data: { cliente, price, FlagExacto, efectivo, cambio, nameCliente, subTotal, totalDescuentos },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            let dataID = data.IDHeader;
                            let campos;
                            campos = document.querySelectorAll(".products div.productoD");
                            let random = 0;
                            campos.forEach((campos) => {
                                if (campos.id) {
                                    random = String(campos.id).replace("_product", "");
                                    let FlagProducto = $("#" + random + "_FlagProducto").text();
                                    let FKProducto = $("#" + random + "_FKProducto").val();
                                    let label = $("#" + random + "_label").text();
                                    let total = Number(String($("#" + random + "_total").text()).replace("$", ""));
                                    let stock = $("#" + random + "_stock").val();
                                    let descuento = $("#" + random + "_productDescuentos").val();
                                    let newStock = Number(stock) - Number(label);

                                    $.ajax({
                                        method: "POST",
                                        dataType: "JSON",
                                        url: "./views/ventas/guardarDetalleVenta.php",
                                        data: { dataID, FlagProducto, FKProducto, label, total, newStock, descuento },
                                    })
                                        .done(function (results) {
                                            let success = results.success;
                                            switch (success) {
                                                case true:
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
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            preloader.hide();
                            msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);
                            regresaVentas();
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

function addACuenta(ID) {
    let random = String(ID).replace("_add", "");
    let stockReal = String($("#" + random + "_stock").val()).replace("_stock", "");
    let cantidadActual = Number(String($("#" + random + "_label").text()).replace("_label", "")).toFixed();
    let Flagtipo = String($("#" + random + "_Flagtipo").val()).replace("_Flagtipo", "");
    if (Flagtipo == "Producto") {
        if (cantidadActual == stockReal) {
            msj.show("Aviso", "No se cuenta con el stock suficiente para poder agregar más productos", [{ text1: "OK" }]);
            return false;
        }
    }
    let costoProducto = Number(String($("#" + random + "_costo").val()).replace("_costo", "")).toFixed(2);
    cantidadActual = Number(cantidadActual) + 1;
    costoProducto = Number(Number(costoProducto) * cantidadActual);
    $("#" + random + "_label").text(cantidadActual);
    $("#" + random + "_total").text("$" + Number(costoProducto).toFixed(2));

    let descuentos = Number(String($("#" + random + "_descuento").val()).replace("_descuento", "")).toFixed(2);
    if (descuentos != 0) {
        descuentos = Number(Number(descuentos) * cantidadActual);
        $(`#${random}_productDescuento`).html(`
            <div class="descuentosProductos" style="text-align: end;">
                <span class="price small my-auto" style="color: #FF0037;margin-right: 20px;">- $${Number(descuentos).toFixed(2)}</span>
                <input type="hidden" id="${random}_productDescuentos" value="${descuentos}">
            </div>
        `);
    }
    obtenerTotal();
}

function removeACuenta(ID) {
    let random = String(ID).replace("_remove", "");
    let cantidadActual = Number(String($("#" + random + "_label").text()).replace("_label", "")).toFixed();
    if (cantidadActual == 0) {
    } else {
        let stockReal = String($("#" + random + "_stock").val()).replace("_stock", "");
        let costoProducto = Number(String($("#" + random + "_costo").val()).replace("_costo", "")).toFixed(2);
        cantidadActual = Number(cantidadActual) - 1;
        costoProducto = Number(Number(costoProducto) * cantidadActual);
        $("#" + random + "_label").text(cantidadActual);
        $("#" + random + "_total").text("$" + Number(costoProducto).toFixed(2));

        let descuentos = Number(String($("#" + random + "_descuento").val()).replace("_descuento", "")).toFixed(2);
        if (descuentos != 0) {
            descuentos = Number(Number(descuentos) * cantidadActual);
            $(`#${random}_productDescuento`).html(`
                <div class="descuentosProductos" style="text-align: end;">
                    <span class="price small my-auto" style="color: #FF0037;margin-right: 20px;">- $${Number(descuentos).toFixed(2)}</span>
                </div>
            `);
        }
        obtenerTotal();
    }
}

function obtenerTotal() {
    let campos;
    campos = document.querySelectorAll(".products div div label.price.small.my-auto");
    let price = 0;

    campos.forEach((campos) => {
        let price1 = 0;
        price1 = String(campos.innerText).replace("$", "");
        price = Number(price) + Number(price1);
    });

    let totalDescuentos = 0;
    let campos1;
    campos1 = document.querySelectorAll(".descuentosProductos");

    campos1.forEach((campos1) => {
        let totalDescuentos1 = 0;
        totalDescuentos1 = String(campos1.innerText).replace("- $", "");
        totalDescuentos = Number(totalDescuentos) + Number(totalDescuentos1);
    });

    $("#totalSubtotal").html("<sup>$</sup>" + Number(price).toFixed(2));
    $("#subTotalText").val(Number(price).toFixed(2));

    price = Number(price) - Number(totalDescuentos);
    $("#priceTotal").val(price);
    $("#priceTotal_text").html("<sup>$</sup>" + Number(price).toFixed(2));
    $("#totalDescuentos").html("<sup>$</sup>" + Number(totalDescuentos).toFixed(2));
    $("#totalDescuentosText").val(Number(totalDescuentos).toFixed(2));
}

function deleteProducto(random) {
    Swal.fire({
        title: "",
        text: `¿Estás seguro de querer eliminar este item?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            $(`#${random}_product`).remove();
            obtenerTotal();
        }
    });
}

function terminarVenta() {
    let cliente = $("#clientes").val();
    let priceTotal = Number($("#priceTotal").val());

    if (cliente) {
        if (priceTotal > 0) {
            $("#labelModal").html(`Terminar Venta`);

            $("#body_modal").html(`<br>
                <div id="formTerminarVenta">
                    <div class="form-check form-check-flat form-check-primary ms-2">
                        <label class="form-check-label">
                            <input type="checkbox" class="form-check-input" id="cboxCambio" onchange="muestraCambio()" checked>
                            Efectivo Exacto
                        <i class="input-helper"></i></label>
                    </div>

                    <div class="coolinput">
                        <label for="toalVenta" class="text">Total Venta</label>
                        <input type="text" class="capitalize input" id="toalVenta" autocomplete="off" maxlength"20" value="${priceTotal}" readonly/>
                    </div>
                    
                    <div class="coolinput">
                        <label for="efectivo" class="text">Efectivo</label>
                        <input type="number" class="capitalize input" id="efectivo" autocomplete="off" maxlength"20" onchange="calculaCambio()" disabled/>
                    </div>

                    <div class="coolinput">
                        <label for="cambio" class="text">Cambio</label>
                        <input type="number" class="capitalize input" id="cambio" autocomplete="off" maxlength"20" readonly/>
                    </div>
                    
                </div>

                <div class="center-fitcomponent" style="width: 100%;">
                    <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarVenta();">
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
        } else {
            msj.show("Aviso", "La cuenta esta en 0.", [{ text1: "OK" }]);
        }
    } else {
        msj.show("Aviso", "Debes seleccionar a un cliente.", [{ text1: "OK" }]);
    }
}

function muestraCambio() {
    let cboxCambio = $("#cboxCambio").prop("checked");
    if (cboxCambio) {
        $("#efectivo").prop("disabled", true);
        $("#efectivo").val("");
        $("#cambio").val("");
    } else {
        $("#efectivo").prop("disabled", false);
    }
}

function calculaCambio() {
    let efectivo = Number($("#efectivo").val());
    let toalVenta = Number($("#toalVenta").val());
    let cambio = 0;
    if (efectivo > 0) {
        if (efectivo >= toalVenta) {
            cambio = Number(efectivo - toalVenta);
            $("#cambio").val(cambio);
        } else {
            $("#cambio").val("El efectivo es menor a el total de la venta");
        }
    }
}
