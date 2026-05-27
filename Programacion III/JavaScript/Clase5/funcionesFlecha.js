function miFuncion() {
    console.log("Saludos desde mi función");
}

miFuncion();

let myFuncion = function(){
    console.log("Saludos desde mi función anonima");
}

// Ahora vamos a crear una función flecha
let miFuncionFlecha = () => {
    console.log("Saludos desde mi función flecha");
}

// Cuando trabajamos con funciones flecha, no se aplica el concepto de hoisting,
// por lo que no podemos llamar a la función antes de su declaración, como si se 
// puede hacer con las funciones tradicionales. Por eso, si intentamos llamar a 
// miFuncionFlecha() antes de su declaración, obtendremos un error de referencia.

// Hay mas variantes para funciones flecha que vamos a ir viendo
miFuncionFlecha();

// Lo hacemos en una sola linea

const saludar = () => console.log("Saludos desde mi función flecha en una sola linea");

saludar();

const saludar2 = ()=>{
    return "Saludos desde mi función flecha 2";
}

console.log(saludar2());

const saludar3 = () => "Saludos desde mi función flecha 3";

console.log(saludar3());

// Continuamos con otro ejemplo

const regresaObjeto = () => ({nombre: "Juan", apellido: "Lara"});

console.log(regresaObjeto());

// Funciones flecha que reciben parámetros
const funcionParametros = (mensaje) => console.log(mensaje);

funcionParametros("Saludos desde mi función flecha con parámetros");

// Una funcion clasica con parámetros
const funcionParametrosClasica = function(mensaje) {
    console.log(mensaje);
};

funcionParametrosClasica("Saludos desde mi función clasica con parámetros");

// Se pueden omitir los paréntesis si solo hay un parámetro
const funcionConParametros = mensaje => console.log(mensaje);

funcionConParametros("Otra forma de trabajar con funciones flecha con parámetros");

// Ahora vemos funciones flecha con más de un parámetro
// Podemos abrir la funcion y tener mas cosas dentro de ella
const funcionConParametros2 = (op1, op2) =>{ 
  let resultado = op1 + op2;
  return resultado;
}

console.log(funcionConParametros2(5, 3));