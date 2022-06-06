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

    Borrar() {
        this.cvalorActual = this.cvalorActual.toString().slice(0,-1);
        this.MostrarValores();

    }
    BorrarTodo(){
        this.cvalorActual = '';
        this.cvalorAnterior = '';
        this.tipoOperacion = undefined;
        this.MostrarValores();
    }
    Operacion(tipo){
        this.tipoOperacion !== 'igual' && this.Calcular();
        this.tipoOperacion = tipo;
        this.cvalorAnterior = this.cvalorActual || this.cvalorAnterior;

       

        //console.log(`${this.cvalorAnterior} ${this.signos[this.tipoOperacion] || ''}`);
        this.cvalorActual = '';
        this.MostrarValores();

    }

    AgregarNumero(cNumero) {
        if (cNumero === '.' && this.cvalorActual.includes('.')) return
        this.cvalorActual = this.cvalorActual.toString() + cNumero.toString();
        
        this.MostrarValores();
    }

    MostrarValores(){
        this.displayValorActual.textContent = this.cvalorActual;
        this.displayValorAnterior.textContent = `${this.cvalorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
        
        //console.log( `${this.cvalorAnterior} ${this.signos[this.tipoOperacion] || ''} ${this.cvalorActual}`);
      // console.log(this.displayValorAnterior.textContent);

    }

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
        LlenarLista(nVAnterior,this.signos[this.tipoOperacion],nVActual,`${'='} ${this.cvalorActual}`);
       //this.History = Historial();
        //console.log(getHistorial());
        //console.log(oHistorial);
        //miHistorial.push(oHistorial)
       
        
    }

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
function LlenarLista(numero1,operacion,numero2,resultado){
    var oHistorial = {
        Num1 : numero1,
        Operacion: operacion,
        Num2 : numero2,
        Resultado: resultado

    };
    miHistorial.push(oHistorial);
    AddLocalStorage(miHistorial);
    //console.log(oHistorial);
}
function AddLocalStorage(oLista) {
    localStorage.setItem('Historial',JSON.stringify(oLista));
}
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

