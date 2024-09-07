<?php $data = $_GET['data']; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="images/png" href="./../../images/cuadrado_sin_fondo.png" />

        <title>Encuesta de Satisfacción | Happy Pets</title>
        <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700" rel="stylesheet" />
        <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
            integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
            crossorigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <style>
            .FWM-input {
                padding-left: 10px !important;
                border: 1px solid gray !important;
                border-radius: 8px;
                outline: 0;
                display: block;
                padding: 0;
                margin: 0;
                background: 0 0;
                height: 35px;
                font-size: 18px;
                width: 100%;
                margin-bottom: 15px;
            }

            .span {
                margin-top: 15px;
                height: auto;
                line-height: 22px;
                margin-bottom: 3px;
                text-align: left;
                display: block;
                width: 100%;
                border: 0;
                font-size: 1.2em;
                color: #717d7e;
            }

            .datos-cliente {
                background-color: #009071;
            }

            .send {
                background-color: #009071;
            }

            .body-cisa{
                height: 100%;
                background-image: url(./../../images/300_ppp_oscuro.png);
                background-position: center center;
                background-repeat: no-repeat;
                background-attachment: fixed;
                background-size: cover;
                background-color: #009071;
            }
        </style>
    </head>

    <body class="body-cisa">
        <div class="card" style="margin-top: 25px">
            <div class="card-preloader">
                <div class="loader">
                    <div class="white_circle"></div>
                </div>
            </div>

            <div class="card-exist" style="display: none">

                <h2 class="title">Encuesta realizada</h2>

                <div class="leyenda">
                    <p>La evaluación ya fue <b>realizada</b>.</p>

                    <p>Gracias por su tiempo.</p>
                </div>
            </div>

            <div class="card-sended" style="display: none">
                <h2 class="title">Encuesta enviada</h2>

                <div class="leyenda">
                    <p>La evaluación ya fue <b>enviada</b>.</p>

                    <p>Gracias por su tiempo.</p>
                </div>
            </div>

            <div class="card-content" style="display: none">
                <div class="card-header">
                    <img src="./../../images/happy.png" style="width: 60px" />
                </div>

                <div class="card-body" id="datos_form">

                    <div class="datos-cliente" style="border-radius: 5px; width: 99%; margin: auto">
                        <h4 style="padding-left: 10px; padding-right: 10px">Encuesta de satisfacción</h4>
                    </div>

                    <div style="width: 90%; margin: auto" id="div_preguntas">


                    </div>

                    <div style="width: 90%; margin: auto">
                        <span class="span FWM-span-form">¿En general que calificación le darias al servicio?:</span>
                        <input type="hidden" id="valorEncuesta" value="0">
                        <div class="rating">
                            <input type="radio" id="star5" name="rating" value="5" onchange="pintaValorEncuesta(this.value)">
                            <label for="star5"></label>
                            <input type="radio" id="star4" name="rating" value="4" onchange="pintaValorEncuesta(this.value)">
                            <label for="star4"></label>
                            <input type="radio" id="star3" name="rating" value="3" onchange="pintaValorEncuesta(this.value)">
                            <label for="star3"></label>
                            <input type="radio" id="star2" name="rating" value="2" onchange="pintaValorEncuesta(this.value)">
                            <label for="star2"></label>
                            <input type="radio" id="star1" name="rating" value="1" onchange="pintaValorEncuesta(this.value)">
                            <label for="star1"></label>
                        </div>

                        <span class="span FWM-span-form">¿Tienes algún comentario, pregunta o sugerencia?:</span>

                        <textarea
                            class="FWM-input obligatorio"
                            style="font-family: 'ITC Avant Garde Gothic', sans-serif; height: 105px; padding-top: 11px"
                            id="comentario_sugerencia"
                            name="¿Tienes algún comentario, pregunta o sugerencia?"
                            cols="30"
                            rows="10"
                        ></textarea>

                        <input type="hidden" id="id_visita" />
                    </div>

                    <!-- <div style="width: 100%" id="mapa"></div> -->

                    <div class="leyenda">
                        <p>Muchas gracias por su valiosa opinión.</p>
                    </div>
                </div>

                <div class="card-footer">
                    <div class="col vr">
                        <button class="send" onclick="sendEncuesta()">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
        <input type="hidden" id="IDCita">
        <footer>
            <table style="width: 100%; margin-top: 50px">
                <tbody>
                    <tr>
                        <td colspan="6" style="color: white; text-align: center"> © 2024 Todos los Derechos Reservados.</td>
                    </tr>

                    <tr>
                        <td colspan="6" style="text-align: center"><img src="./../../images/lsrge2.png" width="100px" /></td>
                    </tr>
                </tbody>
            </table>
        </footer>

        <script src="js/jquery-3.6.0.js"></script>

        <script>
            $(document).ready(() => {
                let data = "<?=$data;?>";
                // window.btoa('data#-1') => ZGF0YSMtMQ==
                // let data = 'ZGF0YSMtMQ==';
                const decode = window.atob(data);
                let datos = decode.split("#-");
                let ID = datos[1];

                if(ID){
                    $("#IDCita").val(ID)
                    $.ajax({
                        method: "POST",
                        dataType: "JSON",
                        url: "./../../views/encuestas/validaEncuesta.php",
                        data: {ID},
                    })
                        .done(function (results) {
                            let success = results.success;
                            let result = results.result;
                            let html = "";
                            switch (success) {
                                case true:
                                    if (result == "Sin Datos") {
                                        $(".card-preloader").css("display", "none");
                                        $(".card-content").css("display", "block");
                                        $.ajax({
                                            method: "POST",
                                            dataType: "JSON",
                                            url: "./../../views/encuestas/obtenerEncuestas.php",
                                            data: {},
                                        })
                                            .done(function (results) {
                                                let success = results.success;
                                                let result = results.result;
                                                let html = "";
                                                switch (success) {
                                                    case true:
                                                        if (result == "Sin Datos") {
                                                        } else {
                                                            let html = '';
                                                            result.forEach((data, index) => {
                                                                if(data.tipoPregunta == 1){
                                                                    html += `<span class="span FWM-span-form">${data.Pregunta}:</span>
                                                                    <select class="FWM-input obligatorio" name="Distrubución" id="pregunta_${data.ID}">
                                                                        <option value="0" selected>Selecciona una opción</option>
                                                                        <option value="1">Necesita mejorar</option>
                                                                        <option value="2">Normal</option>
                                                                        <option value="3">Satisfactoria</option>
                                                                        <option value="4">Buena</option>
                                                                        <option value="5">Exelente</option>
                                                                    </select>`;
                                                                } else if( data.tipoPregunta == 2) {
                                                                    html += `<span class="span FWM-span-form">${data.Pregunta}:</span>
                                                                    <textarea
                                                                        class="FWM-input obligatorio"
                                                                        style="font-family: 'ITC Avant Garde Gothic', sans-serif; height: 105px; padding-top: 11px"
                                                                        id="pregunta_${data.ID}"
                                                                        name="¿Tienes algún comentario, pregunta o sugerencia?"
                                                                        cols="30"
                                                                        rows="10"
                                                                    ></textarea>`;
                                                                }
                                                                $("#div_preguntas").html(html)
                                                            });
                                                        }
                                                        break;
                                                    case false:
                                                        
                                                        break;
                                                }
                                            })
                                            .fail(function (jqXHR, textStatus, errorThrown) {
                                                console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                                            });
                                    } else {
                                        $(".card-preloader").css("display", "none");
                                        $(".card-exist").css("display", "block");
                                    }
                                    break;
                                case false:
                                    
                                    break;
                            }
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                        });
                    } else {
                        $(".card-preloader").css("display", "none");
                        $(".card-exist").css("display", "block");
                    }
                });

            function sendEncuesta() {
                let values = get_datos_completos();
                let quita_coma = values.response;
                let valido = values.valido;
                if (valido) {
                    let valorEncuesta = $("#valorEncuesta").val()
                    if(valorEncuesta == 0){
                        swal("Evaluacion incompleta.", "Debes contestar toda la encuesta", "warning");
                        return false
                    }

                    let campos = "";
                    let trae_los_campos_sin_llennar = "";
                    let valores = [];
                    let ids = [];
                    
                    campos = document.querySelectorAll("#datos_form .obligatorio");
                    let valido = true;
                    [].slice.call(campos).forEach(function (campo) {
                        ids = [...ids, $(campo).attr("id")];
                        valores = [...valores, $('#'+$(campo).attr("id")).val()]
                    });

                    let IDCita = $("#IDCita").val();
                    let comentario_sugerencia = $("#comentario_sugerencia").val()

                    $.ajax({
                        method: "POST",
                        dataType: "JSON",
                        url: "./../../views/encuestas/guardarEncuesta.php",
                        data: {IDCita, valorEncuesta, ids, valores, comentario_sugerencia},
                    })
                        .done(function (results) {
                            let success = results.success;
                            let result = results.result;
                            let html = "";
                            switch (success) {
                                case true:
                                    swal("Registro completo.", "Su evaluación fue enviada exitosamente.", "success");
                                    $(".card-content").css("display", "none");
                                    $(".card-sended").css("display", "block");
                                    break;
                                case false:
                                    
                                    break;
                            }
                        })
                        .fail(function (jqXHR, textStatus, errorThrown) {
                            console.log("error: " + jqXHR.responseText + "\nEstatus: " + textStatus + "\nError: " + errorThrown);
                        });

                } else {
                    swal("Evaluacion incompleta.", "Debes contestar toda la encuesta", "warning");
                }
            }

            function get_datos_completos() {
                let campos = "";
                let ids = "";
                let trae_los_campos_sin_llennar = "";
                campos = document.querySelectorAll("#datos_form .obligatorio");
                let valido = true;
                [].slice.call(campos).forEach(function (campo) {
                    if ($(campo).get(0).tagName == "SELECT") {
                        if (campo.value.trim() == 0) {
                            valido = false;
                            trae_los_campos_sin_llennar = trae_los_campos_sin_llennar + ", " + $(campo).attr("name");
                        }
                    } else if ($(campo).get(0).tagName == "TEXTAREA") {
                        if (campo.value.trim() === "") {
                            valido = false;
                            trae_los_campos_sin_llennar = trae_los_campos_sin_llennar + ", " + $(campo).attr("name");
                        }
                    } else {
                        if (campo.value.trim() === "") {
                            valido = false;
                            trae_los_campos_sin_llennar = trae_los_campos_sin_llennar + ", " + $(campo).attr("name");
                        }
                    }
                });

                if (valido) {
                    [].slice.call(campos).forEach(function (campo) {
                        ids = ids + ", " + $(campo).attr("id");
                    });
                    const str = ids;
                    const quita_coma = str.slice(1);
                    return {
                        valido: valido,
                        reponse: 1,
                    };
                } else {
                    const str = trae_los_campos_sin_llennar;
                    const quita_coma = str.slice(1);
                    return {
                        valido: valido,
                        response: quita_coma,
                    };
                }
            }

            function pintaValorEncuesta(val){
                $("#valorEncuesta").val(val)
            }
        </script>
    </body>
</html>
