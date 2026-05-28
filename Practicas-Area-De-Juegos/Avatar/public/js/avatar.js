function seleccionarPersonajeJugador(personaje) {
  let spanPersonajeSeleccionado = document.getElementById('personaje-seleccionado')
  console.log(personaje)
  if (personaje) {
    spanPersonajeSeleccionado.innerText = `Has seleccionado a ${personaje}`
    aleatoria()
  } else {
    spanPersonajeSeleccionado.innerText = `Debes seleccionar a un personaje`
  }
}

function aleatoria() {
  const personajes = ["Zuko 🔥", "Katara 💧", "Aang 🌪️", "Toph 🌱"]
  const personajeAleatorio = Math.floor(Math.random() * personajes.length)

  let spanPersonajeComputadora = document.getElementById('personaje-computadora')
  spanPersonajeComputadora.innerText = `La computadora ha seleccionado a ${personajes[personajeAleatorio]}`
}

let botonPersonajeJugador = document.getElementById('boton-personaje')
let inputPersonajes = document.getElementsByName('personaje')
botonPersonajeJugador.addEventListener('click', () => {
  let personajeSeleccionado = [...inputPersonajes].findIndex((personaje) => personaje.checked)
  let personaje = document.getElementsByTagName('label')[personajeSeleccionado]?.innerText || null
  seleccionarPersonajeJugador(personaje)}
)