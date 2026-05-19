const N = 10;

// Creamos el tablero vacío
const tablero = [];

for (let i = 0; i < N; i++) {

  let fila = [];

  for (let j = 0; j < N; j++) {
    fila.push(".");
  }

  tablero.push(fila);
}

// Array para guardar posiciones
const posiciones = [];

// Validamos posiciones para las reinas que se coloquen
function esSeguro(fila, columna) {

  // Verificamos columna por fila
  for (let i = 0; i < fila; i++) {

    if (tablero[i][columna] === "Q") {
      return false;
    }

  }

  // Verificamos diagonal izquierda superior
  let i = fila - 1;
  let j = columna - 1;

  while (i >= 0 && j >= 0) {

    if (tablero[i][j] === "Q") {
      return false;
    }

    i--;
    j--;
  }

  // Verificamos diagonal derecha superior
  i = fila - 1;
  j = columna + 1;

  while (i >= 0 && j < N) {

    if (tablero[i][j] === "Q") {
      return false;
    }

    i--;
    j++;
  }

  return true;
}

function resolverNReinas(fila) {

  // Comprobamos si estamos al final
  if (fila === N) {
    return true;
  }

  // Probamos cada columna
  for (let columna = 0; columna < N; columna++) {

    // Verifica si la posicion es válida
    if (esSeguro(fila, columna)) {

      // Colocamos reina
      tablero[fila][columna] = "Q";

      // Guardamos posicion
      posiciones[fila] = columna;

      // Intentar siguiente fila
      let solucion = resolverNReinas(fila + 1);

      // Si encontro solucion
      if (solucion === true) {
        return true;
      }

      // En caso de que esa reina no se pueda colocar la borramos
      tablero[fila][columna] = ".";
    }
  }

  // No encontró solucion
  return false;
}

// Ejecutamos la funcion principal
resolverNReinas(0);

// Mostramos tablero
console.log("- TABLERO FINAL -");

tablero.forEach(fila => {
    // Agregamos metodo join para mostrar cada fila con un espacio
  console.log(fila.join(" "));
});

// Mostramos posiciones 
console.log("\nPosiciones de las reinas:");
console.log(posiciones);