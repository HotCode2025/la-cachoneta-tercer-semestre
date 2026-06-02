var movimientos = [];
var pasoActual = 0;

// TU ALGORITMO RECURSIVO: guarda el paso en la lista
// 1. La firma de la función: Recibe la cantidad de discos actual y los "roles" de las torres.
function calcularHanoi(discos, origen, auxiliar, destino) {
  
  // 2. El Caso Base: Si queda un solo disco por mover, se corta la funcion.
  if (discos === 1) {
    
    // 3. Guarda en la lista que el disco 1 (el más chico) tiene que ir directo a la torre 'destino'.
    movimientos.push({ disco: 1, destino: destino });
    
    // 4. Corta la ejecución de esta llamada actual para volver a la anterior.
    return;
  }
  
  // 5. Paso A (Recursividad): Mueve la torre de arriba (N-1 discos) desde el origen hacia el auxiliar.
  // Para lograrlo, intercambia los roles: la torre 'destino' ahora pasa a ser el pasamanos 'auxiliar'.
  calcularHanoi(discos - 1, origen, destino, auxiliar);
  
  // 6. Paso B: Como el camino ya está despejado, guarda el movimiento del disco más grande hacia su 'destino' final.
  movimientos.push({ disco: discos, destino: destino });
  
  // 7. Paso C (Recursividad): Agarra la torre de discos chicos que habíamos dejado estacionada en el 'auxiliar' 
  // y la mueve arriba del disco grande en el 'destino', usando el 'origen' como apoyo temporal.
  calcularHanoi(discos - 1, auxiliar, origen, destino);
}

// Esta función dibuja los discos en la Torre A y calcula la solución
function iniciarJuego() {
  // Limpiamos las torres por si había un juego antes
  document.getElementById("A").innerHTML = "";
  document.getElementById("B").innerHTML = "";
  document.getElementById("C").innerHTML = "";

  // Limpiamos los movimientos viejos y el contador
  movimientos = [];
  pasoActual = 0;

  // Leemos cuántos discos quiere el usuario
  var totalDiscos = parseInt(document.getElementById("cantidadDiscos").value);

  // Creamos los discos de forma variable adentro de la Torre A
  // Va desde el más grande al más chico para que se apilen bien con el column-reverse de tu CSS
  for (var i = totalDiscos; i >= 1; i--) {
    var nuevoDisco = document.createElement("div");
    nuevoDisco.id = "disco" + i;

    // Le asignamos la clase general 'disco' y la clase de su tamaño 'd1', 'd2', etc.
    nuevoDisco.className = "disco d" + i;
    nuevoDisco.innerText = i;

    // Metemos el disco en la Torre A
    document.getElementById("A").appendChild(nuevoDisco);
  }

  // Ejecutamos la función para que calcule todos los pasos necesarios de forma automática
  calcularHanoi(totalDiscos, "A", "B", "C");
}

// Esta función corre cada vez que apretás el botón verde
function siguienteMovimiento() {
  // Si ya no quedan movimientos en la lista automática, corta
  if (pasoActual >= movimientos.length) {
    alert("¡Ya completaste el juego!");
    return;
  }

  // Agarra el paso que calculó la recursividad
  var mov = movimientos[pasoActual];

  // Busca el disco y la torre correspondiente en la pantalla
  var elementoDisco = document.getElementById("disco" + mov.disco);
  var elementoTorre = document.getElementById(mov.destino);

  // Mueve el disco visualmente
  elementoTorre.appendChild(elementoDisco);

  // Suma 1 para avanzar al próximo clic
  pasoActual = pasoActual + 1;
}

// Al cargar la página por primera vez, arranca el juego con 3 discos por defecto
iniciarJuego();
