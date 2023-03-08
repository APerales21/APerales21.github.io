window.addEventListener("load", comenzar, false);
// 2 crear funcion de comineso que llama al evento addaddEventListener para clic en el boton 

function comenzar() {
    var bttn = document.getElementById("bt_ubccn"); //nombre del button 
    bttn.addEventListener("click", obtener, false); //indicar btton este en espera del clic
}

function obtener() {
    //obtener posision del metodo visto de getCurrentPosition
    // tiene varios atributos pero el obligatorio es la posicion 
    navigator.geolocation.getCurrentPosition(mostrar_posicion, trtr_error);

    // siempre y cuando la localizacion tenga exito y llamara a mostrar posicion

}

function trtr_error(error) {
   // alert("Ocurrio un error" + " " + error.code + " " + error.message);
    if (error.code == 1) {
        alert("Error, tines bloqueada la geolocalizacion en tu navegador");
    }

    if (error.code == 2) {
        alert("Error, ubicacion no disponible en este momento");
    }

    if (error.code == 3) {
        alert("Error, tiempo de espera de ubicacion excedido");
    }



}

function mostrar_posicion(posicion) { // parametro que devuelve el getCurrentPosition
    var ubicacion = document.getElementById("ubicacion");
    //var latitud = "Latitud: " + posicion.coords.latitude + "<br>";
    var ubicacion_real = " ";
    ubicacion_real += "Latitud: " + posicion.coords.latitude + "<br>";
    ubicacion_real += "Longitud: " + posicion.coords.longitude + "<br>";
    ubicacion_real += "Exactitud: " + posicion.coords.accuracy; //margen de error en metros 
    ubicacion.innerHTML = ubicacion_real;

}