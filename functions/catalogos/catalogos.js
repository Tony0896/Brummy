$(document).ready(() => {
    // preloader.hide();
    obtenerEspecies();
    obtenerRazas();
    obtenerMotivos();
    obtenerCategorias();
    // obtenerMotivosRechazo();
});

function crearNuevaEspecie() {
    $("#labelModal").html(`Crear Nueva Especie`);

    $("#body_modal").html(`<br>
        <div id="formEspecies">
            <div class="coolinput">
                <label name="Nombre Especie" for="nombreEspecie" class="text">Nombre Especie</label>
                <input name="Nombre Especie" type="text" class="capitalize obligatorio input" id="nombreEspecie" autocomplete="off" maxlength"50"/>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarEspecie();">
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

function guardarEspecie() {
    let values = get_datos_completos("formEspecies");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombreEspecie = String($("#nombreEspecie").val()).trim();

        nombreEspecie.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarEspecie.php",
            data: { nombreEspecie },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerEspecies();
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

function obtenerEspecies() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerEspecies.php",
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
                        $("#especiesBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.nombreEspecie}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteEspecie(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#especiesBody").html(html);
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

function obtenerRazas() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerRazas.php",
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
                        $("#razasBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.nombreRaza}</td>
                                <td class="capitalize">${data.especie}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteRaza(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#razasBody").html(html);
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

function crearNuevaRaza() {
    preloader.show();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerEspecies.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                    } else {
                        let html = "";
                        result.forEach((data, index) => {
                            html += `<option value="${data.ID}">${data.nombreEspecie}</option>`;
                        });

                        $("#labelModal").html(`Crear Nueva Raza`);

                        $("#body_modal").html(`<br>
                            <div id="formRazas">
                                <div class="coolinput">
                                    <label name="Nombre Raza" for="nombreRaza" class="text">Nombre Raza</label>
                                    <input name="Nombre Raza" type="text" class="input capitalize obligatorio" id="nombreRaza" autocomplete="off" maxlength"50"/>
                                </div>

                                <div class="coolinput">
                                    <label for="relacionEspecie" class="text">Relación Especie</label>
                                    <select class="input capitalize obligatorio" name="Relación Especie" id="relacionEspecie" style="background-color: rgb(255, 255, 255);width:100%;">
                                        <option value="">Selecciona una opción</option>
                                        ${html}
                                    </select>
                                </div>
                            </div>

                            <div class="center-fitcomponent" style="width: 100%;">
                                <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarRaza();">
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

                        $("#relacionEspecie").select2({
                            dropdownParent: $("#modalTemplate"),
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

function guardarRaza() {
    let values = get_datos_completos("formRazas");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombreRaza = String($("#nombreRaza").val()).trim();
        let FK_especie = $("#relacionEspecie").val();
        let especie = $("#relacionEspecie").find("option:selected").text();

        nombreRaza.replaceAll("'", '"');
        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarRaza.php",
            data: { nombreRaza, FK_especie, especie },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerRazas();
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

function deleteEspecie(ID) {
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
                url: "./views/catalogos/deleteEspecie.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerEspecies();
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

function deleteRaza(ID) {
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
                url: "./views/catalogos/deleteRaza.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerRazas();
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

function obtenerMotivos() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerMotivos.php",
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
                        $("#motivosCitaBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.motivoCita}</td>
                                <td class="capitalize">${data.tiempoEstimado}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteMotivoCita(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#motivosCitaBody").html(html);
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

function crearNuevoMotivo() {
    $("#labelModal").html(`Crear Nuevo Motivo de Cita`);

    $("#body_modal").html(`<br>
        <div id="formMotivoCita">
            <div class="coolinput">
                <label name="Motivo" for="motivo" class="text">Motivo</label>
                <input name="Motivo" type="text" class="capitalize obligatorio input" id="motivo" autocomplete="off" maxlength"50"/>
            </div>
            <br>
            <span class="text">Tiempo estimado: </span>
            <div class="coolinput">
                <label name="Horas" for="horas" class="text">Horas</label>
                <select name="Horas" class="capitalize input" id="horasMotivos">
                    <option value="0">00</option>
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                    <option value="4">04</option>
                    <option value="5">05</option>
                    <option value="6">06</option>
                    <option value="7">07</option>
                    <option value="8">08</option>
                    <option value="9">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
                
                <label name="Minutos" for="minutos" class="text">Minutos</label>
                <select name="Minutos" class="capitalize input" id="minutosMotivos">
                    <option value="0">00</option>
                    <option value="5" selected>05</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                    <option value="35">35</option>
                    <option value="40">40</option>
                    <option value="45">45</option>
                    <option value="50">50</option>
                    <option value="55">55</option>
                </select>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarMotivoCita();">
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

function guardarMotivoCita() {
    let values = get_datos_completos("formMotivoCita");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        if ($("#horasMotivos").val() == 0 && $("#minutosMotivos").val() == 0) {
            msj.show("Aviso", "Debes indicar el tiempo estimado del motivo.", [{ text1: "OK" }]);
            return false;
        }

        let motivoCita = String($("#motivo").val()).trim();
        let tiempoEstimado =
            String($("#horasMotivos").find("option:selected").text()) + ":" + String($("#minutosMotivos").find("option:selected").text());

        motivoCita.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarMotivoCita.php",
            data: { motivoCita, tiempoEstimado },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerMotivos();
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

function deleteMotivoCita(ID) {
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
                url: "./views/catalogos/deleteMotivoCita.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerMotivos();
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

function obtenerMotivosRechazo() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerMotivosRechazo.php",
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
                        $("#rechazosCitaBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.motivoRechazo}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteMotivoRechazo(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#rechazosCitaBody").html(html);
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

function crearNuevoMotivoRechazo() {
    $("#labelModal").html(`Crear Nuevo Motivo de Rechazo`);

    $("#body_modal").html(`<br>
        <div id="formMotivoCitaRechazo">
            <div class="coolinput">
                <label name="MotivoRechazo" for="motivoRechazo" class="text">Motivo Rechazo</label>
                <input name="Motivo Rechazo" type="text" class="capitalize obligatorio input" id="motivoRechazo" autocomplete="off" maxlength"50"/>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarMotivoRechazo();">
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

function guardarMotivoRechazo() {
    let values = get_datos_completos("formMotivoCitaRechazo");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let motivoRechazo = String($("#motivoRechazo").val()).trim();

        motivoRechazo.replaceAll("'", '"');

        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarMotivoRechazo.php",
            data: { motivoRechazo },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerMotivosRechazo();
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

function deleteMotivoRechazo(ID) {
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
                url: "./views/catalogos/deleteMotivoRechazo.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerMotivosRechazo();
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

function crearCategoria() {
    $("#labelModal").html(`Crear Nueva Categoría`);

    $("#body_modal").html(`<br>
        <div id="formCategoria">
            <div class="coolinput">
                <label name="Nombre Categoría" for="nombreCategoria" class="text">Nombre Categoría</label>
                <input name="Nombre Categoría" type="text" class="capitalize obligatorio input" id="nombreCategoria" autocomplete="off" maxlength"50"/>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarCategoria();">
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

function guardarCategoria() {
    let values = get_datos_completos("formCategoria");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombreCategoria = String($("#nombreCategoria").val()).trim();
        nombreCategoria = nombreCategoria.replaceAll("'", '"');
        preloader.show();

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/catalogos/guardarCategoria.php",
            data: { nombreCategoria },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerCategorias();
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

function obtenerCategorias() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerCategorias.php",
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
                        $("#categoriaBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        result.forEach((data, index) => {
                            html += `<tr>
                                <td>${index + 1}</td>
                                <td class="capitalize">${data.nombreCategoria}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-red buttom button-sinText mx-1" title="Eliminar" onclick="deleteCategoria(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> delete </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#categoriaBody").html(html);
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

function deleteCategoria(ID) {
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
                url: "./views/catalogos/deleteCategoria.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerCategorias();
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
