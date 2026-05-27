function mifuncion1(){
    console.log("funcion 1");
}

function mifuncion2(){
    console.log("funcion 2");
}

mifuncion1();
mifuncion2();

// funcion de tipo callback
let imp = function imprimir(mensaje){
    console.log(mensaje);
}

function sumar(op1, op2, funcionCallback){
    let res = op1 + op2;
    funcionCallback(`Resultado: ${res}`);
}

sumar(5, 3, imp);

//llamadas asimcronas con uso setTimeout
function miFuncionCallback(){
    console.log("Saludo asincrono despues de 3 segundos");
}

setTimeout(() => {
    miFuncionCallback();
}, 5000);

setTimeout(function(){console.log("Saludo asincrono2")}, 3000);

setTimeout(() => console.log("Saludos asincrono 3"), 4000);

let reloj = () => {
    let fecha = new Date();
    console.log(`${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`);
}

setInterval(reloj, 1000);