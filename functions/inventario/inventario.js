$(document).ready(() => {
    preloader.hide();
    obtenerInventario();
});

function obtenerInventario() {
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "./views/inventario/obtenerInventario.php",
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
                        $("#productosBody").html(html);
                        dataTableCreate();
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
                                <td>${index + 1}</td>
                                <td>${codigo}</td>
                                <td>${data.nombre}</td>
                                <td>${data.Flagtipo}</td>
                                <td>${data.nameCategoria ? data.nameCategoria : "N/A"}</td>
                                <td>${data.precioVenta}</td>
                                <td>${stock}</td>
                                <td>
                                    <div style="display: flex; flex-direction: row;">
                                        <div class="buttom-blue buttom button-sinText mx-1" title="Ver Producto" onclick="verProducto(${data.ID})">
                                            <span class="text-sm mb-0"><i class="material-icons"> inventory_2 </i></span>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;
                        });
                        $("#productosBody").html(html);
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

function nuevoProducto() {
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
            let html = "";
            switch (success) {
                case true:
                    if (result == "Sin Datos") {
                        msj.show("Aviso", "Aún no hay categorías.", [{ text1: "OK" }]);
                        preloader.hide();
                    } else {
                        result.forEach((data, index) => {
                            html += `<option value="${data.ID}">${data.nombreCategoria}</option>`;
                        });
                        preloader.hide();
                        $("#labelModal").html(`Crear Nuevo Producto o Servicio`);

                        $("#body_modal").html(`<br>
                            <div id="formInventario">
                                <div class="coolinput div_producto div_servicio">
                                    <label for="tipoProducto" class="text">Tipo</label>
                                    <select class="input obligatorio" name="Tipo" id="tipoProducto" style="background-color: rgb(255, 255, 255);width:100%;" onchange="asignaObligatorios(this.value)">
                                        <option value="">Selecciona una opción</option>
                                        <option value="Producto">Producto</option>
                                        <option value="Servicio">Servicio</option>
                                    </select>
                                </div>
                    
                                <div class="coolinput div_producto div_servicio">
                                    <label for="nombre" class="text">Nombre</label>
                                    <input name="Nombre" type="text" class="capitalize input producto servicio obligatorio" id="nombre" autocomplete="off" maxlength"20"/>
                                </div>
                    
                                <div class="coolinput div_producto">
                                    <label for="codigo" class="text">Código</label>
                                    <input name="Código" type="text" class="capitalize input producto" id="codigo" autocomplete="off" maxlength"20"/>
                                </div>
                    
                                <div class="coolinput div_producto div_servicio">
                                    <label for="descripcion" class="text">Descripción</label>
                                    <input name="Descripción" type="text" class="capitalize input producto servicio obligatorio" id="descripcion" autocomplete="off" maxlength"20"/>
                                </div>
                    
                                <div class="coolinput div_producto div_servicio">
                                    <label for="categoria" class="text">Categoría</label>
                                    <select name="Categoría" class="capitalize input producto obligatorio" id="categoria" style="background-color: rgb(255, 255, 255);width:100%;">
                                        <option value="">Selecciona una opción</option>
                                        ${html}
                                    </select>
                                </div>
                    
                                <div class="coolinput div_producto">
                                    <label for="precioCompra" class="text">Precio Compra</label>
                                    <input name="Precio Compra" type="text" class="capitalize input producto" id="precioCompra" autocomplete="off" maxlength"20"/>
                                </div>
                    
                                <div class="coolinput div_producto div_servicio">
                                    <label for="precioVenta" class="text">Precio Venta</label>
                                    <input name="Precio Venta" type="text" class="capitalize input producto servicio obligatorio" id="precioVenta" autocomplete="off" maxlength"20"/>
                                </div>
                    
                                <div class="coolinput div_producto">
                                    <label for="stockMinimo" class="text">Stock mínimo</label>
                                    <input name="Stock mínimo" type="text" class="capitalize input producto" id="stockMinimo" autocomplete="off" maxlength"20"/>
                                </div>
                                
                                <div class="coolinput div_producto">
                                    <label for="stockReal" class="text">Stock Real</label>
                                    <input name="Stock Real" type="text" class="capitalize input producto" id="stockReal" autocomplete="off" maxlength"20"/>
                                </div>
                                
                            </div>
                    
                            <br>
                            <div class="coolinput">
                                <div class="container_upload"> 
                                    <div class="header_upload"> 
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> 
                                        <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#009071" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> <p>Adjuntar una foto del producto!</p>
                                    </div> 
                                    <input id="file" type="file"> 
                                </div>
                            </div>
                    
                            <div class="center-fitcomponent" style="width: 100%;">
                                <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="guardarProducto();">
                                    <span class="text-sm mb-0 span-buttom"> 
                                        Guardar
                                        <i class="material-icons"> save </i>
                                    </span>
                                </div>
                            </div>
                        `);

                        $("#categoria").select2({
                            dropdownParent: $("#modalTemplate"),
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

function asignaObligatorios(value) {
    $(".capitalize").removeClass("obligatorio");
    $(".coolinput").css("display", "none");
    if (value == "Producto") {
        $(".producto").addClass("obligatorio");
        $(".div_producto").css("display", "flex");
    } else if (value == "Servicio") {
        $(".servicio").addClass("obligatorio");
        $(".div_servicio").css("display", "flex");
    }
}

function guardarProducto() {
    let values = get_datos_completos("formInventario");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let tipoProducto = String($("#tipoProducto").val()).trim();
        let nombre = String($("#nombre").val()).trim();
        let codigo = String($("#codigo").val()).trim();
        let descripcion = String($("#descripcion").val()).trim();
        let precioCompra = String($("#precioCompra").val()).trim();
        let precioVenta = String($("#precioVenta").val()).trim();
        let stockMinimo = String($("#stockMinimo").val()).trim();
        let stockReal = String($("#stockReal").val()).trim();
        let categoria = $("#categoria").val();
        let nameCategoria = String($("#categoria").find("option:selected").text()).trim();

        tipoProducto = tipoProducto.replaceAll("'", '"');
        nombre = nombre.replaceAll("'", '"');
        codigo = codigo.replaceAll("'", '"');
        descripcion = descripcion.replaceAll("'", '"');
        precioCompra = precioCompra.replaceAll("'", '"');
        precioVenta = precioVenta.replaceAll("'", '"');
        stockMinimo = stockMinimo.replaceAll("'", '"');
        stockReal = stockReal.replaceAll("'", '"');
        categoria = categoria.replaceAll("'", '"');
        nameCategoria = nameCategoria.replaceAll("'", '"');

        if (!codigo) {
            let now = String(Date.now());
            let lastFive = now.substr(now.length - 8);
            codigo = "BRUINV750" + String(lastFive);
        }

        preloader.show();
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/inventario/guardarProducto.php",
            data: { tipoProducto, nombre, codigo, descripcion, precioCompra, precioVenta, stockMinimo, stockReal, categoria, nameCategoria },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Guardado correctamente", [{ text1: "OK" }]);
                        obtenerInventario();
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

function verProducto(ID) {
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

                        $.ajax({
                            method: "POST",
                            dataType: "JSON",
                            url: "./views/inventario/obtenerProducto.php",
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
                                                $("#labelModal").html(`Crear Nuevo Producto o Servicio`);

                                                $("#body_modal").html(`<br>
                                                    <div id="formInventario">
                                                        <div class="coolinput div_producto div_servicio">
                                                            <label for="tipoProducto" class="text">Tipo</label>
                                                            <select class="input obligatorio" name="Tipo" id="tipoProducto" style="background-color: rgb(255, 255, 255);width:100%;" onchange="asignaObligatorios(this.value)">
                                                                <option value="">Selecciona una opción</option>
                                                                <option value="Producto">Producto</option>
                                                                <option value="Servicio">Servicio</option>
                                                            </select>
                                                        </div>
                        
                                                        <div class="coolinput div_producto div_servicio">
                                                            <label for="nombre" class="text">Nombre</label>
                                                            <input name="Nombre" type="text" class="capitalize input producto servicio obligatorio" id="nombre" autocomplete="off" maxlength"20"/>
                                                        </div>
                        
                                                        <div class="coolinput div_producto">
                                                            <label for="codigo" class="text">Código</label>
                                                            <input name="Código" type="text" class="capitalize input producto" id="codigo" autocomplete="off" maxlength"20"/>
                                                        </div>
                        
                                                        <div class="coolinput div_producto div_servicio">
                                                            <label for="descripcion" class="text">Descripción</label>
                                                            <input name="Descripción" type="text" class="capitalize input producto servicio obligatorio" id="descripcion" autocomplete="off" maxlength"20"/>
                                                        </div>
                        
                                                        <div class="coolinput div_producto div_servicio">
                                                            <label for="categoria" class="text">Categoría</label>
                                                            <select name="Categoría" class="capitalize input producto obligatorio" id="categoria" style="background-color: rgb(255, 255, 255);width:100%;">
                                                                <option value="">Selecciona una opción</option>
                                                                ${htmlCat}
                                                            </select>
                                                        </div>
                                                        
                                                        <div class="coolinput div_producto">
                                                            <label for="precioCompra" class="text">Precio Compra</label>
                                                            <input name="Precio Compra" type="text" class="capitalize input producto" id="precioCompra" autocomplete="off" maxlength"20"/>
                                                        </div>
                        
                                                        <div class="coolinput div_producto div_servicio">
                                                            <label for="precioVenta" class="text">Precio Venta</label>
                                                            <input name="Precio Venta" type="text" class="capitalize input producto servicio obligatorio" id="precioVenta" autocomplete="off" maxlength"20"/>
                                                        </div>
                        
                                                        <div class="coolinput div_producto">
                                                            <label for="stockMinimo" class="text">Stock mínimo</label>
                                                            <input name="Stock mínimo" type="text" class="capitalize input producto" id="stockMinimo" autocomplete="off" maxlength"20"/>
                                                        </div>
                                                        
                                                        <div class="coolinput div_producto">
                                                            <label for="stockReal" class="text">Stock Real</label>
                                                            <input name="Stock Real" type="text" class="capitalize input producto" id="stockReal" autocomplete="off" maxlength"20"/>
                                                        </div>
                                                    </div>
                        
                                                    <div class="center-fitcomponent" style="width: 100%;">
                                                        <div class="buttom-blue buttom" style="margin-left: auto;margin-right: auto;" onclick="actualizarProducto(${data.ID});">
                                                            <span class="text-sm mb-0 span-buttom"> 
                                                                Actualizar
                                                                <i class="material-icons"> save </i>
                                                            </span>
                                                        </div>
                                                    </div>
                    
                                                    <div class="center-fitcomponent" style="width: 100%;">
                                                        <div class="buttom-red buttom" style="margin-left: auto;margin-right: auto;" onclick="eliminarProdcuto(${data.ID});">
                                                            <span class="text-sm mb-0 span-buttom"> 
                                                                Eliminar
                                                                <i class="material-icons"> delete </i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                `);

                                                $(".capitalize").removeClass("obligatorio");
                                                $(".coolinput").css("display", "none");

                                                $("#tipoProducto").val(data.tipo);
                                                $("#nombre").val(data.nombre);
                                                data.tipo == "Servicio"
                                                    ? $("#codigo").val(String(data.codigo) + String(data.ID))
                                                    : $("#codigo").val(data.codigo);
                                                $("#descripcion").val(data.descripcion);
                                                $("#precioCompra").val(data.precioCompra);
                                                $("#precioVenta").val(data.precioVenta);
                                                $("#stockMinimo").val(data.stockMinimo);
                                                $("#stockReal").val(data.stockReal);
                                                $("#categoria").val(data.categoria);

                                                if (data.tipo == "Producto") {
                                                    $(".producto").addClass("obligatorio");
                                                    $(".div_producto").css("display", "flex");
                                                } else if (data.tipo == "Servicio") {
                                                    $(".servicio").addClass("obligatorio");
                                                    $(".div_servicio").css("display", "flex");
                                                }

                                                $("#categoria").select2({
                                                    dropdownParent: $("#modalTemplate"),
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

function actualizarProducto(ID) {
    let values = get_datos_completos("formInventario");
    let response = values.response;
    let valido = values.valido;
    if (valido) {
        let tipoProducto = String($("#tipoProducto").val()).trim();
        let nombre = String($("#nombre").val()).trim();
        let codigo = String($("#codigo").val()).trim();
        let descripcion = String($("#descripcion").val()).trim();
        let precioCompra = String($("#precioCompra").val()).trim();
        let precioVenta = String($("#precioVenta").val()).trim();
        let stockMinimo = String($("#stockMinimo").val()).trim();
        let stockReal = String($("#stockReal").val()).trim();

        tipoProducto.replaceAll("'", '"');
        nombre.replaceAll("'", '"');
        codigo.replaceAll("'", '"');
        descripcion.replaceAll("'", '"');
        precioCompra.replaceAll("'", '"');
        precioVenta.replaceAll("'", '"');
        stockMinimo.replaceAll("'", '"');
        stockReal.replaceAll("'", '"');

        preloader.show();
        $.ajax({
            method: "POST",
            dataType: "JSON",
            url: "./views/inventario/actualizaProducto.php",
            data: { descripcion, precioCompra, precioVenta, stockMinimo, stockReal, ID },
        })
            .done(function (results) {
                let success = results.success;
                let result = results.result;
                switch (success) {
                    case true:
                        $("#modalTemplate").modal("hide");
                        $("#btnClose").off("click");
                        msj.show("Aviso", "Actualizado correctamente", [{ text1: "OK" }]);
                        obtenerInventario();
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

function eliminarProdcuto(ID) {
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
                url: "./views/inventario/eliminarProdcuto.php",
                data: { ID },
            })
                .done(function (results) {
                    let success = results.success;
                    let result = results.result;
                    switch (success) {
                        case true:
                            $("#modalTemplate").modal("hide");
                            $("#btnClose").off("click");
                            obtenerInventario();
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
