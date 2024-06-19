$(document).ready(() => {
    preloader.hide();
    verPerfilMascota(localStorage.getItem("IDMascota"));
});

function regresaMascotas() {
    localStorage.removeItem("IDMascota");
    $("#contenido").load("templates/mascotas/mascotas.php", function (responseTxt, statusTxt, xhr) {
        if (statusTxt != "error") {
            // documentReadyVacantes();
        }
    });
}

function verPerfilMascota(ID) {
    let btn_edit_mascota;
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/mascotas/obtenerMascota.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            let html = "";
            let tdSinData = `<span class='material-icons'> remove </span> &nbsp; <span class='material-icons'> remove </span>`;
            switch (success) {
                case true:
                    let nombreMascota, fechaMascota, relacionEspecie, sexoMascota, colorMascota, rasgosMascota, FK_dueno;
                    if (result == "Sin Datos") {
                        Swal.fire({ icon: "warning", title: "Sin datos.", text: "" });
                    } else {
                        result.forEach((data, index) => {
                            // console.table(data);
                            nombreMascota = data.nombre;
                            fechaMascota = data.fechaNacimiento;
                            relacionEspecie = `${data.especie} - ${data.raza}`;
                            sexoMascota = data.sexo;
                            colorMascota = data.color ? data.color : tdSinData;
                            rasgosMascota = data.rasgosParticulares ? data.rasgosParticulares : tdSinData;
                            FK_dueno = data.NombreCliente;
                        });
                        traerHistorialMascota(ID);
                        $("#nombreMascota").html(nombreMascota);
                        $("#fechaMascota").html(fechaMascota);
                        $("#relacionEspecie").html(relacionEspecie);
                        $("#sexoMascota").html(sexoMascota);
                        $("#colorMascota").html(colorMascota);
                        $("#rasgosMascota").html(rasgosMascota);
                        $("#FK_dueno").html(FK_dueno);
                        // mostramos el boton con la informacion de la mascota
                        btn_edit_mascota = `
                        <div class="buttom-blue buttom" onclick='editarMascota(${JSON.stringify( result)});'>
                            <span class="text-sm mb-0 span-buttom"> 
                                Editar
                                <i class="material-icons"> edit </i>
                            </span>
                        </div>
                        `;
                        $("#btn_editar_mascota").html(btn_edit_mascota);

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

function cambioTablero(id) {
    let oldtext = "",
        newText = "";
    if ($("#" + id).prop("checked")) {
        oldtext = String($("#label_" + id).text());
        newText = "✔   " + oldtext;
        // $("#divHtml_" + id).css("display", "block");
    } else {
        oldtext = String($("#label_" + id).text());
        newText = oldtext.replace("✔   ", "");
        // $("#divHtml_" + id).css("display", "none");
    }
    $("#label_" + id).text(newText);
}

function eliminarMascota(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/mascotas/eliminarMascota.php",
        data: { ID },
    })
        .done(function (results) {
            let success = results.success;
            let result = results.result;
            switch (success) {
                case true:
                    preloader.show();
                    regresaMascotas();
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

function traerHistorialMascota(ID) {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/mascotas/traerHistorialMascota.php",
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
                        $("#historialMascotaSpace").html(html);
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

function editarMascota(data_mascota) { 

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
                        let attr_selected_especie = "";
                        let templates_sexo_animal = (data_mascota[0]['sexo'] == 'Macho') ? `<option value="Macho" selected>Macho</option> <option value="Hembra">Hembra</option>` : `<option value="Macho">Macho</option> <option value="Hembra" selected>Hembra</option>`;
                        
                        result2.forEach((data2, index) => {
                            attr_selected_especie = ((data2.especie == data_mascota[0]['especie']) && (data2.nombreRaza == data_mascota[0]['raza'])) ? 'selected' : '';
                            html2 += `<option value="${data2.ID}" FK_especie="${data2.FK_especie}" especie="${data2.especie}" raza="${data2.nombreRaza}" ${attr_selected_especie} >${data2.especie} - ${data2.nombreRaza}</option>`;
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
                                            let attr_selected_dueno = "";
                                            result3.forEach((data3, index) => {
                                                attr_selected_dueno = (data3.ID == data_mascota[0]['FK_dueno']) ? 'selected' : '';
                                                html3 += `<option value="${data3.ID}" ${attr_selected_dueno}>${data3.nombre} ${data3.apellidoP} ${data3.apellidoM}</option>`;
                                            });
                                            $("#labelModal").html(`Editar Datos Mascota`);

                                            $("#body_modal").html(`<br>
                                                <div id="formMascotas">
                                                    <div class="coolinput">
                                                        <label name="Nombre Mascota" for="editNombreMascota" class="text">Nombre Mascota</label>    
                                                        <input name="Nombre Mascota" type="text" class="input capitalize obligatorio" id="editNombreMascota" autocomplete="off" maxlength"50"/ value ='${data_mascota[0]['nombre']}'>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label name="Fecha Nacimiento" for="editFechaMascota" class="text">Fecha Nacimiento</label>    
                                                        <input name="Fecha Nacimiento" type="date" class="input obligatorio" id="editFechaMascota" autocomplete="off" maxlength"50"/ value ='${data_mascota[0]['fechaNacimiento']}'>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label for="editRelacionEspecie" class="text">Relación Especie</label>
                                                        <select class="input capitalize obligatorio" name="Edit Relación Especie" id="editRelacionEspecie" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            ${html2}
                                                        </select>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label for="editSexoMascota" class="text">Sexo Mascota</label>
                                                        <select class="input capitalize obligatorio" name="Sexo Mascota" id="editSexoMascota" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            ${templates_sexo_animal}
                                                        </select>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label name="Color Mascota" for="editColorMascota" class="text">Color Mascota</label>    
                                                        <input type="text" class="input capitalize" id="editColorMascota" autocomplete="off" maxlength"50"/ value ='${data_mascota[0]['color']}'> 
                                                    </div>

                                                    <div class="coolinput">
                                                        <label name="Rasgos Particulares" for="editRasgosMascota" class="text">Rasgos Particulares</label>    
                                                        <input type="text" class="input capitalize" id="editRasgosMascota" autocomplete="off" maxlength"50"/ value ='${data_mascota[0]['rasgosParticulares']}'>
                                                    </div>

                                                    <div class="coolinput">
                                                        <label for="Edit_FK_dueno" class="text">Dueño Mascota</label>
                                                        <select class="input capitalize obligatorio" name="Edit Dueño Mascota" id="Edit_FK_dueno" style="background-color: rgb(255, 255, 255);width:100%;">
                                                            <option value="">Selecciona una opción</option>
                                                            ${html3}
                                                        </select>
                                                    </div>
                                                    <br>
                                                    <div class="coolinput">
                                                        <div class="container_upload"> 
                                                            <div class="header_upload"> 
                                                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                                                <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#009071" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> <p>Adjuntar una foto de la mascota!</p>
                                                            </div> 
                                                            <input id="file" type="file"> 
                                                            </div>
                                                    </div>

                                                </div>

                                                <div class="center-fitcomponent" style="width: 100%;">
                                                    <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarEdicionMascota();">
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

                                            $("#EditRelacionEspecie").select2({
                                                dropdownParent: $("#modalTemplate"),
                                            });

                                            $("#Edit_FK_dueno").select2({
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

function guardarEdicionMascota() { 

    preloader.show();

    let arr_data = {
        ID : localStorage.getItem("IDMascota"),
        editNombreMascota : $("#editNombreMascota").val(),
        editFechaMascota : $("#editFechaMascota").val(),
        raza : String($("#editRelacionEspecie").find(":selected").attr("raza")),
        especie : String($("#editRelacionEspecie").find(":selected").attr("especie")),
        FK_especie : String($("#editRelacionEspecie").find(":selected").attr("FK_especie")),
        FK_raza : $("#editRelacionEspecie").val(),
        editSexoMascota : $("#editSexoMascota").val(),
        editColorMascota : $("#editColorMascota").val(),
        editRasgosMascota : $("#editRasgosMascota").val(),
        Edit_FK_dueno : $("#Edit_FK_dueno").val(),
    }

    axios
    .post( './views/mascotas/guardarEdicionMascota.php' , {arr_data : arr_data})
    .then((response) => {

        if (response.status == 200) {
            let success = response.data.success;
            let result = response.data.result;

            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                    } else {
                        msj.show("Aviso", "Se Edito los datos correctamente", [{ text1: "OK" }]);
                        preloader.hide();
                        $("#modalTemplate").modal("hide");
                        verPerfilMascota(localStorage.getItem("IDMascota"));
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
    .finally()

}