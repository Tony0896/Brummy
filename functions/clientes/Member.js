$(document).ready(function () {
    preloader.hide();

    let nameCredential = localStorage.getItem("nombre") + " " + localStorage.getItem("apellidoP") + " " + localStorage.getItem("apellidoM");
    let claveCredential = `BRUHPSCTE${localStorage.getItem("IDCte")}`;
    let emergenciaCredential = localStorage.getItem("telefono");
    let correo = localStorage.getItem("correo");

    $("#nameCredential").html(nameCredential);
    $("#nameCredential1").html(nameCredential);
    $("#claveCredential").html(claveCredential);
    $("#claveCredential1").html(claveCredential);
    $("#correoCrendential").html(correo ? correo : "&nbsp;");
    $("#nssCredential").html(correo ? correo : "&nbsp;");
    $("#emergenciaCredential").html(emergenciaCredential ? emergenciaCredential : "&nbsp;");
    $("#telefonoCrendential1").html(emergenciaCredential ? emergenciaCredential : "&nbsp;");

    $("#nameVete").html(localStorage.getItem("nameVete"));
    $("#nameVete0").html(localStorage.getItem("nameVete"));

    $("#telcredentialvete").html(localStorage.getItem("telcredentialvete") ? localStorage.getItem("telcredentialvete") : "&nbsp;");
    $("#telcredentialvete0").html(localStorage.getItem("telcredentialvete") ? localStorage.getItem("telcredentialvete") : "&nbsp;");

    $("#horario1credential").html(localStorage.getItem("horario1credential") ? localStorage.getItem("horario1credential") : "&nbsp;");
    $("#horario1credential0").html(localStorage.getItem("horario1credential") ? localStorage.getItem("horario1credential") : "&nbsp;");
    $("#horario2credential").html(localStorage.getItem("horario2credential") ? localStorage.getItem("horario2credential") : "&nbsp;");
    $("#horario2credential0").html(localStorage.getItem("horario2credential") ? localStorage.getItem("horario2credential") : "&nbsp;");
    $("#horario3credential").html(localStorage.getItem("horario3credential") ? localStorage.getItem("horario3credential") : "&nbsp;");
    $("#horario3credential0").html(localStorage.getItem("horario3credential") ? localStorage.getItem("horario3credential") : "&nbsp;");

    $("#Direccion1credential").html(localStorage.getItem("Direccion1credential") ? localStorage.getItem("Direccion1credential") : "&nbsp;");
    $("#Direccion1credential0").html(localStorage.getItem("Direccion1credential") ? localStorage.getItem("Direccion1credential") : "&nbsp;");

    $("#Direccion1credentia2").html(localStorage.getItem("Direccion1credentia2") ? localStorage.getItem("Direccion1credentia2") : "&nbsp;");
    $("#Direccion1credentia20").html(localStorage.getItem("Direccion1credentia2") ? localStorage.getItem("Direccion1credentia2") : "&nbsp;");

    new QRious({
        element: document.querySelector("#qrCredential"),
        value: claveCredential, // La URL o el texto
        size: 70,
        backgroundAlpha: 0, // 0 para fondo transparente
        foreground: "#000", // Color del QR
        level: "Q", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
    });

    new QRious({
        element: document.querySelector("#qrCredential1"),
        value: claveCredential, // La URL o el texto
        size: 70,
        backgroundAlpha: 0, // 0 para fondo transparente
        foreground: "#000", // Color del QR
        level: "Q", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
    });
});

$("#crearpdf").click(() => {
    $("#fotoCuts").attr("src") ? window.print() : Swal.fire({ icon: "warning", title: "Opps..", text: "La membresía aún no tiene una foto." });
});

function backRoute() {
    $("#people_menu").trigger("click");
}

$("#fileInputs").on("change", function () {
    $("#image").attr("src", "");
    if (this.files && this.files[0]) {
        if (this.files[0].type.match(/^image\//)) {
            var selectedFile = this.files[0];
            var reader = new FileReader();
            var imgtag = document.getElementById("image");
            reader.onload = function (event) {
                imgtag.src = event.target.result;
            };
            reader.readAsDataURL(selectedFile);
            $("#modal").modal({
                backdrop: "static",
                keyboard: false,
            });
            $("#modal").modal("show");
        }
    }
});

var image = document.getElementById("image");
var data = document.querySelector("#data");
var cropBoxData = document.querySelector("#cropBoxData");
var button = document.getElementById("buttonCut");
var result = document.getElementById("result");
var minAspectRatio = 1.0;
var maxAspectRatio = 1.0;
var canvasData;
var cropper;

$("#modal").on("shown.bs.modal", function () {
    var cropper = new Cropper(image, {
        dragMode: "move",
        aspectRatio: 1 / 1.2, // 16:9 || 1.1
        autoCropArea: 0.65,
        restore: false,
        guides: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: false,
        toggleDragModeOnDblclick: false,
    });

    button.onclick = function () {
        $("#result").html(cropper.getCroppedCanvas());
        cropper.destroy();
        $("#fileInputs").val("");
        $("#modal").modal("hide");
        $("#modal").data("bs.modal", null);
        var can = document.getElementsByTagName("canvas");
        var src = can[0].toDataURL("image/png");
        $("#fotoCuts").attr("src", src);
        $("#fotoCuts1").attr("src", src);
    };

    $(".close_modal").click(() => {
        cropper.destroy();
        $("#fileInputs").val("");
        $("#modal").modal("hide");
        $("#modal").data("bs.modal", null);
    });
});
