function seleccionarPersonajeJugador(personaje) {
  console.log(personaje)
  if (personaje) {
    alert(`SELECCIONASTE EL PERSONAJE ${personaje}`)
  } else {
    alert(`NO HAS SELECCIONADO NINGUN PERSONAJE`)
  }
}

let botonPersonajeJugador = document.getElementById('boton-personaje')
let inputPersonajes = document.getElementsByName('personaje')
botonPersonajeJugador.addEventListener('click', () => {
  let personajeSeleccionado = [...inputPersonajes].findIndex((personaje) => personaje.checked)
  let personaje = document.getElementsByTagName('label')[personajeSeleccionado]?.innerText || null
  seleccionarPersonajeJugador(personaje)}
)