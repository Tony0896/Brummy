$(document).ready(() => {
    preloader.hide();
    obtenerDataVeterinaria();
    $("#diaVete_1").change(() => {
        let diaVete_1 = $("#diaVete_1").val();
        let dias = [];
        dias[1] = "Lunes";
        dias[2] = "Martes";
        dias[3] = "Miércoles";
        dias[4] = "Jueves";
        dias[5] = "Viernes";
        dias[6] = "Sábado";
        dias[7] = "Domingo";

        let abre = [];
        abre[1] = "Lu";
        abre[2] = "Ma";
        abre[3] = "Mi";
        abre[4] = "Ju";
        abre[5] = "Vi";
        abre[6] = "Sá";
        abre[7] = "Do";

        if (diaVete_1) {
            if (diaVete_1 <= 7) {
                $("#diaVete_2").html("<option value=''>Selecciona una opción</option>");
                for (i = diaVete_1; i <= 7; i++) {
                    $("#diaVete_2").append(`<option value="${i}" abreviacion="${abre[i]}">${dias[i]}</option>`);
                }
            }
        } else {
            $("#diaVete_2").html("<option value=''>Selecciona una opción</option>");
        }
    });
});

function obtenerDataVeterinaria() {
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
                        let nombreVete, calle, col, cp, descripcion, eslogan, estado, municipio, numero, pais, urlLogo;
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
                            urlLogo = data.urlImg ? data.urlImg : "";
                        });
                        if (urlLogo) {
                            $("#logoVeterinaria").attr("src", `./../../${urlLogo}`);
                        } else {
                            $("#logoVeterinaria").attr("src", `./../../Brummy/images/default.png`);
                        }
                        $("#nombreVete_span").html(nombreVete);
                        let directionCompleta = calle ? `${calle} ${numero}, ${cp} ${col}, ${municipio} ${estado}` : "";
                        $("#direccionVete_span").html(directionCompleta);
                        $("#esloganVete_span").html(eslogan);
                        $("#descripcionVete_span").html(descripcion);
                        obtenerRedesSocialesVete();
                        obtenerContactosVete();
                        obtenerHorariosVete();
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

function obtenerHorariosVete() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/obtenerHorariosVete.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                        $("#horariosVete_span").html(``);
                    } else {
                        $("#horariosVete_span").html(``);
                        result.forEach((data, index) => {
                            if (data.FlagEstatusTienda == "Cerrado") {
                                if (data.numerodia1 == data.numerodia2) {
                                    $("#horariosVete_span").append(
                                        `<div style="display: flex;">
                                            <div style="display: flex;justify-content: end;">
                                                <div class="buttom-red buttom" onclick="deleteHorariosVete(${data.ID})" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_redes">
                                                    <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> delete </i></span>
                                                </div>
                                            </div>
                                            <span class="capitalize" style="padding: 10px;">${data.abreviacion1}: Cerrado </span>
                                        </div>`
                                    );
                                } else {
                                    $("#horariosVete_span").append(
                                        `<div style="display: flex;">
                                            <div style="display: flex;justify-content: end;">
                                                <div class="buttom-red buttom" onclick="deleteHorariosVete(${data.ID})" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_redes">
                                                    <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> delete </i></span>
                                                </div>
                                            </div>
                                            <span class="capitalize" style="padding: 10px;">${data.abreviacion1} - ${data.abreviacion2}: Cerrado </span>
                                        </div>`
                                    );
                                }
                            } else {
                                let horario1 = String(data.horario1).split(":")[0] + ":" + String(data.horario1).split(":")[1];
                                let horario2 = String(data.horario2).split(":")[0] + ":" + String(data.horario2).split(":")[1];
                                if (data.numerodia1 == data.numerodia2) {
                                    $("#horariosVete_span").append(
                                        `<div style="display: flex;">
                                            <div style="display: flex;justify-content: end;">
                                                <div class="buttom-red buttom" onclick="deleteHorariosVete(${data.ID})" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_redes">
                                                    <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> delete </i></span>
                                                </div>
                                            </div>
                                            <span class="capitalize" style="padding: 10px;">${data.abreviacion1}: De ${horario1} a ${horario2} </span>
                                        </div>`
                                    );
                                } else {
                                    $("#horariosVete_span").append(
                                        `<div style="display: flex;">
                                            <div style="display: flex;justify-content: end;">
                                                <div class="buttom-red buttom" onclick="deleteHorariosVete(${data.ID})" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_redes">
                                                    <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> delete </i></span>
                                                </div>
                                            </div>
                                            <span class="capitalize" style="padding: 10px;">${data.abreviacion1} - ${data.abreviacion2}: De ${horario1} a ${horario2} </span>
                                        </div>`
                                    );
                                }
                            }
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

function obtenerContactosVete() {
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
                        preloader.hide();
                        $("#contactosVete_span").html(``);
                    } else {
                        $("#contactosVete_span").html(``);
                        result.forEach((data, index) => {
                            $("#contactosVete_span").append(
                                `<div style="display: flex;">
                                    <div style="display: flex;justify-content: end;">
                                        <div class="buttom-red buttom" onclick="deleteContactosVete(${data.ID})" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_redes">
                                            <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> delete </i></span>
                                        </div>
                                    </div>
                                    <span class="capitalize" style="padding: 10px;">${data.nombre}: ${data.numero} </span>
                                </div>`
                            );
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

function obtenerRedesSocialesVete() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/obtenerRedesSocialesVete.php",
        data: {},
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        preloader.hide();
                        $("#redesVete_span").html(``);
                    } else {
                        $("#redesVete_span").html(``);
                        result.forEach((data, index) => {
                            $("#redesVete_span").append(
                                `<div style="display: flex;">
                                    <div style="display: flex;justify-content: end;">
                                        <div class="buttom-red buttom" onclick="deleteRedesSocialesVete(${data.ID})" style="border: 0px;margin: 0;padding: 0px !important;" id="btn_edita_redes">
                                            <span class="text-sm mb-0"> <i class="material-icons" style="margin-left: 0px;"> delete </i></span>
                                        </div>
                                    </div>
                                    <span class="capitalize" style="padding: 10px;">${data.tipoRed}: ${data.url_nombre} </span> 
                                </div>`
                            );
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

function editaInfoVete(id) {
    switch (id) {
        case "btn_edita_nombre":
            edita_nombre();
            break;
        case "btn_edita_eslogan":
            edita_eslogan();
            break;
        case "btn_edita_descripcion":
            edita_descripcion();
            break;
        case "btn_edita_direccion":
            edita_direccion();
            break;
        case "btn_edita_horarios":
            edita_horarios();
            break;
        case "btn_edita_contactos":
            edita_contactos();
            break;
        case "btn_edita_redes":
            edita_redes();
            break;

        default:
            preloader.hide();
            console.log("sin accion");
            break;
    }
}

function edita_nombre() {
    $("#nombreVete_div").css("display", "inline-flex");
    $("#nombreVete_btn").css("display", "block");
    $("#Cancel_nombreVete_btn").css("display", "block");

    // $("#nombreVete_input").css("display", "block");
    $("#nombreVete_span").css("display", "none");
}

function cancelarNombreVete() {
    $("#nombreVete_div").css("display", "none");
    $("#nombreVete_btn").css("display", "none");
    $("#Cancel_nombreVete_btn").css("display", "none");

    $("#nombreVete_span").css("display", "block");
    $("#nombreVete_input").val("");
}

function guardarNombreVete() {
    if (!$("#nombreVete_input").val()) {
        msj.show("Aviso", "Debes Ingresar el nombre para poder guardar.", [{ text1: "OK" }]);
        return false;
    }

    let nombreVete = $("#nombreVete_input").val();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/guardarNombreVete.php",
        data: { nombreVete },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            switch (success) {
                case true:
                    $("#nombreVete_div").css("display", "none");
                    $("#nombreVete_btn").css("display", "none");
                    $("#Cancel_nombreVete_btn").css("display", "none");

                    $("#nombreVete_span").html($("#nombreVete_input").val());
                    $("#nombreVete_span").css("display", "block");
                    msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);
                    $("#nombreVete_input").val("");

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

function edita_eslogan() {
    $("#esloganVete_div").css("display", "inline-flex");
    $("#esloganVete_btn").css("display", "block");
    $("#Cancel_esloganVete_btn").css("display", "block");

    // $("#esloganVete_input").css("display", "block");
    $("#esloganVete_span").css("display", "none");
}

function cancelaresloganVete() {
    $("#esloganVete_div").css("display", "none");
    $("#esloganVete_btn").css("display", "none");
    $("#Cancel_esloganVete_btn").css("display", "none");

    $("#esloganVete_span").css("display", "block");
    $("#esloganVete_input").val("");
}

function guardaresloganVete() {
    if (!$("#esloganVete_input").val()) {
        msj.show("Aviso", "Debes Ingresar el slogan para poder guardar.", [{ text1: "OK" }]);
        return false;
    }

    let esloganVete = $("#esloganVete_input").val();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/guardaresloganVete.php",
        data: { esloganVete },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            switch (success) {
                case true:
                    $("#esloganVete_div").css("display", "none");
                    $("#esloganVete_btn").css("display", "none");
                    $("#Cancel_esloganVete_btn").css("display", "none");

                    $("#esloganVete_span").html($("#esloganVete_input").val());
                    $("#esloganVete_span").css("display", "block");
                    msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);
                    $("#esloganVete_input").val("");

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

function edita_descripcion() {
    $("#descripcionVete_div").css("display", "inline-flex");
    $("#descripcionVete_btn").css("display", "block");

    $("#Cancel_descripcionVete_btn").css("display", "block");
    // $("#descripcionVete_input").css("display", "block");
    $("#descripcionVete_span").css("display", "none");
}

function cancelardescripcionVete() {
    $("#descripcionVete_div").css("display", "none");
    $("#descripcionVete_btn").css("display", "none");

    $("#Cancel_descripcionVete_btn").css("display", "none");
    $("#descripcionVete_span").css("display", "block");
    $("#descripcionVete_input").val("");
}

function guardardescripcionVete() {
    if (!$("#descripcionVete_input").val()) {
        msj.show("Aviso", "Debes Ingresar la descrición para poder guardar.", [{ text1: "OK" }]);
        return false;
    }

    let descripcionVete = $("#descripcionVete_input").val();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/guardardescripcionVete.php",
        data: { descripcionVete },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            switch (success) {
                case true:
                    $("#descripcionVete_div").css("display", "none");
                    $("#descripcionVete_btn").css("display", "none");

                    $("#Cancel_descripcionVete_btn").css("display", "none");
                    $("#descripcionVete_span").html($("#descripcionVete_input").val());
                    $("#descripcionVete_span").css("display", "block");
                    msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);
                    $("#descripcionVete_input").val("");

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

function edita_direccion() {
    $("#direccionVete_div").css("display", "block");
    $("#direccionVete_btn").css("display", "block");
    $("#Cancel_direccionVete_btn").css("display", "block");

    // $("#direccionVete_input").css("display", "block");
    $("#direccionVete_span").css("display", "none");
}

function cancelardireccionVete() {
    $("#direccionVete_div").css("display", "none");
    $("#direccionVete_btn").css("display", "none");
    $("#Cancel_direccionVete_btn").css("display", "none");

    $("#direccionVete_span").css("display", "block");

    $("#calleVete_input").val("");
    $("#numeroVete_input").val("");
    $("#cpVete_input").val("");
    $("#colVete_input").val("");
    $("#municipioVete_input").val("");
    $("#estadoVete_input").val("");
}

function guardardireccionVete() {
    let values = get_datos_completos("direccionVete_div");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let calleVete = String($("#calleVete_input").val());
        let numeroVete = String($("#numeroVete_input").val());
        let cpVete = String($("#cpVete_input").val());
        let colVete = String($("#colVete_input").val());
        let municipioVete = String($("#municipioVete_input").val());
        let estadoVete = String($("#estadoVete_input").val());

        calleVete.replaceAll("'", '"');
        numeroVete.replaceAll("'", '"');
        cpVete.replaceAll("'", '"');
        colVete.replaceAll("'", '"');
        municipioVete.replaceAll("'", '"');
        estadoVete.replaceAll("'", '"');

        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/store/guardardireccionVete.php",
            data: { calleVete, numeroVete, cpVete, colVete, municipioVete, estadoVete },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;

                switch (success) {
                    case true:
                        let directionCompleta =
                            $("#calleVete_input").val() +
                            " " +
                            $("#numeroVete_input").val() +
                            ", " +
                            $("#cpVete_input").val() +
                            " " +
                            $("#colVete_input").val() +
                            ", " +
                            $("#municipioVete_input").val() +
                            " " +
                            $("#estadoVete_input").val();
                        $("#direccionVete_div").css("display", "none");
                        $("#direccionVete_btn").css("display", "none");
                        $("#Cancel_direccionVete_btn").css("display", "none");

                        $("#direccionVete_span").html(directionCompleta);
                        $("#direccionVete_span").css("display", "block");

                        msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);

                        $("#calleVete_input").val("");
                        $("#numeroVete_input").val("");
                        $("#cpVete_input").val("");
                        $("#colVete_input").val("");
                        $("#municipioVete_input").val("");
                        $("#estadoVete_input").val("");

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

function edita_horarios() {
    $("#horariosVete_div").css("display", "block");
    $("#horariosVete_btn").css("display", "block");
    $("#Cancel_horariosVete_btn").css("display", "block");

    // $("#horariosVete_input").css("display", "block");
    $("#horariosVete_span").css("display", "none");
    $("#div_horario1").css("display", "flex");
    $("#div_horario2").css("display", "flex");
    $("#diaVete_cerrado").val("Abierto");
}

function cambioDeDia() {
    if ($("#diaVete_cerrado").val() == "Cerrado") {
        $("#div_horario1").css("display", "none");
        $("#div_horario2").css("display", "none");
    } else {
        $("#div_horario1").css("display", "flex");
        $("#div_horario2").css("display", "flex");
    }
}

function guardarhorariosVete() {
    if ($("#diaVete_cerrado").val() == "Cerrado") {
        if (!$("#diaVete_1").val() || !$("#diaVete_2").val()) {
            msj.show("Aviso", "Debes indicar los días para poder guardar.", [{ text1: "OK" }]);
            return false;
        }
        guardarHorariosBD();
    } else {
        if (!$("#diaVete_1").val() || !$("#diaVete_2").val()) {
            msj.show("Aviso", "Debes indicar los días para poder guardar.", [{ text1: "OK" }]);
            return false;
        }
        if (!$("#horario_1").val() || !$("#horario_2").val()) {
            msj.show("Aviso", "Debes indicar los horarios para poder guardar.", [{ text1: "OK" }]);
            return false;
        }
        guardarHorariosBD();
    }
}

function cancelarhorariosVete() {
    $("#horariosVete_div").css("display", "none");
    $("#horariosVete_btn").css("display", "none");
    $("#Cancel_horariosVete_btn").css("display", "none");

    // $("#horariosVete_span").html($("#nombreVete_input").val());
    $("#horariosVete_span").css("display", "flex");

    $("#horario_1").val("");
    $("#horario_2").val("");
    $("#diaVete_1").val("");
    $("#diaVete_2").val("");
    $("#diaVete_1").val("");
    $("#diaVete_2").val("");
    $("#diaVete_cerrado").val("Abierto");
}

function guardarHorariosBD() {
    let horario_1 = $("#horario_1").val();
    let horario_2 = $("#horario_2").val();
    let dia = $("#diaVete_1").find(":selected").attr("abreviacion");
    let dia2 = $("#diaVete_2").find(":selected").attr("abreviacion");
    let diaCompleto = $("#diaVete_1").find("option:selected").text();
    let diaCompleto2 = $("#diaVete_2").find("option:selected").text();
    let diaVete_cerrado = $("#diaVete_cerrado").val();
    let diaNumero1 = $("#diaVete_1").val();
    let diaNumero2 = $("#diaVete_2").val();
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/guardarHorariosBD.php",
        data: { horario_1, horario_2, dia, dia2, diaCompleto, diaCompleto2, diaVete_cerrado, diaNumero1, diaNumero2 },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            switch (success) {
                case true:
                    obtenerHorariosVete();

                    msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);

                    $("#horariosVete_div").css("display", "none");
                    $("#horariosVete_btn").css("display", "none");
                    $("#Cancel_horariosVete_btn").css("display", "none");

                    // $("#horariosVete_span").html($("#nombreVete_input").val());
                    $("#horariosVete_span").css("display", "flex");

                    $("#horario_1").val("");
                    $("#horario_2").val("");
                    $("#diaVete_1").val("");
                    $("#diaVete_2").val("");
                    $("#diaVete_1").val("");
                    $("#diaVete_2").val("");
                    $("#diaVete_cerrado").val("Abierto");

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

function edita_contactos() {
    $("#contactosVete_div").css("display", "flex");
    $("#contactosVete_btn").css("display", "block");
    $("#Cancel_contactosVete_btn").css("display", "block");

    // $("#contactosVete_input").css("display", "block");
    $("#contactosVete_span").css("display", "none");
}

function cancelarcontactosVete() {
    $("#contactosVete_div").css("display", "none");
    $("#contactosVete_btn").css("display", "none");
    $("#Cancel_contactosVete_btn").css("display", "none");

    $("#contactosVete_span").css("display", "flex");

    $("#nombreVeteContacto_input").val("");
    $("#numeroVeteContacto_input").val("");
}

function guardarcontactosVete() {
    if (!$("#nombreVeteContacto_input").val() || !$("#numeroVeteContacto_input").val()) {
        msj.show("Aviso", "Debes Ingresar el nombre y número de contacto para poder guardar.", [{ text1: "OK" }]);
        return false;
    }

    let nombreVeteContacto = String($("#nombreVeteContacto_input").val());
    let numeroVeteContacto = String($("#numeroVeteContacto_input").val());

    nombreVeteContacto.replaceAll("'", '"');
    numeroVeteContacto.replaceAll("'", '"');

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/guardarcontactosVete.php",
        data: { nombreVeteContacto, numeroVeteContacto },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            switch (success) {
                case true:
                    $("#contactosVete_div").css("display", "none");
                    $("#contactosVete_btn").css("display", "none");
                    $("#Cancel_contactosVete_btn").css("display", "none");

                    // $("#contactosVete_span").html($("#contactosVete_input").val());
                    $("#contactosVete_span").css("display", "flex");
                    obtenerContactosVete();
                    msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);

                    $("#nombreVeteContacto_input").val("");
                    $("#numeroVeteContacto_input").val("");

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

function edita_redes() {
    $("#redesVete_div").css("display", "flex");
    $("#redesVete_btn").css("display", "block");
    $("#Cancel_redesVete_btn").css("display", "block");

    // $("#redesVete_input").css("display", "block");
    $("#redesVete_span").css("display", "none");
}

function cancelarredesVete() {
    $("#redesVete_div").css("display", "none");
    $("#redesVete_btn").css("display", "none");
    $("#Cancel_redesVete_btn").css("display", "none");

    $("#redesVete_span").css("display", "flex");

    $("#redSocial_input").val("");
    $("#urlRedSocial_input").val("");
}

function guardarredesVete() {
    if (!$("#redSocial_input").val() || !$("#urlRedSocial_input").val()) {
        msj.show("Aviso", "Debes Ingresar la red social así como el nombre o URL para poder guardar.", [{ text1: "OK" }]);
        return false;
    }

    let redSocial_input = String($("#redSocial_input").val());
    let urlRedSocial_input = String($("#urlRedSocial_input").val());

    redSocial_input.replaceAll("'", '"');
    urlRedSocial_input.replaceAll("'", '"');

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/store/guardarredesVete.php",
        data: { redSocial_input, urlRedSocial_input },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;

            switch (success) {
                case true:
                    $("#redesVete_div").css("display", "none");
                    $("#redesVete_btn").css("display", "none");
                    $("#Cancel_redesVete_btn").css("display", "none");

                    $("#redesVete_span").css("display", "flex");

                    obtenerRedesSocialesVete();

                    msj.show("Aviso", "Guardado Correctamente", [{ text1: "OK" }]);

                    $("#redSocial_input").val("");
                    $("#urlRedSocial_input").val("");

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

function deleteHorariosVete(ID) {
    Swal.fire({
        title: "",
        text: `¿Estás seguro de querer eliminar este horario?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "./views/store/deleteHorariosVete.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;

                    switch (success) {
                        case true:
                            obtenerHorariosVete();
                            msj.show("Aviso", "Eliminado Correctamente", [{ text1: "OK" }]);

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

function deleteContactosVete(ID) {
    Swal.fire({
        title: "",
        text: `¿Estás seguro de querer eliminar este contacto?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "./views/store/deleteContactosVete.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;

                    switch (success) {
                        case true:
                            obtenerContactosVete();
                            msj.show("Aviso", "Eliminado Correctamente", [{ text1: "OK" }]);

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

function deleteRedesSocialesVete(ID) {
    Swal.fire({
        title: "",
        text: `¿Estás seguro de querer eliminar esta Red?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7066e0",
        cancelButtonColor: "#FF0037",
        confirmButtonText: "OK",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                method: "POST",
                dataType: "JSON",
                url: "./views/store/deleteRedesSocialesVete.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;

                    switch (success) {
                        case true:
                            obtenerRedesSocialesVete();
                            msj.show("Aviso", "Eliminado Correctamente", [{ text1: "OK" }]);

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

function editarLogoEmpresa(ID) {
    $("#labelModal").html(`Editar Logo`);
    $("#body_modal").html(`<br>
        <div id="formLogo">
            <div class="coolinput" style="width: 200px;margin: auto;">
                <input type="file" class="my-pond" name="filepond" />
            </div>
            
            <div class="center-fitcomponent" style="width: 100%;">
                <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" id="actualizarLogoEmpresa">
                    <span class="text-sm mb-0 span-buttom">
                        Guardar
                        <i class="material-icons"> save </i>
                    </span>
                </div>
            </div>

            <div class="row" style="margin-bottom: 25px;display:none;">
                <button type="button" class="btn btn-primary" id="SendFilesLogo">Save changes</button>
                <input type="hidden" id="FKEmpresa" value="${ID}">
            </div>

        </div>
    `);

    $(function () {
        // First register any plugins
        $.fn.filepond.registerPlugin(
            FilePondPluginFileValidateType,
            FilePondPluginImageExifOrientation,
            FilePondPluginImagePreview,
            FilePondPluginImageCrop,
            FilePondPluginImageResize,
            FilePondPluginImageTransform,
            FilePondPluginImageEdit
        );

        // Turn input element into a pond
        $(".my-pond").filepond();

        // Set allowMultiple property to true
        $(".my-pond").filepond("allowMultiple", false);
        $(".my-pond").filepond("labelIdle", "Agregar Logo Veterinaria");
        $(".my-pond").filepond("imagePreviewHeight", 170);
        $(".my-pond").filepond("allowImageCrop", true);
        $(".my-pond").filepond("imageCropAspectRatio", "1:1");
        $(".my-pond").filepond("imageResizeTargetWidth", 200);
        $(".my-pond").filepond("imageResizeTargetHeight", 200);
        $(".my-pond").filepond("stylePanelLayout", "circle");
        $(".my-pond").filepond("styleLoadIndicatorPosition", "center bottom");
        $(".my-pond").filepond("styleProgressIndicatorPosition", "right bottom");
        $(".my-pond").filepond("styleButtonRemoveItemPosition", "left bottom");
        $(".my-pond").filepond("styleButtonProcessItemPosition", "right bottom");

        // Listen for addfile event
        $(".my-pond").on("FilePond:addfile", function (e) {
            console.log("file added event", e);
        });

        $("#actualizarLogoEmpresa").click(() => {
            pondFiles = $(".my-pond").filepond("getFiles");
            if (pondFiles.length > 0) {
                $("#SendFilesLogo").trigger("click");
            } else {
                msj.show("Aviso", "Aún no hay foto.", [{ text1: "OK" }]);
            }
        });

        $("#SendFilesLogo").click(() => {
            let formData = new FormData();
            // append files array into the form data
            pondFiles = $(".my-pond").filepond("getFiles");
            if (pondFiles.length > 0) {
                for (var i = 0; i < pondFiles.length; i++) {
                    formData.append("Adjunto_" + i, pondFiles[i].file);
                }
                formData.append("NoDocs", pondFiles.length);
                formData.append("FKPertenece", $("#FKEmpresa").val());
                formData.append("IDModulo", 13);
                formData.append("IDAccion", 1);
                formData.append("NombreModulo", "Perfil Veterinaria");
                formData.append("fechaRegistro", moment().format("YYYY-MM-DD"));
                formData.append("fechaRegistroH", moment().format("YYYY-MM-DDTHH:mm:ss"));

                $.ajax({
                    url: "views/login/guardaDocs.php",
                    type: "POST",
                    data: formData,
                    dataType: "JSON",
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        let response = Number(data);
                        if (response) {
                            if (response > 0) {
                                obtenerLogoVete();
                                $(".my-pond").filepond("removeFiles");
                                $("#modalTemplate").modal("hide");
                                $("#btnClose").off("click");
                            }
                        }
                    },
                    error: function (data) {
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    },
                });
            }
        });
    });

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

function obtenerLogoVete() {
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
                        let urlLogo;
                        result.forEach((data, index) => {
                            urlLogo = data.urlImg ? data.urlImg : "";
                        });

                        if (urlLogo) {
                            $("#logoVeterinaria").attr("src", `./../../${urlLogo}`);
                        } else {
                            $("#logoVeterinaria").attr("src", `./../../Brummy/images/default.png`);
                        }
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
