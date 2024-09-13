<script type="text/javascript" src="./functions/clientes/Member.js"></script>
<div class="row no_print">
    <div class="col-lg-12">
        <h3 class="text-primary text-blue" onclick="backRoute()" style="width: fit-content;cursor: pointer;"><span class="fs-2 material-icons text-danger">arrow_back</span> Regresar </h3>
        <hr>
    </div>
</div>

<div class="row">
    <div class="col-sm-12 no_print" style="margin-bottom: 20px;margin-top: 10px;display: flex;">
        <div class="no_print">
            <h4 class="text-primary text-blue" id="title_curso"> Membresía </h4>
        </div>
    </div>
    <div class="col-sm-12 no_print" style="margin-bottom: 20px;margin-top: 10px;display: flex;">
        <div style="display:flex; align-items: center;">
            <div class="numbers buttom-blue buttom" style="margin:0; height: fit-content;margin-right: 15px;" id="crearpdf">
                <span class="text-sm mb-0 span_nowrap">Imprimir Membresía <i class="material-icons"> print </i></span>
            </div>
        </div>

        <div style="display:flex; align-items: center;">
            <label for="fileInputs">
                <div class="numbers buttom-green buttom" style="margin:0; height: fit-content;margin-right: 15px;">
                    <span class="text-sm mb-0 span_nowrap">Elegir Foto <i class="material-icons"> image </i></span>
                </div>
                <input type="file" accept=".png, .jpg, .jpeg" id="fileInputs" style="display:none;">
            </label>
        </div>

        <!-- <div id="div_archivo" class="numbers buttom-blue buttom" style="text-align: center;width: 300px;">
            <label for="fileInputs" class="btn btn-primary btn-file" id="fileInput" style="width:80%;">
                <i class="fs-5 material-icons" style="margin-right: 15px;vertical-align: text-bottom;">folder</i>
                Elegir Foto <input type="file" accept=".png, .jpg, .jpeg" id="fileInputs" style="display:none;">
            </label>
            
        </div> -->
    </div>
    <div class="row" id="pre_div_MemberPrint">
        <div class="col-md-3 no_print"></div>
        <div class="col-md-2 no_print nobreak"
                style="
                    text-align: center;
                    border-radius: 10px;
                    padding: 0;
                    background-image: URL('./images/frontbr4.png');
                    background-repeat: no-repeat !important;
                    background-attachment: scroll !important;
                    background-position: center center !important;
                    z-index: auto;
                    background-size: cover !important;
                    -webkit-background-size: cover !important;
                    -moz-background-size: cover !important;
                    -o-background-size: cover !important;
                    margin: 0;
                    padding-bottom: 7px;
                    width: 215px;
                    height: 360px;
                ">
            <div style="display:block" class="nobreak">
                <div style="margin-bottom: 10px;">
                    <img style="max-height: 115px;min-width: 98px;min-height: 115px;max-width: 98px;margin-top: 26px;margin-left: -1px;" src="" id="fotoCuts">
                </div>

                <div style="display: flex; flex-direction: column">
                    <span class="spanDataCredential" style="text-wrap: nowrap; color: #009071" id="claveCredential"> &nbsp; </span>
                    <span class="spanDataCredential" style="text-wrap: nowrap; color: #009071" id="nameCredential"> &nbsp; </span>
                    <span class="spanDataCredential" style="text-wrap: nowrap; color: #009071" id="emergenciaCredential"> &nbsp; </span>
                    <span class="spanDataCredential" style="text-wrap: nowrap; color: #009071" id="nssCredential"> &nbsp; </span>
                </div>
 
                <div style="display: flex;font-weight: bold;margin-top: 23px;">
                    <div style="width: 50%;display: flex;">
                        &nbsp;
                    </div>
                    <div style="width: 40%;display: flex;margin-top: 10px;">
                        <img style="max-height: 70px;margin: auto;" src="" id="qrCredential">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 no_print"></div>
        <div
                class="col-md-2 no_print nobreak"
                style="
                    text-align: center;
                    border-radius: 10px;
                    padding: 0;
                    background-image: URL('./images/backtbr.png');
                    background-repeat: no-repeat !important;
                    background-attachment: scroll !important;
                    background-position: center center !important;
                    z-index: auto;
                    background-size: cover !important;
                    -webkit-background-size: cover !important;
                    -moz-background-size: cover !important;
                    -o-background-size: cover !important;
                    margin: 0;
                    width: 215px;
                "
            >
                <div style="display: block" class="nobreak"></div>
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; flex-direction: column">
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap;margin-top: 13px;" id="nameVete0"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap">Teléfono de atención: </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap" id="telcredentialvete0"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap">Horarios de atención: </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap" id="horario1credential0"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap" id="horario2credential0"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialx" style="text-wrap: nowrap" id="horario3credential0"> &nbsp; </span>
                    </div>

                    <div style="display: flex;flex-direction: column;">
                        <span class="spanDataCredential spanDataCredentialxsm" style="text-wrap: nowrap" id="Direccion1credential0"> &nbsp; </span>
                        <span class="spanDataCredential spanDataCredentialxsm" style="text-wrap: nowrap" id="Direccion1credentia20"> &nbsp; </span>
                        <br />
                        <br />
                        <span class="spanDataCredential spanDataCredentialxsm" style="font-size: 6px;text-transform: none;font-style: italic;padding: 0px 15px 40px 15px;text-align: justify;"
                            > Esta membresía NO es una credencial oficial. El uso es exclusivo para la veterina suscrita. Happy pets y Brummy no se
                            hace responsable por el mal uso de esta membresía. El cliente al aceptar la membresía acepta los terminos y condiciones
                            publicados en: 
                            https://brummy.stth.com.mx/terminosycondiciones/</span
                        >
                    </div>
                </div>
            </div>
        <div class="col-md-3 no_print"></div>
    </div>
</div>
<button type="button" class="btn btn-primary" data-target="#modal" data-toggle="modal" data-backdrop="static" data-keyboard="false" href="#" id="modalpic" style="display:none;"></button>
<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Editar Foto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" class="close_modal" style="color: #08568C;">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="img-container">
                    <img id="image" src="./../../Brummy/images/default.png" alt="Picture" style="max-width: 100%;">
                </div>
                <div id="result" style="display: none;"></div>
            </div>
            <div class="modal-footer" style="justify-content: center;">
                <div style="display:flex; align-items: center;">
                    <div class="numbers buttom-blue buttom" style="margin:0; height: fit-content;margin-right: 15px;" id="buttonCut">
                        <span class="text-sm mb-0 span_nowrap">Cortar <i class="material-icons"> task_alt </i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="myModalImg" class="modal" style="background-color: #0000008c;">
    <div style="height: 100%;display: flex;">
        <img class="modal-contents" id="img01" style="width: 40%;margin: auto;border: solid #08568C; border-radius: 10px;">      
    </div>
</div>
