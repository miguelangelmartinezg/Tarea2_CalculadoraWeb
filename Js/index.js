const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorAtual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
var Tabla = [];

const display = new Display(displayValorAtual,displayValorAnterior);

//Detecto el evento Click y le paso como parametro a la instancia de la clase Display el valor del Boton Clickeado.
botonesNumeros.forEach(boton =>{ boton.addEventListener('click', () => display.AgregarNumero(boton.innerHTML));

});
//Detecto el evento Click y le paso como parametro a la instancia de la clase Display el valor del Boton Clickeado.
// en este caso que tipo de operacion se va a realizar.
botonesOperadores.forEach(boton =>{
    boton.addEventListener('click', () => display.Operacion(boton.value))

});
