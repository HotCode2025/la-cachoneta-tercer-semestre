//hacer funcion con la formula, llamar formula y que pase parametros,
// en los argumentos paso los numeros que necesito

// 1 será piedra, 2 será papel y 3 será tijera

function azar(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function eleccion(jugador) {
  if (jugador == 1) return '🪨'
  if (jugador == 2) return '📃'
  if (jugador == 3) return '✂️'
  return 'Elige una opcion valida 🚩'
}

//Variables de estado

//let max = 3
//let min = 1
//let pc = Math.floor(Math.random()*(max-min+1)+min)
//let pc = azar(1,3);
//let jugador = prompt("Elige : 1 piedra, 2 papel, 3 tijera")

//Sistema de inicio al mejor de 5
let triunfos = 0
let perdidas = 0

function piedraPapelTijera(jugadorEleccion) {
  // 1. Verificar si el juego ya terminó
  if (triunfos >= 3 || perdidas >= 3) {
    return;
  }

  // 2. Referencias a los elementos
  const contenedorJugador = document.getElementById('jugador');
  const contenedorPC = document.getElementById('computadora');
  const resultado = document.getElementById('resultado');

  // 3. Elección de la PC
  let pc = azar(1, 3);

  // 4. Mostrar elecciones en pantalla
  contenedorJugador.innerText = `🧔🏻 ${eleccion(jugadorEleccion)}`;
  contenedorPC.innerText = `${eleccion(pc)} 🤖`;

  // 5. Lógica de combate
  if (pc == jugadorEleccion) {
    resultado.innerText = 'EMPATE 🤝';
  } else if (
    (jugadorEleccion == 1 && pc == 3) || 
    (jugadorEleccion == 2 && pc == 1) || 
    (jugadorEleccion == 3 && pc == 2)
  ) {
    resultado.innerText = '¡GANASTE ESTA RONDA! ✅';
    triunfos++;
  } else {
    resultado.innerText = 'PERDISTE ESTA RONDA ❌';
    perdidas++;
  }

  // 6. Revisar marcador final
  if (triunfos === 3 || perdidas === 3) {
    resultado.innerText = `FIN DEL JUEGO: Ganaste ${triunfos} - Perdiste ${perdidas}`;
  }
}

function reiniciarJuego() {
  triunfos = 0;
  perdidas = 0;
  document.getElementById('jugador').innerText = '🧔🏻';
  document.getElementById('computadora').innerText = '🤖';
  document.getElementById('resultado').innerText = '¡Nuevo Juego! Elige tu opción.';
}