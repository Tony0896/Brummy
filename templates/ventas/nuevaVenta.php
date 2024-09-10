<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);
// session_start();
?>
<style>
    .card{
        box-shadow: none;
        background-color: transparent;
    }
    th{
        background-color: #009071 !important;
        color: #fff;
    }
    .card .card-body {
        padding: 1rem;
    }

    input:disabled {
        background: #eaeaea !important
    }
</style>
<script type="text/javascript" src="./functions/ventas/nuevaVenta.js"></script>
    <div class="row" style="margin-bottom: 0.7em;">
        <div class="col-md-12 mb-2" style="display: flex;align-items: center;">
            <p class="backButton" onclick="regresaVentas()"><span class='material-icons'>arrow_back_ios_new</span> <span>REGRESAR</span> </p>
        </div>
    </div>
    
    <div class="forms-sample">
        <div class="card2 mb-2">
            <div class="card-body">
                <h4 class="card-title">Nueva Venta</h4>
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div class="coolinput">
                                <label for="clientes" class="text">Cliente</label>
                                <select class="input capitalize obligatorio" name="Cliente" id="clientes" style="background-color: rgb(255, 255, 255);width:100%;">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-2">
                        <div class="cointainer-info">
                            <div class="coolinput">
                                <label for="productos" class="text">Productos/Servicios:</label>
                                <select class="input capitalize obligatorio" name="Productos" id="productos" style="background-color: rgb(255, 255, 255);width:100%;" onchange="confirmarAgregarProducto()">
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card2 mb-2">
            <div class="card-body">
                <h4 class="card-title">Carrito</h4>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <div class="master-container">
                            <div class="cart">
                                <div class="products">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card2 mb-2">
            <div class="card-body">
                <h4 class="card-title">Cerrar venta</h4>
                <div class="row">
                    <div class="col-md-12 mb-2">
                        <div class="checkout">
                            <div class="details">
                                <span>Subtotal:</span>
                                <span id="totalSubtotal">$0.00</span>
                                <input type="hidden" id="subTotalText">
                            </div>
                            <hr>
                            <div class="details">
                                <span>Descuentos de productos:</span>
                                <span id="totalDescuentos">$0.00</span>
                                <input type="hidden" id="totalDescuentosText">
                            </div>
                            <hr>
                            <div class="checkout--footer">
                                <label class="price" id="priceTotal_text"><sup>$</sup>0.00</label>
                                <input type="hidden" id="priceTotal" value="0">
                            </div>
                            <div class="checkout--footer">
                                <div class="buttom-green buttom" onclick="terminarVenta()">
                                    <span class="text-sm mb-0" >Terminar Venta <i class="material-icons"> payments </i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php 
    require_once('./../components/modal.php');
?>