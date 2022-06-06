class Display {
  

    constructor(displayValorActual,displayValorAnterior) {
        this.displayValorActual = displayValorActual;
        this.displayValorAnterior = displayValorAnterior;
        this.calculador = new Calculadora();
        this.tipoOperacion = undefined;
        this.cvalorActual = '';
        this.cvalorAnterior = '';
       this.History = [];
        this.signos = {
            sumar: '+',
            dividir: '÷',
            multiplicar: 'x',
            restar: '-',
        }


    }

    //Metodo que se ejecuta al Clickear (<--)
    Borrar() {
        this.cvalorActual = this.cvalorActual.toString().slice(0,-1);
        this.MostrarValores();

    }
    //Metodo que se ejecuta al clickear el boton Borrar (C)
    BorrarTodo(){
        this.cvalorActual = '';
        this.cvalorAnterior = '';
        this.tipoOperacion = undefined;
        this.MostrarValores();
    }
    //Metodo que se ejecuta segun la operacion del boton Clickeado
    Operacion(tipo){
        this.tipoOperacion !== 'igual' && this.Calcular();
        this.tipoOperacion = tipo;
        this.cvalorAnterior = this.cvalorActual || this.cvalorAnterior;
        this.cvalorActual = '';
        this.MostrarValores();

    }

    //Metodo que agrega el numero correspondiente al bonton que fue Clickeado
    AgregarNumero(cNumero) {
        if (cNumero === '.' && this.cvalorActual.includes('.')) return
        this.cvalorActual = this.cvalorActual.toString() + cNumero.toString();
        
        this.MostrarValores();
    }

    //Metodo que Muestra los Valores en mi Display.
    MostrarValores(){
        this.displayValorActual.textContent = this.cvalorActual;
        this.displayValorAnterior.textContent = `${this.cvalorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
      

    }

    //Metodo que hace los calculos segun el tipo de Operacion
    Calcular(){
        const nVAnterior = parseFloat(this.cvalorAnterior);
        const nVActual = parseFloat(this.cvalorActual);
       

        if (isNaN(nVActual) || isNaN(nVAnterior)) return
        this.cvalorActual = this.calculador[this.tipoOperacion](nVAnterior,nVActual);
        var oHistorial = {
            Num1 : nVAnterior,
            Operacion: this.signos[this.tipoOperacion],
            Num2 : nVActual,
            Resultado: `${'='} ${this.cvalorActual}`

        };
        //Le paso a la lista cada calculo que se haga, para luego pasarlo al LocalStorage.
        LlenarLista(nVAnterior,this.signos[this.tipoOperacion],nVActual,`${'='} ${this.cvalorActual}`);
       
    }

    //Metodo que se Ejecuta cada vez que el usuario preciona el Boton Hist.
    Historial(){
        let oHistorial = getHistorial();
        for (let index = 0; index < oHistorial.length; index++) {
            console.log(oHistorial[index].Num2);
            this.displayValorAnterior.textContent = `${oHistorial[index].Num1} ${oHistorial[index].Operacion} ${oHistorial[index].Num2}`;
            this.displayValorActual.textContent = oHistorial[index].Resultado;
           
            
        }
        
    }

}
var miHistorial = [];
//Creo y lleno un Array  para pasrlo como parametro al metodo que donde hago el setItem del localStorage.
function LlenarLista(numero1,operacion,numero2,resultado){
    var oHistorial = {
        Num1 : numero1,
        Operacion: operacion,
        Num2 : numero2,
        Resultado: resultado

    };
    miHistorial.push(oHistorial);
    //Le paso como parametro la lista recien creada
    AddLocalStorage(miHistorial);
    
}
//Funcion donde Paso mi Objeto lista al LocalStorage.
function AddLocalStorage(oLista) {
    localStorage.setItem('Historial',JSON.stringify(oLista));
}
//Funcion con la que leo los items que tengo en el localStorage.
function getHistorial() {
    var oLocalStorage = localStorage.getItem('Historial');
    if (oLocalStorage == null) {
        miHistorial = [];
    }
    else
    {
        miHistorial = JSON.parse(oLocalStorage);
    }
    return miHistorial;
}

