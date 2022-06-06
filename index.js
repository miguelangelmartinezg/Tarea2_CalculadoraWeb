const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorAtual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
var Tabla = [];

const display = new Display(displayValorAtual,displayValorAnterior);

botonesNumeros.forEach(boton =>{ boton.addEventListener('click', () => display.AgregarNumero(boton.innerHTML));

});

botonesOperadores.forEach(boton =>{
    boton.addEventListener('click', () => display.Operacion(boton.value))

});
