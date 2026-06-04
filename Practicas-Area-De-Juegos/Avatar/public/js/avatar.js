const ataques = ["Puño ✊", "Patada 🦶", "Barrida 👣"]

function seleccionarPersonajeJugador(personaje) {
  let pPersonajeSeleccionado = document.getElementById('personaje-seleccionado')
  console.log(personaje)
  if (personaje) {
    pPersonajeSeleccionado.innerHTML = `Tu personaje ${personaje} tiene <span>3</span> vidas`
    aleatoria()
  } else {
    pPersonajeSeleccionado.innerHTML = `Debes elegir un personaje`
  }
}

function azar(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function calcularAtaqueComputadora() {
  let ataqueComputadora = ataques[azar(0, 2)]

  return ataqueComputadora
}

function combatir(ataqueJugador, ataqueComputadora) {
  if ( ataqueJugador == ataqueComputadora) {
    return 'GANASTE.'
  } else if (ataqueJugador == 'Puño ✊' && ataqueComputadora == 'Barrida 👣') {
    return 'GANASTE.'
  } else if (ataqueJugador == 'Patada 🦶' && ataqueComputadora == 'Puño ✊') {
    return 'GANASTE.'
  } else if (ataqueJugador == 'Barrida 👣' && ataqueComputadora == 'Patada 🦶') {
    return 'GANASTE.'
  } else {
    return 'PERDISTE.'
  }
}

function crearMensaje(ataqueJugador, ataqueComputadora, resultado) {
  let parrafo = document.createElement('p')
  let sectionMensajes = document.getElementById('mensajes')

  parrafo.className = 'log-ataque'
  parrafo.innerHTML = `Tu personaje atacó con ${ataqueJugador}, el personaje del enemigo atacó con ${ataqueComputadora}. Resultado: ${resultado}`
  sectionMensajes.appendChild(parrafo)
}

function aleatoria() {
  const personajes = ["Zuko 🔥", "Katara 💧", "Aang 🌪️", "Toph 🌱"]
  const personajeAleatorio = azar(0,3)

  let spanPersonajeComputadora = document.getElementById('personaje-computadora')
  spanPersonajeComputadora.innerHTML = `El personaje del enemigo ${personajes[personajeAleatorio]} tiene <span>3</span> vidas`
}

function iniciarJuego() {
  let botonPersonajeJugador = document.getElementById('boton-personaje')
  let inputPersonajes = document.getElementsByName('personaje')
  botonPersonajeJugador.addEventListener('click', () => {
    let personajeSeleccionado = [...inputPersonajes].findIndex((personaje) => personaje.checked)
    let personaje = document.getElementsByTagName('label')[personajeSeleccionado]?.innerText || null
    seleccionarPersonajeJugador(personaje)
  })
  let botonesAtaques = document.getElementById('botones-ataques')

  botonesAtaques.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      let ataqueJugador = e.target.innerText
      let ataqueComputadora = calcularAtaqueComputadora()
      let resultado = combatir(ataqueJugador, ataqueComputadora)
      crearMensaje(ataqueJugador, ataqueComputadora, resultado)
    }
  })
}

iniciarJuego()