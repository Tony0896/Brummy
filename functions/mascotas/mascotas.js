$(document).ready(() => {
    preloader.hide();
    obtenerMascotas();
});

function obtenerMascotas() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/mascotas/obtenerMascotas.php",
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
                        $("#mascotasBody").html(html);
                        dataTableCreate();
                        preloader.hide();
                    } else {
                        dataTableDestroy();
                        let temperamento = "";
                        let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
                        result.forEach((data, index) => {
                            if (data.temperamentoMascota == "verde") {
                                temperamento = `#27AE60`;
                            } else if (data.temperamentoMascota == "amarilo") {
                                temperamento = `#ffb02e`;
                            } else if (data.temperamentoMascota == "rojo") {
                                temperamento = `#ff0300`;
                            } else {
                                temperamento = `#FFFFFF`;
                            }
                            html += `<tr>
                                <td> ${index + 1} </td>
                                <td> <span class="material-icons" style="font-size: 18px;color: ${temperamento}"> fiber_manual_record </span> </td>
                                <td>
                                    <div class="card__avatar"> 
                                    ${
                                        data.urlImg
                                            ? `<img src="./../../${data.urlImg}" alt="" onclick="verFotoMultimedia(this.src)"> `
                                            : `<img src="./../../Brummy/images/defaultq.png" alt="" >`
                                    }    
                                    </div>
                                </td>
                                <td class="capitalize"> 
                                    <div> 
                                        <div><span>${data.nombre}</span></div> 
                                        <div><span>${data.especie} - ${data.raza}</span></div> 
                                    </div> 
                                </td>
                                <td class="capitalize">${data.NombreCliente}</td>
                                <td>${data.fechaNacimiento}</td>
                                <td>${data.sexo}</td>
                                <td>${data.color ? data.color : tdSinData}</td>
                                <td><div> <div>${volteaFecha(String(data.fechaUlmitoMovimiento).split(" ")[0], 1)} ${
                                String(String(data.fechaUlmitoMovimiento).split(" ")[1]).split(":")[0]
                            }:${String(String(data.fechaUlmitoMovimiento).split(" ")[1]).split(":")[1]}</div> <div>${
                                data.motivoMovimiento
                            }</div> </div></td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Perfil" 
                                            onclick="verMascota(${data.ID} , ${data.FK_dueno})">
                                            <span class="text-sm mb-0"><i class="material-icons"> pets </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#mascotasBody").html(html);
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

function crearMascota() {
    preloader.show();

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/catalogos/obtenerRazas.php",
        data: {},
    })
        .done(function (results2) {
            let success2 = results2.success;
            let result2 = results2.result;
            switch (success2) {
                case true:
                    if (result2 == "Sin Datos") {
                    } else {
                        let html2 = "";
                        result2.forEach((data2, index) => {
                            html2 += `<option value="${data2.ID}" FK_especie="${data2.FK_especie}" especie="${data2.especie}" raza="${data2.nombreRaza}">${data2.especie} - ${data2.nombreRaza}</option>`;
                        });
                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: "./views/clientes/obtenerClientes.php",
                            data: {},
                        })
                            .done(function (results3) {
                                let success3 = results3.success;
                                let result3 = results3.result;
                                switch (success3) {
                                    case true:
                                        if (result3 == "Sin Datos") {
                                        } else {
                                            let html3 = "";
                                            result3.forEach((data3, index) => {
                                                html3 += `<option value="${data3.ID}">${data3.nombre} ${data3.apellidoP} ${data3.apellidoM}</option>`;
                                            });
                                            $("#labelModal").html(`Agregar nueva Mascota`);

                                            $("#body_modal").html(`<br>
                                                <div id="formMascotas">
                                                    <div class="coolinput">
                                                        <label name="Nombre Mascota" for="nombreMascota" class="text">Nombre Mascota</label>    
                                                        <input name="Nombre Mascota" type="text" class="input capitalize obligatorio" id="nombreMascota" autocomplete="off" maxlength"50"/>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label name="Fecha Nacimiento" for="fechaMascota" class="text">Fecha Nacimiento</label>    
                                                        <input name="Fecha Nacimiento" type="text" class="input obligatorio" id="fechaMascota" autocomplete="off" maxlength"50"/>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label for="relacionEspecie" class="text">Relación Especie</label>
                                                        <select class="input capitalize obligatorio" name="Relación Especie" id="relacionEspecie" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            ${html2}
                                                        </select>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label for="sexoMascota" class="text">Sexo Mascota</label>
                                                        <select class="input capitalize obligatorio" name="Sexo Mascota" id="sexoMascota" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            <option value="Macho">Macho</option>
                                                            <option value="Hembra">Hembra</option>
                                                        </select>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label name="Color Mascota" for="colorMascota" class="text">Color Mascota</label>    
                                                        <input type="text" class="input capitalize" id="colorMascota" autocomplete="off" maxlength"50"/>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label name="Rasgos Particulares" for="rasgosMascota" class="text">Rasgos Particulares</label>    
                                                        <input type="text" class="input capitalize" id="rasgosMascota" autocomplete="off" maxlength"50"/>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label for="FK_dueno" class="text">Dueño Mascota</label>
                                                        <select class="input capitalize obligatorio" name="Dueño Mascota" id="FK_dueno" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            ${html3}
                                                        </select>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label for="temperamentoMascota" class="text">Temperamento Mascota</label>
                                                        <select class="input capitalize obligatorio" name="Temperamento Mascota" id="temperamentoMascota" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            <option value="verde">&#129001;</option>
                                                            <option value="amarilo">&#129000;</option>
                                                            <option value="rojo">&#128997;</option>
                                                        </select>
                                                    </div>

                                                    <br>
                                                    <div class="coolinput" style="width: 200px;margin: auto;">
                                                        <input type="file" class="my-pond" name="filepond" />
                                                    </div>

                                                    <div class="center-fitcomponent" style="width: 100%;">
                                                        <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" id="PreGuardarMascota">
                                                            <span class="text-sm mb-0 span-buttom">
                                                                Guardar
                                                                <i class="material-icons"> save </i>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div class="row" style="margin-bottom: 25px;display:none;">
                                                        <button type="button" class="btn btn-primary" id="SendFiles">Save changes</button>
                                                        <input type="hidden" id="FKMascotaResponse">
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
                                                $(".my-pond").filepond("labelIdle", "Agregar Imagen mascota");
                                                $(".my-pond").filepond("imagePreviewHeight", 170);
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

                                                // Manually add a file using the addfile method
                                                // $(".my-pond")
                                                //     .first()
                                                //     .filepond("addFile", "index.html")
                                                //     .then(function (file) {
                                                //         console.log("file added", file);
                                                //     });

                                                $("#PreGuardarMascota").click(() => {
                                                    pondFiles = $(".my-pond").filepond("getFiles");
                                                    if (pondFiles.length > 0) {
                                                        guardarMascota();
                                                    } else {
                                                        Swal.fire({
                                                            title: "",
                                                            text: "Aún no tienes una imagen de la mascota. ¿Deseas continuar?",
                                                            icon: "question",
                                                            showCancelButton: true,
                                                            confirmButtonColor: "#7066e0",
                                                            cancelButtonColor: "#FF0037",
                                                            confirmButtonText: "OK",
                                                            cancelButtonText: "Cancelar",
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                guardarMascota();
                                                            }
                                                        });
                                                    }
                                                });

                                                $("#SendFiles").click(() => {
                                                    let formData = new FormData();
                                                    // append files array into the form data
                                                    pondFiles = $(".my-pond").filepond("getFiles");
                                                    if (pondFiles.length > 0) {
                                                        for (var i = 0; i < pondFiles.length; i++) {
                                                            formData.append("Adjunto_" + i, pondFiles[i].file);
                                                        }
                                                        formData.append("NoDocs", pondFiles.length);
                                                        formData.append("FKPertenece", $("#FKMascotaResponse").val());
                                                        formData.append("IDModulo", 6);
                                                        formData.append("IDAccion", 1);
                                                        formData.append("NombreModulo", "Mascotas");
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
                                                                        $(".my-pond").filepond("removeFiles");
                                                                        $("#modalTemplate").modal("hide");
                                                                        $("#btnClose").off("click");
                                                                        obtenerMascotas();
                                                                    }
                                                                }
                                                            },
                                                            error: function (data) {
                                                                msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                                            },
                                                        });
                                                    } else {
                                                        obtenerMascotas();
                                                    }
                                                });
                                            });

                                            $("#modalTemplate").modal({
                                                backdrop: "static",
                                                keyboard: false,
                                            });

                                            $("#fechaMascota").duDatepicker({ format: "dd-mm-yyyy", clearBtn: true, cancelBtn: true });

                                            $("#modalTemplate").modal("show");

                                            $("#btnClose").on("click", () => {
                                                $("#modalTemplate").modal("hide");
                                                $("#btnClose").off("click");
                                            });

                                            $("#relacionEspecie").select2({
                                                dropdownParent: $("#modalTemplate"),
                                            });

                                            $("#FK_dueno").select2({
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

function guardarMascota() {
    let values = get_datos_completos("formMascotas");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let nombre = String($("#nombreMascota").val());
        let fechaNacimiento = volteaFecha(String($("#fechaMascota").val()), 2);
        let FK_especie = String($("#relacionEspecie").find(":selected").attr("FK_especie"));
        let especie = String($("#relacionEspecie").find(":selected").attr("especie"));
        let raza = String($("#relacionEspecie").find(":selected").attr("raza"));
        let FK_raza = String($("#relacionEspecie").val());
        let sexo = String($("#sexoMascota").val());
        let color = String($("#colorMascota").val());
        let rasgosParticulares = String($("#rasgosMascota").val());
        let FK_dueno = String($("#FK_dueno").val());
        let temperamentoMascota = $("#temperamentoMascota").val();

        nombre = nombre.replaceAll("'", '"');
        fechaNacimiento = fechaNacimiento.replaceAll("'", '"');
        especie = especie.replaceAll("'", '"');
        raza = raza.replaceAll("'", '"');
        sexo = sexo.replaceAll("'", '"');
        color = color.replaceAll("'", '"');
        rasgosParticulares = rasgosParticulares.replaceAll("'", '"');

        preloader.show();
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/mascotas/guardarMascota.php",
            data: { nombre, fechaNacimiento, FK_especie, especie, raza, FK_raza, sexo, color, rasgosParticulares, FK_dueno, temperamentoMascota },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        let result2 = results.result2;
                        $("#FKMascotaResponse").val(result2);
                        $("#SendFiles").trigger("click");
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        // obtenerMascotas();
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

function verMascota(ID, FK_dueno) {
    localStorage.setItem("IDMascota", ID);
    localStorage.setItem("FK_dueno", FK_dueno);
    $("#contenido").load("templates/mascotas/perfilMascota.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            // documentReadyVacantes();
        }
    });
    obtenerComentarios();
}

function obtenerComentarios() {
    let id_mascota = localStorage.getItem("IDMascota");

    axios
        .post("./views/mascotas/obtenerComentarios.php", { ID: id_mascota })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                let success = response.data.success;
                let result = response.data.result;

                switch (success) {
                    case true:
                        if (result == "Sin Datos") {
                        } else {
                            let template_comentario = "";
                            result.forEach((data, index) => {
                                template_comentario += `
                                <div class="card_comentario card2">
                                    <div class="container_comentario">
                                        <div class="left">
                                            <div class="status-ind"></div>
                                        </div>
                                        <div class="right">
                                            <div class="text-wrap">
                                                <p class="text-content">
                                                    <a class="" style="color: #0277bd;font-size: 1rem;font-weight: 600;text-decoration: none;">${
                                                        data.redaccion
                                                    }</a>
                                                </p>
                                                <p class="time">${volteaFecha(String(data.fecha_comentario_up).split(" ")[0], 1)} ${
                                    String(data.fecha_comentario_up).split(" ")[1]
                                } </p>
                                                <p class="time">${data.nombre_completo_up}</p>
                                            </div>
                                            <div class="button-wrap">
                                                <button class="primary-cta" onClick ="eliminarComentarioMascota(${
                                                    data.ID
                                                })" style="color: #FF0037;">Eliminar</button>
                                                <button class="secondary-cta" style="color: #000;" onClick ='editarComentarioMascota(${
                                                    data.ID
                                                } , ${JSON.stringify(data.redaccion)})' >Editar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                            });

                            $("#content_comentario").html(template_comentario);
                        }
                        break;
                    case false:
                        preloader.hide();
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        break;
                }
            }
        })
        .catch((error) => {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            console.error("Ocurrio un error : " + error);
        })
        .finally(() => {
            // siempre sera ejecutado
        });
}

function crearComentarioMascota() {
    $("#labelModal").html(`Agregar nuevo Comentario`);

    $("#body_modal").html(`<br>
        <div id="formMascotas">
            <div class="coolinput">
                <label name="Contenido Comentario" for="contenido_comentario" class="text">Contenido Comentario</label>  
                <textarea name="Contenido Comentario" class="input capitalize obligatorio" id="contenido_comentario" autocomplete="off" maxlength"200"/ cols="30" rows="10"></textarea>  
                <span><strong class="msj_validacion" id="contenido_comentario_error" ></strong></span>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarComentario();">
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

    preloader.hide();
}

function guardarComentario() {
    let arr_data_form = {
        arr_components: ["contenido_comentario"],
        arr_max_components: [100],
        arr_min_components: [10],
        arr_tipo_val: ["str"],
        arr_required: [1],
    };

    let resp_val_form = validarCaracteresForm(arr_data_form);

    // console.log(resp_val_form);

    if (!resp_val_form) {
        console.log("No paso filtro validacion formulario");
        return false;
    }

    const ID_MASCOTA = localStorage.getItem("IDMascota");
    const FK_dueno = localStorage.getItem("FK_dueno");
    const contenido_comentario = $("#contenido_comentario").val();

    let arr_data = {
        ID_MASCOTA: ID_MASCOTA,
        contenido_comentario: contenido_comentario,
        FK_dueno: FK_dueno,
    };

    preloader.show();

    axios
        .post("./views/mascotas/guardarComentario.php", { arr_data: arr_data })
        .then((response) => {
            if (response.status == 200) {
                let success = response.data.success;
                let result = response.data.result;

                switch (success) {
                    case true:
                        if (result == "error_execute_query") {
                        } else {
                            msj.show("Aviso", "Se registro el comentario correctamente", [{ text1: "OK" }]);
                            preloader.hide();
                            $("#modalTemplate").modal("hide");
                            obtenerComentarios();
                        }
                        break;

                    case false:
                        preloader.hide();
                        msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                        break;

                    default:
                        // ocurrio algo raro
                        break;
                }
            }
        })
        .catch((error) => {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            console.error("Ocurrio un error : " + error);
        })
        .finally(() => {
            // siempre se ejecuta
        });
}

function eliminarComentarioMascota(id_comentario) {
    const FK_dueno = localStorage.getItem("FK_dueno");

    const arr_data = {
        FK_dueno: FK_dueno,
        id_comentario: id_comentario,
    };

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
            axios
                .post("./views/mascotas/eliminarComentarioMascota.php", { arr_data: arr_data })
                .then((response) => {
                    if (response.status == 200) {
                        let success = response.data.success;
                        let result = response.data.result;
                        switch (success) {
                            case true:
                                console.info(2);
                                if (result == "error_execute_query") {
                                } else {
                                    msj.show("Aviso", "Se elimino el comentario correctamente", [{ text1: "OK" }]);
                                    preloader.hide();
                                    obtenerComentarios();
                                }
                                break;
                            case false:
                                preloader.hide();
                                msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                                break;
                            default:
                                break;
                        }
                    }
                })
                .catch((error) => {
                    preloader.hide();
                    msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
                    // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                    console.error("Ocurrio un error : " + error);
                })
                .finally(() => {});
        }
    });
}

function editarComentarioMascota(id_comentario, comentario_mascota) {
    $("#labelModal").html(`Editar Comentario`);

    $("#body_modal").html(`<br>
        <div id="formMascotas">
            <div class="coolinput">
                <label name="Contenido Comentario" for="contenido_comentario" class="text">Editar Contenido Comentario</label>  
                <textarea name="Contenido Comentario" class="input capitalize obligatorio" id="contenido_comentario_update" autocomplete="off" maxlength"200"/ cols="30" rows="10">${comentario_mascota}</textarea>  
                <span><strong class="msj_validacion" id="contenido_comentario_error" ></strong></span>
            </div>
        </div>

        <div class="center-fitcomponent" style="width: 100%;">
            <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="actualizarComentarioMascota(${id_comentario});">
                <span class="text-sm mb-0 span-buttom">
                    Editar
                    <i class="material-icons"> edit </i>
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

function actualizarComentarioMascota(id_comentario) {
    let comentario_act = $("#contenido_comentario_update").val();

    const arr_data = {
        comentario_act: comentario_act,
        id_comentario: id_comentario,
    };

    axios
        .post("./views/mascotas/actualizarComentarioMascota.php", { arr_data: arr_data })
        .then((response) => {
            if (response.status == 200) {
                let success = response.data.success;
                let result = response.data.result;

                switch (success) {
                    case true:
                        if (result) {
                            if (result == "error_execute_query") {
                            } else {
                                msj.show("Aviso", "Se Actualizo el comentario correctamente", [{ text1: "OK" }]);
                                preloader.hide();
                                $("#modalTemplate").modal("hide");
                                obtenerComentarios();
                            }
                        }

                        break;
                    case false:
                        break;

                    default:
                        break;
                }
            }
        })
        .catch((error) => {
            preloader.hide();
            msj.show("Aviso", "Algo salió mal", [{ text1: "OK" }]);
            // console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
            console.error("Ocurrio un error : " + error);
        })
        .finally(() => {});
}
