$(document).ready(() => {
    // preloader.hide();
    let fechaNow = new Date().toLocaleString("sv-SE").split(" ")[0];
    let mes = fechaNow.split("-")[1];
    let anio = fechaNow.split("-")[0];

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    for (let i = 0; i < months.length; i++) {
        let m = i;
        m++;
        if (mes == m) {
            $("#mesVentas").append(`<option value="${m}" selected>${months[i]}</option>`);
        } else {
            $("#mesVentas").append(`<option value="${m}">${months[i]}</option>`);
        }
    }

    for (let i = 3; i > 0; i--) {
        let new_anio = Number(anio) - i;
        $("#anioVentas").append(`<option value="${new_anio}">${new_anio}</option>`);
    }
    $("#anioVentas").append(`<option value="${anio}" selected>${anio}</option>`);

    for (let i = 1; i < 4; i++) {
        let new_anio = Number(anio) + i;
        $("#anioVentas").append(`<option value="${new_anio}">${new_anio}</option>`);
    }

    obtenerVentas(mes, anio);

    $("#mesVentas").change(() => {
        obtenerVentas($("#mesVentas").val(), $("#anioVentas").val());
    });
    $("#anioVentas").change(() => {
        obtenerVentas($("#mesVentas").val(), $("#anioVentas").val());
    });
});

function obtenerVentas(mes, anio) {
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/ventas/obtenerVentas.php",
        data: { mes, anio },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        dataTableDestroy();
                        $("#ventasBody").html(html);
                        dataTableCreateDes();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        let html, codigo, stock;
                        result.forEach((data, index) => {
                            codigo = data.codigo;
                            stock = data.stockReal;
                            if (data.Flagtipo == "Servicio") {
                                codigo = String(codigo) + String(data.ID);
                                stock = "N/A";
                            }
                            html += `<tr>
                                <td>VTA-${data.ID}</td>
                                <td class="capitalize">${data.nombreCompleto}</td>
                                <td>${data.cantidad}</td>
                                <td>${FormatDate(data.Fecha + " 00:00")}</td>
                                <td>$${CantidadConCommas(data.price)}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Detalle" onclick="verDetalleVenta(${
                                            data.ID
                                        }, ${data.cambioVenta})">
                                            <span class="text-sm mb-0"><i class="material-icons"> shopping_cart </i></span>
                                        </div>
                                        <div class="buttom-green buttom button-sinText mx-1" title="Compartir" onclick="generarTicketVenta(${
                                            data.ID
                                        }, ${data.cambioVenta})">
                                            <span class="text-sm mb-0"><i class="material-icons"> download </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#ventasBody").html(html);
                        dataTableCreateDes();
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

function irNuevaVenta() {
    preloader.show();
    $("#contenido").load("templates/ventas/nuevaVenta.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            // documentReadyVacantes();
        }
    });
}

function verDetalleVenta(ID, cambioVenta) {
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
                Fecha,
                devuelto,
                totalDescuentos;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            let random = `${data.ID}` + genRandom();
                            // console.log(random);
                            nombreCliente = data.nombreCliente;
                            Fecha = obtenerFechaLarga(data.Fecha + " 00:00:00");
                            cambio = data.cambio;
                            devuelto = data.devuelto;
                            totalDescuentos = data.totalDescuentos;
                            subTotal = data.subTotal;
                            if (Number(cambio) <= 0) {
                                efectivo = data.price;
                            } else {
                                efectivo = data.efectivo;
                            }
                            price = data.price;
                            html += `
                            <div id="${random}_product" class="productt">
                                <div class="product" style="grid-template-columns: 0.75fr 100px 0.75fr 100px;">
                                    <div>
                                        <span class="capitalize" id="${random}_FlagProducto">${data.FlagProducto}</span>
                                        <p class="capitalize">${data.tipo}</p>
                                    </div>
                                    <div class="quantity">
                                        <div class="div_editaVentaProuct1">
                                            <label style="color: #009071;" id="${random}_real">${data.cantidad}</label>
                                        </div>
                                        <div class="div_editaVentaProuct" style="display: none;">
                                            <button id="${random}_remove" onclick="removeACuentaEdita(this.id)">
                                                <span class="text-sm mb-0"> <i class="material-icons" style="border: 2px solid #009071; color: #009071; border-top-left-radius: 10px; border-bottom-left-radius: 10px;"> remove </i></span>
                                            </button>
                                            <label style="color: #009071;" id="${random}_label">${data.cantidad}</label>
                                            <button id="${random}_add" onclick="addACuentaEdita(this.id)">
                                                <span class="text-sm mb-0"> <i class="material-icons" style="border: 2px solid #009071;color: #009071;border-top-right-radius: 10px;border-bottom-right-radius: 10px;"> add </i></span>
                                            </button>
                                        </div>
                                    </div>
                                    <label class="price small my-auto" id="${random}_totals">$${CantidadConCommas(data.precioVenta)} c/u</label>
                                    <label class="price small my-auto edit" id="${random}_total">$${data.total}</label>
                                </div>
                                ${
                                    Number(data.descuento) > 0
                                        ? `<div id="${random}_productDescuento">
                                        <div class="descuentosProductos" style="text-align: end;">
                                            <span class="price small my-auto" style="color: #FF0037;margin-right: 20px;">- $${Number(
                                                data.descuento
                                            ).toFixed(2)}</span>
                                        </div>
                                        <input type="hidden" id="${random}_productDescuentoText" value="${Number(data.descuento).toFixed(2)}">
                                        <input type="hidden" id="${random}_productDescuentoBack" value="${Number(
                                              Number(data.descuento) / data.cantidad
                                          )}">
                                    </div>`
                                        : `<input type="hidden" id="${random}_productDescuentoText" value="${Number(0).toFixed(2)}">`
                                }
                                <div id="${random}_comentarios" style="display: none;">
                                             ${
                                                 data.tipo == "Servicio"
                                                     ? `
                                                        <div class="checkbox-wrapper-46" style="margin: 22px 0px 12px 8px; display:none;">
                                                            <input type="checkbox" id="cbx-46_${random}" class="inp-cbx"/>
                                                            <label for="cbx-46_${random}" class="cbx">
                                                                <span style="transform: scale(1.2);">
                                                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                                    </svg>
                                                                </span>
                                                                <span style="font-size: 16px;">¿Devolver al Stock?</span>
                                                            </label>
                                                        </div>
                                                    `
                                                     : `
                                                        <div class="checkbox-wrapper-46" style="margin: 22px 0px 12px 8px;">
                                                            <input type="checkbox" id="cbx-46_${random}" class="inp-cbx"/>
                                                            <label for="cbx-46_${random}" class="cbx">
                                                                <span style="transform: scale(1.2);">
                                                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                                                    </svg>
                                                                </span>
                                                                <span style="font-size: 16px;">¿Devolver al Stock?</span>
                                                            </label>
                                                        </div>
                                                    `
                                             }

                                    <div class="coolinput" style="width: 100%;">
                                        <label for="comentariosAdicionales_${random}" class="text">Comentarios Adicionales</label>
                                        <textarea
                                            class="capitalize input"
                                            style="font-family: 'ITC Avant Garde Gothic', sans-serif; height: 105px; padding-top: 11px"
                                            id="comentariosAdicionales_${random}"
                                            name="¿Tienes algún comentario, pregunta o sugerencia?"
                                            cols="30"
                                            rows="5"
                                        ></textarea>
                                    </div>
                                </div>
                                <input type="hidden" id="${random}_costo" value="${Number(data.precioVenta).toFixed(2)}">
                                <input type="hidden" id="${random}_FKProducto" value="${data.FKProducto}">
                                <input type="hidden" id="${random}_Flagtipo" value="${data.tipo}">
                                ${
                                    cambioVenta == 1 && Number(data.newStock) > 0
                                        ? `
                                            <div>
                                                <span class="capitalize" style="color: #FF0037;"> <strong>${data.newStock}</strong> cancelación(es) por el siguiente motivo: <strong> ${data.comentarios} </strong></span>
                                            </div>
                                        `
                                        : ``
                                }
                                <hr>
                            </div>`;
                        });
                        $("#labelModal").html(`Detalle Venta`);

                        $("#body_modal").html(`<br>
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
                                                <span id="totalSubtotal">$${CantidadConCommas(subTotal)}</span>
                                            </div>
                                            <div class="details">
                                                <span>Descuentos de productos:</span>
                                                <span id="totalDescuentos">$${CantidadConCommas(totalDescuentos)}</span>
                                            </div>
                                            <hr>
                                            <div class="checkout--footer">
                                                <label class="price" style="margin-right: auto;font-size: 18px;">TOTAL DE VENTA</label>
                                                <label class="price"><sup>$</sup>${CantidadConCommas(price)}</label>
                                                <input type="hidden" id="priceTotal_text" value="${price}">
                                            </div>
                                            <hr>
                                            <div class="details">
                                                <span>Efectivo:</span>
                                                <span>$${CantidadConCommas(efectivo)}</span>
                                            </div>
                                            <div class="details">
                                                <span>Cambio:</span>
                                                <span id="totalDescuentos">$${CantidadConCommas(cambio)}</span>
                                            </div>
                                             <hr>
                                            ${
                                                cambioVenta == 1
                                                    ? `<div class="checkout--footer">
                                                    <label class="price" style="margin-right: auto;font-size: 18px;">TOTAL DEVUELTO</label>
                                                    <label class="price" id="priceTotal_text_EDIT"><sup>$</sup>${CantidadConCommas(
                                                        Number(devuelto).toFixed(2)
                                                    )}</label>
                                                    <input type="hidden" id="priceTotal" value="0">
                                                    <hr>
                                                </div>`
                                                    : `<div class="checkout--footer div_editaVentaProuct" id="div_devolver" style="display: none;">
                                                    <label class="price" style="margin-right: auto;font-size: 18px;">TOTAL A DEVOLVER</label>
                                                    <label class="price" id="priceTotal_text_EDIT"><sup>$</sup>${CantidadConCommas(
                                                        Number(0).toFixed(2)
                                                    )}</label>
                                                    <input type="hidden" id="priceTotal" value="0">
                                                    <hr>
                                                </div>`
                                            }
                                        </div>
                                    </div>
                                </div>
                                ${
                                    cambioVenta == 1
                                        ? ``
                                        : `    
                                    <div class="row mb-4 div_editaVentaProuct1">
                                        <div class="col-md-12 mb-2">
                                            <div class="buttom-red buttom" onclick="editarCarritoPost(${ID})" style="margin: auto;">
                                                <span class="text-sm mb-0">Editar <i class="material-icons"> remove_shopping_cart </i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row div_editaVentaProuct" style="display: none;">
                                        <div class="col-md-12 mb-2">
                                            <div class="buttom-blue buttom" onclick="cerrarCarritoPost(${ID})" style="margin: auto;">
                                                <span class="text-sm mb-0">Cerrar y Guardar <i class="material-icons"> save </i></span>
                                            </div>
                                        </div>
                                    </div>
                                `
                                }
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

function editarCarritoPost() {
    $(".div_editaVentaProuct1").css("display", "none");
    $(".div_editaVentaProuct").css("display", "flex");
}

function removeACuentaEdita(ID) {
    let random = String(ID).replace("_remove", "");
    let cantidadActual = Number(String($("#" + random + "_label").text()).replace("_label", "")).toFixed();
    if (cantidadActual == 0) {
    } else {
        let costoProducto = Number(String($("#" + random + "_costo").val()).replace("_costo", "")).toFixed(2);
        let descuentosTotal = Number(String($("#" + random + "_productDescuentoText").val()));
        let descuentosTotalProduct = Number(Number(String($("#" + random + "_productDescuentoText").val())) / cantidadActual);
        let productDescuentoBack = Number(String($("#" + random + "_productDescuentoBack").val()));
        cantidadActual = Number(cantidadActual) - 1;
        costoProducto = Number(Number(costoProducto) * cantidadActual);
        $("#" + random + "_label").text(cantidadActual);
        $("#" + random + "_total").text("$" + Number(costoProducto).toFixed(2));
        descuentosTotal = descuentosTotal - descuentosTotalProduct;
        $("#" + random + "_productDescuento").html(`
            <div class="descuentosProductos" style="text-align: end;">
                <span class="price small my-auto" style="color: #FF0037;margin-right: 20px;">- $${Number(descuentosTotal).toFixed(2)}</span>
            </div>
            <input type="hidden" id="${random}_productDescuentoText" value="${descuentosTotal}">
            <input type="hidden" id="${random}_productDescuentoBack" value="${productDescuentoBack}">`);
        obtenerTotalEdit();
    }
    let stockReal = Number(String($("#" + random + "_real").text()).replace("_stock", ""));

    if (stockReal == cantidadActual) {
        $("#" + random + "_comentarios").css("display", "none");
        $(`#comentariosAdicionales_${random}`).removeClass("obligatorio");
    } else {
        $("#" + random + "_comentarios").css("display", "block");
        $(`#comentariosAdicionales_${random}`).addClass("obligatorio");
    }
}

function addACuentaEdita(ID) {
    let random = String(ID).replace("_add", "");
    // console.log(random);
    let stockReal = Number(String($("#" + random + "_real").text()).replace("_stock", ""));
    let cantidadActual = Number(String($("#" + random + "_label").text()).replace("_label", "")).toFixed();
    let Flagtipo = String($("#" + random + "_Flagtipo").val()).replace("_Flagtipo", "");
    if (cantidadActual == stockReal) {
        msj.show("Aviso", "No puedes agregar más productos de la cuenta original", [{ text1: "OK" }]);
        return false;
    }
    let costoProducto = Number(String($("#" + random + "_costo").val()).replace("_costo", "")).toFixed(2);
    cantidadActual = Number(cantidadActual) + 1;
    costoProducto = Number(Number(costoProducto) * cantidadActual);
    let descuentosTotal = Number(String($("#" + random + "_productDescuentoText").val()));
    let descuentosTotalProduct = Number(Number(String($("#" + random + "_productDescuentoBack").val())));
    descuentosTotal = descuentosTotal + descuentosTotalProduct;
    $("#" + random + "_productDescuento").html(`
        <div class="descuentosProductos" style="text-align: end;">
            <span class="price small my-auto" style="color: #FF0037;margin-right: 20px;">- $${Number(descuentosTotal).toFixed(2)}</span>
        </div>
        <input type="hidden" id="${random}_productDescuentoText" value="${descuentosTotal}">
        <input type="hidden" id="${random}_productDescuentoBack" value="${descuentosTotalProduct}">        
    `);
    $("#" + random + "_label").text(cantidadActual);
    $("#" + random + "_total").text("$" + Number(costoProducto).toFixed(2));
    obtenerTotalEdit();

    if (stockReal == cantidadActual) {
        $("#" + random + "_comentarios").css("display", "none");
        $(`#comentariosAdicionales_${random}`).removeClass("obligatorio");
    } else {
        $("#" + random + "_comentarios").css("display", "block");
        $(`#comentariosAdicionales_${random}`).addClass("obligatorio");
    }
}

function obtenerTotalEdit() {
    let campos;
    campos = document.querySelectorAll(".products div div label.price.small.my-auto.edit");
    let price = 0;

    campos.forEach((campos) => {
        let price1 = 0;
        price1 = String(campos.innerText).replace("$", "");
        // console.log(price1);
        price = Number(price) + Number(price1);
        // console.log(price);
    });

    let campos2;
    campos2 = document.querySelectorAll(".descuentosProductos span");
    let price2 = 0;
    campos2.forEach((campos2) => {
        let price12 = 0;
        price12 = String(campos2.innerText).replace(" $", "");
        // console.log(price12);
        price2 = Number(price2) + Number(price12);
        // console.log(price2);
    });

    price = Number(price) + Number(price2);

    $("#priceTotal").val(Number($("#priceTotal_text").val()) - price);
    $("#priceTotal_text_EDIT").html("<sup>$</sup>" + Number(Number($("#priceTotal_text").val()) - price).toFixed(2));
}

function cerrarCarritoPost(ID) {
    Swal.fire({
        title: "",
        text: "¿Estás seguro de querer guardar la edición de la venta?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            preloader.show();

            let price = $("#priceTotal").val();
            let efectivo = $("#priceTotal_text").val();

            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "./views/ventas/guardarHeaderVentaCambio.php",
                data: { price, efectivo, ID },
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
                                    campos = document.querySelectorAll(".products div.productt");
                                    let random = 0;
                                    campos.forEach((campos) => {
                                        if (campos.id) {
                                            random = String(campos.id).replace("_product", "");
                                            let FlagProducto = $("#" + random + "_FlagProducto").text();
                                            let FKProducto = $("#" + random + "_FKProducto").val();
                                            let label = $("#" + random + "_label").text();
                                            let total = Number(String($("#" + random + "_total").text()).replace("$", ""));
                                            let stock = $("#" + random + "_real").text();
                                            let newStock = Number(stock) - Number(label);
                                            let devuelveStock = 0;
                                            if ($("#cbx-46_" + random).prop("checked") == true) {
                                                devuelveStock = 1;
                                            }
                                            let comentariosAdicionales = $("#comentariosAdicionales_" + random).val();
                                            let descuento = Number(Number(String($("#" + random + "_productDescuentoBack").val())));
                                            $.ajax({
                                                method: "POST",
                                                dataType: "JSON",
                                                url: "./views/ventas/guardarDetalleVentaCambio.php",
                                                data: {
                                                    ID,
                                                    dataID,
                                                    FlagProducto,
                                                    FKProducto,
                                                    label,
                                                    total,
                                                    newStock,
                                                    devuelveStock,
                                                    comentariosAdicionales,
                                                    descuento,
                                                },
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
                                                    console.log(
                                                        "error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown
                                                    );
                                                });
                                        }
                                    });
                                    $("#modalTemplate").modal("hide");
                                    $("#btnClose").off("click");
                                    preloader.hide();
                                    msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);
                                    obtenerVentas($("#mesVentas").val(), $("#anioVentas").val());
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
    });
}

function generarTicketVenta(ID, cambioVenta) {
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/obtenerDataVeterinaria.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                    } else {
                        let nombreVete, calle, col, cp, descripcion, eslogan, estado, municipio, numero, pais, urlLogo, telefono;
                        result.forEach((data, index) => {
                            nombreVete = data.nombreVete ? data.nombreVete : "";
                            calle = data.calle ? data.calle : "";
                            col = data.col ? data.col : "";
                            cp = data.cp ? data.cp : "";
                            descripcion = data.descripcion ? data.descripcion : "";
                            eslogan = data.eslogan ? data.eslogan : "";
                            estado = data.estado ? data.estado : "";
                            municipio = data.municipio ? data.municipio : "";
                            numero = data.numero ? data.numero : "";
                            pais = data.pais ? data.pais : "";
                            urlLogo = data.urlLogo ? data.urlLogo : "";
                        });

                        let directionCompleta = calle ? `${calle} ${numero}, ${cp} ${col}, ${municipio} ${estado}` : "";

                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: "./views/store/obtenerContactosVete.php",
                            data: {},
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;
                                switch (success) {
                                    case true:
                                        if (result == "Sin Datos") {
                                        } else {
                                            telefono = result[0].numero;
                                        }
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
                                                    Fecha,
                                                    devuelto,
                                                    totalSubtotal,
                                                    totalDescuentos;
                                                switch (success) {
                                                    case true:
                                                        if (result == "Sin Datos") {
                                                            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                                            preloader.hide();
                                                        } else {
                                                            let data2 = [],
                                                                data1 = [],
                                                                totalDevuelto = 0;
                                                            folioVta = `VTA-${ID}`;
                                                            result.forEach((data, index) => {
                                                                nombreCliente = data.nombreCliente;
                                                                Fecha = obtenerFechaLarga(data.Fecha + " 00:00:00");
                                                                cambio = data.cambio;
                                                                devuelto = data.devuelto;
                                                                if (Number(cambio) <= 0) {
                                                                    efectivo = data.price;
                                                                } else {
                                                                    efectivo = data.efectivo;
                                                                }
                                                                price = data.price;
                                                                totalSubtotal = data.subTotal;
                                                                totalDescuentos = data.totalDescuentos;

                                                                data2 = [
                                                                    ...data2,
                                                                    {
                                                                        style: "columnas",
                                                                        italics: false,
                                                                        columns: [
                                                                            {
                                                                                text: [
                                                                                    {
                                                                                        text: `${data.FlagProducto}\n`,
                                                                                        style: "bold",
                                                                                        alignment: "left",
                                                                                    },
                                                                                    { text: `${data.tipo}`, alignment: "left", fontSize: 9 },
                                                                                ],
                                                                                margin: [30, 10, 15, 0], //left, top, Rigth, bottom
                                                                            },
                                                                            {
                                                                                text: Number(data.cantidad),
                                                                                margin: [30, 10, 15, 0], //left, top, Rigth, bottom
                                                                            },
                                                                            {
                                                                                text: `$${CantidadConCommas(data.precioVenta)} c/u`,
                                                                                margin: [30, 10, 15, 0], //left, top, Rigth, bottom
                                                                            },
                                                                            {
                                                                                text: `$${CantidadConCommas(data.total)}`,
                                                                                margin: [30, 10, 15, 0], //left, top, Rigth, bottom
                                                                            },
                                                                        ],
                                                                        font: "Arial",
                                                                    },
                                                                    cambioVenta == 1 && Number(data.newStock) > 0
                                                                        ? {
                                                                              style: "dataCliente",
                                                                              italics: false,
                                                                              margin: [30, 10, 30, 0], //left, top, Rigth, bottom
                                                                              text: [
                                                                                  {
                                                                                      text: `${Number(data.newStock)} cancelado(s).\n`,
                                                                                      style: "bold",
                                                                                      italics: true,
                                                                                  },
                                                                              ],
                                                                              font: "Arial",
                                                                          }
                                                                        : "",
                                                                    {
                                                                        margin: [30, 3, 28, 5], //left, top, Rigth, bottom
                                                                        text: [
                                                                            {
                                                                                text: `_____________________________________________________________________________________________________________________`,
                                                                                fontSize: 7,
                                                                                alignment: "center",
                                                                            },
                                                                        ],
                                                                        font: "Arial",
                                                                    },
                                                                ];
                                                            });

                                                            if (cambioVenta == 1) {
                                                                totalDevuelto = `$${CantidadConCommas(Number(devuelto).toFixed(2))}`;
                                                            } else {
                                                                totalDevuelto = `$${CantidadConCommas(Number(0).toFixed(2))}`;
                                                            }
                                                            data1 = {
                                                                nombreVete,
                                                                eslogan,
                                                                directionCompleta,
                                                                telefono,
                                                                folioVta,
                                                                nombreCliente,
                                                                Fecha,
                                                                totalSubtotal: `$${CantidadConCommas(totalSubtotal)}`,
                                                                totalDescuentos: `$${CantidadConCommas(totalDescuentos)}`,
                                                                totalVenta: `$${CantidadConCommas(Number(price).toFixed(2))}`,
                                                                efectivo: `$${CantidadConCommas(efectivo)}`,
                                                                cambio: `$${CantidadConCommas(cambio)}`,
                                                                totalDevuelto,
                                                            };
                                                            downloadPDF(data1, data2);
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

function downloadPDF(result1, result2) {
    // console.log(result1, result2);
    let url = getCurrentURL();
    pdfMake.fonts = {
        Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf",
            italics: "Roboto-Italic.ttf",
            bolditalics: "Roboto-Italic.ttf",
        },
        Arial: {
            normal: url + "/Brummy/css/assets/fonts/arial.ttf",
            bold: url + "/Brummy/css/assets/fonts/arialbd.ttf",
            italics: url + "/Brummy/css/assets/fonts/ariali.ttf",
            bolditalics: url + "/Brummy/css/assets/fonts/arialbi.ttf",
        },
    };

    let hora, dia, mes, anio, fechaRegistro;
    let horas = "08:00:00";
    fechaRegistro = "01-10-2024";
    hora = horas.split(":");
    dia = fechaRegistro.split("-")[0];
    mes = fechaRegistro.split("-")[1];
    anio = fechaRegistro.split("-")[2];

    const date = new Date(anio, mes - 1, dia);
    const month = date.toLocaleString("default", { month: "long" });

    let docDefinition = {
        content: [
            {
                style: "columnas",
                italics: false,
                columns: [
                    {
                        image: img1,
                        width: 150,
                        fit: [100, 100],
                        margin: [0, 0, 0, 0], //left, top, Rigth, bottom
                    },
                    {
                        text: `${result1.nombreVete}\n${result1.eslogan}\n\n${result1.directionCompleta}.\n\n${result1.telefono}`,
                        width: "*",
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                        style: "header2",
                    },
                ],
                font: "Arial",
            },
            {
                style: "dataCliente",
                italics: false,
                margin: [30, 12, 30, 0], //left, top, Rigth, bottom
                text: [`Folio venta: ${result1.folioVta}\nCliente: ${result1.nombreCliente}\nFecha: ${result1.Fecha}\n\nCarrito:\n`],
                font: "Arial",
            },
            result2,
            {
                style: "columnas",
                italics: false,
                columns: [
                    {
                        text: [{ text: "\nSubtotal:\n", style: "bold", alignment: "left" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                    {
                        text: [{ text: `\n${result1.totalSubtotal}` + "\n", style: "bold", alignment: "right" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                ],
                font: "Arial",
            },
            {
                style: "columnas",
                italics: false,
                columns: [
                    {
                        text: [{ text: "\nDescuentos de productos:\n", alignment: "left" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                    {
                        text: [{ text: `\n${result1.totalDescuentos}` + "\n", style: "bold", alignment: "right" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                ],
                font: "Arial",
            },
            {
                style: "columnas",
                italics: false,
                columns: [
                    {
                        text: [{ text: "\nTOTAL DE VENTA\n", style: "bold", alignment: "left" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                    {
                        text: [{ text: `\n${result1.totalVenta}\n`, style: "bold", alignment: "right" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                ],
                font: "Arial",
            },
            {
                style: "columnas",
                italics: false,
                columns: [
                    {
                        text: [{ text: "\nEfectivo:\n", alignment: "left" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                    {
                        text: [{ text: `\n${result1.efectivo}` + "\n", style: "bold", alignment: "right" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                ],
                font: "Arial",
            },
            ,
            {
                style: "columnas",
                italics: false,
                columns: [
                    {
                        text: [{ text: "\nCambio:\n", alignment: "left" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                    {
                        text: [{ text: `\n${result1.cambio}` + "\n", style: "bold", alignment: "right" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                ],
                font: "Arial",
            },
            {
                style: "columnas",
                italics: false,
                columns: [
                    {
                        text: [{ text: "\nTOTAL DEVUELTO\n\n", style: "bold", alignment: "left" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                    {
                        text: [{ text: `\n${result1.totalDevuelto}\n\n`, style: "bold", alignment: "right" }],
                        margin: [30, 0, 30, 0], //left, top, Rigth, bottom
                    },
                ],
                font: "Arial",
            },
            ,
            {
                margin: [30, 3, 28, 5], //left, top, Rigth, bottom
                text: [
                    {
                        text: `_____________________________________________________________________________________________________________________`,
                        fontSize: 7,
                        alignment: "center",
                    },
                ],
                font: "Arial",
            },
            {
                style: "dataCliente",
                margin: [30, 8, 30, 0], //left, top, Rigth, bottom
                text: [{ text: `\nDesarrollado por\n`, style: "bold", italics: true, fontSize: 9 }],
                font: "Arial",
                alignment: "center",
            },
            {
                image: img2,
                width: 150,
                fit: [100, 100],
                margin: [0, 0, 0, 0], //left, top, Rigth, bottom
                alignment: "center",
            },
            {
                style: "dataCliente",
                margin: [30, 8, 30, 0], //left, top, Rigth, bottom
                text: [{ text: `\nEste documento no es un comprobante fiscal.\n`, style: "bold", italics: true, fontSize: 9 }],
                font: "Arial",
                alignment: "center",
            },
        ],
        styles: {
            header: {
                fontSize: 11,
                bold: true,
                alignment: "center",
                margin: [0, 30, 0, 0], //left, top, Rigth, bottom
            },
            header2: {
                fontSize: 11,
                bold: true,
                alignment: "left",
                margin: [0, 30, 0, 30], //left, top, Rigth, bottom
            },
            text: {
                fontSize: 11,
                italics: true,
                alignment: "justify",
                margin: [30, 0, 30, 40], //left, top, Rigth, bottom
                bold: false,
            },
            underline: {
                decoration: "underline",
            },
            bold: {
                bold: true,
            },
            columnas: {
                fontSize: 11,
                bold: false,
                alignment: "center",
            },
            footer: {
                fontSize: 11,
                bold: true,
                alignment: "right",
            },
        },
    };

    let now = String(Date.now());
    let lastFive = now.substr(now.length - 8);
    let namePDF = "BRUHPS" + result1.folioVta + lastFive + ".pdf";
    let pdf = pdfMake.createPdf(docDefinition);
    pdf.download(namePDF);
    preloader.hide();
}
