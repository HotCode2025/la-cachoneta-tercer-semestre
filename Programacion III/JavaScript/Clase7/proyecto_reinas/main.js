// Elementos DOM
const $tablero = document.getElementById("tablero");
const $btnCant = document.getElementById("crear");
const $input = document.getElementById("cantidad");
const $posiciones = document.querySelector(".posiciones");
const $textError = document.querySelector(".texto-error");

// Variables globales
let tablero = [];
let posiciones = [];
let N = 0;

// Creamos el tablero vacío
function crearTablero(N) {
  tablero = [];
  for (let i = 0; i < N; i++) {
    let fila = [];

    for (let j = 0; j < N; j++) {
      fila.push(".");
    }

    tablero.push(fila);
  }
}

// Validamos posiciones para las reinas que se coloquen
function esSeguro(fila, columna) {
  // Verificamos columna por fila, movimiento vertical de la reina
  for (let i = 0; i < fila; i++) {
    if (tablero[i][columna] === "R") {
      return false;
    }
  }

  // Verificamos diagonal izquierda superior
  let i = fila - 1;
  let j = columna - 1;

  while (i >= 0 && j >= 0) {
    if (tablero[i][j] === "R") {
      return false;
    }

    i--;
    j--;
  }

  // Verificamos diagonal derecha superior
  i = fila - 1;
  j = columna + 1;

  while (i >= 0 && j < N) {
    if (tablero[i][j] === "R") {
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
      tablero[fila][columna] = "R";

      // Guardamos posicion
      posiciones[fila] = columna;

      // Intentar siguiente fila
      if (resolverNReinas(fila + 1)) {
        return true;
      }

      // En caso de que esa reina no se pueda colocar la borramos
      tablero[fila][columna] = ".";
    }
  }

  // No encontró solucion
  return false;
}

function mostrarPosiciones() {
    if ($posiciones.classList.contains("hidden")) {
        $posiciones.classList.toggle("hidden");
    }
    $posiciones.innerText = `Posiciones reinas: ${posiciones}`;
}

function renderizarTablero() {
  // Limpiar
  $tablero.innerHTML = "";

  $tablero.style.gridTemplateColumns = `repeat(${N}, 50px)`;
  $tablero.style.gridTemplateRows = `repeat(${N}, 50px)`;

  // Crear cuadros
  for (let fila = 0; fila < N; fila++) {
    for (let columna = 0; columna < N; columna++) {
      const $cuadro = document.createElement("div");

      $cuadro.classList.add("cuadro");

      // Mostrar contenido
      $cuadro.textContent = tablero[fila][columna];

      // Colores para cada cuadro
      if ((fila + columna) % 2 === 0) {
        $cuadro.style.backgroundColor = "white";
      } else {
        $cuadro.style.backgroundColor = "gray";
        $cuadro.style.color = "white";
      }

      $tablero.appendChild($cuadro);
    }
  }
  mostrarPosiciones();
}

$btnCant.addEventListener("click", () => {
  N = parseInt($input.value);
  posiciones = [];

  if (N >= 8) {
    crearTablero(N);
    resolverNReinas(0);
    renderizarTablero();

    if (!$textError.classList.contains("hidden")) {
      $textError.classList.toggle("hidden");
    }
  } else {
    if ($textError.classList.contains("hidden")) {
      $textError.classList.toggle("hidden");
    }
    if (!$posiciones.classList.contains("hidden")) {
      $posiciones.classList.toggle("hidden");
    }
  }
});
