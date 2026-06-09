// variables 
let TAMANIO = 8;
let tablero = [];
let recorrido = [];

// constantes de movimientos que tiene una pieza de caballo en el tablero
const movimientosX = [2,1,-1,-2,-2,-1,1,2];
const movimientosY = [1,2,2,1,-1,-2,-2,-1];

// creacion de tablero, el -1 es para indicar que la casilla esta vacia y no paso el caballo por ahi
function crearTablero(){
    tablero = [];
    for(let i = 0; i < TAMANIO; i++){
        let fila = [];
        for(let j = 0; j < TAMANIO; j++){
            fila.push(-1);
        }
        tablero.push(fila);
    }
}

// se verifica que esta dentro de las coordenadas, que no se supera la longitud del tablero y que el casilla esta vacio
function movimientoValido(x,y){
    return (
        x >= 0 &&
        y >= 0 &&
        x < TAMANIO &&
        y < TAMANIO &&
        tablero[x][y] === -1
    );

}

// funcion recursiva
function resolverCaballo(x,y,salto){
    // si el salto es igual al tamanio de la longitud entonces ya piso todas las casillas la pieza
    if(salto === TAMANIO * TAMANIO){
        return true;
    }
    // evaluamos los 8 movimientos del caballo
    for(let i = 0; i < 8; i++){
        let nuevoX = x + movimientosX[i];
        let nuevoY = y + movimientosY[i];
        if(movimientoValido(nuevoX,nuevoY)){
            tablero[nuevoX][nuevoY] = salto;
            if(resolverCaballo(nuevoX,nuevoY,salto + 1)){
                return true;
            }
            // si el movimiento no es valido dejamos la casilla en -1
            tablero[nuevoX][nuevoY] = -1;
        }
    }
    return false;
}

// esto crea el tablero y los movimientos, en la linea 59 se limpia el tablero cada vez que ejecutamos 
function crearHTMLTablero(){
    const contenedor = document.getElementById("tablero");
    contenedor.innerHTML = "";
    contenedor.style.gridTemplateColumns = `repeat(${TAMANIO},60px)`;

    for(let i = 0; i < TAMANIO; i++){
        for(let j = 0; j < TAMANIO; j++){
            const casilla = document.createElement("div");
            casilla.classList.add("casilla");
            if((i + j) % 2 === 0){
                casilla.classList.add("blanca");
            }
            else{
                casilla.classList.add("negra");
            }
            casilla.id = `c-${i}-${j}`;
            contenedor.appendChild(casilla);
        }
    }
}


// Transformamos la matriz del tablero en una lista ordenada cronológicamente para facilitar la animación
function guardarRecorrido(){
    // Vaciamos el array para asegurarnos de que empiece limpio
    recorrido = [];
    
    // Buscamos los pasos en orden, desde el 0 hasta el último movimiento posible
    for(let paso = 0; paso < TAMANIO * TAMANIO; paso++){
        for(let i = 0; i < TAMANIO; i++){
            for(let j = 0; j < TAMANIO; j++){
                // Si encontramos la casilla que coincide con el número de paso actual...
                if(tablero[i][j] === paso){
                    // creamos un objeto con sus coordenadas y lo guardamos en la lista
                    recorrido.push({x:i, y:j, paso:paso});
                }
            }
        }
    }
}

// Dibujamos en pantalla el estado del tablero
function mostrarPaso(indice){
    const info = document.getElementById("info");
    
    // Limpiamos la clase 'caballo' de todas las casillas para quitar el indicador de posición anterior
    document.querySelectorAll(".casilla").forEach(c => {
        c.classList.remove("caballo");
    });

    // Pintamos los números de todos los pasos que el caballo ya recorrió hasta este momento
    for(let i = 0; i <= indice; i++){
        const movimiento = recorrido[i];
        const casilla = document.getElementById(`c-${movimiento.x}-${movimiento.y}`);
        casilla.textContent = movimiento.paso;
    }

    // Buscamos cuál es el movimiento actual del caballo en este índice
    const actual = recorrido[indice];
    const casillaActual = document.getElementById(`c-${actual.x}-${actual.y}`);
    
    // Le agregamos la clase CSS para resaltar visualmente dónde está parado el caballo ahora mismo
    casillaActual.classList.add("caballo");
    
    // Actualizamos el texto informativo con el número de movimiento en el que estamos
    info.textContent = `Movimiento: ${indice}`;
}

function animarRecorrido(){
    let indice = 0;
    
    // Mostramos el paso inicial 
    mostrarPaso(0);
    
    // Creamos un temporizador para que ejecute el código de adentro cada 300 milisegundos
    const intervalo = setInterval(() => {
        indice++;         
        // Si ya mostramos todos los movimientos guardados en el recorrido
        if(indice >= recorrido.length){
            clearInterval(intervalo); 
            return;
        }
        // Si todavía quedan pasos, actualizamos el tablero visual con el índice actual
        mostrarPaso(indice);
    }, 300);
}

function iniciar(){
    TAMANIO =parseInt(document.getElementById("tamano").value);
    crearTablero();
    tablero[0][0] = 0;
    crearHTMLTablero();
    const solucion = resolverCaballo(0, 0, 1);
    if(!solucion){
        alert("No existe solución para este tamaño");
        return;
    }
    guardarRecorrido();
    animarRecorrido();
}

document.getElementById("btnResolver").addEventListener("click",iniciar);