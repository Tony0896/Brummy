const preloader = function () {};

preloader.show = function () {
    $(".modals").modal({ backdrop: "static", keyboard: false });
    $(".modals").modal("show");
    $(".modal").css("z-index", "1040");
    $(".modals").css("z-index", "1056");
    $(".modalAlerts").css("z-index", "1057");
};

preloader.hide = function () {
    setTimeout(function () {
        $(".modal").css("z-index", "1051");
        $(".modals").modal("hide");
        $(".modals").data("bs.modal", null);
        $(".modalAlerts").css("z-index", "1057");
    }, 1000);
};

function dataTableCreate() {
    $(".datatable")
        .DataTable({
            responsive: true,
            language: {
                lengthMenu: "_MENU_ registros por pagina",
                zeroRecords: "No hay resultados",
                info: "Pagina _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(Mostrar _MAX_ registros)",
                paginate: {
                    previous: "‹",
                    next: "›",
                },
                aria: {
                    paginate: {
                        previous: "Previous",
                        next: "Next",
                    },
                },
                search: "Buscar",
            },
            order: [[0, "asc"]],
        })
        .draw();
    preloader.hide();
}

function dataTableCreateDes() {
    $(".datatable")
        .DataTable({
            responsive: true,
            language: {
                lengthMenu: "_MENU_ registros por pagina",
                zeroRecords: "No hay resultados",
                info: "Pagina _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(Mostrar _MAX_ registros)",
                paginate: {
                    previous: "‹",
                    next: "›",
                },
                aria: {
                    paginate: {
                        previous: "Previous",
                        next: "Next",
                    },
                },
                search: "Buscar",
            },
            order: [[0, "desc"]],
        })
        .draw();
    preloader.hide();
}

function dataTableDestroy() {
    $(".datatable").DataTable().destroy();
}

$(".tagAMenu").click(function (e) {
    e.preventDefault();
});

function get_datos_completos(form) {
    let campos;
    let trae_los_campos_sin_llennar = [];
    campos = document.querySelectorAll("#" + form + " .obligatorio");
    let valido = true;

    [].slice.call(campos).forEach(function (campo) {
        if ($(campo).get(0).tagName == "SELECT") {
            if (campo.value.trim() == 0 || campo.value.trim() == "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        } else if ($(campo).get(0).tagName == "TEXTAREA") {
            if (campo.value.trim() === "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        } else {
            if (campo.value.trim() === "") {
                valido = false;
                trae_los_campos_sin_llennar = [...trae_los_campos_sin_llennar, $(campo).attr("name")];
            }
        }
    });

    if (valido) {
        return {
            valido: valido,
            reponse: 1,
        };
    } else {
        return {
            valido: valido,
            response: trae_los_campos_sin_llennar,
        };
    }
}

const msj = function () {};

msj.show = function (title, subtile, buttons) {
    let buttonOne = "",
        buttonTwo = "";
    $("#titleAlert").html(title);
    $("#subtitleAlert").html(subtile);
    buttons[0].text2
        ? ((buttonTwo = `<button class="reject cookie-button acceptOne">${buttons[0].text2}</button>`),
          (buttonOne = `<button class="accept cookie-button">${buttons[0].text1}</button>`))
        : (buttonOne = `<button class="accept cookie-button px-3 acceptOne" style="width: fit-content;">${buttons[0].text1}</button>`);

    $("#btnAlert").html(buttonOne + buttonTwo);
    $("#modalAlert").modal("show");

    $(".acceptOne").on("click", () => {
        $("#modalAlert").modal("hide");
    });
};

function capitalizeLetras(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function genRandom() {
    const digitHundreds = Math.floor(Math.random() * 900) + 1;
    let digitTens = Math.floor(Math.random() * 9);
    if (digitTens >= digitHundreds) digitTens++;
    let digitUnits = Math.floor(Math.random() * 8);
    if (digitUnits >= digitHundreds || digitUnits >= digitTens) digitUnits++;
    if (digitUnits >= digitHundreds && digitUnits >= digitTens) digitUnits++;
    return digitHundreds * 100 + digitTens * 10 + digitUnits;
}

function FormatDate(fecha) {
    let n = new Date(fecha);
    n = String(n.toLocaleString("es-CL")).split(",")[0];
    return n;
}

function volteaFecha(fecha, tipo) {
    if (tipo == 1) {
        //? recibe 2024-04-27 => 27-04-2024
        let anio = fecha.split("-")[0];
        let mes = fecha.split("-")[1];
        let day = fecha.split("-")[2];

        let nuevaFecha = day + "-" + mes + "-" + anio;
        return nuevaFecha;
    } else if (tipo == 2) {
        //? recibe 27-04-2024 => 2024-04-27
        let anio = fecha.split("-")[2];
        let mes = fecha.split("-")[1];
        let day = fecha.split("-")[0];

        let nuevaFecha = anio + "-" + mes + "-" + day;
        return nuevaFecha;
    }
}

localStorage.removeItem("btnHideDash");

$("#btnHideDash").click(() => {
    if (localStorage.getItem("btnHideDash")) {
        if (localStorage.getItem("btnHideDash") == 1) {
            localStorage.setItem("btnHideDash", 0);
        } else if (localStorage.getItem("btnHideDash") == 0) {
            localStorage.setItem("btnHideDash", 1);
        }
    } else {
        localStorage.setItem("btnHideDash", 1);
    }
});

function changeViewMenuIcon() {
    $("#btnHideDash").trigger("click");
}

function cerrarSesion() {
    $.ajax({
        method: "GET",
        dataType: "json",
        url: "views/login/cerrarSession.php",
    })
        .done(function (result) {
            let login = result.success;

            switch (login) {
                case true:
                    window.location.href = "/Brummy/";
                    break;
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("destruirAccesoUsuarioView - Server: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
        });
}

function validarCaracteresForm(arr_data_form) {
    console.log("Retornando informacion del formulario");

    console.log(arr_data_form);

    let cant_componets = arr_data_form.arr_components.length;
    let flag_form, flag_val, val_element, val_label, id_element;
    let msj = "Correcto!";
    let regex_correo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (let index = 0; index < cant_componets; index++) {
        val_element = $(`#${arr_data_form.arr_components[index]}`).val();
        id_element = arr_data_form.arr_components[index];
        val_label = $(`label[for='${arr_data_form.arr_components[index]}']`).text();
        switch (arr_data_form.arr_tipo_val[index]) {
            case "str":
                ocultarMsjErrors(id_element, id_element + "_error");
                if (arr_data_form.arr_required[index] == 1 && val_element.length == 0) {
                    msj = "El " + val_label + " esta vacio";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else if (!isNaN(val_element)) {
                    msj = "El " + val_label + " no es texto";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else if (
                    !(val_element.length >= arr_data_form.arr_min_components[index] && val_element.length <= arr_data_form.arr_max_components[index])
                ) {
                    msj = "El " + val_label + " no es esta dentro del rango permitido";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else {
                    $(`#${id_element}_error`).text(msj).css("color", "green");
                    flag_form = true;
                    flag_val = true;
                }
                console.log("Entramos al str" + index);

                if (!flag_form || flag_val) return flag_form;
                break;
            case "number":
                ocultarMsjErrors(id_element, id_element + "_error");
                if (arr_data_form.arr_required[index] == 1 && val_element.length == 0) {
                    msj = "El " + val_label + " esta vacio";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else if (isNaN(val_element)) {
                    msj = "El " + val_label + " no es numero";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else if (
                    !(val_element.length >= arr_data_form.arr_min_components[index] && val_element.length <= arr_data_form.arr_max_components[index])
                ) {
                    msj = "El " + val_label + " no es esta dentro del rango permitido";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else {
                    $(`#${id_element}_error`).text(msj).css("color", "green");
                    flag_form = true;
                    flag_val = true;
                }
                console.log("Entramos al number" + index);

                if (!flag_form || flag_val) return flag_form;

                break;

            case "email":
                ocultarMsjErrors(id_element, id_element + "_error");
                if (arr_data_form.arr_required[index] == 1 && val_element.length == 0) {
                    msj = "El " + val_label + " esta vacio";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else if (!regex_correo.test(val_element)) {
                    msj = "El " + val_label + " no es un correo";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else if (
                    !(val_element.length >= arr_data_form.arr_min_components[index] && val_element.length <= arr_data_form.arr_max_components[index])
                ) {
                    msj = "El " + val_label + " no es esta dentro del rango permitido";
                    $(`#${id_element}_error`).text(msj).css("color", "red");
                    console.log(msj);
                    flag_form = false;
                } else {
                    $(`#${id_element}_error`).text(msj).css("color", "green");
                    flag_form = true;
                    flag_val = true;
                }

                console.log("Entramos al email" + index);

                if (!flag_form || flag_val) return flag_form;
                break;

            case "all":
                console.log("Entramos al all" + index);
                break;

            case "double":
                console.log("Entramos al double" + index);
                break;

            default:
                flag_form = false;
                break;
        }
        // console.log("PROPIEDADES ELEMENTO NO: " + index);
        // console.log(arr_data_form.arr_components[index]);
        // console.log(arr_data_form.arr_required[index]);
    }
}

function ocultarMsjErrors(id_elemento, id_error) {
    $(`#${id_elemento}`).focus(function (e) {
        e.preventDefault();
        $(`#${id_error}`).text("").css("color", "red");
    });
    console.log("ocultando el error : " + id_error);
}

function getCurrentURL() {
    return window.location.origin;
}

function obtenerFechaLarga(date) {
    //* ejemplo se recibe 14-06-2024 o 2024-06-14
    //* y devuelve '14 de junio de 2024'

    let nuevaFecha = new Date(date);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return nuevaFecha.toLocaleDateString("es-MX", options);
}

function CantidadConCommas(valor) {
    let retorno = 0;
    if (String(valor).includes(".")) {
        let newValor = valor.split(".");
        valor = String(newValor[0]).replaceAll(",", "");
        let newValor2 = numberWithCommas(valor);
        retorno = newValor2 + "." + newValor[1];
    } else {
        valor = String(valor).replaceAll(",", "");
        let newValor = numberWithCommas(valor);
        retorno = newValor;
    }

    return retorno;
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getDateActual() {
    let fecha_actual_val = new Date();

    const year = fecha_actual_val.getFullYear();
    const month = String(fecha_actual_val.getMonth() + 1).padStart(2, "0");
    const day = String(fecha_actual_val.getDate()).padStart(2, "0");

    let fecha_actual_format = `${year}-${month}-${day}`;
    return fecha_actual_format;
}

function dataTableCreateClass(classname) {
    $("." + classname)
        .DataTable({
            responsive: true,
            searching: false,
            bFilter: false,
            bLengthChange: false,
            info: false,
            pageLength: 5,
            language: {
                lengthMenu: "_MENU_ registros por pagina",
                zeroRecords: "No hay resultados",
                info: "Pagina _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(Mostrar _MAX_ registros)",
                paginate: {
                    previous: "‹",
                    next: "›",
                },
                aria: {
                    paginate: {
                        previous: "Previous",
                        next: "Next",
                    },
                },
            },
            order: [[0, "asc"]],
        })
        .draw();
}

function dataTableDestroyClass(classname) {
    $("." + classname)
        .DataTable()
        .destroy();
}
