$(document).ready(() => {
    preloader.hide();
    obtenerPromos();
});

function obtenerPromos() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/promos/obtenerPromos.php",
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
                        $("#promosBody").html(html);
                        dataTableCreate();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.nombrePromo}</td>
                                <td>${data.nameCategoria}</td>
                                <td>${volteaFecha(data.fechaInicio, 2)}</td>
                                <td>${volteaFecha(data.fechaFin, 2)}</td>
                                <td>${data.porcentaje}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Editar Promo" onclick="editPromo(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> edit </i></span>
                                        </div>
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar Promo" onclick="eliminarPromo(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#promosBody").html(html);
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

function crearNuevaPromo() {
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerCategorias.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let htmlCat = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "Aún no hay categorías.", [{ text1: "OK" }]);
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            htmlCat += `<option value="${data.ID}">${data.nombreCategoria}</option>`;
                        });

                        $("#labelModal").html(`Crear Nueva promo`);

                        $("#body_modal").html(`<br>
                            <div id="formPromo">
                                <div class="coolinput">
                                    <label name="Nombre Promo" for="nombrePromo" class="text">Nombre Promo</label>
                                    <input name="Nombre Promo" type="text" class="input capitalize obligatorio" id="nombrePromo" autocomplete="off" maxlength"20"/>
                                </div>
                    
                                 <div class="coolinput">
                                    <label for="categoria" class="text">Categoría</label>
                                    <select name="Categoría" class="capitalize input obligatorio" id="categoria" style="background-color: rgb(255, 255, 255);width:100%;">
                                        <option value="">Selecciona una opción</option>
                                        ${htmlCat}
                                    </select>
                                </div>
                    
                                <div class="coolinput">
                                    <label name="Fecha Inicio" for="fechaInicio" class="text">Fecha Inicio</label>
                                    <input name="Fecha Inicio" type="text" class="input capitalize obligatorio" id="fechaInicio" autocomplete="off" maxlength"20"/>
                                </div>

                                <div class="coolinput">
                                    <label name="Fecha Fin" for="fechaInicio" class="text">Fecha Fin</label>
                                    <input name="Fecha Fin" type="text" class="input capitalize obligatorio" id="fechaFin" autocomplete="off" maxlength"20"/>
                                </div>
                    
                                <div class="coolinput">
                                    <label name="Porcentaje" for="porcentaje" class="text">Porcentaje de Descuento</label>
                                    <input name="Porcentaje" type="number" class="input capitalize obligatorio" id="porcentaje" autocomplete="off" maxlength"20"/>
                                </div>
                    
                            </div>
                    
                            <div class="center-fitcomponent" style="width: 100%;">
                                <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarPromo();">
                                    <span class="text-sm mb-0 span-buttom">
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>
                        `);
                        preloader.hide();
                        $("#categoria").select2({
                            dropdownParent: $("#modalTemplate"),
                        });

                        $("#modalTemplate").modal({
                            backdrop: "static",
                            keyboard: false,
                        });

                        $("#fechaInicio").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });
                        $("#fechaFin").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });

                        $("#modalTemplate").modal("show");

                        $("#btnClose").on("click", () => {
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
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

function editPromo(ID) {
    preloader.show();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerCategorias.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let htmlCat = "",
                nombrePromo = "",
                categoria = "",
                fechaInicio = "",
                fechaFin = "",
                porcentaje = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "Aún no hay categorías.", [{ text1: "OK" }]);
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            htmlCat += `<option value="${data.ID}">${data.nombreCategoria}</option>`;
                        });

                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: "./views/promos/obtenerPromo.php",
                            data: { ID },
                        })
                            .done(function (results) {
                                let success = results.success;
                                let result = results.result;
                                switch (success) {
                                    case true:
                                        if (result == "Sin Datos") {
                                            msj.show("Aviso", "Aún no hay categorías.", [{ text1: "OK" }]);
                                            preloader.hide();
                                        } else {
                                            result.forEach((data, index) => {
                                                nombrePromo = data.nombrePromo;
                                                categoria = data.nameCategoria;
                                                fechaInicio = data.fechaInicio;
                                                fechaFin = data.fechaFin;
                                                porcentaje = data.porcentaje;
                                            });

                                            $("#labelModal").html(`Editar promo`);

                                            $("#body_modal").html(`<br>
                                                <div id="formPromo">
                                                    <div class="coolinput">
                                                        <label name="Nombre Promo" for="nombrePromo" class="text">Nombre Promo</label>
                                                        <input name="Nombre Promo" type="text" class="input capitalize obligatorio" id="nombrePromo" autocomplete="off" maxlength"20" readonly="true"/>
                                                    </div>
                                        
                                                    <div class="coolinput">
                                                        <label for="categoria" class="text">Categoría</label>
                                                        <input name="Categoría" class="capitalize input obligatorio" id="categoria"  readonly="true"/>
                                                    </div>
                                        
                                                    <div class="coolinput">
                                                        <label name="Fecha Inicio" for="fechaInicio" class="text">Fecha Inicio</label>
                                                        <input name="Fecha Inicio" type="text" class="input capitalize obligatorio" id="fechaInicio" autocomplete="off" maxlength"20"/>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label name="Fecha Fin" for="fechaInicio" class="text">Fecha Fin</label>
                                                        <input name="Fecha Fin" type="text" class="input capitalize obligatorio" id="fechaFin" autocomplete="off" maxlength"20"/>
                                                    </div>
                                        
                                                    <div class="coolinput">
                                                        <label name="Porcentaje" for="porcentaje" class="text">Porcentaje de Descuento</label>
                                                        <input name="Porcentaje" type="number" class="input capitalize obligatorio" id="porcentaje" autocomplete="off" maxlength"20"/>
                                                    </div>
                                        
                                                </div>
                                        
                                                <div class="center-fitcomponent" style="width: 100%;">
                                                    <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="actualizaPromo(${ID});">
                                                        <span class="text-sm mb-0 span-buttom">
                                                            Actualizar
                                                            <i class="material-icons"> save </i>
                                                        </span>
                                                    </div>
                                                </div>
                                            `);
                                            $("#nombrePromo").val(nombrePromo);
                                            $("#categoria").val(categoria);
                                            $("#fechaInicio").val(volteaFecha(fechaInicio, 1));
                                            $("#fechaFin").val(volteaFecha(fechaFin, 1));
                                            $("#porcentaje").val(porcentaje);

                                            preloader.hide();

                                            $("#modalTemplate").modal({
                                                backdrop: "static",
                                                keyboard: false,
                                            });

                                            $("#fechaInicio").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });
                                            $("#fechaFin").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });

                                            $("#modalTemplate").modal("show");

                                            $("#btnClose").on("click", () => {
                                                $("#modalTemplate").modal("hide");
                                                $("#btnClose").off("click");
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

function guardarPromo() {
    let values = get_datos_completos("formPromo");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombrePromo = String($("#nombrePromo").val()).trim();
        let categoria = String($("#categoria").val()).trim();
        let fechaInicio = String($("#fechaInicio").val()).trim();
        let fechaFin = String($("#fechaFin").val()).trim();
        let porcentaje = String($("#porcentaje").val()).trim();
        let nameCategoria = String($("#categoria").find("option:selected").text()).trim();

        nombrePromo = nombrePromo.replaceAll("'", '"');
        categoria = categoria.replaceAll("'", '"');
        fechaInicio = volteaFecha(fechaInicio, 2);
        fechaFin = volteaFecha(fechaFin, 2);
        porcentaje = porcentaje.replaceAll("'", '"');
        nameCategoria = nameCategoria.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/promos/guardarPromo.php",
            data: { nombrePromo, categoria, fechaInicio, fechaFin, porcentaje, nameCategoria },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerPromos();
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

function actualizaPromo(ID) {
    let values = get_datos_completos("formPromo");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let fechaInicio = String($("#fechaInicio").val()).trim();
        let fechaFin = String($("#fechaFin").val()).trim();
        let porcentaje = String($("#porcentaje").val()).trim();

        fechaInicio = volteaFecha(fechaInicio, 2);
        fechaFin = volteaFecha(fechaFin, 2);
        porcentaje = porcentaje.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/promos/actualizaPromo.php",
            data: { fechaInicio, fechaFin, porcentaje, ID },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerPromos();
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

function eliminarPromo(ID) {
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
                url: "./views/promos/eliminarPromo.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            msj.show("Aviso", "Eliminado Correctamente", [{ text1: "OK" }]);
                            obtenerPromos();
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
