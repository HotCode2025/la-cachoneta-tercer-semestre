/* Array de los ataques, sirve para cuando necesito generar un ataque random para la computadora */
const ataques = ["Puño ✊", "Patada 🦶", "Barrida 👣"]

/* la funcion con la formula milagrosa para sacar numeros aleatorios */
function azar(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/* Esta funcion sirve para que la computadora eliga un personaje aleatorio, el nombre de la funcion es medio ambiguo igual, espero que se entienda con este comentario jaja*/
function aleatoria() {
  const personajes = ["Zuko 🔥", "Katara 💧", "Aang 🌪️", "Toph 🌱"]
  const personajeAleatorio = azar(0,3)

  let spanPersonajeComputadora = document.getElementById('personaje-computadora')
  spanPersonajeComputadora.innerHTML = `El personaje del enemigo ${personajes[personajeAleatorio]} tiene <span>3</span> vidas`
}

/* En esta funcion modificamos los elementos p del html para mostrar el personaje que elegimos o si no elegimos ningun personaje */
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

/* Funcion para calcular de forma aleatoria el ataque de la computadora*/
function calcularAtaqueComputadora() {
  let ataqueComputadora = ataques[azar(0, 2)]

  return ataqueComputadora
}

/* Logica de combate, igualito a la logica del piedra papel y tijeras, pero modificado para este juego, debemos agregar reglas luego para que se entienda cuando se gana o cuando se pierde */
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

/* Este es la funcion para mostrar el log del combate, crea un elemento html con contenido (tambien agregue un classname para modificarlo con css para que se vea bonito en pantalla), luego lo agregamos a un section usando appendChild */
function crearMensaje(ataqueJugador, ataqueComputadora, resultado) {
  let parrafo = document.createElement('p')
  let sectionMensajes = document.getElementById('mensajes')

  parrafo.className = 'log-ataque'
  parrafo.innerHTML = `Tu personaje atacó con ${ataqueJugador}, el personaje del enemigo atacó con ${ataqueComputadora}. Resultado: ${resultado}`
  sectionMensajes.appendChild(parrafo)
}


/* Esta funcion la creo el profe en clase, y como el codigo que he hecho ha sido diferente al de las clases para ir aprendiendo, supuse que asi deberia de estar bien, el codigo funciona. Imagino que luego podemos usar el iniciarJuego() dentro de una funcion reiniciar() para bueno, reiniciar el juego obviamente jaja */
function iniciarJuego() {
  let botonPersonajeJugador = document.getElementById('boton-personaje')
  let inputPersonajes = document.getElementsByName('personaje')
  /* Uso el boton para escuchar el click, luego chequeo (usando inputPersonajes y checked) cual fue el boton seleccionado, o en papel, el personaje seleccionado. Aca esta basicamente la inicializacion de la logica detras del saber que personaje eligio el jugador y generar un personaje aleatorio para la computadora*/
  botonPersonajeJugador.addEventListener('click', () => {
    let personajeSeleccionado = [...inputPersonajes].findIndex((personaje) => personaje.checked)
    let personaje = document.getElementsByTagName('label')[personajeSeleccionado]?.innerText || null
    seleccionarPersonajeJugador(personaje)
  })

  /* Esta es la inicializacion de la logica del combate, utilizando delegacion de eventos */
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